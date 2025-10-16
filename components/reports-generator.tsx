"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, TrendingUp, AlertTriangle, CheckCircle, Clock, Fish, Waves } from "lucide-react"

interface ReportData {
  id: string
  title: string
  type: "ecosystem" | "species" | "compliance" | "conservation"
  date: string
  status: "completed" | "generating" | "scheduled"
  healthScore: number
  keyFindings: string[]
  recommendations: {
    priority: "high" | "medium" | "low"
    action: string
    timeline: string
    impact: string
  }[]
  metrics: {
    speciesCount: number
    endangeredSpecies: number
    waterQuality: number
    biodiversityIndex: number
  }
}

const mockReports: ReportData[] = [
  {
    id: "1",
    title: "Great Barrier Reef Health Assessment",
    type: "ecosystem",
    date: "2024-01-15",
    status: "completed",
    healthScore: 72,
    keyFindings: [
      "Coral bleaching reduced by 15% compared to last quarter",
      "23 species showing population recovery",
      "Water temperature within acceptable range",
      "Microplastic levels slightly elevated",
    ],
    recommendations: [
      {
        priority: "high",
        action: "Implement immediate microplastic filtration systems",
        timeline: "2-4 weeks",
        impact: "Reduce pollution by 40%",
      },
      {
        priority: "medium",
        action: "Expand coral restoration programs",
        timeline: "3-6 months",
        impact: "Increase coral coverage by 25%",
      },
      {
        priority: "low",
        action: "Monitor fish migration patterns",
        timeline: "6-12 months",
        impact: "Better species protection",
      },
    ],
    metrics: {
      speciesCount: 1247,
      endangeredSpecies: 18,
      waterQuality: 78,
      biodiversityIndex: 85,
    },
  },
  {
    id: "2",
    title: "Pacific Tuna Population Study",
    type: "species",
    date: "2024-01-10",
    status: "completed",
    healthScore: 65,
    keyFindings: [
      "Yellowfin tuna population stable",
      "Bluefin tuna showing signs of recovery",
      "Fishing quotas being exceeded in 3 regions",
      "Juvenile survival rates improving",
    ],
    recommendations: [
      {
        priority: "high",
        action: "Enforce stricter fishing quotas in overfished regions",
        timeline: "Immediate",
        impact: "Prevent population collapse",
      },
      {
        priority: "medium",
        action: "Establish new marine protected areas",
        timeline: "6-12 months",
        impact: "Increase breeding success by 30%",
      },
    ],
    metrics: {
      speciesCount: 8,
      endangeredSpecies: 2,
      waterQuality: 82,
      biodiversityIndex: 68,
    },
  },
  {
    id: "3",
    title: "Monthly Compliance Report",
    type: "compliance",
    date: "2024-01-01",
    status: "generating",
    healthScore: 88,
    keyFindings: [],
    recommendations: [],
    metrics: {
      speciesCount: 0,
      endangeredSpecies: 0,
      waterQuality: 0,
      biodiversityIndex: 0,
    },
  },
]

