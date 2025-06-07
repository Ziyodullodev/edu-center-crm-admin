"use client"

import { useState } from "react"
import { FullScreenAdminLayout } from "@/components/fullscreen-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, CheckCircle, Clock, AlertCircle, FileText, User, Users, Calendar, MessageSquare, Mail } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "system",
    title: "System Update Available",
    message: "A new system update is available. Please update to the latest version.",
    time: "10 minutes ago",
    icon: Bell,
    status: "unread",
    category: "System",
  },
  {
    id: 2,
    type: "message",
    title: "New Message from Student",
    message: "You have a new message from John Doe regarding the upcoming exam.",
    time: "30 minutes ago",
    icon: MessageSquare,
    status: "unread",
    category: "Messages",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Received",
    message: "Payment of ₽150,000 received from Sarah Johnson for June tuition.",
    time: "1 hour ago",
    icon: Mail,
    status: "read",
    category: "Payments",
  },
  {
    id: 4,
    type: "event",
    title: "Upcoming Event Reminder",
    message: "Reminder: Parent-Teacher meeting scheduled for tomorrow at 3 PM.",
    time: "2 hours ago",
    icon: Calendar,
    status: "read",
    category: "Events",
  },
  {
    id: 5,
    type: "attendance",
    title: "Attendance Report",
    message: "Monthly attendance report is ready for review.",
    time: "5 hours ago",
    icon: Users,
    status: "unread",
    category: "Attendance",
  },
]

export default function NotificationsPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [status, setStatus] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(search.toLowerCase()) ||
      notification.message.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || notification.category === filter
    const matchesStatus = status === "all" || notification.status === status
    return matchesSearch && matchesFilter && matchesStatus
  })

  return (
    <FullScreenAdminLayout title="Xabarlar">
      <div className="p-6 space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 max-w-2xl">
            <Input
              placeholder="Xabarlar bo'yicha qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={filter}
              onValueChange={setFilter}
              className="w-[180px]"
            >
              <SelectTrigger>
                <SelectValue placeholder="Barcha turdagi xabarlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha turdagi xabarlar</SelectItem>
                <SelectItem value="System">Tizim xabarlar</SelectItem>
                <SelectItem value="Messages">Xabarlar</SelectItem>
                <SelectItem value="Payments">To'lovlar</SelectItem>
                <SelectItem value="Events">Tadbirlar</SelectItem>
                <SelectItem value="Attendance">Davomat</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={status}
              onValueChange={setStatus}
              className="w-[180px]"
            >
              <SelectTrigger>
                <SelectValue placeholder="Barcha holatdagi xabarlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha holatdagi xabarlar</SelectItem>
                <SelectItem value="unread">O'qilmagan</SelectItem>
                <SelectItem value="read">O'qilgan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notifications Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Xabarlar</CardTitle>
              <Badge variant="outline">{filteredNotifications.length} ta</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Turi</TableHead>
                  <TableHead>Xabar sarlavhasi</TableHead>
                  <TableHead>Vaqti</TableHead>
                  <TableHead className="w-[100px]">Holati</TableHead>
                  <TableHead className="w-[100px]">Amal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <notification.icon className="h-5 w-5" />
                        <span className="font-medium">{notification.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{notification.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={notification.status === "unread" ? "destructive" : "secondary"}
                      >
                        {notification.status === "unread" ? "O'qilmagan" : "O'qilgan"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          // Mark as read
                          console.log(`Marking notification ${notification.id} as read`)
                        }}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </FullScreenAdminLayout>
  )
}
