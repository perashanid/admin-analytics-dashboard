'use client';

import React, { useState } from "react";
import { DashboardFilters } from "@/components/filters/DashboardFilters";
import { KPIGrid } from "@/components/kpi/KPIGrid";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { OrdersChart } from "@/components/charts/OrdersChart";
import { UserDistributionChart } from "@/components/charts/UserDistributionChart";
import { TrafficSourceChart } from "@/components/charts/TrafficSourceChart";
import { ErrorState } from "@/components/ui/ErrorState";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useEffect } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Activity, TrendingUp, Users, ShoppingCart } from "lucide-react";

export default function Home() {
  const { error, resetError, fetchDashboardData } = useDashboardStore();
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await api.getActivities();
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="space-y-6">
      {error ? (
        <ErrorState
          message={error}
          onRetry={() => {
            resetError();
            fetchDashboardData();
          }}
        />
      ) : (
        <>
          <DashboardFilters />
          
          {/* KPI Section */}
          <KPIGrid />
          
          {/* Charts Section - Row 1 */}
          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueChart />
            <OrdersChart />
          </div>
          
          {/* Charts Section - Row 2 */}
          <div className="grid gap-6 lg:grid-cols-2">
            <UserDistributionChart />
            <TrafficSourceChart />
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.type === "order"
                          ? "bg-emerald-100 text-emerald-600"
                          : activity.type === "user"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {activity.type === "order" ? (
                        <ShoppingCart className="h-5 w-5" />
                      ) : activity.type === "user" ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        <TrendingUp className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      {activity.amount && (
                        <p className="text-sm text-emerald-600 font-medium">
                          +${activity.amount.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
