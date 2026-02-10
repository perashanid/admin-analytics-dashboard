# Admin Analytics Dashboard

A responsive, production-ready Admin Analytics Dashboard built with Next.js, TypeScript, Tailwind CSS, and Recharts. This dashboard visualizes business data using interactive charts and reusable UI components.

<img width="1919" height="1000" alt="image" src="https://github.com/user-attachments/assets/9779b890-5080-4d0a-ba21-065a31713d51" />


## Features

### Dashboard Overview
- **4 KPI Cards** with real-time data and percentage change indicators:
  - Total Revenue: $54,230 (+12.5%)
  - Total Users: 1,245 (+8.2%)
  - Orders: 342 (-3.1%)
  - Conversion Rate: 4.3% (+1.2%)

### Interactive Charts
- **Revenue Over Time** (Line Chart) - Monthly data with tooltips
- **Orders Per Month** (Bar Chart) - Animated loading
- **User Distribution** (Pie Chart) - Free, Premium, Enterprise breakdown
- **Traffic Source** (Pie Chart) - Organic, Paid, Social, Referral breakdown

### Filters & Interactions
- Date range selector (Last 7 days, 30 days, 12 months)
- User type filter (All, Free, Premium, Enterprise)
- Real-time dashboard updates on filter changes

### UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme Toggle** - Persistent theme preference
- **Collapsible Sidebar** - Smooth animations and transitions
- **Skeleton Loading States** - Better perceived performance
- **Error & Empty States** - Graceful handling of edge cases
- **Hover Effects** - Micro-interactions throughout

### Performance
- Memoized components to prevent unnecessary re-renders
- Lazy loading of chart components
- Responsive container for charts
- Optimized bundle size

### Bonus Features
- **Export to CSV** - Download dashboard data
- **Notification System** - Visual notification indicator
- **User Profile Dropdown** - Quick access to settings

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- **Data Fetching**: [Axios](https://axios-http.com/) - HTTP client
- **Mock API**: [JSON Server](https://github.com/typicode/json-server) - Fake REST API
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/admin-analytics-dashboard.git
   cd admin-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start both:
   - Next.js app at `http://localhost:3000`
   - JSON Server (mock API) at `http://localhost:3001`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
admin-analytics-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Dashboard page
│   ├── components/
│   │   ├── charts/             # Chart components
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── OrdersChart.tsx
│   │   │   ├── UserDistributionChart.tsx
│   │   │   └── TrafficSourceChart.tsx
│   │   ├── filters/            # Filter components
│   │   │   └── DashboardFilters.tsx
│   │   ├── kpi/                # KPI card components
│   │   │   ├── KPICard.tsx
│   │   │   └── KPIGrid.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── providers/          # Context providers
│   │   │   ├── DashboardProvider.tsx
│   │   │   └── ThemeProvider.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Dropdown.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       └── Skeleton.tsx
│   ├── lib/                    # Utility functions
│   │   ├── api.ts              # API client
│   │   └── utils.ts            # Helper functions
│   ├── stores/                 # Zustand stores
│   │   ├── dashboardStore.ts   # Dashboard state
│   │   ├── sidebarStore.ts     # Sidebar state
│   │   └── themeStore.ts       # Theme state
│   └── types/                  # TypeScript types
│       └── index.ts
├── db.json                     # Mock database
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Architecture Decisions

### State Management
- **Zustand** was chosen for its simplicity and minimal boilerplate compared to Redux
- Separate stores for different concerns (dashboard, theme, sidebar)
- Persistent theme preference using `persist` middleware

### Component Architecture
- **Container/Presentational pattern** for separation of concerns
- **Memoization** using `React.memo` to prevent unnecessary re-renders
- **Compound components** for Card (Card, CardHeader, CardContent, etc.)

### Data Fetching
- **Axios** for HTTP requests with interceptors for error handling
- **JSON Server** for mock API with realistic delays (500ms)
- **Zustand** for server state management with loading/error states

### Styling
- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming support
- **Dark mode** using class-based approach

### Performance Optimizations
- Chart components are memoized
- Responsive containers prevent layout shifts
- Skeleton loading states improve perceived performance

## API Endpoints

The mock API provides the following endpoints:

| Endpoint | Description |
|----------|-------------|
| `GET /stats` | KPI statistics |
| `GET /revenue` | Revenue data (monthly) |
| `GET /orders` | Orders data (monthly) |
| `GET /users` | User distribution |
| `GET /traffic` | Traffic sources |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Next.js + JSON Server) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run server` | Start JSON Server only |

### Environment Variables
For production deployment, set:
```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```


