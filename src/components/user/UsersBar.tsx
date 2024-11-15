'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { User } from '@/declarations/backend/backend.did';
import { useQueryCall } from '@ic-reactor/react';

// Function to process users and get the count per month
const getMonthlyUserCounts = (
  users: [string, User][],
): { month: string; users: number }[] => {
  const counts: { [month: string]: number } = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  users.forEach(([id, user]) => {
    const date = new Date(user.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    counts[month] = (counts[month] || 0) + 1;
  });

  return Object.entries(counts).map(([month, count]) => ({
    month,
    users: count,
  }));
};

const UserBar: React.FC = () => {
  const { data, loading } = useQueryCall({
    functionName: 'getAllUser',
  });

  if (loading) return <div>Loading...</div>;

  const chartData = data ? getMonthlyUserCounts(data as [string, User][]) : [];

  const chartConfig: ChartConfig = {
    users: {
      label: 'Users',
      color: '#22c55e',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly User Registrations</CardTitle>
        <CardDescription>Monthly new user count for 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="users" fill="var(--color-users)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total new users for each month in 2024
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserBar;
