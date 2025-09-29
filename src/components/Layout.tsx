import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Shield, 
  Search, 
  History, 
  BarChart3, 
  Bell,
  Settings,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Layout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: Shield, current: location.pathname === "/" },
    { name: "URL Scanner", href: "/scanner", icon: Search, current: location.pathname === "/scanner" },
    { name: "Detection History", href: "/history", icon: History, current: location.pathname === "/history" },
    { name: "Analytics", href: "/analytics", icon: BarChart3, current: location.pathname === "/analytics" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
              <h1 className="text-xl font-bold text-gradient-cyber">
                PhishGuard AI
              </h1>
            </div>
            <Badge variant="outline" className="glass text-primary">
              v2.1.0
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-threat-high text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 z-40 w-64 transition-transform duration-300 ease-in-out`}>
          <Card className="h-full rounded-none border-r glass">
            <nav className="p-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                      item.current
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className={`h-5 w-5 ${item.current ? "animate-pulse-glow" : ""}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            {/* Status Panel */}
            <div className="absolute bottom-6 left-6 right-6">
              <Card className="p-4 glass">
                <div className="text-sm">
                  <p className="text-muted-foreground mb-2">System Status</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-threat-safe rounded-full animate-pulse"></div>
                    <span className="text-xs">All systems operational</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};