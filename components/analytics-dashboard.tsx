"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Droplets,
  Fish,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface EcosystemData {
  timestamp: string
  healthScore: number
  waterQuality: number
  speciesCount: number
  temperature: number
  ph: number
  oxygenLevel: number
}

interface SpeciesData {
  name: string
  count: number
  trend: "up" | "down" | "stable"
  endangered: boolean
}

interface ThreatData {
  name: string
  severity: "low" | "medium" | "high"
  value: number
}

export default function AnalyticsDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Mock data - in real app, this would come from API
  const [ecosystemData] = useState<EcosystemData[]>([
    {
      timestamp: "00:00",
      healthScore: 82,
      waterQuality: 78,
      speciesCount: 45,
      temperature: 24.5,
      ph: 7.2,
      oxygenLevel: 85,
    },
    {
      timestamp: "04:00",
      healthScore: 85,
      waterQuality: 80,
      speciesCount: 48,
      temperature: 24.2,
      ph: 7.3,
      oxygenLevel: 87,
    },
    {
      timestamp: "08:00",
      healthScore: 87,
      waterQuality: 82,
      speciesCount: 52,
      temperature: 25.1,
      ph: 7.1,
      oxygenLevel: 89,
    },
    {
      timestamp: "12:00",
      healthScore: 89,
      waterQuality: 85,
      speciesCount: 55,
      temperature: 25.8,
      ph: 7.0,
      oxygenLevel: 91,
    },
    {
      timestamp: "16:00",
      healthScore: 86,
      waterQuality: 83,
      speciesCount: 53,
      temperature: 26.2,
      ph: 6.9,
      oxygenLevel: 88,
    },
    {
      timestamp: "20:00",
      healthScore: 84,
      waterQuality: 81,
      speciesCount: 50,
      temperature: 25.5,
      ph: 7.1,
      oxygenLevel: 86,
    },
  ])

  const [speciesData] = useState<SpeciesData[]>([
    { name: "Clownfish", count: 23, trend: "up", endangered: false },
    { name: "Sea Turtle", count: 3, trend: "stable", endangered: true },
    { name: "Coral Polyps", count: 1250, trend: "down", endangered: false },
    { name: "Parrotfish", count: 18, trend: "up", endangered: false },
    { name: "Reef Shark", count: 2, trend: "stable", endangered: true },
  ])

  const [threatData] = useState<ThreatData[]>([
    { name: "Plastic Debris", severity: "medium", value: 35 },
    { name: "Temperature Rise", severity: "high", value: 68 },
    { name: "pH Imbalance", severity: "low", value: 15 },
    { name: "Overfishing", severity: "medium", value: 42 },
  ])

  const currentHealth = ecosystemData[ecosystemData.length - 1]?.healthScore || 87
  const healthTrend =
    ecosystemData.length > 1
      ? ecosystemData[ecosystemData.length - 1].healthScore - ecosystemData[ecosystemData.length - 2].healthScore
      : 0

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-orange-600 bg-orange-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <Button onClick={refreshData} disabled={isLoading} variant="outline" size="sm">
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Ecosystem Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{currentHealth}%</div>
            <div className="flex items-center gap-1 text-sm">
              {healthTrend > 0 ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : healthTrend < 0 ? (
                <TrendingDown className="w-3 h-3 text-red-500" />
              ) : (
                <Activity className="w-3 h-3 text-gray-500" />
              )}
              <span className={healthTrend > 0 ? "text-green-600" : healthTrend < 0 ? "text-red-600" : "text-gray-600"}>
                {healthTrend > 0 ? "+" : ""}
                {healthTrend}% from last reading
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              Water Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {currentHealth ? ecosystemData[ecosystemData.length - 1].waterQuality : 81}%
            </div>
            <Progress
              value={currentHealth ? ecosystemData[ecosystemData.length - 1].waterQuality : 81}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Fish className="w-4 h-4 text-green-500" />
              Species Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {currentHealth ? ecosystemData[ecosystemData.length - 1].speciesCount : 50}
            </div>
            <p className="text-sm text-muted-foreground">Active species detected</p>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {currentHealth ? ecosystemData[ecosystemData.length - 1].temperature : 25.5}°C
            </div>
            <p className="text-sm text-muted-foreground">Current water temp</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="species">Species</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Ecosystem Health Trends</CardTitle>
              <CardDescription>24-hour monitoring data</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={ecosystemData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="healthScore"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Water Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={ecosystemData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="waterQuality" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                    <Line type="monotone" dataKey="oxygenLevel" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Environmental Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={ecosystemData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="temperature" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="species" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Species Population Tracking</CardTitle>
              <CardDescription>Current species counts and trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {speciesData.map((species, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Fish className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{species.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Count: {species.count}</span>
                        {species.endangered && (
                          <Badge variant="destructive" className="text-xs">
                            Endangered
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(species.trend)}
                    <span className="text-sm font-medium">{species.trend}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Threat Assessment</CardTitle>
              <CardDescription>Current environmental threats and risk levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {threatData.map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">{threat.name}</p>
                      <Progress value={threat.value} className="w-32 mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(threat.severity)}>{threat.severity.toUpperCase()}</Badge>
                    <span className="text-sm font-medium">{threat.value}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={threatData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="hsl(var(--primary))"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {threatData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Immediate Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border border-red-200">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">High Priority</p>
                    <p className="text-sm text-red-700">Monitor temperature rise - implement cooling measures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-lg border border-orange-200">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-800">Medium Priority</p>
                    <p className="text-sm text-orange-700">Increase debris removal efforts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50/50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">On Track</p>
                    <p className="text-sm text-green-700">pH levels within acceptable range</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
