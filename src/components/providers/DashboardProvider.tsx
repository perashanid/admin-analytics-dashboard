'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';

interface DashboardProviderProps {
  children: React.ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const { fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return <>{children}</>;
}
