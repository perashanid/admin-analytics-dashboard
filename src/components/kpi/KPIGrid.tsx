'use client';

import { memo } from 'react';
import { DollarSign, Users, ShoppingCart, Percent } from 'lucide-react';
import { KPICard } from './KPICard';
import { useDashboardStore } from '@/stores/dashboardStore';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';

export const KPIGrid = memo(function KPIGrid() {
  const { stats, isLoading } = useDashboardStore();

  const kpiData = [
    {
      title: 'Total Revenue',
      value: stats?.kpi.totalRevenue.value
        ? formatCurrency(stats.kpi.totalRevenue.value)
        : '$0',
      change: stats?.kpi.totalRevenue.change ?? 0,
      isPositive: stats?.kpi.totalRevenue.isPositive ?? true,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: 'Total Users',
      value: stats?.kpi.totalUsers.value
        ? formatNumber(stats.kpi.totalUsers.value)
        : '0',
      change: stats?.kpi.totalUsers.change ?? 0,
      isPositive: stats?.kpi.totalUsers.isPositive ?? true,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: 'Orders',
      value: stats?.kpi.orders.value ? formatNumber(stats.kpi.orders.value) : '0',
      change: stats?.kpi.orders.change ?? 0,
      isPositive: stats?.kpi.orders.isPositive ?? true,
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      title: 'Conversion Rate',
      value: stats?.kpi.conversionRate.value
        ? formatPercentage(stats.kpi.conversionRate.value)
        : '0%',
      change: stats?.kpi.conversionRate.change ?? 0,
      isPositive: stats?.kpi.conversionRate.isPositive ?? true,
      icon: <Percent className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          isPositive={kpi.isPositive}
          icon={kpi.icon}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
});
