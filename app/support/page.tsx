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
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FullScreenAdminLayout } from "@/components/fullscreen-admin-layout"

const supportRequests = [
  {
    id: "SUP-2024-001",
    title: "Login Issues",
    description: "Unable to access parent portal after password reset",
    requester: "Robert Johnson",
    requesterType: "Parent",
    category: "Technical",
    priority: "High",
    status: "Open",
    assignedTo: "Tech Support",
    createdAt: "Dec 4, 2024 10:30 AM",
    updatedAt: "Dec 4, 2024 2:15 PM",
    responses: 2,
  },
  {
    id: "SUP-2024-002",
    title: "Payment Processing Error",
    description: "Payment was deducted but not reflected in the system",
    requester: "Mary Smith",
    requesterType: "Parent",
    category: "Financial",
    priority: "High",
    status: "In Progress",
    assignedTo: "Finance Team",
    createdAt: "Dec 3, 2024 2:45 PM",
    updatedAt: "Dec 4, 2024 9:00 AM",
    responses: 5,
  },
  {
    id: "SUP-2024-003",
    title: "Grade Discrepancy",
    description: "Student grade shows incorrectly in the system",
    requester: "Alice Johnson",
    requesterType: "Student",
    category: "Academic",
    priority: "Medium",
    status: "Resolved",
    assignedTo: "Academic Team",
    createdAt: "Dec 2, 2024 11:20 AM",
    updatedAt: "Dec 3, 2024 4:30 PM",
    responses: 3,
  },
  {
    id: "SUP-2024-004",
    title: "Schedule Conflict",
    description: "Two classes scheduled at the same time",
    requester: "Dr. Michael Johnson",
    requesterType: "Teacher",
    category: "Scheduling",
    priority: "Medium",
    status: "Open",
    assignedTo: "Admin Team",
    createdAt: "Dec 1, 2024 3:15 PM",
    updatedAt: "Dec 2, 2024 10:00 AM",
    responses: 1,
  },
  {
    id: "SUP-2024-005",
    title: "Feature Request",
    description: "Request for mobile app notifications",
    requester: "Sarah Wilson",
    requesterType: "Parent",
    category: "Feature Request",
    priority: "Low",
    status: "Under Review",
    assignedTo: "Development Team",
    createdAt: "Nov 30, 2024 4:20 PM",
    updatedAt: "Dec 1, 2024 11:30 AM",
    responses: 2,
  },
]

