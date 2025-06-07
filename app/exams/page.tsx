"use client"
import { useState } from "react"
import { FullScreenAdminLayout } from "@/components/fullscreen-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Download, Clock, Users, FileText, Calendar, MoreHorizontal } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ExamsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("exams")

  const exams = [
    {
      id: 1,
      title: "Mathematics Final Exam",
      subject: "Mathematics",
      group: "Mathematics Group A",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      duration: "2 hours",
      totalMarks: 100,
      passingMarks: 60,
      status: "scheduled",
      participants: 25,
      completed: 0,
      type: "Final Exam",
      description: "Comprehensive mathematics final examination covering all topics",
    },
    {
      id: 2,
      title: "Physics Mid-term Test",
      subject: "Physics",
      group: "Physics Group B",
      date: "Dec 10, 2024",
      time: "2:00 PM",
      duration: "1.5 hours",
      totalMarks: 75,
      passingMarks: 45,
      status: "in-progress",
      participants: 20,
      completed: 12,
      type: "Mid-term",
      description: "Mid-term assessment for physics concepts",
    },
    {
      id: 3,
      title: "Chemistry Quiz",
      subject: "Chemistry",
      group: "Chemistry Group C",
      date: "Dec 5, 2024",
      time: "11:00 AM",
      duration: "45 minutes",
      totalMarks: 50,
      passingMarks: 30,
      status: "completed",
      participants: 18,
      completed: 18,
      type: "Quiz",
      description: "Quick assessment on chemical reactions",
    },
    {
      id: 4,
      title: "English Literature Essay",
      subject: "English",
      group: "English Group A",
      date: "Dec 20, 2024",
      time: "9:00 AM",
      duration: "3 hours",
      totalMarks: 100,
      passingMarks: 60,
      status: "scheduled",
      participants: 30,
      completed: 0,
      type: "Essay Exam",
      description: "Comprehensive essay examination on literature analysis",
    },
  ]

  const results = [
    {
      id: 1,
      examTitle: "Chemistry Quiz",
      student: "Alice Johnson",
      score: 45,
      totalMarks: 50,
      percentage: 90,
      grade: "A",
      submittedAt: "Dec 5, 2024 11:42 AM",
    },
    {
      id: 2,
      examTitle: "Chemistry Quiz",
      student: "Bob Smith",
      score: 38,
      totalMarks: 50,
      percentage: 76,
      grade: "B",
      submittedAt: "Dec 5, 2024 11:38 AM",
    },
    {
      id: 3,
      examTitle: "Physics Mid-term Test",
      student: "Carol Davis",
      score: 65,
      totalMarks: 75,
      percentage: 87,
      grade: "A",
      submittedAt: "Dec 10, 2024 3:25 PM",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Scheduled</Badge>
      case "in-progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">In Progress</Badge>
        )
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      "Final Exam": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "Mid-term": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Quiz: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Essay Exam": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.group.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || exam.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <FullScreenAdminLayout title="Exams & Tests">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Exams</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
              <p className="text-xs text-green-600 dark:text-green-400">+2 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Next 30 days</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Participants</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">143</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total enrolled</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1.5h</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Average time</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="exams" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Exams & Tests
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
              Results
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exams" className="space-y-6">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-1 gap-4 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Exam
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-white">Create New Exam</DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Set up a new examination or test for your students.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right text-gray-700 dark:text-gray-300">
                          Title
                        </Label>
                        <Input
                          id="title"
                          className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                          placeholder="Enter exam title"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right text-gray-700 dark:text-gray-300">
                          Subject
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right text-gray-700 dark:text-gray-300">
                          Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right text-gray-700 dark:text-gray-300">
                          Duration
                        </Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 2 hours"
                          className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right text-gray-700 dark:text-gray-300">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                          placeholder="Brief description of the exam"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Create Exam
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Exams Table */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Examinations</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Manage all exams, tests, and quizzes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[200px]">
                          Title
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[120px]">
                          Subject
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[150px]">
                          Group
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[140px]">
                          Date & Time
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[100px]">
                          Duration
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[100px]">
                          Status
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[120px]">
                          Progress
                        </TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold min-w-[100px]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExams.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No exams found. Try adjusting your search.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredExams.map((exam) => (
                          <TableRow
                            key={exam.id}
                            className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          >
                            <TableCell className="font-medium text-gray-900 dark:text-white">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <div className="font-semibold">{exam.title}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {getTypeBadge(exam.type)}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{exam.subject}</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{exam.group}</TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3" />
                                {exam.date}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="h-3 w-3" />
                                {exam.time}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{exam.duration}</TableCell>
                            <TableCell>{getStatusBadge(exam.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {exam.completed}/{exam.participants}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${(exam.completed / exam.participants) * 100}%` }}
                                ></div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Exam</DropdownMenuItem>
                                  <DropdownMenuItem>View Results</DropdownMenuItem>
                                  <DropdownMenuItem>Download Report</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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

          <TabsContent value="results" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Exam Results</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  View and manage student exam results
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Exam</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Student</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Score</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Percentage</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Grade</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Submitted At</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((result) => (
                        <TableRow
                          key={result.id}
                          className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <TableCell className="font-medium text-gray-900 dark:text-white">
                            {result.examTitle}
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{result.student}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">
                            {result.score}/{result.totalMarks}
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{result.percentage}%</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                result.percentage >= 90
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : result.percentage >= 80
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : result.percentage >= 70
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }
                            >
                              {result.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">{result.submittedAt}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Download Certificate</DropdownMenuItem>
                                <DropdownMenuItem>Send to Parent</DropdownMenuItem>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">82.5%</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Across all exams</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">94.2%</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Students completing exams</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Total Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">24</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This semester</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FullScreenAdminLayout>
  )
}
