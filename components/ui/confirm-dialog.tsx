'use client';

import { useEffect, useState } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmWord: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open, title, description, confirmWord, confirmLabel, onConfirm, onCancel,
}: ConfirmDialogProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!open) setText('');
  }, [open]);

  if (!open) return null;
  const confirmed = text.trim() === confirmWord;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onKeyDown={(e) => e.key === 'Escape' && onCancel()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <strong id="confirm-title" className="text-gray-900">{title}</strong>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <p className="mt-3 text-sm text-gray-600">
          Type <strong className="text-gray-900">{confirmWord}</strong> to confirm.
        </p>

        <input
          autoFocus
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={confirmWord}
          className="mt-3 w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 focus:border-red-500 focus:outline-none"
        />

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="button" disabled={!confirmed} onClick={onConfirm}
            className={`rounded-md px-4 py-2 text-sm text-white ${
              confirmed ? 'bg-red-600 hover:bg-red-700' : 'cursor-not-allowed bg-red-300'
            }`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}