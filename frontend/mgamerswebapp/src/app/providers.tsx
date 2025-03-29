// app/providers.tsx
'use client'
import { HeroUIProvider } from '@heroui/react'
import Navbar from './components/common/navbar'
import { AuthProvider } from '@/context/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <AuthProvider>
                <Navbar />
                {children}
            </AuthProvider>
        </HeroUIProvider>
    )
}