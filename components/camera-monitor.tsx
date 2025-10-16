"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Upload, Scan, AlertTriangle, CheckCircle, Fish, Droplets, Eye } from "lucide-react"

interface AnalysisResult {
  waterQuality: {
    clarity: number
    turbidity: string
    pollutionLevel: string
    ph: number
  }
  species: {
    name: string
    confidence: number
    endangered: boolean
    count: number
  }[]
  threats: string[]
  recommendations: string[]
}

export default function CameraMonitor() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLiveMode, setIsLiveMode] = useState(false)

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const startLiveCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsLiveMode(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }, [])

  const stopLiveCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsLiveMode(false)
    }
  }, [])

  const captureFromVideo = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      if (context) {
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg")
        setSelectedImage(imageData)
        stopLiveCamera()
        analyzeImage()
      }
    }
  }, [stopLiveCamera])

  const analyzeImage = useCallback(async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis with progress updates
    const progressSteps = [
      { step: 20, message: "Analyzing water quality..." },
      { step: 40, message: "Detecting species..." },
      { step: 60, message: "Checking endangered status..." },
      { step: 80, message: "Assessing threats..." },
      { step: 100, message: "Generating recommendations..." },
    ]

    for (const { step } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setAnalysisProgress(step)
    }

    // Mock analysis results
    const mockResult: AnalysisResult = {
      waterQuality: {
        clarity: 78,
        turbidity: "Moderate",
        pollutionLevel: "Low",
        ph: 7.2,
      },
      species: [
        { name: "Clownfish", confidence: 92, endangered: false, count: 3 },
        { name: "Sea Turtle", confidence: 87, endangered: true, count: 1 },
        { name: "Coral Polyps", confidence: 95, endangered: false, count: 150 },
      ],
      threats: ["Slight plastic debris detected", "Temperature slightly above optimal range"],
      recommendations: [
        "Monitor temperature trends closely",
        "Consider debris removal in detected areas",
        "Continue regular monitoring of turtle population",
      ],
    }

    setAnalysisResult(mockResult)
    setIsAnalyzing(false)
  }, [])

  return (
    <div className="space-y-6">
      {/* Camera Controls */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Camera Monitoring
          </CardTitle>
          <CardDescription>Upload images or use live camera to analyze aquatic ecosystems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            <Button
              onClick={isLiveMode ? stopLiveCamera : startLiveCamera}
              variant={isLiveMode ? "destructive" : "default"}
              className="flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              {isLiveMode ? "Stop Camera" : "Live Camera"}
            </Button>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </CardContent>
      </Card>

      {/* Live Camera View */}
      {isLiveMode && (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardContent className="p-4">
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
              <Button
                onClick={captureFromVideo}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                size="lg"
              >
                <Scan className="w-4 h-4 mr-2" />
                Capture & Analyze
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Image Preview */}
      {selectedImage && (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Selected Image</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Selected for analysis"
              className="w-full rounded-lg max-h-64 object-cover"
            />
          </CardContent>
        </Card>
      )}

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="w-5 h-5 text-primary animate-spin" />
              Analyzing Image...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={analysisProgress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              {analysisProgress < 20 && "Initializing AI models..."}
              {analysisProgress >= 20 && analysisProgress < 40 && "Analyzing water quality..."}
              {analysisProgress >= 40 && analysisProgress < 60 && "Detecting species..."}
              {analysisProgress >= 60 && analysisProgress < 80 && "Checking endangered status..."}
              {analysisProgress >= 80 && analysisProgress < 100 && "Assessing threats..."}
              {analysisProgress >= 100 && "Generating recommendations..."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-4">
          {/* Water Quality */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Water Quality Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Clarity</p>
                  <div className="flex items-center gap-2">
                    <Progress value={analysisResult.waterQuality.clarity} className="flex-1" />
                    <span className="text-sm font-medium">{analysisResult.waterQuality.clarity}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">pH Level</p>
                  <p className="text-lg font-semibold">{analysisResult.waterQuality.ph}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Turbidity: {analysisResult.waterQuality.turbidity}</Badge>
                <Badge variant="secondary">Pollution: {analysisResult.waterQuality.pollutionLevel}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Species Detection */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fish className="w-5 h-5 text-green-500" />
                Species Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysisResult.species.map((species, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{species.name}</p>
                      <p className="text-sm text-muted-foreground">Count: {species.count}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={species.endangered ? "destructive" : "secondary"}>
                      {species.endangered ? "Endangered" : "Safe"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{species.confidence}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Threats & Recommendations */}
          {analysisResult.threats.length > 0 && (
            <Alert className="border-orange-200 bg-orange-50/50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription>
                <p className="font-medium text-orange-800 mb-2">Detected Threats:</p>
                <ul className="list-disc list-inside space-y-1 text-orange-700">
                  {analysisResult.threats.map((threat, index) => (
                    <li key={index} className="text-sm">
                      {threat}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <Alert className="border-green-200 bg-green-50/50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <p className="font-medium text-green-800 mb-2">Recommendations:</p>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">
                    {rec}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
