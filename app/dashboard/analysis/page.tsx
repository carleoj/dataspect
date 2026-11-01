// app/dashboard/page.tsx
import {
  SparklineChart,
  RevenueTrendChart,
  OrderStatusDonutChart,
} from '../../../components/analysis';

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Revenue Card */}
        <article className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded-sm bg-green-100 p-1 text-green-600">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span className="sr-only">Increase: </span>
            <span className="text-xs font-medium">12.4%</span>
          </div>
          <div>
            <strong className="block text-sm font-medium text-gray-600">Monthly revenue</strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">$48,204</span>{' '}
              <span className="text-xs text-gray-600">from $42,910</span>
            </p>
          </div>
          <div className="h-10">
            <SparklineChart />
          </div>
        </article>

        {/* Active Customers Card */}
        <article className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded-sm bg-green-100 p-1 text-green-600">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span className="sr-only">Increase: </span>
            <span className="text-xs font-medium">4.1%</span>
          </div>
          <div>
            <strong className="block text-sm font-medium text-gray-600">Active customers</strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">2,318</span>{' '}
              <span className="text-xs text-gray-600">from 2,227</span>
            </p>
          </div>
        </article>

        {/* Churn Rate Card */}
        <article className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="inline-flex gap-2 self-end rounded-sm bg-red-100 p-1 text-red-600">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
            <span className="sr-only">Decrease: </span>
            <span className="text-xs font-medium">2.6%</span>
          </div>
          <div>
            <strong className="block text-sm font-medium text-gray-600">Churn rate</strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">1.8%</span>{' '}
              <span className="text-xs text-gray-600">from 2.1%</span>
            </p>
          </div>
        </article>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueTrendChart />
        <OrderStatusDonutChart />
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-sm font-medium text-gray-900">Recent orders</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap">Customer</th>
                <th className="px-3 py-2 whitespace-nowrap">Order</th>
                <th className="px-3 py-2 whitespace-nowrap">Status</th>
                <th className="px-3 py-2 whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="*:text-gray-900 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap">Nandor the Relentless</td>
                <td className="px-3 py-2 whitespace-nowrap">#3921</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-700">
                    Paid
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">$412.00</td>
              </tr>
              <tr className="*:text-gray-900 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap">Laszlo Cravensworth</td>
                <td className="px-3 py-2 whitespace-nowrap">#3920</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs text-yellow-700">
                    Pending
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">$128.50</td>
              </tr>
              <tr className="*:text-gray-900 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap">Nadja</td>
                <td className="px-3 py-2 whitespace-nowrap">#3919</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-700">
                    Paid
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">$894.20</td>
              </tr>
              <tr className="*:text-gray-900 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap">Guillermo de la Cruz</td>
                <td className="px-3 py-2 whitespace-nowrap">#3918</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-red-700">
                    Refunded
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">$56.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}