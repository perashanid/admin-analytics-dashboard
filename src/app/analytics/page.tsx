'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';
import { api } from '@/lib/api';

// Mock data for detailed analytics
const performanceData = [
  { day: 'Mon', visitors: 1200, conversions: 80, revenue: 2400 },
  { day: 'Tue', visitors: 1500, conversions: 95, revenue: 3200 },
  { day: 'Wed', visitors: 1800, conversions: 120, revenue: 4100 },
  { day: 'Thu', visitors: 1400, conversions: 85, revenue: 2800 },
  { day: 'Fri', visitors: 2000, conversions: 150, revenue: 5200 },
  { day: 'Sat', visitors: 2400, conversions: 180, revenue: 6100 },
  { day: 'Sun', visitors: 2200, conversions: 165, revenue: 5800 },
];

const deviceData = [
  { name: 'Desktop', value: 55, color: '#3b82f6' },
  { name: 'Mobile', value: 35, color: '#8b5cf6' },
  { name: 'Tablet', value: 10, color: '#10b981' },
];

const browserData = [
  { name: 'Chrome', users: 4500 },
  { name: 'Safari', users: 2800 },
  { name: 'Firefox', users: 1200 },
  { name: 'Edge', users: 800 },
  { name: 'Other', users: 400 },
];

const topProducts = [
  { name: 'Premium Plan', sales: 245, revenue: 24355, growth: 12.5 },
  { name: 'Basic Plan', sales: 189, revenue: 5661, growth: -5.2 },
  { name: 'Enterprise', sales: 124, revenue: 37124, growth: 28.4 },
  { name: 'Pro Plan', sales: 98, revenue: 9702, growth: 8.1 },
  { name: 'Starter', sales: 76, revenue: 2274, growth: -12.3 },
];

export default function AnalyticsPage() {
  const [revenue, setRevenue] = useState<any[]>([]);
  const [userDistribution, setUserDistribution] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueData, userData] = await Promise.all([
          api.getRevenue(),
          api.getUserDistribution(),
        ]);
        setRevenue(revenueData);
        setUserDistribution(userData);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold">12,450</p>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+18.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold">875</p>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+12.5%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
                <ShoppingCart className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                <p className="text-2xl font-bold">$158.50</p>
                <div className="flex items-center gap-1 text-red-600 text-sm">
                  <ArrowDownRight className="h-4 w-4" />
                  <span>-3.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <p className="text-2xl font-bold">42.3%</p>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>-5.1%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                <Activity className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="visitors"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                    name="Visitors"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Revenue ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {deviceData.map((device) => (
                <div key={device.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: device.color }}
                  />
                  <span className="text-sm">
                    {device.name} ({device.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Browser Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={browserData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        product.growth > 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {product.growth > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{Math.abs(product.growth)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
