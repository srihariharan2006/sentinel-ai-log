import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Globe,
  Clock,
  Users,
  Database
} from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalScans: 15420,
    threatsBlocked: 342,
    successRate: 99.2,
    activeUsers: 1240
  };

  const recentThreats = [
    {
      id: 1,
      url: "phishing-bank-security.com",
      score: 0.94,
      timestamp: "2 minutes ago",
      status: "blocked"
    },
    {
      id: 2,
      url: "secure-paypal-verification.net",
      score: 0.89,
      timestamp: "5 minutes ago", 
      status: "blocked"
    },
    {
      id: 3,
      url: "microsoft-security-alert.org",
      score: 0.76,
      timestamp: "12 minutes ago",
      status: "blocked"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cyber">Security Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time phishing detection and threat monitoring
          </p>
        </div>
        <Button className="btn-cyber">
          <Shield className="h-4 w-4 mr-2" />
          Run System Scan
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 glass card-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Scans</p>
              <p className="text-2xl font-bold text-gradient-cyber">
                {stats.totalScans.toLocaleString()}
              </p>
            </div>
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2 text-xs text-threat-safe">
            <TrendingUp className="h-3 w-3 inline mr-1" />
            +12% from last week
          </div>
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Threats Blocked</p>
              <p className="text-2xl font-bold text-gradient-threat">
                {stats.threatsBlocked}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-threat-high" />
          </div>
          <div className="mt-2 text-xs text-threat-high">
            <AlertTriangle className="h-3 w-3 inline mr-1" />
            +5 in last hour
          </div>
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold text-gradient-safe">
                {stats.successRate}%
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-threat-safe" />
          </div>
          <Progress value={stats.successRate} className="mt-2 h-2" />
        </Card>

        <Card className="p-6 glass">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.activeUsers.toLocaleString()}
              </p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-2 text-xs text-primary">
            <Users className="h-3 w-3 inline mr-1" />
            Online now
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Threats */}
        <Card className="glass">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Threats Detected</h2>
              <Badge variant="outline" className="text-threat-high">
                Live
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentThreats.map((threat) => (
                <div key={threat.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/50">
                  <div className="flex-1">
                    <p className="font-mono text-sm text-foreground truncate">
                      {threat.url}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="threat-high text-xs">
                        {Math.round(threat.score * 100)}% Threat
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {threat.timestamp}
                      </span>
                    </div>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-threat-high ml-2" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* System Health */}
        <Card className="glass">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">System Health</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  AI Model Performance
                </span>
                <span className="text-sm text-threat-safe">98.7%</span>
              </div>
              <Progress value={98.7} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  API Response Time
                </span>
                <span className="text-sm text-threat-safe">67ms</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Blockchain Sync
                </span>
                <span className="text-sm text-threat-safe">Active</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;