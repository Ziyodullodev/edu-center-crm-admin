"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  BookOpen,
  CheckCircle2,
  FileText,
  LogOut,
  MessageCircle,
  Phone,
  Send,
  Upload,
  Users,
  XCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function TeacherDashboard() {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: "Alice Johnson", present: true, hasComment: false },
    { id: 2, name: "Bob Smith", present: true, hasComment: false },
    { id: 3, name: "Carol Davis", present: false, hasComment: true },
    { id: 4, name: "David Wilson", present: true, hasComment: false },
    { id: 5, name: "Emma Brown", present: false, hasComment: false },
  ])

  const [homeworkOpen, setHomeworkOpen] = useState(false)
  const [broadcastMessage, setBroadcastMessage] = useState("")

  const students = [
    { id: 1, name: "Alice Johnson", attendance: "95%", phone: "+1234567890" },
    { id: 2, name: "Bob Smith", attendance: "88%", phone: "+1234567891" },
    { id: 3, name: "Carol Davis", attendance: "92%", phone: "+1234567892" },
    { id: 4, name: "David Wilson", attendance: "97%", phone: "+1234567893" },
    { id: 5, name: "Emma Brown", attendance: "85%", phone: "+1234567894" },
  ]

  const toggleAttendance = (id: number) => {
    setAttendanceData((prev) =>
      prev.map((student) => (student.id === id ? { ...student, present: !student.present } : student)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-[#0088cc]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold text-gray-900">Teacher Dashboard</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Teacher Profile Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Teacher" />
                <AvatarFallback className="bg-[#0088cc] text-white text-lg">MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">Maria Johnson</h2>
                <p className="text-[#0088cc] font-medium">Mathematics Teacher</p>
                <p className="text-sm text-gray-600">Group 10A • 25 Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Attendance */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="h-5 w-5 text-[#0088cc]" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {attendanceData.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={student.present}
                    onCheckedChange={() => toggleAttendance(student.id)}
                    className="data-[state=checked]:bg-[#0088cc] data-[state=checked]:border-[#0088cc]"
                  />
                  <span className={`font-medium ${student.present ? "text-gray-900" : "text-gray-500"}`}>
                    {student.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {student.present ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                      Present
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-100 text-red-700 border-0">
                      Absent
                    </Badge>
                  )}
                  {student.hasComment && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0088cc]">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button className="w-full bg-[#0088cc] hover:bg-[#0077bb] text-white rounded-lg">Save Attendance</Button>
          </CardContent>
        </Card>

        {/* Broadcast Message */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Send className="h-5 w-5 text-[#0088cc]" />
              Broadcast to Group
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your message to the group..."
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="min-h-[80px] border-gray-200 focus:border-[#0088cc] focus:ring-[#0088cc]"
            />
            <Button className="w-full bg-[#0088cc] hover:bg-[#0077bb] text-white rounded-lg">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-[#0088cc]" />
              Students
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">Attendance: {student.attendance}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-[#0088cc]">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Homework Assignment */}
        <Card className="border-0 shadow-sm">
          <Collapsible open={homeworkOpen} onOpenChange={setHomeworkOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 cursor-pointer hover:bg-gray-50 rounded-t-lg transition-colors">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#0088cc]" />
                    Assign Homework
                  </div>
                  <div className={`transform transition-transform ${homeworkOpen ? "rotate-180" : ""}`}>
                    <XCircle className="h-5 w-5 text-gray-400" />
                  </div>
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe the homework assignment..."
                  className="min-h-[100px] border-gray-200 focus:border-[#0088cc] focus:ring-[#0088cc]"
                />
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex-1 border-gray-200 text-gray-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                  <Input type="date" className="flex-1 border-gray-200 focus:border-[#0088cc]" />
                </div>
                <Button className="w-full bg-[#0088cc] hover:bg-[#0077bb] text-white rounded-lg">
                  <FileText className="h-4 w-4 mr-2" />
                  Assign to Group
                </Button>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="h-14 w-14 rounded-full bg-[#0088cc] hover:bg-[#0077bb] text-white shadow-lg">
          <Bell className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
