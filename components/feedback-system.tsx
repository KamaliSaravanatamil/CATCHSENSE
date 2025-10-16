"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  Plus,
  MapPin,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Send,
  CheckCircle,
  AlertTriangle,
  Fish,
  Waves,
  Eye,
} from "lucide-react"

interface Observation {
  id: string
  user: {
    name: string
    role: "researcher" | "community" | "expert"
    avatar?: string
  }
  title: string
  description: string
  category: "species" | "pollution" | "behavior" | "habitat" | "other"
  location: string
  coordinates?: { lat: number; lng: number }
  timestamp: Date
  images?: string[]
  verified: boolean
  likes: number
  dislikes: number
  comments: number
  priority: "low" | "medium" | "high" | "urgent"
}

interface Comment {
  id: string
  observationId: string
  user: {
    name: string
    role: "researcher" | "community" | "expert"
    avatar?: string
  }
  content: string
  timestamp: Date
  likes: number
}

export default function FeedbackSystem() {
  const [activeTab, setActiveTab] = useState("observations")
  const [showNewObservation, setShowNewObservation] = useState(false)
  const [newObservation, setNewObservation] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  })

  // Mock data
  const [observations] = useState<Observation[]>([
    {
      id: "1",
      user: {
        name: "Dr. Sarah Chen",
        role: "researcher",
        avatar: "/diverse-research-team.png",
      },
      title: "Unusual Coral Bleaching Pattern",
      description:
        "Observed significant coral bleaching in the northeast section of the reef. Pattern suggests temperature stress combined with possible chemical pollution. Immediate investigation recommended.",
      category: "habitat",
      location: "Great Barrier Reef, Section 7A",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      images: ["/bleached-coral-reef.png"],
      verified: true,
      likes: 15,
      dislikes: 0,
      comments: 8,
      priority: "urgent",
    },
    {
      id: "2",
      user: {
        name: "Marine Explorer",
        role: "community",
        avatar: "/diver.jpg",
      },
      title: "Sea Turtle Nesting Activity",
      description:
        "Spotted 3 green sea turtles near the beach last night around 11 PM. They appeared to be scouting for nesting sites. Beach was clean with minimal human disturbance.",
      category: "species",
      location: "Turtle Bay, Hawaii",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      verified: false,
      likes: 23,
      dislikes: 1,
      comments: 12,
      priority: "medium",
    },
    {
      id: "3",
      user: {
        name: "Prof. Michael Torres",
        role: "expert",
        avatar: "/marine-biologist.jpg",
      },
      title: "Plastic Debris Accumulation",
      description:
        "Significant increase in plastic debris observed over the past week. Mostly single-use items and fishing gear. Affecting feeding patterns of local fish populations.",
      category: "pollution",
      location: "Pacific Coast, California",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      verified: true,
      likes: 31,
      dislikes: 2,
      comments: 18,
      priority: "high",
    },
    {
      id: "4",
      user: {
        name: "Local Fisherman",
        role: "community",
        avatar: "/fisherman.jpg",
      },
      title: "Fish Population Changes",
      description:
        "Noticed fewer parrotfish in the usual spots over the past month. Water seems clearer but fish behavior has changed. They're staying deeper than normal.",
      category: "behavior",
      location: "Caribbean Sea, Barbados",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      verified: false,
      likes: 8,
      dislikes: 0,
      comments: 5,
      priority: "medium",
    },
  ])

  const [comments] = useState<Comment[]>([
    {
      id: "1",
      observationId: "1",
      user: {
        name: "Dr. James Wilson",
        role: "expert",
        avatar: "/scientist-in-lab.png",
      },
      content:
        "This is concerning. I've seen similar patterns in other reef systems. We should coordinate a joint survey mission.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      likes: 5,
    },
    {
      id: "2",
      observationId: "1",
      user: {
        name: "Marine Conservation Team",
        role: "researcher",
        avatar: "/conservation-efforts.png",
      },
      content: "We can provide additional monitoring equipment. Please contact us for coordination.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      likes: 3,
    },
  ])

  const handleSubmitObservation = () => {
    // In a real app, this would submit to an API
    console.log("Submitting observation:", newObservation)
    setShowNewObservation(false)
    setNewObservation({ title: "", description: "", category: "", location: "" })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "researcher":
        return "bg-blue-100 text-blue-800"
      case "expert":
        return "bg-purple-100 text-purple-800"
      case "community":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "species":
        return <Fish className="w-4 h-4" />
      case "pollution":
        return <AlertTriangle className="w-4 h-4" />
      case "behavior":
        return <Eye className="w-4 h-4" />
      case "habitat":
        return <Waves className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Community Feedback</h2>
          <p className="text-muted-foreground">Collaborative marine conservation platform</p>
        </div>
        <Button onClick={() => setShowNewObservation(true)} className="bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Observation
        </Button>
      </div>

      {/* New Observation Form */}
      {showNewObservation && (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle>Submit New Observation</CardTitle>
            <CardDescription>Share your marine life observations with the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Brief description of your observation"
                  value={newObservation.title}
                  onChange={(e) => setNewObservation({ ...newObservation, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select
                  value={newObservation.category}
                  onValueChange={(value) => setNewObservation({ ...newObservation, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="species">Species Sighting</SelectItem>
                    <SelectItem value="pollution">Pollution</SelectItem>
                    <SelectItem value="behavior">Animal Behavior</SelectItem>
                    <SelectItem value="habitat">Habitat Changes</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                placeholder="Where did you make this observation?"
                value={newObservation.location}
                onChange={(e) => setNewObservation({ ...newObservation, location: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Provide detailed information about your observation..."
                rows={4}
                value={newObservation.description}
                onChange={(e) => setNewObservation({ ...newObservation, description: e.target.value })}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSubmitObservation} className="bg-primary">
                <Send className="w-4 h-4 mr-2" />
                Submit Observation
              </Button>
              <Button variant="outline" onClick={() => setShowNewObservation(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="observations">Observations</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="verified">Verified Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="observations" className="space-y-4">
          {/* Priority Alerts */}
          {observations.filter((obs) => obs.priority === "urgent").length > 0 && (
            <Alert className="border-red-200 bg-red-50/50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <p className="font-medium text-red-800 mb-2">Urgent Observations Require Attention</p>
                <p className="text-red-700">
                  {observations.filter((obs) => obs.priority === "urgent").length} urgent observation(s) need immediate
                  review
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Observations List */}
          <div className="space-y-4">
            {observations.map((observation) => (
              <Card key={observation.id} className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={observation.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{observation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{observation.title}</h3>
                          {observation.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{observation.user.name}</span>
                          <Badge className={getRoleColor(observation.user.role)} variant="secondary">
                            {observation.user.role}
                          </Badge>
                          <span>•</span>
                          <Calendar className="w-3 h-3" />
                          <span>{observation.timestamp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(observation.priority)}`}></div>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryIcon(observation.category)}
                        <span className="ml-1">{observation.category}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{observation.description}</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{observation.location}</span>
                  </div>

                  {observation.images && (
                    <div className="flex gap-2">
                      {observation.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Observation ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{observation.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-600">
                        <ThumbsDown className="w-4 h-4" />
                        <span>{observation.dislikes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                        <MessageSquare className="w-4 h-4" />
                        <span>{observation.comments} comments</span>
                      </button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
              <CardDescription>Community conversations about marine observations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.user.name}</span>
                      <Badge className={getRoleColor(comment.user.role)} variant="secondary">
                        {comment.user.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{comment.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-green-600">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-primary">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          <div className="space-y-4">
            {observations
              .filter((obs) => obs.verified)
              .map((observation) => (
                <Card key={observation.id} className="bg-card/80 backdrop-blur-sm border-green-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={observation.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{observation.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{observation.title}</h3>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{observation.user.name}</span>
                            <Badge className={getRoleColor(observation.user.role)} variant="secondary">
                              {observation.user.role}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{observation.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{observation.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
