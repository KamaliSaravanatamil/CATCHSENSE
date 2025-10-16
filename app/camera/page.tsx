import CameraMonitor from "@/components/camera-monitor"

export default function CameraPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Camera Monitoring</h1>
          <p className="text-muted-foreground text-balance">
            Use AI-powered image analysis to monitor water quality, detect species, and assess ecosystem health
          </p>
        </div>

        <CameraMonitor />
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  )
}
