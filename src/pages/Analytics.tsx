import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar,
  Download,
  RefreshCw,
  Globe,
  Shield,
  AlertTriangle
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Legend
} from "recharts";

const Analytics = () => {
  // Mock data for charts
  const threatTrends = [
    { date: "Jan 10", threats: 12, scans: 145 },
    { date: "Jan 11", threats: 8, scans: 178 },
    { date: "Jan 12", threats: 15, scans: 203 },
    { date: "Jan 13", threats: 23, scans: 189 },
    { date: "Jan 14", threats: 18, scans: 167 },
    { date: "Jan 15", threats: 29, scans: 234 },
    { date: "Jan 16", threats: 21, scans: 198 }
  ];

  const riskDistribution = [
    { name: "High Risk", value: 342, color: "hsl(var(--threat-high))" },
    { name: "Medium Risk", value: 123, color: "hsl(var(--threat-medium))" },
    { name: "Low Risk", value: 2145, color: "hsl(var(--threat-low))" },
    { name: "Safe", value: 12890, color: "hsl(var(--threat-safe))" }
  ];

  const detectionMethods = [
    { method: "URL Analysis", detections: 245 },
    { method: "Content Scanning", detections: 189 },
    { method: "Domain Reputation", detections: 156 },
    { method: "AI Pattern Match", detections: 98 },
    { method: "Blacklist Match", detections: 67 }
  ];

  const topThreats = [
    { domain: "secure-bank-login.net", count: 45, lastSeen: "2 hours ago" },
    { domain: "paypal-verification.org", count: 38, lastSeen: "4 hours ago" },
    { domain: "microsoft-security.info", count: 32, lastSeen: "1 hour ago" },
    { domain: "amazon-renewal.net", count: 28, lastSeen: "3 hours ago" },
    { domain: "crypto-wallet-secure.com", count: 24, lastSeen: "6 hours ago" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cyber">Security Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive threat intelligence and detection metrics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="glass">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" className="glass">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 glass">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Detection Rate</p>
              <p className="text-2xl font-bold text-gradient-cyber">94.7%</p>
            </div>
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2 text-xs text-threat-safe flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +2.3% this week
          </div>
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="text-2xl font-bold text-foreground">67ms</p>
            </div>
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2 text-xs text-threat-safe flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            15ms faster
          </div>
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">False Positives</p>
              <p className="text-2xl font-bold text-gradient-safe">0.3%</p>
            </div>
            <PieChart className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2 text-xs text-threat-safe flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            -0.1% improvement
          </div>
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Unique Threats</p>
              <p className="text-2xl font-bold text-gradient-threat">1,247</p>
            </div>
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2 text-xs text-threat-high flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            +156 new today
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Trends */}
        <Card className="glass">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Threat Detection Trends</h2>
              <Badge variant="outline" className="text-primary">
                7 Days
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={threatTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="hsl(var(--threat-high))" 
                  strokeWidth={3}
                  name="Threats Detected"
                />
                <Line 
                  type="monotone" 
                  dataKey="scans" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Total Scans"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Risk Distribution */}
        <Card className="glass">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Risk Level Distribution</h2>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <RechartsPieChart
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Detection Methods & Top Threats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Methods */}
        <Card className="glass">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Detection Methods Performance</h2>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={detectionMethods} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  dataKey="method" 
                  type="category" 
                  stroke="hsl(var(--muted-foreground))"
                  width={120}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="detections" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Threats */}
        <Card className="glass">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Most Active Threat Domains</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topThreats.map((threat, index) => (
                <div key={threat.domain} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-threat-high/20 rounded-full">
                      <span className="text-sm font-bold text-threat-high">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-mono text-sm text-foreground">{threat.domain}</p>
                      <p className="text-xs text-muted-foreground">
                        Last seen: {threat.lastSeen}
                      </p>
                    </div>
                  </div>
                  <Badge className="threat-high">
                    {threat.count} detections
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;