"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, IdentificationIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useContext, useEffect } from 'react'
import LoginModal from '../modals/LoginModal'
import { AuthContext } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import RegisterModal from '../modals/RegisterModal';

const navigation = [
  { name: 'Arrangementer', href: '/events' },
  { name: 'Brugere', href: '/users' },
  { name: 'About', href: '#' },
  { name: 'Guides', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();

  const isCurrentPage = (href: string) => {
    return pathname === href;
  }
    
  const handleLogout = () => {
    logout();
  }
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <a href="/">
                  <img

                    alt="Your Company"
                    src="../../favicon.ico"
                    className="h-8 w-auto"
                  />
                </a>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.name  ? 'page' : undefined}
                      className={classNames(
                        isCurrentPage(item.href) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3 shadow-sm">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-950">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <IdentificationIcon aria-hidden="true" className="h-6 w-6" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border-slate-950 bg-slate-800 py-1 shadow-lg drop-shadow-sm ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {user ? (
                    <>
                      <MenuItem>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-gray-700">
                          Your Profile
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-gray-700 cursor-pointer"
                        >
                          Sign out
                        </a>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <a 
                          onClick={() => setIsRegisterModalOpen(true)} 
                          className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-gray-700 cursor-pointer"
                        >
                          Opret konto
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          onClick={() => setIsLoginModalOpen(true)}
                          className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-gray-700 cursor-pointer"
                        >
                          Login
                        </a>
                      </MenuItem>
                    </>
                  )}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        
      </Disclosure>
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}