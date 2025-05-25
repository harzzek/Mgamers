import { Button } from "@heroui/button";
import Modal from "../common/Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  title = 'Confirm Action',
  message,
  onConfirm,
  onCancel,
  confirmText = 'Ja',
  cancelText = 'Nej',
}: ConfirmModalProps) {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-foreground-50">
        <p>{message}</p>
        <div className="mt-10 flex justify-between mb-3">
          <Button
            color="danger"
            onPress={handleCancel}
          >
            {cancelText}
          </Button>
          <Button
            color="success"
            onPress={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
