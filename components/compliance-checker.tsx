"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Scale,
  Fish,
  MapPin,
  Calendar,
  RefreshCw,
} from "lucide-react"

interface ComplianceRule {
  id: string
  category: "endangered" | "fishing" | "conservation" | "pollution"
  title: string
  description: string
  status: "compliant" | "violation" | "warning" | "unknown"
  severity: "low" | "medium" | "high" | "critical"
  details: string
  regulation: string
  lastChecked: Date
}

interface SpeciesCompliance {
  species: string
  status: "protected" | "regulated" | "unrestricted" | "endangered"
  regulations: string[]
  restrictions: string[]
  permits_required: boolean
}

export default function ComplianceChecker() {
  const [isChecking, setIsChecking] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Mock compliance data
  const [complianceRules] = useState<ComplianceRule[]>([
    {
      id: "1",
      category: "endangered",
      title: "Sea Turtle Protection",
      description: "Green Sea Turtle detected - protected under ESA",
      status: "warning",
      severity: "high",
      details: "1 Green Sea Turtle observed. Ensure no disturbance to nesting areas.",
      regulation: "Endangered Species Act (ESA) Section 9",
      lastChecked: new Date(),
    },
    {
      id: "2",
      category: "fishing",
      title: "Fishing Season Compliance",
      description: "Current fishing activities within seasonal restrictions",
      status: "compliant",
      severity: "low",
      details: "No restricted fishing activities detected during monitoring period.",
      regulation: "Marine Protected Areas Act",
      lastChecked: new Date(),
    },
    {
      id: "3",
      category: "conservation",
      title: "Coral Reef Protection",
      description: "Coral bleaching indicators detected",
      status: "violation",
      severity: "critical",
      details: "15% coral bleaching observed. Immediate conservation measures required.",
      regulation: "Coral Reef Conservation Act",
      lastChecked: new Date(),
    },
    {
      id: "4",
      category: "pollution",
      title: "Water Quality Standards",
      description: "Pollution levels within acceptable limits",
      status: "compliant",
      severity: "low",
      details: "All water quality parameters meet EPA standards.",
      regulation: "Clean Water Act Section 303",
      lastChecked: new Date(),
    },
  ])

  const [speciesCompliance] = useState<SpeciesCompliance[]>([
    {
      species: "Green Sea Turtle",
      status: "endangered",
      regulations: ["ESA", "CITES Appendix I", "Marine Mammal Protection Act"],
      restrictions: ["No harassment", "No collection", "Maintain 50ft distance"],
      permits_required: true,
    },
    {
      species: "Reef Shark",
      status: "protected",
      regulations: ["Shark Conservation Act", "Regional Fisheries Management"],
      restrictions: ["No fishing", "No feeding", "Report sightings"],
      permits_required: false,
    },
    {
      species: "Clownfish",
      status: "regulated",
      regulations: ["Aquarium Trade Regulations"],
      restrictions: ["Collection permits required", "Size limits apply"],
      permits_required: true,
    },
    {
      species: "Parrotfish",
      status: "unrestricted",
      regulations: ["General Fishing Regulations"],
      restrictions: ["Seasonal restrictions may apply"],
      permits_required: false,
    },
  ])

  const runComplianceCheck = async () => {
    setIsChecking(true)
    // Simulate compliance checking process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastUpdate(new Date())
    setIsChecking(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "violation":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      default:
        return <Shield className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "text-green-700 bg-green-100 border-green-200"
      case "violation":
        return "text-red-700 bg-red-100 border-red-200"
      case "warning":
        return "text-orange-700 bg-orange-100 border-orange-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSpeciesStatusColor = (status: string) => {
    switch (status) {
      case "endangered":
        return "destructive"
      case "protected":
        return "secondary"
      case "regulated":
        return "outline"
      case "unrestricted":
        return "default"
      default:
        return "secondary"
    }
  }

  const complianceScore = Math.round(
    (complianceRules.filter((rule) => rule.status === "compliant").length / complianceRules.length) * 100,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Regulatory Compliance</h2>
          <p className="text-muted-foreground">Last checked: {lastUpdate.toLocaleString()}</p>
        </div>
        <Button onClick={runComplianceCheck} disabled={isChecking} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
          {isChecking ? "Checking..." : "Run Check"}
        </Button>
      </div>

      {/* Compliance Score */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Overall Compliance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-primary">{complianceScore}%</div>
            <div className="flex-1">
              <Progress value={complianceScore} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">
                {complianceRules.filter((rule) => rule.status === "compliant").length} of {complianceRules.length}{" "}
                regulations compliant
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="species">Species Status</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Critical Alerts */}
          {complianceRules.filter((rule) => rule.severity === "critical" || rule.status === "violation").length > 0 && (
            <Alert className="border-red-200 bg-red-50/50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <p className="font-medium text-red-800 mb-2">Critical Compliance Issues Detected</p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  {complianceRules
                    .filter((rule) => rule.severity === "critical" || rule.status === "violation")
                    .map((rule) => (
                      <li key={rule.id} className="text-sm">
                        {rule.title}: {rule.description}
                      </li>
                    ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Compliance Rules */}
          <div className="space-y-3">
            {complianceRules.map((rule) => (
              <Card key={rule.id} className={`bg-card/80 backdrop-blur-sm border ${getStatusColor(rule.status)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(rule.status)}
                      <div>
                        <CardTitle className="text-lg">{rule.title}</CardTitle>
                        <CardDescription>{rule.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(rule.severity)}`}></div>
                      <Badge variant="outline" className="text-xs">
                        {rule.category.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-sm">{rule.details}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Scale className="w-3 h-3" />
                      <span>{rule.regulation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="species" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Species Regulatory Status</CardTitle>
              <CardDescription>Protection status and regulations for detected species</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {speciesCompliance.map((species, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Fish className="w-5 h-5 text-muted-foreground" />
                      <h3 className="font-medium">{species.species}</h3>
                    </div>
                    <Badge variant={getSpeciesStatusColor(species.status)}>{species.status.toUpperCase()}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground mb-2">Applicable Regulations:</p>
                      <ul className="space-y-1">
                        {species.regulations.map((reg, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <FileText className="w-3 h-3 text-muted-foreground" />
                            {reg}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium text-muted-foreground mb-2">Restrictions:</p>
                      <ul className="space-y-1">
                        {species.restrictions.map((restriction, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-orange-500" />
                            {restriction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {species.permits_required && (
                    <Alert className="border-orange-200 bg-orange-50/50">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-700">
                        Special permits required for any interaction with this species
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-500" />
                  Federal Regulations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Endangered Species Act (ESA)</h4>
                  <p className="text-sm text-muted-foreground">Protects threatened and endangered species</p>
                  <Badge variant="outline" className="mt-2">
                    Active
                  </Badge>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Clean Water Act</h4>
                  <p className="text-sm text-muted-foreground">Regulates water quality standards</p>
                  <Badge variant="outline" className="mt-2">
                    Active
                  </Badge>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Marine Mammal Protection Act</h4>
                  <p className="text-sm text-muted-foreground">Protects marine mammals from harassment</p>
                  <Badge variant="outline" className="mt-2">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Regional Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Marine Protected Areas</h4>
                  <p className="text-sm text-muted-foreground">Special conservation zones with restricted access</p>
                  <Badge variant="outline" className="mt-2">
                    Zone Specific
                  </Badge>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Fishing Quotas</h4>
                  <p className="text-sm text-muted-foreground">Seasonal and species-specific catch limits</p>
                  <Badge variant="outline" className="mt-2">
                    Seasonal
                  </Badge>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Coral Reef Protection</h4>
                  <p className="text-sm text-muted-foreground">Special protections for coral ecosystems</p>
                  <Badge variant="outline" className="mt-2">
                    Habitat Specific
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Calendar */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                Upcoming Compliance Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Annual Species Survey Report</p>
                  <p className="text-sm text-muted-foreground">Required by Marine Protected Areas Act</p>
                </div>
                <Badge variant="outline">Due: Dec 31, 2024</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Water Quality Assessment</p>
                  <p className="text-sm text-muted-foreground">Quarterly EPA compliance report</p>
                </div>
                <Badge variant="outline">Due: Jan 15, 2025</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Endangered Species Monitoring</p>
                  <p className="text-sm text-muted-foreground">Monthly turtle nesting report</p>
                </div>
                <Badge variant="outline">Due: Feb 1, 2025</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
