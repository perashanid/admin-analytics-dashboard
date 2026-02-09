'use client';

import { memo } from 'react';
import { Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/stores/dashboardStore';
import { DateRange, UserType } from '@/types';

const dateRanges: { value: DateRange; label: string }[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '12m', label: 'Last 12 months' },
];

const userTypes: { value: UserType; label: string }[] = [
  { value: 'all', label: 'All Users' },
  { value: 'free', label: 'Free' },
  { value: 'premium', label: 'Premium' },
  { value: 'enterprise', label: 'Enterprise' },
];

export const DashboardFilters = memo(function DashboardFilters() {
  const { dateRange, userType, setDateRange, setUserType, isLoading } = useDashboardStore();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your business.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="flex rounded-lg border bg-background p-1">
            {dateRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                disabled={isLoading}
                className={cn(
                  'px-3 py-1 text-sm font-medium transition-all rounded-md',
                  dateRange === range.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* User Type Filter */}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType)}
            disabled={isLoading}
            className={cn(
              'rounded-lg border bg-background px-3 py-1.5 text-sm font-medium',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            {userTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
});
