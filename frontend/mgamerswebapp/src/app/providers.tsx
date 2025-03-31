// app/providers.tsx
'use client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import Navbar from './components/common/navbar'
import { AuthProvider } from '@/context/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastProvider />
            <main className="dark text-foreground bg-background">
                <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider>
            </main>
        </HeroUIProvider>
    )
}