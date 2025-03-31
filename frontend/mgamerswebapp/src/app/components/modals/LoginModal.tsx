"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Modal from '../common/Modal';
import LoginForm from '../forms/LoginForm';
import { addToast, Button, ToastProvider } from '@heroui/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (data: { username: string; password: string; rememberMe: boolean }) => {
    try {
      await login(data.username, data.password);
      // Close the modal
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid username or password:');
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login">
      {errorMessage && 
        <div className="mb-4 text-sm text-red-600">
          {errorMessage}
        </div>
      }
      <LoginForm onSubmit={handleLogin} />
    </Modal>
  );
}
