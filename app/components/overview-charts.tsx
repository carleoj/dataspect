// components/dashboard/overview-charts.tsx
'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const revenueRangesByPeriod = {
  '6m': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [28000, 34000, 31000, 39000, 42000, 48000],
  },
  '12m': {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [19000, 21500, 20000, 23500, 25000, 27000, 28000, 34000, 31000, 39000, 42000, 48000],
  },
};

export function SparklineChart() {
  const data = {
    labels: revenueRangesByPeriod['6m'].labels,
    datasets: [
      {
        data: revenueRangesByPeriod['6m'].values,
        borderColor: '#10b981',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return <Line data={data} options={options} />;
}

export function RevenueTrendChart() {
  const [range, setRange] = useState<'6m' | '12m'>('6m');

  const currentData = revenueRangesByPeriod[range];

  const data = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: currentData.values,
        borderColor: '#4f46e5',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 256);
          gradient.addColorStop(0, 'rgba(79, 70, 229, 0.25)');
          gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#4f46e5',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `$${tooltipItem.formattedValue}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#4b5563' } },
      y: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        ticks: {
          color: '#4b5563',
          callback: (value: any) => `$${Number(value) / 1000}k`,
        },
      },
    },
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Revenue trend</h2>
        <div className="inline-flex rounded-md border border-gray-200 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setRange('6m')}
            aria-pressed={range === '6m'}
            className={`rounded-sm px-2 py-1 ${
              range === '6m' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
            }`}
          >
            6M
          </button>
          <button
            type="button"
            onClick={() => setRange('12m')}
            aria-pressed={range === '12m'}
            className={`rounded-sm px-2 py-1 ${
              range === '12m' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
            }`}
          >
            12M
          </button>
        </div>
      </div>
      <div className="mt-4 h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export function OrderStatusDonutChart() {
  const data = {
    labels: ['Paid', 'Pending', 'Refunded'],
    datasets: [
      {
        data: [68, 22, 10],
        backgroundColor: ['#10b981', '#f59e0b', '#f43f5e'],
        hoverBackgroundColor: ['#059669', '#d97706', '#e11d48'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#4b5563' } },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.formattedValue}%`,
        },
      },
    },
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-medium text-gray-900">Orders by status</h2>
      <div className="mt-4 h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}