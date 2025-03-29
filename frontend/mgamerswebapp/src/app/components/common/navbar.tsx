"use client";

import { useState } from 'react'
import LoginModal from '../modals/LoginModal'
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import RegisterModal from '../modals/RegisterModal';
import { Link } from "@heroui/link";
import { Button } from "@heroui/button"
import Image from 'next/image';
import mgamersLogo from '@/app/favicon.ico'
import { clsx } from "clsx"
import { Navbar as HeroNav, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';


const navigation = [
  { name: 'Arrangementer', href: '/events' },
  { name: 'Brugere', href: '/users' },
  { name: 'Om os', href: '#' },
  { name: 'Guides', href: '#' },

]

export const Logo = () => {
  return (
    <Link href="/" className="justify-self-start size-30">
      <Image src={mgamersLogo} alt="Logo" width={110} />
    </Link>
  )
}

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
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
          <NavbarItem isActive={isCurrentPage(link.href)} key={link.name}>
            <Link
              href={link.href} 
              color="foreground"
              >
                {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" key="Authentication">
      <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroNav>
  );
}