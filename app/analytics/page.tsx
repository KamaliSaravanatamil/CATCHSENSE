import AnalyticsDashboard from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Data Analytics</h1>
          <p className="text-muted-foreground text-balance">
            Real-time ecosystem health monitoring with predictive insights and trend analysis
          </p>
        </div>

        <AnalyticsDashboard />
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  )
}
