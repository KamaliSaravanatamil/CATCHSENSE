import FeedbackSystem from "@/components/feedback-system"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Community Feedback</h1>
          <p className="text-muted-foreground text-balance">
            Collaborate with researchers and community members to share marine life observations and conservation
            insights
          </p>
        </div>

        <FeedbackSystem />
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  )
}
