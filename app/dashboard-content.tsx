"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  DollarSign,
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  UserCheck,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function DashboardContent() {
  const stats = [
    {
      title: "Jami o'quvchilar",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Faol o'qituvchilar",
      value: "45",
      change: "+3%",
      changeType: "positive" as const,
      icon: UserCheck,
      color: "bg-green-500",
    },
    {
      title: "Oylik daromad",
      value: "₽2,450,000",
      change: "+8%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "bg-yellow-500",
    },
    {
      title: "Faol kurslar",
      value: "28",
      change: "+2",
      changeType: "positive" as const,
      icon: BookOpen,
      color: "bg-purple-500",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "student",
      message: "Yangi o'quvchi ro'yxatdan o'tdi",
      details: "Alisher Karimov - Matematika kursi",
      time: "5 daqiqa oldin",
      status: "success",
    },
    {
      id: 2,
      type: "payment",
      message: "To'lov qabul qilindi",
      details: "Malika Tosheva - ₽500,000",
      time: "15 daqiqa oldin",
      status: "success",
    },
    {
      id: 3,
      type: "class",
      message: "Dars bekor qilindi",
      details: "Fizika darsi - 10-sinf",
      time: "1 soat oldin",
      status: "warning",
    },
    {
      id: 4,
      type: "teacher",
      message: "Yangi o'qituvchi qo'shildi",
      details: "Nodira Ahmadova - Ingliz tili",
      time: "2 soat oldin",
      status: "success",
    },
  ]

  const upcomingClasses = [
    {
      id: 1,
      subject: "Matematika",
      teacher: "Aziz Karimov",
      time: "09:00 - 10:30",
      students: 15,
      room: "A-101",
    },
    {
      id: 2,
      subject: "Ingliz tili",
      teacher: "Nodira Ahmadova",
      time: "11:00 - 12:30",
      students: 12,
      room: "B-205",
    },
    {
      id: 3,
      subject: "Fizika",
      teacher: "Bobur Toshev",
      time: "14:00 - 15:30",
      students: 18,
      room: "C-301",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Boshqaruv paneli</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bugungi kun:{" "}
            {new Date().toLocaleDateString("uz-UZ", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="mr-2 h-4 w-4" />
          Yangi dars qo'shish
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                <span className="text-xs text-gray-500 ml-1">o'tgan oyga nisbatan</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              So'nggi faoliyat
            </CardTitle>
            <CardDescription>Tizimda sodir bo'lgan so'nggi hodisalar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className={`p-1 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-100 dark:bg-green-900"
                        : activity.status === "warning"
                          ? "bg-yellow-100 dark:bg-yellow-900"
                          : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {activity.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Bugungi darslar
            </CardTitle>
            <CardDescription>Bugun bo'ladigan darslar jadvali</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((class_item) => (
                <div key={class_item.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{class_item.subject}</h4>
                    <Badge variant="outline" className="text-xs">
                      {class_item.room}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{class_item.teacher}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{class_item.time}</span>
                    <span>{class_item.students} o'quvchi</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Barcha darslarni ko'rish
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Tezkor amallar</CardTitle>
          <CardDescription>Tez-tez ishlatiladigan funksiyalar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Yangi o'quvchi</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <UserCheck className="h-6 w-6" />
              <span className="text-sm">Yangi o'qituvchi</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Yangi kurs</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Dars rejalashtirish</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
