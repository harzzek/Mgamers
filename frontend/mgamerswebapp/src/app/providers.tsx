// app/providers.tsx
'use client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import Navbar from './components/common/navbar'
import { AuthProvider } from '@/context/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastProvider />
            <main className="purple-dark text-foreground bg-background">
                <div className='min-h-screen'>
                    <AuthProvider>
                        <Navbar />
                        {children}
                    </AuthProvider>
                </div>
            </main>
        </HeroUIProvider>
    )
}