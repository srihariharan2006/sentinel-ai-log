import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Globe,
  Scan,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Scanner = () => {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const simulateAnalysis = async () => {
    setIsScanning(true);
    setResults(null);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock results based on URL content
    const suspiciousKeywords = ['secure', 'verify', 'urgent', 'suspended', 'click', 'bank', 'paypal'];
    const hasSuspiciousKeywords = suspiciousKeywords.some(keyword => 
      url.toLowerCase().includes(keyword) || content.toLowerCase().includes(keyword)
    );
    
    const score = hasSuspiciousKeywords ? Math.random() * 0.4 + 0.6 : Math.random() * 0.3;
    
    const mockResults = {
      url,
      score,
      confidence: 0.92,
      riskLevel: score > 0.7 ? 'HIGH' : score > 0.4 ? 'MEDIUM' : 'LOW',
      timestamp: new Date().toISOString(),
      features: {
        domainAge: score > 0.7 ? '< 30 days' : '2+ years',
        sslCertificate: score > 0.5 ? 'Invalid/Missing' : 'Valid',
        contentAnalysis: hasSuspiciousKeywords ? 'Suspicious patterns detected' : 'Clean content',
        reputationScore: Math.round((1 - score) * 100)
      },
      explanation: score > 0.7 
        ? "High probability phishing attempt detected. Contains multiple suspicious indicators including urgency language and credential harvesting patterns."
        : score > 0.4
        ? "Moderate risk detected. Some suspicious elements found but not conclusive."
        : "Low risk. No significant phishing indicators detected."
    };
    
    setResults(mockResults);
    setIsScanning(false);
    
    // Show toast notification
    if (score > 0.7) {
      toast({
        title: "⚠️ High Risk Detected",
        description: "This URL shows strong phishing indicators",
        variant: "destructive"
      });
    } else if (score > 0.4) {
      toast({
        title: "⚠️ Moderate Risk",
        description: "Proceed with caution",
      });
    } else {
      toast({
        title: "✅ Safe",
        description: "No significant threats detected",
      });
    }
  };

  const copyResults = () => {
    if (results) {
      const resultText = `
PhishGuard AI Analysis Results
URL: ${results.url}
Risk Score: ${Math.round(results.score * 100)}%
Risk Level: ${results.riskLevel}
Confidence: ${Math.round(results.confidence * 100)}%
Analysis: ${results.explanation}
      `.trim();
      
      navigator.clipboard.writeText(resultText);
      toast({
        title: "Copied!",
        description: "Results copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gradient-cyber mb-2">URL Scanner</h1>
        <p className="text-muted-foreground">
          Analyze URLs and content for phishing threats using AI-powered detection
        </p>
      </div>

      {/* Scanner Interface */}
      <Card className="glass p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              URL to Analyze
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Page Content (Optional)
            </label>
            <Textarea
              placeholder="Paste suspicious email content or webpage text here for enhanced analysis..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] bg-background/50"
            />
          </div>

          <Button 
            onClick={simulateAnalysis}
            disabled={!url || isScanning}
            className="w-full btn-cyber"
          >
            {isScanning ? (
              <>
                <Scan className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Analyze URL
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="glass p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Analyzing threat indicators...</span>
              <Badge variant="outline" className="animate-pulse">
                Processing
              </Badge>
            </div>
            <Progress value={85} className="h-2" />
            <div className="text-xs text-muted-foreground space-y-1">
              <p>✅ Domain reputation check</p>
              <p>✅ Content pattern analysis</p>
              <p>🔄 AI model inference</p>
              <p>⏳ Generating risk assessment</p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {results && (
        <Card className="glass">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Analysis Results</h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={copyResults}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Badge 
                  className={
                    results.riskLevel === 'HIGH' ? 'threat-high' : 
                    results.riskLevel === 'MEDIUM' ? 'bg-threat-medium' :
                    'threat-safe'
                  }
                >
                  {results.riskLevel} RISK
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Overall Score */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center bg-accent/30">
                <div className="flex items-center justify-center mb-2">
                  {results.riskLevel === 'HIGH' ? (
                    <AlertTriangle className="h-8 w-8 text-threat-high" />
                  ) : results.riskLevel === 'MEDIUM' ? (
                    <Shield className="h-8 w-8 text-threat-medium" />
                  ) : (
                    <CheckCircle className="h-8 w-8 text-threat-safe" />
                  )}
                </div>
                <p className="text-2xl font-bold">
                  {Math.round(results.score * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Threat Score</p>
              </Card>
              
              <Card className="p-4 text-center bg-accent/30">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <p className="text-2xl font-bold">
                  {Math.round(results.confidence * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Confidence</p>
              </Card>
              
              <Card className="p-4 text-center bg-accent/30">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <p className="text-2xl font-bold">87ms</p>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <div>
              <h3 className="font-semibold mb-3">Detailed Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(results.features).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 bg-accent/30 rounded-lg">
                    <span className="capitalize text-sm text-muted-foreground">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <span className="text-sm font-medium">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 bg-accent/30 rounded-lg">
              <h3 className="font-semibold mb-2">AI Explanation</h3>
              <p className="text-sm text-muted-foreground">{results.explanation}</p>
            </div>

            {/* URL Display */}
            <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg font-mono text-sm">
              <span className="truncate">{results.url}</span>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Scanner;