const knowledgeBase = [
  {
    id: 1,
    title: "How to Reset Your Password",
    category: "Account",
    views: 245,
    helpful: 89,
    lastUpdated: "Dec 1, 2024",
  },
  {
    id: 2,
    title: "Payment Methods and Billing",
    category: "Financial",
    views: 189,
    helpful: 76,
    lastUpdated: "Nov 28, 2024",
  },
  {
    id: 3,
    title: "Accessing Student Grades",
    category: "Academic",
    views: 156,
    helpful: 92,
    lastUpdated: "Nov 25, 2024",
  },
  {
    id: 4,
    title: "Class Schedule and Timetables",
    category: "Scheduling",
    views: 134,
    helpful: 78,
    lastUpdated: "Nov 22, 2024",
  },
]

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">High</Badge>
    case "Medium":
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Medium</Badge>
    case "Low":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Low</Badge>
    default:
      return <Badge variant="secondary">{priority}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Resolved":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Resolved</Badge>
    case "In Progress":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">In Progress</Badge>
      )
    case "Open":
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Open</Badge>
    case "Under Review":
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Under Review</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("requests")
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    requester: "",
    requesterType: "",
  })

  const filteredRequests = supportRequests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectRequest = (id: string) => {
    setSelectedRequests((prev) => (prev.includes(id) ? prev.filter((requestId) => requestId !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(filteredRequests.map((request) => request.id))
    }
  }

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddRequestOpen(false)
    setNewRequest({
      title: "",
      description: "",
      category: "",
      priority: "",
      requester: "",
      requesterType: "",
    })
  }

  return (
    <FullScreenAdminLayout title="Support Requests">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Tickets</p>
                  <p className="text-3xl font-bold text-red-600">12</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-600">8</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved Today</p>
                  <p className="text-3xl font-bold text-green-600">15</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
                  <p className="text-3xl font-bold text-blue-600">2.5h</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="requests" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Support Requests
            </TabsTrigger>
            <TabsTrigger
              value="knowledge"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                {selectedRequests.length > 0 && (
                  <Button variant="destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete ({selectedRequests.length})
                  </Button>
                )}
                <Dialog open={isAddRequestOpen} onOpenChange={setIsAddRequestOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-white">Create Support Ticket</DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Create a new support request on behalf of a user.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddRequest}>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="requestTitle" className="text-gray-700 dark:text-gray-300">
                            Title
                          </Label>
                          <Input
                            id="requestTitle"
                            value={newRequest.title}
                            onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="requester" className="text-gray-700 dark:text-gray-300">
                              Requester
                            </Label>
                            <Input
                              id="requester"
                              value={newRequest.requester}
                              onChange={(e) => setNewRequest({ ...newRequest, requester: e.target.value })}
                              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="requesterType" className="text-gray-700 dark:text-gray-300">
                              Requester Type
                            </Label>
                            <Select onValueChange={(value) => setNewRequest({ ...newRequest, requesterType: value })}>
                              <SelectTrigger
                                id="requesterType"
                                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                              >
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Student">Student</SelectItem>
                                <SelectItem value="Parent">Parent</SelectItem>
                                <SelectItem value="Teacher">Teacher</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
                              Category
                            </Label>
                            <Select onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}>
                              <SelectTrigger
                                id="category"
                                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Technical">Technical</SelectItem>
                                <SelectItem value="Academic">Academic</SelectItem>
                                <SelectItem value="Financial">Financial</SelectItem>
                                <SelectItem value="Scheduling">Scheduling</SelectItem>
                                <SelectItem value="Feature Request">Feature Request</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="priority" className="text-gray-700 dark:text-gray-300">
                              Priority
                            </Label>
                            <Select onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}>
                              <SelectTrigger
                                id="priority"
                                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                              >
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={newRequest.description}
                            onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                            placeholder="Detailed description of the issue..."
                            className="min-h-[100px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddRequestOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Create Ticket
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Support Requests Table */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Support Tickets</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[120px]">
                          Ticket ID
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[200px]">
                          Title
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[150px]">
                          Requester
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[120px]">
                          Category
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[100px]">
                          Priority
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[120px]">
                          Status
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[150px]">
                          Assigned To
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[100px]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No support requests found. Try adjusting your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRequests.map((request) => (
                          <TableRow
                            key={request.id}
                            className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedRequests.includes(request.id)}
                                onCheckedChange={() => toggleSelectRequest(request.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium text-gray-900 dark:text-white">{request.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                  <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">{request.title}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                    {request.description}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs bg-gray-200 dark:bg-gray-700">
                                    {request.requester
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm text-gray-900 dark:text-white">{request.requester}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {request.requesterType}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                                {request.category}
                              </Badge>
                            </TableCell>
                            <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{request.assignedTo}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Assign to Me</DropdownMenuItem>
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                  <DropdownMenuItem>Add Response</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Close Ticket</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Knowledge Base Articles</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Title</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Category</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Views</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Helpful Votes</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Last Updated</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {knowledgeBase.map((article) => (
                        <TableRow
                          key={article.id}
                          className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <TableCell className="font-medium text-gray-900 dark:text-white">{article.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                              {article.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{article.views}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{article.helpful}%</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{article.lastUpdated}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Article</DropdownMenuItem>
                                <DropdownMenuItem>Edit Article</DropdownMenuItem>
                                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Resolution Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Clock className="mx-auto h-12 w-12 mb-4" />
                    <p className="text-lg font-semibold">Average resolution time: 4.2 hours</p>
                    <p className="text-sm">Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MessageSquare className="mx-auto h-12 w-12 mb-4" />
                    <p className="text-lg font-semibold">Most common: Technical (35%)</p>
                    <p className="text-sm">Pie chart would go here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FullScreenAdminLayout>
  )
}
