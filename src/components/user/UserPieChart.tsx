'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

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
import { useQueryCall } from '@ic-reactor/react';
import { User } from '@/declarations/backend/backend.did';

// Updated chart data for Verified and Unverified users

const chartConfig = {
  verified: {
    label: 'Verified Users',
    color: 'hsl(var(--chart-1))',
  },
  unverified: {
    label: 'Unverified Users',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const UserPieChart: React.FC = () => {
  const { data, loading } = useQueryCall({
    functionName: 'getAllUser',
  });

  const allUsers = data as [string, User][];
  const coutUnverified = (): number => {
    let count = 0;
    allUsers?.map(([id, user]) => {
      if (!user.isVerified) {
        count++;
      }
    });

    return count;
  };
  const unverifiedUsers = coutUnverified();

  const chartData = [
    {
      status: 'verified',
      visitors: allUsers?.length - unverifiedUsers,
      fill: '#22c55e',
    },
    { status: 'unverified', visitors: unverifiedUsers, fill: '#bbf7d0' },
  ];

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>Verified vs Unverified Users</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing data for Verified and Unverified users.
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserPieChart;
