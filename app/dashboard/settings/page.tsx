// app/dashboard/settings/page.tsx

"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const isConfirmed = text.trim() === "DELETE";

  const resetModal = () => {
    setIsOpen(false);
    setText("");
  };
  return (
    <div className="space-y-6">
      {/* Profile Form */}
      <form
        id="account-settings-form"
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget));
          console.log("Save settings", data);
        }}
        className="rounded-lg border border-gray-200 bg-white p-6"
      >
        <h2 className="text-sm font-medium text-gray-900">Profile</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>

            <input
              type="text"
              id="full-name"
              name="fullName"
              defaultValue="Priya Natarajan"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs"
            />
          </div>

          <div>
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              type="email"
              id="email-address"
              name="email"
              defaultValue="priya@orbitly.com"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs"
            />
          </div>

          <div>
            <label
              htmlFor="quality-threshold"
              className="block text-sm font-medium text-gray-700"
            >
              Quality Thresholds
            </label>

            <select
              id="quality-threshold"
              name="qualityThreshold"
              defaultValue="medium"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="low">Low (Strict)</option>
              <option value="medium">Medium (Standard)</option>
              <option value="high">High (Relaxed)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="outlier-method"
              className="block text-sm font-medium text-gray-700"
            >
              Outlier Method
            </label>

            <select
              id="outlier-method"
              name="outlierMethod"
              defaultValue="iqr"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="iqr">Interquartile Range (IQR)</option>
              <option value="z-score">Z-Score</option>
            </select>
          </div>
        </div>
      </form>

      {/* Danger Zone Card */}
      <div className="rounded-lg border border-red-200 bg-white p-6">
        <h2 className="font-medium text-gray-900">Danger zone</h2>
        <p className="mt-2 text-gray-600">
          Deleting your reports, datasets, and history. This cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-4 rounded-md border border-red-200 px-4 py-2 font-medium text-red-700 hover:bg-red-50"
        >
          Delete account
        </button>
      </div>

      {/* Simplified Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <strong className="text-gray-900">Are you sure?</strong>
            <p className="mt-2 text-gray-600">
              Type <strong className="text-gray-900">DELETE</strong> to confirm
              account deletion.
            </p>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="DELETE"
              className="mt-4 w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:border-red-500 focus:outline-none"
            />

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={resetModal}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!isConfirmed}
                onClick={() => {
                  console.log("Account deleted");
                  resetModal();
                }}
                className={`rounded-md px-4 py-2 text-white ${
                  isConfirmed
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-300 cursor-not-allowed"
                }`}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
