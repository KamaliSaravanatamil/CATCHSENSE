import ComplianceChecker from "@/components/compliance-checker"

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Regulatory Compliance</h1>
          <p className="text-muted-foreground text-balance">
            Automated compliance checking against endangered species lists, fishing regulations, and conservation
            guidelines
          </p>
        </div>

        <ComplianceChecker />
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  )
}
