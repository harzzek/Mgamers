"use client";

import { useState } from 'react'
import LoginModal from '../modals/LoginModal'
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import RegisterModal from '../modals/RegisterModal';
import { Link } from "@heroui/link";
import { Button } from "@heroui/button"
import Image from 'next/image';
import mgamersLogo from '@/resources/logo.png';
import { Navbar as HeroNav, NavbarBrand, NavbarContent, NavbarItem as HeroNavbarItem } from '@heroui/navbar';
import NavbarItem  from './NavbarItem' ;


const navigation = [
  { name: 'Arrangementer', href: '/events' },
  { name: 'Brugere', href: '/users' },
  { name: 'Om os', href: '/about' },
  { name: 'Nyheder', href: '/news' },
  { name: 'Sponsor', href: '/sponsor' }

]

export const Logo = () => {
  return (
    <Link href="/" className="justify-self-start size-30 absolute top-0">
      <Image src={mgamersLogo} alt="Logo" width={110} />
    </Link>
  )
}

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { userToken, logout } = useAuth();
  const pathname = usePathname();

  const isCurrentPage = (href: string): boolean => {
    return pathname === href;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <HeroNav isBordered>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center" key="Navcontent">
        {navigation.map((link) => (
          <NavbarItem name={link.name} isActive={isCurrentPage(link.href)} hrefString={link.href} key={link.name}/>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" key="Authentication">
        {userToken ? (
          <>
            <HeroNavbarItem>
              <Button color="secondary" variant="ghost" onPress={() => handleLogout()}>
                Logout
              </Button>
            </HeroNavbarItem>
          </>
        ) : (
          <>
            <HeroNavbarItem className="hidden lg:flex">
              <Button variant='light' onPress={() => setIsLoginModalOpen(true)}>
                Login
              </Button>
            </HeroNavbarItem>
            <HeroNavbarItem>
              <Button color="secondary" variant="solid" onPress={() => setIsRegisterModalOpen(true)}>
                Sign Up
              </Button>
            </HeroNavbarItem>
          </>
        )}

      </NavbarContent>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </HeroNav>
  );
}