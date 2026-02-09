export interface KPIData {
  value: number;
  change: number;
  isPositive: boolean;
}

export interface Stats {
  kpi: {
    totalRevenue: KPIData;
    totalUsers: KPIData;
    orders: KPIData;
    conversionRate: KPIData;
  };
}

export interface RevenueData {
  month: string;
  value: number;
}

export interface OrdersData {
  month: string;
  value: number;
}

export interface UserDistribution {
  name: string;
  value: number;
  color: string;
}

export interface TrafficSource {
  source: string;
  value: number;
  color: string;
}

export type DateRange = '7d' | '30d' | '12m';
export type UserType = 'all' | 'free' | 'premium' | 'enterprise';

export interface FilterState {
  dateRange: DateRange;
  userType: UserType;
}

export interface DashboardData {
  stats: Stats | null;
  revenue: RevenueData[];
  orders: OrdersData[];
  userDistribution: UserDistribution[];
  traffic: TrafficSource[];
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
  status: 'Active' | 'Inactive' | 'Pending';
  plan: 'Free' | 'Premium' | 'Enterprise';
  lastActive: string;
  avatar: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
  date: string;
  paymentMethod: string;
}

export interface Activity {
  id: string;
  type: 'order' | 'user' | 'alert';
  message: string;
  amount?: number;
  time: string;
}

// Settings Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  timezone: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
}

export interface SystemSettings {
  companyName: string;
  companyEmail: string;
  timezone: string;
  dateFormat: string;
  currency: string;
}
