// app/dashboard/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Profile Form */}
      <form id="account-settings-form" className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-medium text-gray-900">Profile</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
              Full name
            </label>

            <input
              type="text"
              id="full-name"
              defaultValue="Priya Natarajan"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs"
            />
          </div>

          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
              Email address
            </label>

            <input
              type="email"
              id="email-address"
              defaultValue="priya@orbitly.com"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="team-name" className="block text-sm font-medium text-gray-700">
              Team name
            </label>

            <input
              type="text"
              id="team-name"
              defaultValue="Orbitly"
              className="mt-1 w-full rounded-md border-gray-200 text-sm text-gray-900 shadow-xs"
            />
          </div>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="rounded-lg border border-red-200 bg-white p-6">
        <h2 className="text-sm font-medium text-gray-900">Danger zone</h2>

        <p className="mt-2 text-sm text-gray-600">
          Deleting your team removes all customers, orders, and billing history. This cannot be
          undone.
        </p>

        <button
          type="button"
          className="mt-4 inline-block rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}