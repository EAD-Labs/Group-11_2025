import { useEffect, useState, useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import "./ReferralDashboard.css";

interface DailySignup {
  date: string;
  count: number;
}

type TimeFilter = "7days" | "30days" | "1year";

export default function ReferralDashboard() {
  const [signupData, setSignupData] = useState<DailySignup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("30days");

  const filteredData = useMemo(() => {
    const now = new Date();
    const filterDate = new Date();

    // Set filter date based on selected range
    switch (timeFilter) {
      case "7days":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "30days":
        filterDate.setDate(now.getDate() - 30);
        break;
      case "1year":
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    // Create a map of existing data
    const dataMap = new Map(
      signupData
        .filter((item) => new Date(item.date) >= filterDate)
        .map((item) => [item.date, item.count])
    );

    // Generate array of all dates in range
    const dates: string[] = [];
    const currentDate = new Date(filterDate);
    currentDate.setHours(0, 0, 0, 0);

    while (currentDate <= now) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Create final data array with zeros for missing dates
    return dates.map((date) => ({
      date,
      count: dataMap.get(date) || 0,
    }));
  }, [signupData, timeFilter]);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backendUrl}/referral/refferal-graph`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch referral data");
        }

        const data = await response.json();
        setSignupData(data.signupData);
      } catch (err) {
        setError("Failed to load referral data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  if (isLoading) {
    return (
      <div className="referral-dashboard loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="referral-dashboard error">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="referral-dashboard">
      <div className="dashboard-header">
        <h1>Referral Dashboard</h1>
        <p>Track your referral program performance</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Signups</h3>
          <p className="stat-value">
            {filteredData.reduce((sum, day) => sum + day.count, 0)}
          </p>
        </div>
        <div className="stat-card">
          <h3>Active Days</h3>
          <p className="stat-value">
            {filteredData.filter((day) => day.count > 0).length}
          </p>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h2>Signups Over Time</h2>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
            className="time-filter"
          >
            <option value="7days">Past 7 Days</option>
            <option value="30days">Past 30 Days</option>
            <option value="1year">Past Year</option>
          </select>
        </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--muted-foreground) / 0.2)"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return timeFilter === "1year"
                    ? d.toLocaleDateString(undefined, { month: "short" })
                    : d.toLocaleDateString();
                }}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                allowDecimals={false}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value: number) => [value, "Signups"]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorCount)"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                name="Referral Signups"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
