import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Calendar,
  AlertTriangle, 
  CheckCircle, 
  Shield,
  ExternalLink,
  Download,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");

  // Mock historical data
  const detectionHistory = [
    {
      id: 1,
      url: "secure-bank-verification.net",
      riskScore: 0.94,
      riskLevel: "HIGH",
      timestamp: "2024-01-15 14:30:22",
      source: "Extension",
      blocked: true
    },
    {
      id: 2,
      url: "paypal-security-check.org",
      riskScore: 0.89,
      riskLevel: "HIGH", 
      timestamp: "2024-01-15 14:25:15",
      source: "Manual Scan",
      blocked: true
    },
    {
      id: 3,
      url: "microsoft-updates.com",
      riskScore: 0.12,
      riskLevel: "LOW",
      timestamp: "2024-01-15 14:20:08",
      source: "Extension",
      blocked: false
    },
    {
      id: 4,
      url: "amazon-prime-renewal.info",
      riskScore: 0.76,
      riskLevel: "HIGH",
      timestamp: "2024-01-15 14:15:45",
      source: "API Call",
      blocked: true
    },
    {
      id: 5,
      url: "github.com",
      riskScore: 0.03,
      riskLevel: "LOW",
      timestamp: "2024-01-15 14:10:33",
      source: "Extension",
      blocked: false
    },
    {
      id: 6,
      url: "suspicious-login-verify.net",
      riskScore: 0.87,
      riskLevel: "HIGH",
      timestamp: "2024-01-15 14:05:12",
      source: "Manual Scan",
      blocked: true
    },
    {
      id: 7,
      url: "stackoverflow.com",
      riskScore: 0.08,
      riskLevel: "LOW",
      timestamp: "2024-01-15 14:00:01",
      source: "Extension",
      blocked: false
    },
    {
      id: 8,
      url: "crypto-wallet-security.org",
      riskScore: 0.92,
      riskLevel: "HIGH",
      timestamp: "2024-01-15 13:55:47",
      source: "API Call",
      blocked: true
    }
  ];

  const filteredHistory = detectionHistory.filter(item => {
    const matchesSearch = item.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === "all" || item.riskLevel.toLowerCase() === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "HIGH":
        return <AlertTriangle className="h-4 w-4 text-threat-high" />;
      case "MEDIUM":
        return <Shield className="h-4 w-4 text-threat-medium" />;
      case "LOW":
        return <CheckCircle className="h-4 w-4 text-threat-safe" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getRiskBadge = (riskLevel: string, score: number) => {
    const percentage = Math.round(score * 100);
    switch (riskLevel) {
      case "HIGH":
        return <Badge className="threat-high">{percentage}% Risk</Badge>;
      case "MEDIUM":
        return <Badge className="bg-threat-medium">{percentage}% Risk</Badge>;
      case "LOW":
        return <Badge className="threat-safe">{percentage}% Safe</Badge>;
      default:
        return <Badge variant="outline">{percentage}%</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-cyber">Detection History</h1>
          <p className="text-muted-foreground mt-1">
            Complete log of phishing detection events and analysis results
          </p>
        </div>
        <Button variant="outline" className="glass">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card className="glass p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="w-full sm:w-48 bg-background/50">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="glass">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 glass text-center">
          <p className="text-2xl font-bold text-foreground">{detectionHistory.length}</p>
          <p className="text-sm text-muted-foreground">Total Scans</p>
        </Card>
        <Card className="p-4 glass text-center">
          <p className="text-2xl font-bold text-gradient-threat">
            {detectionHistory.filter(item => item.blocked).length}
          </p>
          <p className="text-sm text-muted-foreground">Threats Blocked</p>
        </Card>
        <Card className="p-4 glass text-center">
          <p className="text-2xl font-bold text-gradient-safe">
            {detectionHistory.filter(item => !item.blocked).length}
          </p>
          <p className="text-sm text-muted-foreground">Safe URLs</p>
        </Card>
        <Card className="p-4 glass text-center">
          <p className="text-2xl font-bold text-gradient-cyber">
            {Math.round((detectionHistory.filter(item => item.blocked).length / detectionHistory.length) * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">Detection Rate</p>
        </Card>
      </div>

      {/* History Table */}
      <Card className="glass">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Recent Detections</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {filteredHistory.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 border-b border-border/50 hover:bg-accent/30 transition-colors ${
                  index === filteredHistory.length - 1 ? "border-b-0" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      {getRiskIcon(item.riskLevel)}
                      <span className="font-mono text-sm truncate max-w-xs lg:max-w-md">
                        {item.url}
                      </span>
                    </div>
                    {getRiskBadge(item.riskLevel, item.riskScore)}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm text-muted-foreground hidden md:block">
                      <p className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.timestamp}
                      </p>
                      <p className="text-xs">{item.source}</p>
                    </div>
                    
                    <Badge variant={item.blocked ? "destructive" : "outline"}>
                      {item.blocked ? "Blocked" : "Allowed"}
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Search className="h-4 w-4 mr-2" />
                          Re-scan URL
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Mobile timestamp */}
                <div className="mt-2 text-xs text-muted-foreground md:hidden">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.timestamp} • {item.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {filteredHistory.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No detection history found for the selected filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default History;