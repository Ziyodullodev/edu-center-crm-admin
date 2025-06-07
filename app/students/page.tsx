"use client"
import { useState } from "react"
import { FullScreenAdminLayout } from "@/components/fullscreen-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  UserPlus,
  Search,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  GraduationCap,
  Calendar,
} from "lucide-react"

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterGroup, setFilterGroup] = useState("all")

  const students = [
    {
      id: "STU-001",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      group: "Mathematics A1",
      grade: "10th Grade",
      status: "active",
      enrollmentDate: "2024-01-15",
      lastActivity: "2024-01-20",
      attendance: 95,
      gpa: 3.8,
      address: "123 Main St, City",
      parentName: "Robert Johnson",
      parentPhone: "+1 (555) 123-4568",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "STU-002",
      name: "Bob Smith",
      email: "bob.smith@email.com",
      phone: "+1 (555) 234-5678",
      group: "Physics B2",
      grade: "11th Grade",
      status: "active",
      enrollmentDate: "2024-01-10",
      lastActivity: "2024-01-19",
      attendance: 88,
      gpa: 3.6,
      address: "456 Oak Ave, City",
      parentName: "Mary Smith",
      parentPhone: "+1 (555) 234-5679",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "STU-003",
      name: "Carol Davis",
      email: "carol.davis@email.com",
      phone: "+1 (555) 345-6789",
      group: "Chemistry C1",
      grade: "12th Grade",
      status: "inactive",
      enrollmentDate: "2023-09-01",
      lastActivity: "2024-01-05",
      attendance: 72,
      gpa: 3.2,
      address: "789 Pine Rd, City",
      parentName: "David Davis",
      parentPhone: "+1 (555) 345-6790",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const stats = [
    {
      title: "Jami o'quvchilar",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Faol o'quvchilar",
      value: "1,156",
      change: "+8%",
      changeType: "positive",
      icon: GraduationCap,
    },
    {
      title: "Yangi o'quvchilar",
      value: "89",
      change: "+23%",
      changeType: "positive",
      icon: UserPlus,
    },
    {
      title: "O'rtacha davomat",
      value: "92%",
      change: "-2%",
      changeType: "negative",
      icon: Calendar,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Faol</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Nofaol</Badge>
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Kutilmoqda</Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 90) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{attendance}%</Badge>
    } else if (attendance >= 75) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">{attendance}%</Badge>
      )
    } else {
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">{attendance}%</Badge>
    }
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || student.status === filterStatus
    const matchesGroup = filterGroup === "all" || student.group.includes(filterGroup)
    return matchesSearch && matchesStatus && matchesGroup
  })

  return (
    <FullScreenAdminLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">O'quvchilar</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Barcha o'quvchilarni boshqarish va kuzatish</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Yangi o'quvchi
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Eksport
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.title}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>O'quvchilar ro'yxati</CardTitle>
                <CardDescription>Tizimda ro'yxatdan o'tgan barcha o'quvchilar</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="O'quvchilarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Holat bo'yicha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha holatlar</SelectItem>
                  <SelectItem value="active">Faol</SelectItem>
                  <SelectItem value="inactive">Nofaol</SelectItem>
                  <SelectItem value="pending">Kutilmoqda</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterGroup} onValueChange={setFilterGroup}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Guruh bo'yicha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha guruhlar</SelectItem>
                  <SelectItem value="Mathematics">Matematika</SelectItem>
                  <SelectItem value="Physics">Fizika</SelectItem>
                  <SelectItem value="Chemistry">Kimyo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">O'quvchi</TableHead>
                    <TableHead>Guruh</TableHead>
                    <TableHead>Sinf</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Davomat</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Oxirgi faollik</TableHead>
                    <TableHead className="text-right">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                            <div className="text-xs text-gray-400">{student.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{student.group}</div>
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>{getAttendanceBadge(student.attendance)}</TableCell>
                      <TableCell>
                        <div className="font-medium">{student.gpa.toFixed(1)}</div>
                      </TableCell>
                      <TableCell>{student.lastActivity}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Amallar</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ko'rish
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Tahrirlash
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              O'chirish
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </FullScreenAdminLayout>
  )
}
