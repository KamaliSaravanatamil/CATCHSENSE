"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, BarChart3, Shield, MessageSquare, Globe, FileText, Waves, Fish } from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const router = useRouter()

  const handleNavigation = (tab: string) => {
    setActiveTab(tab)
    switch (tab) {
      case "camera":
        router.push("/camera")
        break
      case "analytics":
        router.push("/analytics")
        break
      case "reports":
        router.push("/reports")
        break
      case "settings":
        router.push("/compliance")
        break
      default:
        router.push("/")
    }
  }

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case "feedback":
        router.push("/feedback")
        break
      case "language":
        router.push("/language")
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        {/* Animated fish silhouettes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 opacity-10 swim-animation">
            <Fish className="w-8 h-8 text-primary" />
          </div>
          <div className="absolute top-40 opacity-10 swim-animation" style={{ animationDelay: "5s" }}>
            <Fish className="w-6 h-6 text-accent" />
          </div>
          <div className="absolute top-60 opacity-10 swim-animation" style={{ animationDelay: "10s" }}>
            <Fish className="w-10 h-10 text-secondary" />
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center mb-6 wave-animation">
            <Waves className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Aqua<span className="text-primary">Trace</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
            Monitor aquatic ecosystems and detect threats to marine life using AI and machine learning
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={() => router.push("/camera")}
            >
              Start Monitoring
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          {/* Ecosystem health indicator */}
          <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Current Ecosystem Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">87%</div>
              <p className="text-sm text-muted-foreground">Based on real-time monitoring data</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-balance">Comprehensive Marine Monitoring</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Camera Monitoring */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors float-animation">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Camera Monitoring</CardTitle>
              <CardDescription>
                AI-powered image analysis for water quality, species detection, and population tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Water Quality</Badge>
                <Badge variant="secondary">Species ID</Badge>
                <Badge variant="secondary">Population Count</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Dashboard */}
          <Card
            className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors float-animation"
            style={{ animationDelay: "1s" }}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Data Analytics</CardTitle>
              <CardDescription>Real-time ecosystem health scores, trends, and predictive insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Health Score</Badge>
                <Badge variant="secondary">Trends</Badge>
                <Badge variant="secondary">Predictions</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Compliance */}
          <Card
            className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors float-animation"
            style={{ animationDelay: "2s" }}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Compliance Check</CardTitle>
              <CardDescription>
                Automated comparison against endangered species lists and conservation guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Endangered Species</Badge>
                <Badge variant="secondary">Regulations</Badge>
                <Badge variant="secondary">Guidelines</Badge>
              </div>
            </CardContent>
          </Card>

          {/* User Feedback */}
          <Card
            className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors float-animation cursor-pointer"
            style={{ animationDelay: "3s" }}
            onClick={() => handleFeatureClick("feedback")}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Community Feedback</CardTitle>
              <CardDescription>
                Collaborative platform for researchers and communities to share observations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Observations</Badge>
                <Badge variant="secondary">Research</Badge>
                <Badge variant="secondary">Community</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Multilingual Support */}
          <Card
            className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors float-animation cursor-pointer"
            style={{ animationDelay: "4s" }}
            onClick={() => handleFeatureClick("language")}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Multilingual NLP</CardTitle>
              <CardDescription>Voice and text interaction in local languages for global accessibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Voice Input</Badge>
                <Badge variant="secondary">Text Analysis</Badge>
                <Badge variant="secondary">Local Languages</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Reports */}
          <Card
            className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors float-animation"
            style={{ animationDelay: "5s" }}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Smart Reports</CardTitle>
              <CardDescription>
                Auto-generated insights and eco-friendly recommendations for stakeholders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Insights</Badge>
                <Badge variant="secondary">Recommendations</Badge>
                <Badge variant="secondary">Policy</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            {[
              { id: "home", icon: Waves, label: "Home" },
              { id: "camera", icon: Camera, label: "Camera" },
              { id: "analytics", icon: BarChart3, label: "Analytics" },
              { id: "reports", icon: FileText, label: "Reports" },
              { id: "settings", icon: Shield, label: "Compliance" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  activeTab === id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}
