import { useState } from "react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason?: string) => void;
    title: string;
    description: string;
    confirmText: string;
    variant: 'success' | 'danger';
    isReasonVisible?: boolean;
}
  
export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText,
    variant,
    isReasonVisible=false
}: ConfirmationModalProps) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const buttonColor = variant === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
    
    const handleConfirm = () => {
        if (isReasonVisible && (!reason || reason.trim() === '')) {
            setError('Por favor, informe o motivo da rejeição');
            return;
        }

        onConfirm(isReasonVisible ? reason : undefined);
        setReason('');
        setError('');
        onClose();
    }

    if (!isOpen) return null;
  
    return (
      <div className="fixed mx-4 lg:mx-0 inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="mt-2 text-gray-600">{description}</p>
            {isReasonVisible && (
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Motivo da rejeição
                    </label>
                    <textarea
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                      rows={3}
                      placeholder="Descreva o motivo..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    {error && (
                        <p className="mt-1 text-sm text-red-600">{error}</p>
                    )}
                </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
                <button 
                    onClick={() => {
                        setReason('');
                        setError('');
                        onClose();
                    }}
                    className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-md transition"
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleConfirm}
                    className={`px-4 py-2 text-white rounded-md transition ${buttonColor}`}
                >
                    {confirmText}
                </button>
              </div>
            </div>
        </div>
    );
}