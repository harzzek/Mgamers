"use client";

import { Modal as HeroModal, ModalBody, ModalContent, ModalHeader } from '@heroui/react'
import { Fragment } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {

    return (
        <HeroModal isOpen={isOpen} size="lg" onClose={onClose} backdrop='blur' className='mgamers-dark'>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col text-foreground-50">
                        {title}
                    </ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                </>
            </ModalContent>

        </HeroModal>
    )
}
