"use client"
import { useState } from "react"
import { FullScreenAdminLayout } from "@/components/fullscreen-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Bell,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function EventsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const events = [
    {
      id: "EVT-001",
      title: "Parent-Teacher Conference",
      type: "meeting",
      date: "2024-01-25",
      time: "14:00",
      endTime: "17:00",
      location: "Main Hall",
      attendees: 45,
      maxAttendees: 50,
      status: "scheduled",
      priority: "high",
      description: "Quarterly parent-teacher meeting to discuss student progress and academic performance",
      organizer: "Sarah Johnson",
      category: "Academic",
    },
    {
      id: "EVT-002",
      title: "Science Fair 2024",
      type: "event",
      date: "2024-01-30",
      time: "09:00",
      endTime: "15:00",
      location: "Science Laboratory",
      attendees: 120,
      maxAttendees: 150,
      status: "scheduled",
      priority: "medium",
      description: "Annual science fair showcasing student projects and innovations",
      organizer: "Dr. Michael Chen",
      category: "Competition",
    },
    {
      id: "EVT-003",
      title: "Mathematics Competition",
      type: "competition",
      date: "2024-01-20",
      time: "10:00",
      endTime: "12:00",
      location: "Auditorium",
      attendees: 60,
      maxAttendees: 80,
      status: "completed",
      priority: "high",
      description: "Inter-school mathematics competition for grades 9-12",
      organizer: "Prof. Lisa Wang",
      category: "Competition",
    },
    {
      id: "EVT-004",
      title: "Holiday Celebration",
      type: "celebration",
      date: "2024-02-05",
      time: "15:00",
      endTime: "18:00",
      location: "School Grounds",
      attendees: 200,
      maxAttendees: 250,
      status: "scheduled",
      priority: "low",
      description: "End of semester celebration event with cultural performances",
      organizer: "Events Committee",
      category: "Social",
    },
    {
      id: "EVT-005",
      title: "Career Guidance Workshop",
      type: "workshop",
      date: "2024-01-28",
      time: "13:00",
      endTime: "16:00",
      location: "Conference Room A",
      attendees: 35,
      maxAttendees: 40,
      status: "scheduled",
      priority: "medium",
      description: "Career guidance and counseling session for final year students",
      organizer: "Career Counselor",
      category: "Academic",
    },
  ]

  const notifications = [
    {
      id: "NOT-001",
      title: "Exam Schedule Updated",
      message: "Mathematics final exam has been rescheduled to January 25th at 10:00 AM",
      type: "info",
      timestamp: "2 hours ago",
      read: false,
      priority: "high",
      recipient: "All Students",
    },
    {
      id: "NOT-002",
      title: "New Assignment Posted",
      message: "Physics assignment on thermodynamics is now available in the learning portal",
      type: "assignment",
      timestamp: "4 hours ago",
      read: true,
      priority: "medium",
      recipient: "Physics Students",
    },
    {
      id: "NOT-003",
      title: "Payment Reminder",
      message: "Monthly fee payment due in 3 days. Please complete payment to avoid late fees",
      type: "payment",
      timestamp: "1 day ago",
      read: false,
      priority: "high",
      recipient: "All Parents",
    },
    {
      id: "NOT-004",
      title: "System Maintenance",
      message: "Scheduled maintenance on January 22nd from 2:00 AM to 4:00 AM. Services may be unavailable",
      type: "system",
      timestamp: "2 days ago",
      read: true,
      priority: "low",
      recipient: "All Users",
    },
    {
      id: "NOT-005",
      title: "Library Hours Extended",
      message: "Library will remain open until 8:00 PM during exam week for student convenience",
      type: "info",
      timestamp: "3 days ago",
      read: false,
      priority: "medium",
      recipient: "All Students",
    },
  ]

  const stats = [
    {
      title: "Upcoming Events",
      value: "12",
      change: "+3",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "Active Notifications",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: Bell,
    },
    {
      title: "This Month Events",
      value: "25",
      change: "+15%",
      changeType: "positive",
      icon: Clock,
    },
    {
      title: "Total Attendees",
      value: "460",
      change: "+8%",
      changeType: "positive",
      icon: Users,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Bell className="h-4 w-4 text-blue-500" />
      case "assignment":
        return <Calendar className="h-4 w-4 text-green-500" />
      case "payment":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "system":
        return <Bell className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || event.type === filterType
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <FullScreenAdminLayout title="Events & Notifications">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Events Management</CardTitle>
                    <CardDescription>Manage and schedule educational events</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Event
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create New Event</DialogTitle>
                          <DialogDescription>Fill in the details to create a new event.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                              Title
                            </Label>
                            <Input id="title" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                              Type
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                <SelectItem value="event">Event</SelectItem>
                                <SelectItem value="competition">Competition</SelectItem>
                                <SelectItem value="workshop">Workshop</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea id="description" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Create Event</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Attendees</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.category}</div>
                              <div className="text-xs text-gray-400">{event.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{event.date}</div>
                              <div className="text-sm text-gray-500">
                                {event.time} - {event.endTime}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                              {event.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4 text-gray-400" />
                              {event.attendees}/{event.maxAttendees}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(event.status)}</TableCell>
                          <TableCell>{getPriorityBadge(event.priority)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Event
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Cancel Event
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

          {/* Notifications Section */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Notifications</CardTitle>
                    <CardDescription>Latest system notifications</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        !notification.read
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200"
                          : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                            {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            {getPriorityBadge(notification.priority)}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">To: {notification.recipient}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FullScreenAdminLayout>
  )
}
