// app/providers.tsx
'use client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import Navbar from './components/common/navbar'
import { AuthProvider } from '@/context/AuthContext'
import Footer from './components/common/Footer'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastProvider />
            <main className="mgamers-dark text-foreground bg-background">
                <div className='min-h-screen'>
                    <AuthProvider>
                        <Navbar />
                        {children}
                        <Footer/>
                    </AuthProvider>
                </div>
            </main>
        </HeroUIProvider>
    )
}