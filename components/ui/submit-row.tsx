interface SubmitRowProps {
  label: string;
  savingLabel: string;
  saving: boolean;
  status: { type: "error" | "success"; text: string } | null;
}

export function SubmitRow({ label, savingLabel, saving, status }: SubmitRowProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? savingLabel : label}
      </button>
      {status && (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={`text-sm ${status.type === "error" ? "text-red-600" : "text-green-700"}`}
        >
          {status.text}
        </p>
      )}
    </div>
  );
}