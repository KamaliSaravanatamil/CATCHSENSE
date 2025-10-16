"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Globe,
  MessageSquare,
  Send,
  Languages,
  Headphones,
  Type,
  Bot,
  User,
} from "lucide-react"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  language: string
  timestamp: Date
  audioUrl?: string
}

interface Translation {
  original: string
  translated: string
  fromLang: string
  toLang: string
  confidence: number
}

export default function MultilingualInterface() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const recognitionRef = useRef<any>(null)

  // Supported languages
  const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  ]

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = selectedLanguage

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setTextInput(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [selectedLanguage])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.lang = selectedLanguage
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const translateText = async (text: string, fromLang: string, toLang: string): Promise<Translation> => {
    // Mock translation - in real app, this would call a translation API
    const mockTranslations: { [key: string]: string } = {
      "Hello, how can I help you with marine monitoring?": {
        es: "Hola, ¿cómo puedo ayudarte con el monitoreo marino?",
        fr: "Bonjour, comment puis-je vous aider avec la surveillance marine?",
        pt: "Olá, como posso ajudá-lo com o monitoramento marinho?",
        zh: "您好，我如何帮助您进行海洋监测？",
        ja: "こんにちは、海洋監視についてどのようにお手伝いできますか？",
        ar: "مرحبا، كيف يمكنني مساعدتك في مراقبة البحر؟",
      },
      "I found plastic debris in the water": {
        es: "Encontré desechos plásticos en el agua",
        fr: "J'ai trouvé des débris plastiques dans l'eau",
        pt: "Encontrei detritos plásticos na água",
        zh: "我在水中发现了塑料垃圾",
        ja: "水中にプラスチックの破片を見つけました",
        ar: "وجدت حطام بلاستيكي في الماء",
      },
    }

    const translated = mockTranslations[text]?.[toLang] || `[Translated to ${toLang}] ${text}`

    return {
      original: text,
      translated,
      fromLang,
      toLang,
      confidence: 0.95,
    }
  }

  const processMessage = async (content: string) => {
    setIsProcessing(true)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      language: selectedLanguage,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate AI response based on content
    let aiResponse = "I understand your concern about marine life. Let me help you with that."

    if (content.toLowerCase().includes("plastic") || content.toLowerCase().includes("pollution")) {
      aiResponse =
        "I've detected your concern about plastic pollution. This is a serious threat to marine ecosystems. I recommend documenting the location and extent of debris for our cleanup teams."
    } else if (content.toLowerCase().includes("fish") || content.toLowerCase().includes("species")) {
      aiResponse =
        "Thank you for the species observation. This data helps us track marine biodiversity. Can you provide more details about the location and behavior you observed?"
    } else if (content.toLowerCase().includes("water") || content.toLowerCase().includes("quality")) {
      aiResponse =
        "Water quality monitoring is crucial for ecosystem health. I'll analyze the parameters you've mentioned and provide recommendations for any necessary actions."
    }

    // Translate AI response to user's language
    if (selectedLanguage !== "en") {
      const translation = await translateText(aiResponse, "en", selectedLanguage)
      aiResponse = translation.translated
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: aiResponse,
      language: selectedLanguage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsProcessing(false)

    // Speak the response if audio is enabled
    if (!isSpeaking) {
      speakText(aiResponse, selectedLanguage)
    }
  }

  const handleSendMessage = () => {
    if (textInput.trim()) {
      processMessage(textInput)
      setTextInput("")
    }
  }

  const handleTranslateMessage = async (message: Message, targetLang: string) => {
    const translation = await translateText(message.content, message.language, targetLang)
    setCurrentTranslation(translation)
  }

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === selectedLanguage) || languages[0]
  }

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Language Settings
          </CardTitle>
          <CardDescription>Choose your preferred language for interaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                      <span className="text-muted-foreground">({lang.name})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="flex items-center gap-1">
              <Languages className="w-3 h-3" />
              {getCurrentLanguage().nativeName}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Interaction Tabs */}
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
          <TabsTrigger value="translate">Translator</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          {/* Chat Interface */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Marine AI Assistant
              </CardTitle>
              <CardDescription>Ask questions about marine life and ecosystem monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Messages */}
              <div className="h-64 overflow-y-auto space-y-3 p-3 bg-muted/30 rounded-lg">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Start a conversation about marine monitoring</p>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.type === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4 text-primary" />
                        )}
                        <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(message.content, message.language)}
                          className="h-6 px-2"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTranslateMessage(message, selectedLanguage)}
                          className="h-6 px-2"
                        >
                          <Languages className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-background border border-border p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder={`Type your message in ${getCurrentLanguage().nativeName}...`}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!textInput.trim() || isProcessing}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          {/* Voice Interface */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-primary" />
                Voice Assistant
              </CardTitle>
              <CardDescription>Speak naturally in your language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <div className="relative inline-block">
                  <Button
                    size="lg"
                    variant={isListening ? "destructive" : "default"}
                    onClick={isListening ? stopListening : startListening}
                    className="w-20 h-20 rounded-full"
                  >
                    {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </Button>
                  {isListening && (
                    <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse"></div>
                  )}
                </div>
                <p className="mt-4 text-muted-foreground">
                  {isListening
                    ? `Listening in ${getCurrentLanguage().nativeName}...`
                    : `Tap to speak in ${getCurrentLanguage().nativeName}`}
                </p>
              </div>

              {textInput && (
                <Alert>
                  <MessageSquare className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium">Recognized speech:</p>
                    <p>"{textInput}"</p>
                    <Button onClick={handleSendMessage} className="mt-2" size="sm">
                      Process Message
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => speakText("Hello, I'm your marine monitoring assistant", selectedLanguage)}
                  disabled={isSpeaking}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                  Test Voice
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translate" className="space-y-4">
          {/* Translation Interface */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Text Translator
              </CardTitle>
              <CardDescription>Translate marine monitoring terms and observations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From Language</label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.nativeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">To Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.nativeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Textarea placeholder="Enter text to translate..." rows={3} />

              <Button className="w-full">
                <Languages className="w-4 h-4 mr-2" />
                Translate
              </Button>

              {currentTranslation && (
                <Alert>
                  <Languages className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium">Original:</p>
                        <p className="text-sm">{currentTranslation.original}</p>
                      </div>
                      <div>
                        <p className="font-medium">Translation:</p>
                        <p className="text-sm">{currentTranslation.translated}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Confidence: {(currentTranslation.confidence * 100).toFixed(0)}%</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(currentTranslation.translated, currentTranslation.toLang)}
                        >
                          <Volume2 className="w-3 h-3 mr-1" />
                          Listen
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Common Phrases */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Common Marine Monitoring Phrases</CardTitle>
              <CardDescription>Quick translations for frequently used terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Water quality assessment",
                  "Species identification",
                  "Pollution detected",
                  "Coral bleaching",
                  "Fish population count",
                  "Marine debris",
                  "Ecosystem health",
                  "Conservation area",
                ].map((phrase, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-3 bg-transparent"
                    onClick={() => handleTranslateMessage({ content: phrase } as Message, selectedLanguage)}
                  >
                    <div className="text-left">
                      <p className="font-medium">{phrase}</p>
                      <p className="text-xs text-muted-foreground">Click to translate</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
