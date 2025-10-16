import MultilingualInterface from "@/components/multilingual-interface"

export default function LanguagePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Multilingual Interface</h1>
          <p className="text-muted-foreground text-balance">
            Interact with AquaTrace in your preferred language using voice, text, and translation features
          </p>
        </div>

        <MultilingualInterface />
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-20"></div>
    </div>
  )
}
