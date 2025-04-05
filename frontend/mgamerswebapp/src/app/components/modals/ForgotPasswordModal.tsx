"use client";

import Modal from "../common/Modal";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import { postForgotPassword } from "@/stores/accountStore";

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ForgotPasswordModal({isOpen, onClose}: ForgotPasswordModalProps){

    const handleSubmit = async (data: { email: string }) => {
        
        try {
            await postForgotPassword(data);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Forgot Password">
            <ForgotPasswordForm onSubmit={handleSubmit}/>
        </Modal>
    )
}