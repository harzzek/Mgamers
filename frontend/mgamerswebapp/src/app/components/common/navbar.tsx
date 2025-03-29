"use client";

import { useState } from 'react'
import LoginModal from '../modals/LoginModal'
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import RegisterModal from '../modals/RegisterModal';
import Link from 'next/link';
import Image from 'next/image';
import mgamersLogo from '@/app/favicon.ico'
import { clsx } from "clsx"

const navigation = [
  { name: 'Arrangementer', href: '/events' },
  { name: 'Brugere', href: '/users' },
  { name: 'Om os', href: '#' },
  { name: 'Guides', href: '#' },

]

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
    <nav className="bg-stone-800 shadow-md top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo */}
          <Link href="/" className="justify-self-start ">
            <Image src={mgamersLogo} alt="Logo" width={290} />
          </Link>
          {/* Navigation Links */}
          <div className="justify-self-start space-x-8">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  " hover:text-orange-300 transition font-medium",
                  isCurrentPage(link.href) ? "text-orange-500 font-semibold" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="justify-self-end space-x-4">
            {userToken ? (
              <button
                onClick={() => handleLogout()}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </nav>
  );
}