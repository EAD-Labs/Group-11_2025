import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../store/hooks";
import { Pencil, Copy, X } from "lucide-react";
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
import "./AffiliateDashboard.css";

type TimeFilter = "7days" | "30days" | "1year";

export default function AffiliateDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const [signupData, setSignupData] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("7days");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newReferralCode, setNewReferralCode] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const handleUpdateReferralCode = async () => {
    if (!newReferralCode.trim()) return;

    setIsUpdating(true);
    setUpdateError("");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/referral`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ referralCode: newReferralCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to update referral code");
      }

      setNewReferralCode("");
      // Refresh the page after 2 seconds to get updated user data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setUpdateError("Failed to update referral code. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredData = useMemo(() => {
    const now = new Date();

    const filterDate = new Date(now);
    // Set filter date based on selected range
    switch (timeFilter) {
      case "7days":
        filterDate.setDate(now.getDate() - 6); // -6 to include today
        break;
      case "30days":
        filterDate.setDate(now.getDate() - 29); // -29 to include today
        break;
      case "1year":
        filterDate.setMonth(now.getMonth() - 11); // Get last 12 months including current
        break;
    }

    // Filter signups within the date range
    const filteredSignups = signupData.filter((item) => {
      const itemDate = new Date(item);
      return itemDate >= filterDate && itemDate <= now;
    });

    if (timeFilter === "1year") {
      // For yearly view, group by month
      const monthlyData = new Map();

      // Initialize all months with zero
      let currentMonth = new Date(filterDate);
      while (currentMonth <= now) {
        const monthKey = currentMonth.toISOString().slice(0, 7); // YYYY-MM format
        monthlyData.set(monthKey, 0);
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }

      // Count signups per month
      filteredSignups.forEach((item) => {
        const monthKey = new Date(item).toISOString().slice(0, 7);
        monthlyData.set(monthKey, (monthlyData.get(monthKey) || 0) + 1);
      });

      // Convert to array format
      return Array.from(monthlyData.entries()).map(([date, count]) => ({
        date,
        count,
      }));
    } else {
      // For daily view (7 days or 30 days)
      const dataMap = new Map(
        filteredSignups.map((item) => [
          new Date(item).toISOString().split("T")[0],
          1,
        ])
      );

      // Generate array of all dates in range
      const dates: string[] = [];
      const currentDate = new Date(filterDate);

      while (currentDate <= now) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates.map((date) => ({
        date,
        count: dataMap.get(date) || 0,
      }));
    }
  }, [signupData, timeFilter]);

  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backendUrl}/referral/refferal-graph`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch affiliate data");
        }

        const data = await response.json();
        console.log(data.dates);
        setSignupData(data.dates.map((date: string) => new Date(date)));
      } catch (err) {
        setError("Failed to load affiliate data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliateData();
  }, []);

  if (isLoading) {
    return (
      <div className="affiliate-dashboard loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="affiliate-dashboard error">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="affiliate-dashboard">
      <div className="dashboard-header">
        <h1>Affiliate Dashboard</h1>
        <p>Track your affiliate program performance</p>
      </div>

      <div className="referral-code-section">
        <div className="current-code">
          <h3>Your Referral Code</h3>
          <div className="code-display">
            <span className="code">{user?.referralCode}</span>
            <div className="code-actions">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(user?.referralCode || "");
                  setShowCopySuccess(true);
                  setTimeout(() => setShowCopySuccess(false), 2000);
                }}
                className="icon-btn"
                title="Copy referral code"
              >
                {showCopySuccess ? "✓" : <Copy size={18} />}
              </button>
              <button
                onClick={() => setShowUpdateModal(true)}
                className="icon-btn"
                title="Update referral code"
              >
                <Pencil size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => {
                setShowUpdateModal(false);
                setNewReferralCode("");
                setUpdateError("");
              }}
            >
              <X size={20} />
            </button>
            <h2>Update Referral Code</h2>
            <div className="modal-content">
              <div className="input-group">
                <label htmlFor="newReferralCode">New Referral Code</label>
                <input
                  id="newReferralCode"
                  type="text"
                  value={newReferralCode}
                  onChange={(e) => setNewReferralCode(e.target.value)}
                  placeholder="Enter new referral code"
                  className="code-input"
                  disabled={isUpdating}
                />
              </div>
              {updateError && <p className="error-message">{updateError}</p>}
              <div className="modal-actions">
                <button
                  onClick={() => {
                    setShowUpdateModal(false);
                    setNewReferralCode("");
                    setUpdateError("");
                  }}
                  className="cancel-btn"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateReferralCode}
                  className="update-btn"
                  disabled={isUpdating || !newReferralCode.trim()}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Signups</h3>
          <p className="stat-value">
            {filteredData.reduce((sum, day) => sum + day.count, 0)}
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
                  if (timeFilter === "1year") {
                    const [year, month] = date.split("-");
                    const d = new Date(parseInt(year), parseInt(month) - 1);
                    return d.toLocaleDateString(undefined, {
                      month: "short",
                      year: "2-digit",
                    });
                  } else {
                    return new Date(date).toLocaleDateString();
                  }
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
                name="Affiliate Signups"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
