'use client';

import { Bell, Menu, Moon, Sun, User, LogOut, Settings, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useThemeStore } from '@/stores/themeStore';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { useDashboardStore } from '@/stores/dashboardStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();
  const { toggleMobile } = useSidebarStore();
  const { theme, toggleTheme } = useThemeStore();
  const { isLoading } = useDashboardStore();

  const handleLogout = () => {
    // Clear any auth tokens/session data here
    // For now, just redirect to login
    router.push('/login');
  };

  const handleExport = () => {
    // Simulate CSV export
    const data = [
      ['Metric', 'Value', 'Change'],
      ['Total Revenue', '$54,230', '+12.5%'],
      ['Total Users', '1,245', '+8.2%'],
      ['Orders', '342', '-3.1%'],
      ['Conversion Rate', '4.3%', '+1.2%'],
    ];

    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={toggleMobile}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Page Title - Mobile Only */}
      <h1 className="text-lg font-semibold lg:hidden">Dashboard</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {/* Export Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExport}
          disabled={isLoading}
          className="hidden sm:flex"
        >
          <Download className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Dropdown
          trigger={
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                3
              </span>
            </Button>
          }
          align="right"
        >
          <div className="w-80">
            <div className="border-b px-3 py-2">
              <p className="font-semibold">Notifications</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-b px-3 py-2 last:border-0 hover:bg-muted cursor-pointer"
                >
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-muted-foreground">
                    Order #{1000 + i} - $299.00
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {i} hour{i > 1 ? 's' : ''} ago
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t px-3 py-2">
              <Link href="/orders">
                <Button variant="ghost" className="w-full text-xs">
                  View all notifications
                </Button>
              </Link>
            </div>
          </div>
        </Dropdown>

        {/* User Profile */}
        <Dropdown
          trigger={
            <Button
              variant="ghost"
              className="relative flex items-center gap-2 pl-2 pr-3"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">JD</span>
              </div>
              <span className="hidden text-sm font-medium sm:inline-block">
                John Doe
              </span>
            </Button>
          }
          align="right"
        >
          <div className="w-56">
            <div className="border-b px-3 py-2">
              <p className="font-semibold">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <div className="py-1">
              <Link href="/profile">
                <DropdownItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownItem>
              </Link>
              <Link href="/settings">
                <DropdownItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownItem>
              </Link>
            </div>
            <div className="border-t py-1">
              <DropdownItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownItem>
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
