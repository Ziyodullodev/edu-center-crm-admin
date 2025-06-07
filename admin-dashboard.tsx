"use client"

import { useState } from "react"
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  PlusCircle,
  Search,
  Settings,
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  Clock,
  MoreHorizontal,
  Filter,
  Download,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Overview",
    items: [{ title: "Dashboard", icon: Home, url: "#", active: true }],
  },
  {
    title: "Management",
    items: [
      { title: "Students", icon: GraduationCap, url: "#" },
      { title: "Teachers", icon: UserCheck, url: "#" },
      { title: "Groups", icon: Users, url: "#" },
      { title: "Payments", icon: CreditCard, url: "#" },
    ],
  },
  {
    title: "Academic",
    items: [
      { title: "Learning Materials", icon: BookOpen, url: "#" },
      { title: "Exams & Tests", icon: FileText, url: "#" },
      { title: "Events & Notifications", icon: Calendar, url: "#" },
    ],
  },
  {
    title: "Communication",
    items: [
      { title: "Parents Access", icon: Users, url: "#" },
      { title: "Support Requests", icon: MessageSquare, url: "#" },
    ],
  },
  {
    title: "System",
    items: [{ title: "Settings", icon: Settings, url: "#" }],
  },
]

const kpiData = [
  {
    title: "Total Students",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: GraduationCap,
  },
  {
    title: "Active Teachers",
    value: "89",
    change: "+3%",
    changeType: "positive",
    icon: UserCheck,
  },
  {
    title: "Today's Attendance",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive",
    icon: Clock,
  },
  {
    title: "Pending Payments",
    value: "$12,450",
    change: "-8%",
    changeType: "negative",
    icon: DollarSign,
  },
]

const recentActivities = [
  {
    id: 1,
    type: "student_registration",
    message: "New student Sarah Johnson registered for Mathematics Group A",
    time: "2 minutes ago",
    icon: GraduationCap,
  },
  {
    id: 2,
    type: "homework_submitted",
    message: "15 students submitted Physics homework for Group B",
    time: "1 hour ago",
    icon: FileText,
  },
  {
    id: 3,
    type: "payment_received",
    message: "Payment of $450 received from John Smith",
    time: "3 hours ago",
    icon: CreditCard,
  },
  {
    id: 4,
    type: "message_sent",
    message: "Notification sent to all parents about upcoming exam",
    time: "5 hours ago",
    icon: MessageSquare,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Mathematics Final Exam",
    date: "Dec 15, 2024",
    time: "10:00 AM",
    type: "exam",
    participants: 45,
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "Dec 18, 2024",
    time: "2:00 PM",
    type: "meeting",
    participants: 120,
  },
  {
    id: 3,
    title: "Science Fair Presentation",
    date: "Dec 20, 2024",
    time: "9:00 AM",
    type: "event",
    participants: 200,
  },
]

const recentStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    group: "Math Group A",
    status: "Active",
    joinDate: "Dec 1, 2024",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    group: "Physics Group B",
    status: "Active",
    joinDate: "Nov 28, 2024",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    group: "Chemistry Group C",
    status: "Pending",
    joinDate: "Nov 25, 2024",
  },
]

function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">EduCenter CRM</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.active}>
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm">
            <p className="font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@educenter.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search students, teachers, groups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-96"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">Admin User</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Home
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-400">/</span>
                  </li>
                  <li>
                    <span className="text-gray-900 font-medium">Dashboard</span>
                  </li>
                </ol>
              </nav>
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600 mt-2">
                Welcome back! Here's what's happening at your education center today.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                        <p
                          className={`text-sm mt-2 flex items-center ${
                            kpi.changeType === "positive" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {kpi.change} from last month
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <kpi.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Activities */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Activities
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <activity.icon className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Student
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Create Group
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Send Notification
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Assignment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Event
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Upcoming Events
                    <Button variant="ghost" size="sm">
                      View Calendar
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{event.participants} participants</p>
                        </div>
                        <Badge
                          variant={
                            event.type === "exam" ? "destructive" : event.type === "meeting" ? "default" : "secondary"
                          }
                        >
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Attendance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">January</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">February</span>
                      <span className="text-sm font-medium">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">March</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">April</span>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Students Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Student Registrations
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {student.name}
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.group}</TableCell>
                        <TableCell>
                          <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{student.joinDate}</TableCell>
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
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
