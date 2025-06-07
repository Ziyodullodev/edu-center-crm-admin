"use client"

import { FullScreenAdminLayout } from "@/components/fullscreen-admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  GraduationCap,
  UsersRound,
  CreditCard,
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  DollarSign,
  UserPlus,
  BookPlus,
  CalendarPlus,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Target,
  Zap,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  AreaChart,
  Area,
  Pie,
} from "recharts"

export default function Dashboard() {
  // Mock data for charts
  const monthlyData = [
    { month: "Yan", students: 1200, revenue: 24000, teachers: 45 },
    { month: "Fev", students: 1250, revenue: 26500, teachers: 48 },
    { month: "Mar", students: 1180, revenue: 23800, teachers: 46 },
    { month: "Apr", students: 1320, revenue: 28200, teachers: 52 },
    { month: "May", students: 1380, revenue: 31500, teachers: 55 },
    { month: "Iyun", students: 1420, revenue: 33800, teachers: 58 },
  ]

  const groupData = [
    { name: "Ingliz tili", value: 35, color: "#3B82F6" },
    { name: "Matematika", value: 25, color: "#10B981" },
    { name: "Fizika", value: 20, color: "#F59E0B" },
    { name: "Kimyo", value: 15, color: "#EF4444" },
    { name: "Boshqalar", value: 5, color: "#8B5CF6" },
  ]

  const weeklyActivity = [
    { day: "Dush", lessons: 45, attendance: 92 },
    { day: "Sesh", lessons: 52, attendance: 88 },
    { day: "Chor", lessons: 48, attendance: 95 },
    { day: "Pay", lessons: 55, attendance: 90 },
    { day: "Juma", lessons: 42, attendance: 85 },
    { day: "Shan", lessons: 38, attendance: 78 },
    { day: "Yak", lessons: 25, attendance: 82 },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "student",
      message: "Yangi o'quvchi Aziza Karimova ro'yxatdan o'tdi",
      time: "5 daqiqa oldin",
      icon: UserPlus,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "payment",
      message: "Ahmad Toshev tomonidan 500,000 so'm to'lov qilindi",
      time: "15 daqiqa oldin",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "lesson",
      message: "Ingliz tili darsi yakunlandi (Guruh A-1)",
      time: "30 daqiqa oldin",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "event",
      message: "Ertaga 'Ochiq dars' tadbirini eslatma",
      time: "1 soat oldin",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      id: 5,
      type: "teacher",
      message: "Yangi o'qituvchi Dilshod Rahimov qo'shildi",
      time: "2 soat oldin",
      icon: GraduationCap,
      color: "text-indigo-600",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Ochiq dars - Ingliz tili",
      date: "Bugun",
      time: "14:00",
      type: "lesson",
      participants: 25,
    },
    {
      id: 2,
      title: "Ota-onalar yig'ilishi",
      date: "Ertaga",
      time: "18:00",
      type: "meeting",
      participants: 45,
    },
    {
      id: 3,
      title: "Matematika olimpiadasi",
      date: "3 kun",
      time: "10:00",
      type: "competition",
      participants: 80,
    },
    {
      id: 4,
      title: "O'qituvchilar seminari",
      date: "1 hafta",
      time: "09:00",
      type: "training",
      participants: 15,
    },
  ]

  const topTeachers = [
    {
      id: 1,
      name: "Malika Abdullayeva",
      subject: "Ingliz tili",
      rating: 4.9,
      students: 45,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Bobur Karimov",
      subject: "Matematika",
      rating: 4.8,
      students: 38,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Sevara Tosheva",
      subject: "Fizika",
      rating: 4.7,
      students: 32,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <FullScreenAdminLayout title="Boshqaruv paneli">
      <div className="space-y-6">
        {/* Header with Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Boshqaruv paneli</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">EduCenter CRM tizimi umumiy ko'rinishi</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Yangi o'quvchi
            </Button>
            <Button size="sm" variant="outline">
              <BookPlus className="h-4 w-4 mr-2" />
              Dars qo'shish
            </Button>
            <Button size="sm" variant="outline">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Tadbir
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami o'quvchilar</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,420</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% o'tgan oyga nisbatan
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami o'qituvchilar</CardTitle>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3 yangi o'qituvchi
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faol guruhlar</CardTitle>
              <UsersRound className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <div className="flex items-center text-xs text-blue-600">
                <Activity className="h-3 w-3 mr-1" />
                85% to'liqlik darajasi
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Oylik daromad</CardTitle>
              <CreditCard className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">33.8M so'm</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% o'sish
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue and Students Chart */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                O'quvchilar va daromad dinamikasi
              </CardTitle>
              <CardDescription>So'nggi 6 oylik ko'rsatkichlar</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="students"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Distribution */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-green-600" />
                Fanlar bo'yicha taqsimot
              </CardTitle>
              <CardDescription>Guruhlar soni bo'yicha</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={groupData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {groupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {groupData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Haftalik faollik
            </CardTitle>
            <CardDescription>Darslar soni va davomat ko'rsatkichlari</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="lessons" fill="#3B82F6" name="Darslar soni" />
                <Bar yAxisId="right" dataKey="attendance" fill="#10B981" name="Davomat %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Recent Activities */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                So'nggi faollik
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Yaqinlashayotgan tadbirlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {event.date}
                      </Badge>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">{event.participants}</div>
                    <div className="text-xs text-gray-500">ishtirokchi</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Teachers */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Eng yaxshi o'qituvchilar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topTeachers.map((teacher, index) => (
                <div key={teacher.id} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{teacher.name}</h4>
                    <p className="text-xs text-gray-500">{teacher.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{teacher.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{teacher.students} o'quvchi</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Indicators */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                Oylik maqsad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>1,500 o'quvchi</span>
                  <span className="font-medium">94.7%</span>
                </div>
                <Progress value={94.7} className="h-2" />
                <p className="text-xs text-gray-500">80 o'quvchi yetishmaydi</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-600" />
                Davomat darajasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Umumiy davomat</span>
                  <span className="font-medium">89.2%</span>
                </div>
                <Progress value={89.2} className="h-2" />
                <p className="text-xs text-green-600">+2.1% o'tgan haftaga nisbatan</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                To'lov holati
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>To'langan</span>
                  <span className="font-medium">92.5%</span>
                </div>
                <Progress value={92.5} className="h-2" />
                <p className="text-xs text-gray-500">7.5% qarzdorlik</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-600" />
                Reyting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>O'rtacha baho</span>
                  <span className="font-medium">4.7/5.0</span>
                </div>
                <Progress value={94} className="h-2" />
                <p className="text-xs text-green-600">Ajoyib natija!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FullScreenAdminLayout>
  )
}
