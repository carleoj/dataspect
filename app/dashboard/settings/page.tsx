"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { PasswordField } from "@/components/ui/password-field";
import { SubmitRow } from "@/components/ui/submit-row";
import { useFormAction } from "@/hooks/useFormAction";
import { changeName, changePassword } from "@/services/userService";
import { useUserStore } from "@/store/useUserStore";

const INPUT =
  "mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs";

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="mt-0.5 text-sm text-gray-600">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const [pending, setPending] = useState<"datasets" | "account" | null>(null);
  const profile = useFormAction();
  const password = useFormAction();

  return (
    <div className="space-y-6">
      <form
        id="account-settings-form"
        key={user?.id ?? "loading"}
        onSubmit={async (e) => {
          e.preventDefault();
          const name = String(new FormData(e.currentTarget).get("fullName")).trim();
          if (!name || name === user?.name) return profile.fail("Enter a new name.");

          const ok = await profile.run(() => changeName({ name }), {
            success: "Name updated.",
            error: "Could not update your name.",
          });
          if (ok && user) setUser({ ...user, name });
        }}
      >
        <Card title="Profile">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                defaultValue={user?.name ?? ""}
                className={INPUT}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                value={user?.email ?? ""}
                readOnly
                aria-describedby="email-hint"
                className={`${INPUT} cursor-not-allowed bg-gray-50 text-gray-500`}
              />
            </div>
          </div>

          <div className="mt-6">
            <SubmitRow
              label="Save changes"
              savingLabel="Saving…"
              saving={profile.saving}
              status={profile.status}
            />
          </div>
        </Card>
      </form>

      <form
        id="password-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const fd = new FormData(form);
          const pw = String(fd.get("password"));
          const confirm = String(fd.get("password_confirmation"));
          if (pw !== confirm) return password.fail("The new passwords do not match.");

          const ok = await password.run(
            () => changePassword({ password: pw, password_confirmation: confirm }),
            { success: "Password updated.", error: "Could not update your password." },
          );
          if (ok) form.reset();
        }}
      >
        <Card title="Change password">
          <div className="max-w-md space-y-4">
            <PasswordField
              id="new-password"
              name="password"
              label="New password"
              autoComplete="new-password"
              minLength={8}
              hint="At least 8 characters."
            />
            <PasswordField
              id="confirm-password"
              name="password_confirmation"
              label="Confirm new password"
              autoComplete="new-password"
              minLength={8}
            />
            <SubmitRow
              label="Update password"
              savingLabel="Updating…"
              saving={password.saving}
              status={password.status}
            />
          </div>
        </Card>
      </form>

      <Card title="Your data">
        <div className="divide-y divide-gray-200">
          <Row
            title="Export your data"
            description="Download your dataset list and analysis reports as a ZIP file."
          >
            <button
              type="button"
              onClick={() => console.log("Export data")}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Export
            </button>
          </Row>

          <Row
            title="Delete all datasets"
            description="Removes every uploaded file and its reports. Your account stays."
          >
            <button
              type="button"
              onClick={() => setPending("datasets")}
              className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Delete datasets
            </button>
          </Row>

          <Row
            title="Delete account"
            description="Permanently deletes your account, datasets and history. This cannot be undone."
          >
            <button
              type="button"
              onClick={() => setPending("account")}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete account
            </button>
          </Row>
        </div>
      </Card>

      <ConfirmDialog
        open={pending === "datasets"}
        title="Delete all datasets?"
        description="Every uploaded file and its analysis will be removed. Your account is not affected."
        confirmWord="DELETE DATASETS"
        confirmLabel="Delete datasets"
        onCancel={() => setPending(null)}
        onConfirm={() => {
          console.log("Datasets deleted");
          setPending(null);
        }}
      />

      <ConfirmDialog
        open={pending === "account"}
        title="Delete your account?"
        description="Your account, datasets and history will be permanently deleted."
        confirmWord="DELETE"
        confirmLabel="Delete account"
        onCancel={() => setPending(null)}
        onConfirm={() => {
          console.log("Account deleted");
          setPending(null);
        }}
      />
    </div>
  );
}