export default function ReportsGenerator() {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null)
  const [reportType, setReportType] = useState<string>("all")
  const [generatingReport, setGeneratingReport] = useState(false)

  const filteredReports =
    reportType === "all" ? mockReports : mockReports.filter((report) => report.type === reportType)

  const generateNewReport = async () => {
    setGeneratingReport(true)
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(false)
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "generating":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ocean-900">Reports & Recommendations</h1>
          <p className="text-ocean-600">
            Generate comprehensive ecosystem health reports and conservation recommendations
          </p>
        </div>
        <Button
          onClick={generateNewReport}
          disabled={generatingReport}
          className="bg-gradient-to-r from-ocean-500 to-teal-500 hover:from-ocean-600 hover:to-teal-600"
        >
          {generatingReport ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Generate New Report
            </>
          )}
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-ocean-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="ecosystem">Ecosystem Health</SelectItem>
                <SelectItem value="species">Species Studies</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="conservation">Conservation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-ocean-900">Recent Reports</h2>
          {filteredReports.map((report) => (
            <Card
              key={report.id}
              className={`cursor-pointer transition-all duration-200 bg-white/80 backdrop-blur-sm border-ocean-200 hover:shadow-lg ${
                selectedReport?.id === report.id ? "ring-2 ring-ocean-500" : ""
              }`}
              onClick={() => setSelectedReport(report)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    <Badge variant="outline" className="text-xs">
                      {report.type}
                    </Badge>
                  </div>
                  <span className="text-xs text-ocean-600">{report.date}</span>
                </div>
                <h3 className="font-medium text-ocean-900 mb-2 line-clamp-2">{report.title}</h3>
                {report.status === "completed" && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ocean-600">Health Score:</span>
                    <Progress value={report.healthScore} className="flex-1 h-2" />
                    <span className="text-xs font-medium text-ocean-900">{report.healthScore}%</span>
                  </div>
                )}
                {report.status === "generating" && (
                  <div className="flex items-center gap-2">
                    <Progress value={65} className="flex-1 h-2" />
                    <span className="text-xs text-ocean-600">65%</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Details */}
        <div className="lg:col-span-2">
          {selectedReport ? (
            <Card className="bg-white/80 backdrop-blur-sm border-ocean-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-ocean-900">{selectedReport.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {getStatusIcon(selectedReport.status)}
                      <span>Generated on {selectedReport.date}</span>
                      <Badge variant="outline">{selectedReport.type}</Badge>
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {selectedReport.status === "completed" ? (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="findings">Findings</TabsTrigger>
                      <TabsTrigger value="recommendations">Actions</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-ocean-50 rounded-lg">
                          <Fish className="h-6 w-6 mx-auto mb-2 text-ocean-600" />
                          <div className="text-2xl font-bold text-ocean-900">{selectedReport.metrics.speciesCount}</div>
                          <div className="text-xs text-ocean-600">Species Detected</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
                          <div className="text-2xl font-bold text-red-900">
                            {selectedReport.metrics.endangeredSpecies}
                          </div>
                          <div className="text-xs text-red-600">Endangered</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <Waves className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="text-2xl font-bold text-blue-900">{selectedReport.metrics.waterQuality}%</div>
                          <div className="text-xs text-blue-600">Water Quality</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold text-green-900">
                            {selectedReport.metrics.biodiversityIndex}%
                          </div>
                          <div className="text-xs text-green-600">Biodiversity</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-ocean-900">Overall Health Score</h3>
                        <div className="flex items-center gap-4">
                          <Progress value={selectedReport.healthScore} className="flex-1 h-3" />
                          <span className="text-lg font-bold text-ocean-900">{selectedReport.healthScore}%</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="findings" className="space-y-4">
                      <h3 className="font-semibold text-ocean-900">Key Findings</h3>
                      <div className="space-y-3">
                        {selectedReport.keyFindings.map((finding, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-ocean-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-ocean-800">{finding}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="recommendations" className="space-y-4">
                      <h3 className="font-semibold text-ocean-900">Recommended Actions</h3>
                      <div className="space-y-4">
                        {selectedReport.recommendations.map((rec, index) => (
                          <Card key={index} className="border-l-4 border-l-ocean-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <Badge className={getPriorityColor(rec.priority)}>
                                  {rec.priority.toUpperCase()} PRIORITY
                                </Badge>
                                <span className="text-sm text-ocean-600">{rec.timeline}</span>
                              </div>
                              <h4 className="font-medium text-ocean-900 mb-2">{rec.action}</h4>
                              <p className="text-sm text-ocean-600">Expected Impact: {rec.impact}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="metrics" className="space-y-4">
                      <h3 className="font-semibold text-ocean-900">Detailed Metrics</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-ocean-600">Species Diversity</span>
                              <span className="font-bold text-ocean-900">
                                {selectedReport.metrics.biodiversityIndex}%
                              </span>
                            </div>
                            <Progress value={selectedReport.metrics.biodiversityIndex} className="mt-2" />
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-ocean-600">Water Quality Index</span>
                              <span className="font-bold text-ocean-900">{selectedReport.metrics.waterQuality}%</span>
                            </div>
                            <Progress value={selectedReport.metrics.waterQuality} className="mt-2" />
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-ocean-400 animate-spin" />
                    <h3 className="text-lg font-medium text-ocean-900 mb-2">Report Generation in Progress</h3>
                    <p className="text-ocean-600">
                      This report is currently being generated. Please check back in a few minutes.
                    </p>
                    <Progress value={65} className="mt-4 max-w-xs mx-auto" />
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/80 backdrop-blur-sm border-ocean-200">
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-ocean-400" />
                <h3 className="text-lg font-medium text-ocean-900 mb-2">Select a Report</h3>
                <p className="text-ocean-600">
                  Choose a report from the list to view detailed findings and recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
