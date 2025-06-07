"use client"

import type React from "react"
import { useState } from "react"
import {
  Calendar,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  Clock,
  MapPin,
  GraduationCap,
  BookOpen,
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
import { Progress } from "@/components/ui/progress"
import FullScreenAdminLayout from "../components/fullscreen-admin-layout"

const groups = [
  {
    id: 1,
    name: "Advanced Mathematics",
    subject: "Mathematics",
    teacher: "Dr. Michael Johnson",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    students: 25,
    maxStudents: 30,
    schedule: "Mon, Wed, Fri 10:00 AM",
    status: "Active",
    startDate: "Jan 15, 2024",
    endDate: "Jun 15, 2024",
    room: "Room 101",
    level: "Advanced",
    progress: 65,
    description: "Advanced mathematical concepts including calculus and linear algebra",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Quantum Physics",
    subject: "Physics",
    teacher: "Prof. Sarah Williams",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    students: 20,
    maxStudents: 25,
    schedule: "Tue, Thu 2:00 PM",
    status: "Active",
    startDate: "Jan 20, 2024",
    endDate: "Jun 20, 2024",
    room: "Lab 102",
    level: "Advanced",
    progress: 58,
    description: "Exploring quantum mechanics and modern physics principles",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Organic Chemistry",
    subject: "Chemistry",
    teacher: "Dr. James Smith",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    students: 18,
    maxStudents: 22,
    schedule: "Mon, Wed 3:00 PM",
    status: "Inactive",
    startDate: "Feb 1, 2024",
    endDate: "Jun 30, 2024",
    room: "Lab 201",
    level: "Intermediate",
    progress: 42,
    description: "Study of carbon-based compounds and their reactions",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Molecular Biology",
    subject: "Biology",
    teacher: "Prof. Emily Davis",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    students: 22,
    maxStudents: 25,
    schedule: "Tue, Thu 10:00 AM",
    status: "Active",
    startDate: "Jan 15, 2024",
    endDate: "Jun 15, 2024",
    room: "Lab 202",
    level: "Advanced",
    progress: 72,
    description: "Understanding life at the molecular level",
    color: "bg-emerald-500",
  },
  {
    id: 5,
    name: "Creative Writing",
    subject: "Literature",
    teacher: "Dr. Robert Brown",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    students: 15,
    maxStudents: 20,
    schedule: "Wed, Fri 1:00 PM",
    status: "Active",
    startDate: "Jan 25, 2024",
    endDate: "Jun 25, 2024",
    room: "Room 103",
    level: "Intermediate",
    progress: 55,
    description: "Developing creative writing skills and literary expression",
    color: "bg-orange-500",
  },
  {
    id: 6,
    name: "Data Structures",
    subject: "Computer Science",
    teacher: "Dr. Alex Chen",
    teacherAvatar: "/placeholder.svg?height=32&width=32",
    students: 28,
    maxStudents: 30,
    schedule: "Mon, Wed, Fri 11:00 AM",
    status: "Active",
    startDate: "Jan 10, 2024",
    endDate: "Jun 10, 2024",
    room: "Computer Lab",
    level: "Intermediate",
    progress: 68,
    description: "Fundamental data structures and algorithms",
    color: "bg-indigo-500",
  },
]

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<number[]>([])
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [newGroup, setNewGroup] = useState({
    name: "",
    subject: "",
    teacher: "",
    schedule: "",
    room: "",
    level: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
    description: "",
  })

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectGroup = (id: number) => {
    setSelectedGroups((prev) => (prev.includes(id) ? prev.filter((groupId) => groupId !== id) : [...prev, id]))
  }

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddGroupOpen(false)
    setNewGroup({
      name: "",
      subject: "",
      teacher: "",
      schedule: "",
      room: "",
      level: "",
      startDate: "",
      endDate: "",
      maxStudents: "",
      description: "",
    })
  }

  return (
    <FullScreenAdminLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm">
          <a href="/" className="text-muted-foreground hover:text-foreground">
            Bosh sahifa
          </a>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Guruhlar</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">O'quv guruhlari</h1>
            <p className="text-muted-foreground mt-1">Sinf guruhlarini va jadvallarni o'rganing va boshqaring</p>
          </div>
          <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Guruh yaratish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogDescription>Enter the group details below. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddGroup}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Group Name</Label>
                      <Input
                        id="name"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select onValueChange={(value) => setNewGroup({ ...newGroup, subject: value })}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher">Teacher</Label>
                      <Select onValueChange={(value) => setNewGroup({ ...newGroup, teacher: value })}>
                        <SelectTrigger id="teacher">
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dr. Michael Johnson">Dr. Michael Johnson</SelectItem>
                          <SelectItem value="Prof. Sarah Williams">Prof. Sarah Williams</SelectItem>
                          <SelectItem value="Dr. James Smith">Dr. James Smith</SelectItem>
                          <SelectItem value="Prof. Emily Davis">Prof. Emily Davis</SelectItem>
                          <SelectItem value="Dr. Robert Brown">Dr. Robert Brown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select onValueChange={(value) => setNewGroup({ ...newGroup, level: value })}>
                        <SelectTrigger id="level">
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newGroup.description}
                      onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                      placeholder="Brief description of the group..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        placeholder="e.g., Mon, Wed, Fri 10:00 AM"
                        value={newGroup.schedule}
                        onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room">Room</Label>
                      <Input
                        id="room"
                        value={newGroup.room}
                        onChange={(e) => setNewGroup({ ...newGroup, room: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxStudents">Max Students</Label>
                      <Input
                        id="maxStudents"
                        type="number"
                        value={newGroup.maxStudents}
                        onChange={(e) => setNewGroup({ ...newGroup, maxStudents: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newGroup.startDate}
                        onChange={(e) => setNewGroup({ ...newGroup, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newGroup.endDate}
                        onChange={(e) => setNewGroup({ ...newGroup, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddGroupOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Create Group
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
                  <p className="text-blue-100">Total Groups</p>
                  <p className="text-3xl font-bold">{groups.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Groups</p>
                  <p className="text-3xl font-bold">{groups.filter((g) => g.status === "Active").length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Total Students</p>
                  <p className="text-3xl font-bold">{groups.reduce((sum, g) => sum + g.students, 0)}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Avg Progress</p>
                  <p className="text-3xl font-bold">
                    {Math.round(groups.reduce((sum, g) => sum + g.progress, 0) / groups.length)}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Guruhlarni qidirish..."
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
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Groups Display */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="hover:shadow-lg transition-all duration-300 border-l-4"
                style={{ borderLeftColor: group.color.replace("bg-", "#") }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${group.color}`}></div>
                        {group.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{group.description}</CardDescription>
                    </div>
                    <Badge variant={group.status === "Active" ? "default" : "outline"}>{group.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={group.teacherAvatar || "/placeholder.svg"} alt={group.teacher} />
                        <AvatarFallback className="text-xs">
                          {group.teacher
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{group.teacher}</p>
                        <p className="text-xs text-muted-foreground">{group.subject}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {group.level}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {group.students}/{group.maxStudents} students
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {group.schedule}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {group.room}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{group.progress}%</span>
                    </div>
                    <Progress value={group.progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Enrollment</span>
                      <span>{Math.round((group.students / group.maxStudents) * 100)}%</span>
                    </div>
                    <Progress value={(group.students / group.maxStudents) * 100} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Group</DropdownMenuItem>
                        <DropdownMenuItem>Manage Students</DropdownMenuItem>
                        <DropdownMenuItem>View Schedule</DropdownMenuItem>
                        <DropdownMenuItem>Change Teacher</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Group</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Class Groups</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Group Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.map((group) => (
                    <TableRow key={group.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedGroups.includes(group.id)}
                          onCheckedChange={() => toggleSelectGroup(group.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 ${group.color} rounded-full flex items-center justify-center`}>
                            <Users className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="text-foreground">{group.name}</div>
                            <div className="text-xs text-muted-foreground">{group.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{group.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={group.teacherAvatar || "/placeholder.svg"} alt={group.teacher} />
                            <AvatarFallback className="text-xs">
                              {group.teacher
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {group.teacher}
                        </div>
                      </TableCell>
                      <TableCell>
                        {group.students}/{group.maxStudents}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={group.progress} className="h-2 w-16" />
                          <span className="text-sm">{group.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={group.status === "Active" ? "default" : "outline"}>{group.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Group</DropdownMenuItem>
                            <DropdownMenuItem>Manage Students</DropdownMenuItem>
                            <DropdownMenuItem>Change Teacher</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Group</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </FullScreenAdminLayout>
  )
}
