import ReportsGenerator from "@/components/reports-generator"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <ReportsGenerator />
      </div>
    </div>
  )
}
