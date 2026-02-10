import axios from 'axios';
import {
  Stats,
  RevenueData,
  OrdersData,
  UserDistribution,
  TrafficSource,
  User,
  Order,
  Activity,
  DateRange,
  UserType,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export const api = {
  // Dashboard
  getStats: async (dateRange: DateRange = '12m', userType: UserType = 'all'): Promise<Stats> => {
    const response = await apiClient.get('/stats');
    return response.data[dateRange][userType];
  },

  getRevenue: async (dateRange: DateRange = '12m', userType: UserType = 'all'): Promise<RevenueData[]> => {
    const response = await apiClient.get('/revenue');
    return response.data[dateRange][userType];
  },

  getOrders: async (dateRange: DateRange = '12m', userType: UserType = 'all'): Promise<OrdersData[]> => {
    const response = await apiClient.get('/orders');
    return response.data[dateRange][userType];
  },

  getUserDistribution: async (): Promise<UserDistribution[]> => {
    const response = await apiClient.get('/users');
    return response.data.distribution;
  },

  getTrafficSources: async (): Promise<TrafficSource[]> => {
    const response = await apiClient.get('/traffic');
    return response.data;
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/usersList');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/usersList/${id}`);
    return response.data;
  },

  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await apiClient.post('/usersList', user);
    return response.data;
  },

  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await apiClient.patch(`/usersList/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/usersList/${id}`);
  },

  // Orders
  getOrdersList: async (): Promise<Order[]> => {
    const response = await apiClient.get('/ordersList');
    return response.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await apiClient.get(`/ordersList/${id}`);
    return response.data;
  },

  updateOrder: async (id: string, order: Partial<Order>): Promise<Order> => {
    const response = await apiClient.patch(`/ordersList/${id}`, order);
    return response.data;
  },

  deleteOrder: async (id: string): Promise<void> => {
    await apiClient.delete(`/ordersList/${id}`);
  },

  // Activities
  getActivities: async (): Promise<Activity[]> => {
    const response = await apiClient.get('/activities');
    return response.data;
  },

  // Analytics
  getAnalytics: async (dateRange: DateRange = '12m') => {
    const response = await apiClient.get('/analytics');
    return response.data[dateRange];
  },
};

export default apiClient;
