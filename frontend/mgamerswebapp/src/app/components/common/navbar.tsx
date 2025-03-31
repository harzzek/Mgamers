"use client";

import { useEffect, useState } from 'react'
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
import { Spinner } from '@heroui/react';


const navigation = [
  { name: 'Arrangementer', href: '/events' },
  { name: 'Brugere', href: '/users' },
  { name: 'Om os', href: '#' },
  { name: 'Guides', href: '#' },

]

export const Logo = () => {
  return (
    <Link href="/" className="justify-self-start size-30 absolute top-0">
      <Image src={mgamersLogo} alt="Logo" width={110} />
    </Link>
  )
}

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { userToken, isAuthLoading, logout } = useAuth();
  const pathname = usePathname();

  const isCurrentPage = (href: string): boolean => {
    return pathname === href;
  }

  const handleLogout = () => {
    logout();
  };

  if (isAuthLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner />
      </div>
    )
  }

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
              color={isCurrentPage(link.href) ? "primary" : "foreground"}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" key="Authentication">
        {userToken ? (
          <>
            <NavbarItem>
              <Button color="primary" variant="ghost" onPress={() => handleLogout()}>
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button color='primary' onPress={() => setIsLoginModalOpen(true)}>
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat" onPress={() => setIsRegisterModalOpen(true)}>
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}

      </NavbarContent>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </HeroNav>
  );
}