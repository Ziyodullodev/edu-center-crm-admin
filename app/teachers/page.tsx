"use client"

import type React from "react"
import { useState } from "react"
import { Download, Filter, MoreHorizontal, Plus, Search, Star, Users, BookOpen, Award, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import FullScreenAdminLayout from "@/components/fullscreen-admin-layout"

const teachers = [
  {
    id: 1,
    name: "Dr. Michael Johnson",
    email: "michael.johnson@educenter.com",
    subject: "Mathematics",
    groups: ["Mathematics Group A", "Mathematics Group B", "Advanced Calculus"],
    status: "Active",
    joinDate: "Jan 15, 2023",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, Anytown, USA",
    education: "Ph.D. in Mathematics from MIT",
    experience: "10+ years",
    rating: 4.8,
    students: 75,
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Advanced Mathematics, Calculus, Statistics",
    achievements: ["Best Teacher Award 2023", "Research Excellence"],
  },
  {
    id: 2,
    name: "Prof. Sarah Williams",
    email: "sarah.williams@educenter.com",
    subject: "Physics",
    groups: ["Physics Group A", "Physics Group B", "Quantum Physics"],
    status: "Active",
    joinDate: "Mar 5, 2023",
    phone: "+1 (555) 234-5678",
    address: "456 College St, Somewhere, USA",
    education: "Ph.D. in Physics from Stanford",
    experience: "8 years",
    rating: 4.7,
    students: 68,
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Quantum Physics, Thermodynamics, Optics",
    achievements: ["Innovation in Teaching", "Published Researcher"],
  },
  {
    id: 3,
    name: "Dr. James Smith",
    email: "james.smith@educenter.com",
    subject: "Chemistry",
    groups: ["Chemistry Group C", "Organic Chemistry"],
    status: "On Leave",
    joinDate: "Feb 10, 2023",
    phone: "+1 (555) 345-6789",
    address: "789 Science Blvd, Elsewhere, USA",
    education: "Ph.D. in Chemistry from Harvard",
    experience: "12 years",
    rating: 4.9,
    students: 45,
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Organic Chemistry, Biochemistry, Lab Research",
    achievements: ["Excellence in Research", "Student Favorite"],
  },
  {
    id: 4,
    name: "Prof. Emily Davis",
    email: "emily.davis@educenter.com",
    subject: "Biology",
    groups: ["Biology Group A", "Molecular Biology"],
    status: "Active",
    joinDate: "Apr 20, 2023",
    phone: "+1 (555) 456-7890",
    address: "101 Nature Way, Nowhere, USA",
    education: "Ph.D. in Biology from Yale",
    experience: "7 years",
    rating: 4.6,
    students: 52,
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Molecular Biology, Genetics, Biotechnology",
    achievements: ["Young Researcher Award", "Grant Winner"],
  },
  {
    id: 5,
    name: "Dr. Robert Brown",
    email: "robert.brown@educenter.com",
    subject: "Literature",
    groups: ["Literature Group B", "Creative Writing"],
    status: "Active",
    joinDate: "May 5, 2023",
    phone: "+1 (555) 567-8901",
    address: "202 Book Lane, Anywhere, USA",
    education: "Ph.D. in English Literature from Oxford",
    experience: "15 years",
    rating: 4.5,
    students: 38,
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Modern Literature, Creative Writing, Poetry",
    achievements: ["Published Author", "Literary Excellence Award"],
  },
]

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([])
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards")
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
  })

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectTeacher = (id: number) => {
    setSelectedTeachers((prev) => (prev.includes(id) ? prev.filter((teacherId) => teacherId !== id) : [...prev, id]))
  }

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddTeacherOpen(false)
    setNewTeacher({
      name: "",
      email: "",
      subject: "",
      phone: "",
      address: "",
      education: "",
      experience: "",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
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
          <span className="text-foreground font-medium">O'qituvchilar</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bizning o'qituvchilar</h1>
            <p className="text-muted-foreground mt-1">Tajribali va fidoyi o'qituvchilar bilan tanishing</p>
          </div>
          <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                O'qituvchi qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Enter the teacher's information below. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTeacher}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newTeacher.name}
                        onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newTeacher.email}
                        onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newTeacher.phone}
                        onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select onValueChange={(value) => setNewTeacher({ ...newTeacher, subject: value })}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                          <SelectItem value="Biology">Biology</SelectItem>
                          <SelectItem value="Literature">Literature</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newTeacher.address}
                      onChange={(e) => setNewTeacher({ ...newTeacher, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={newTeacher.education}
                        onChange={(e) => setNewTeacher({ ...newTeacher, education: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Input
                        id="experience"
                        value={newTeacher.experience}
                        onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddTeacherOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Save Teacher
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
                  <p className="text-blue-100">Total Teachers</p>
                  <p className="text-3xl font-bold">{teachers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Teachers</p>
                  <p className="text-3xl font-bold">{teachers.filter((t) => t.status === "Active").length}</p>
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
                  <p className="text-3xl font-bold">{teachers.reduce((sum, t) => sum + t.students, 0)}</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Avg Rating</p>
                  <p className="text-3xl font-bold">
                    {(teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length).toFixed(1)}
                  </p>
                </div>
                <Star className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="O'qituvchilarni qidirish..."
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
          </div>
        </div>

        {/* Teachers Display */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{teacher.name}</CardTitle>
                      <CardDescription className="text-sm">{teacher.subject}</CardDescription>
                      <Badge
                        variant={
                          teacher.status === "Active"
                            ? "default"
                            : teacher.status === "On Leave"
                              ? "secondary"
                              : "outline"
                        }
                        className="mt-1"
                      >
                        {teacher.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {renderStars(teacher.rating)}
                      <span className="text-sm text-muted-foreground ml-2">{teacher.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{teacher.students} students</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      {teacher.email}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      {teacher.phone}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Award className="h-4 w-4 mr-2" />
                      {teacher.experience}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Specialization:</p>
                    <p className="text-sm text-muted-foreground">{teacher.specialization}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Groups:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.groups.slice(0, 2).map((group, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {group}
                        </Badge>
                      ))}
                      {teacher.groups.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{teacher.groups.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign to Group</DropdownMenuItem>
                        <DropdownMenuItem>View Schedule</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
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
              <h2 className="text-lg font-semibold text-foreground">Teaching Staff</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedTeachers.includes(teacher.id)}
                          onCheckedChange={() => toggleSelectTeacher(teacher.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                            <AvatarFallback>
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-foreground">{teacher.name}</div>
                            <div className="text-xs text-muted-foreground">{teacher.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.students}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {renderStars(teacher.rating)}
                          <span className="text-sm ml-1">{teacher.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            teacher.status === "Active"
                              ? "default"
                              : teacher.status === "On Leave"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{teacher.experience}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>Assign to Group</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
