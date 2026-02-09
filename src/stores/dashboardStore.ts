import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Stats,
  RevenueData,
  OrdersData,
  UserDistribution,
  TrafficSource,
  DateRange,
  UserType,
} from '@/types';
import { api } from '@/lib/api';

interface DashboardState {
  // Data
  stats: Stats | null;
  revenue: RevenueData[];
  orders: OrdersData[];
  userDistribution: UserDistribution[];
  traffic: TrafficSource[];

  // Filters
  dateRange: DateRange;
  userType: UserType;

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  setDateRange: (range: DateRange) => void;
  setUserType: (type: UserType) => void;
  fetchDashboardData: () => Promise<void>;
  resetError: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      // Initial state
      stats: null,
      revenue: [],
      orders: [],
      userDistribution: [],
      traffic: [],
      dateRange: '12m',
      userType: 'all',
      isLoading: false,
      error: null,

      // Actions
      setDateRange: (range: DateRange) => {
        set({ dateRange: range }, false, 'setDateRange');
        // Refetch data when filter changes
        get().fetchDashboardData();
      },

      setUserType: (type: UserType) => {
        set({ userType: type }, false, 'setUserType');
        // Refetch data when filter changes
        get().fetchDashboardData();
      },

      fetchDashboardData: async () => {
        set({ isLoading: true, error: null }, false, 'fetchDashboardData/start');

        try {
          // Simulate API delay for demonstration
          await new Promise((resolve) => setTimeout(resolve, 300));

          const { dateRange, userType } = get();

          const [stats, revenue, orders, userDistribution, traffic] = await Promise.all([
            api.getStats(dateRange, userType),
            api.getRevenue(dateRange, userType),
            api.getOrders(dateRange, userType),
            api.getUserDistribution(),
            api.getTrafficSources(),
          ]);

          set(
            {
              stats,
              revenue,
              orders,
              userDistribution,
              traffic,
              isLoading: false,
            },
            false,
            'fetchDashboardData/success'
          );
        } catch (error) {
          set(
            {
              isLoading: false,
              error: error instanceof Error ? error.message : 'Failed to fetch dashboard data',
            },
            false,
            'fetchDashboardData/error'
          );
        }
      },

      resetError: () => set({ error: null }, false, 'resetError'),
    }),
    { name: 'DashboardStore' }
  )
);
