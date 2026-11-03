"use client";

import { useState } from "react";

type Status = { type: "error" | "success"; text: string } | null;

export function useFormAction() {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const fail = (text: string) => setStatus({ type: "error", text });

  // Runs the request, sets the status message, returns true on success.
  async function run(
    action: () => Promise<void>,
    msg: { success: string; error: string },
  ) {
    setStatus(null);
    setSaving(true);
    try {
      await action();
      setStatus({ type: "success", text: msg.success });
      return true;
    } catch {
      fail(msg.error);
      return false;
    } finally {
      setSaving(false);
    }
  }

  return { saving, status, run, fail };
}