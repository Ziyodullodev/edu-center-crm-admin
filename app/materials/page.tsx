"use client"

import type React from "react"
import { useState } from "react"
import {
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Upload,
  FileText,
  Video,
  ImageIcon,
  File,
  BookOpen,
  Eye,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import FullScreenAdminLayout from "../components/fullscreen-admin-layout"

const materials = [
  {
    id: 1,
    title: "Advanced Calculus Fundamentals",
    type: "PDF",
    subject: "Mathematics",
    group: "Advanced Mathematics",
    teacher: "Dr. Michael Johnson",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    uploadDate: "Dec 1, 2024",
    size: "2.5 MB",
    downloads: 145,
    views: 289,
    likes: 42,
    status: "Active",
    description: "Comprehensive guide to advanced calculus concepts including limits, derivatives, and integrals",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Advanced",
    duration: "2 hours read",
  },
  {
    id: 2,
    title: "Quantum Physics Laboratory Experiments",
    type: "Video",
    subject: "Physics",
    group: "Quantum Physics",
    teacher: "Prof. Sarah Williams",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    uploadDate: "Nov 28, 2024",
    size: "125 MB",
    downloads: 89,
    views: 234,
    likes: 67,
    status: "Active",
    description: "Step-by-step demonstration of quantum physics experiments and their practical applications",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Advanced",
    duration: "45 min",
  },
  {
    id: 3,
    title: "Organic Chemistry Reaction Mechanisms",
    type: "Presentation",
    subject: "Chemistry",
    group: "Organic Chemistry",
    teacher: "Dr. James Smith",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    uploadDate: "Nov 25, 2024",
    size: "8.2 MB",
    downloads: 76,
    views: 156,
    likes: 34,
    status: "Draft",
    description: "Interactive presentation covering major organic reaction mechanisms with animations",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Intermediate",
    duration: "1.5 hours",
  },
  {
    id: 4,
    title: "Cell Structure and Function Diagrams",
    type: "Image",
    subject: "Biology",
    group: "Molecular Biology",
    teacher: "Prof. Emily Davis",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    uploadDate: "Nov 20, 2024",
    size: "15.7 MB",
    downloads: 112,
    views: 198,
    likes: 56,
    status: "Active",
    description: "High-resolution diagrams and illustrations of cellular structures and their functions",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Intermediate",
    duration: "30 min study",
  },
  {
    id: 5,
    title: "Modern Literature Analysis Framework",
    type: "PDF",
    subject: "Literature",
    group: "Creative Writing",
    teacher: "Dr. Robert Brown",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    uploadDate: "Nov 15, 2024",
    size: "1.8 MB",
    downloads: 67,
    views: 134,
    likes: 28,
    status: "Active",
    description: "Comprehensive framework for analyzing modern literary works and their themes",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Intermediate",
    duration: "1 hour read",
  },
  {
    id: 6,
    title: "Data Structures Implementation Guide",
    type: "PDF",
    subject: "Computer Science",
    group: "Data Structures",
    teacher: "Dr. Alex Chen",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    uploadDate: "Nov 10, 2024",
    size: "4.2 MB",
    downloads: 203,
    views: 387,
    likes: 89,
    status: "Active",
    description: "Practical guide to implementing common data structures with code examples",
    thumbnail: "/placeholder.svg?height=200&width=300",
    difficulty: "Intermediate",
    duration: "3 hours read",
  },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "Video":
      return Video
    case "Image":
      return ImageIcon
    case "Presentation":
      return File
    default:
      return FileText
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([])
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    type: "",
    subject: "",
    group: "",
    description: "",
    difficulty: "",
  })

  const filteredMaterials = materials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.group.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectMaterial = (id: number) => {
    setSelectedMaterials((prev) => (prev.includes(id) ? prev.filter((materialId) => materialId !== id) : [...prev, id]))
  }

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddMaterialOpen(false)
    setNewMaterial({
      title: "",
      type: "",
      subject: "",
      group: "",
      description: "",
      difficulty: "",
    })
  }

  const totalMaterials = materials.length
  const totalDownloads = materials.reduce((sum, m) => sum + m.downloads, 0)
  const totalViews = materials.reduce((sum, m) => sum + m.views, 0)
  const activeMaterials = materials.filter((m) => m.status === "Active").length

  return (
    <FullScreenAdminLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm">
          <a href="/" className="text-muted-foreground hover:text-foreground">
            Bosh sahifa
          </a>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium">O'quv materiallari</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">O'quv resurslari</h1>
            <p className="text-muted-foreground mt-1">Ta'lim mazmuni va materiallarini kashf eting va ularga kiring</p>
          </div>
          <Dialog open={isAddMaterialOpen} onOpenChange={setIsAddMaterialOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Material yuklash
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload Learning Material</DialogTitle>
                <DialogDescription>Add new educational content for your students.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddMaterial}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newMaterial.title}
                      onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select onValueChange={(value) => setNewMaterial({ ...newMaterial, type: value })}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PDF">PDF Document</SelectItem>
                          <SelectItem value="Video">Video</SelectItem>
                          <SelectItem value="Presentation">Presentation</SelectItem>
                          <SelectItem value="Image">Image</SelectItem>
                          <SelectItem value="Audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select onValueChange={(value) => setNewMaterial({ ...newMaterial, difficulty: value })}>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select onValueChange={(value) => setNewMaterial({ ...newMaterial, subject: value })}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                          <SelectItem value="Biology">Biology</SelectItem>
                          <SelectItem value="Literature">Literature</SelectItem>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="group">Group</Label>
                      <Select onValueChange={(value) => setNewMaterial({ ...newMaterial, group: value })}>
                        <SelectTrigger id="group">
                          <SelectValue placeholder="Select group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Advanced Mathematics">Advanced Mathematics</SelectItem>
                          <SelectItem value="Quantum Physics">Quantum Physics</SelectItem>
                          <SelectItem value="Organic Chemistry">Organic Chemistry</SelectItem>
                          <SelectItem value="Molecular Biology">Molecular Biology</SelectItem>
                          <SelectItem value="Creative Writing">Creative Writing</SelectItem>
                          <SelectItem value="Data Structures">Data Structures</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newMaterial.description}
                      onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                      placeholder="Brief description of the material..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <div className="border-2 border-dashed border-input rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, PPT, MP4, JPG up to 100MB</p>
                      <Input id="file" type="file" className="hidden" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddMaterialOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Upload Material
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Materials</p>
                  <p className="text-3xl font-bold">{totalMaterials}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Downloads</p>
                  <p className="text-3xl font-bold">{totalDownloads.toLocaleString()}</p>
                </div>
                <Download className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Total Views</p>
                  <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Active Materials</p>
                  <p className="text-3xl font-bold">{activeMaterials}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Materiallarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={viewMode === "cards" ? "default" : "outline"} onClick={() => setViewMode("cards")}>
              Cards
            </Button>
            <Button variant={viewMode === "table" ? "default" : "outline"} onClick={() => setViewMode("table")}>
              Table
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            {selectedMaterials.length > 0 && (
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete ({selectedMaterials.length})
              </Button>
            )}
          </div>
        </div>

        {/* Materials Display */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => {
              const IconComponent = getFileIcon(material.type)
              return (
                <Card key={material.id} className="hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={material.thumbnail || "/placeholder.svg"}
                      alt={material.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {material.type}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className={getDifficultyColor(material.difficulty)}>{material.difficulty}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={material.teacherAvatar || "/placeholder.svg"} alt={material.teacher} />
                          <AvatarFallback className="text-xs">
                            {material.teacher
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">{material.teacher}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {material.subject}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Group: {material.group}</span>
                        <span>{material.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Size: {material.size}</span>
                        <span>Uploaded: {material.uploadDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span>{material.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{material.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-muted-foreground" />
                          <span>{material.likes}</span>
                        </div>
                      </div>
                      <Badge variant={material.status === "Active" ? "default" : "secondary"}>{material.status}</Badge>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <Button variant="outline" size="sm" className="flex-1 mr-2">
                        <IconComponent className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="default" size="sm" className="flex-1 ml-2">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Share Link</DropdownMenuItem>
                          <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Learning Materials</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No materials found. Try adjusting your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMaterials.map((material) => {
                      const IconComponent = getFileIcon(material.type)
                      return (
                        <TableRow key={material.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Checkbox
                              checked={selectedMaterials.includes(material.id)}
                              onCheckedChange={() => toggleSelectMaterial(material.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-primary" />
                              </div>
                              <div className="max-w-xs">
                                <div className="text-foreground font-medium line-clamp-1">{material.title}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">{material.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{material.type}</Badge>
                          </TableCell>
                          <TableCell>{material.subject}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={material.teacherAvatar || "/placeholder.svg"}
                                  alt={material.teacher}
                                />
                                <AvatarFallback className="text-xs">
                                  {material.teacher
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{material.teacher}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Download className="h-3 w-3" />
                                <span>{material.downloads}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{material.views}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                material.status === "Active"
                                  ? "default"
                                  : material.status === "Draft"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {material.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuItem>Share Link</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </FullScreenAdminLayout>
  )
}
