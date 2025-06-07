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
import { Plus, Search, Filter, Download, Edit, Trash2, UserCheck, Users, Clock, Shield } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function ParentsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAccess, setFilterAccess] = useState("all")

  const parents = [
    {
      id: 1,
      parentName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 8901",
      studentName: "Emma Smith",
      studentClass: "Grade 10-A",
      accessLevel: "full",
      lastLogin: "2024-01-15 14:30",
      status: "active",
      joinDate: "2023-09-01",
    },
    {
      id: 2,
      parentName: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1 234 567 8902",
      studentName: "Carlos Garcia",
      studentClass: "Grade 8-B",
      accessLevel: "limited",
      lastLogin: "2024-01-14 09:15",
      status: "active",
      joinDate: "2023-08-15",
    },
    {
      id: 3,
      parentName: "David Johnson",
      email: "david.johnson@email.com",
      phone: "+1 234 567 8903",
      studentName: "Sarah Johnson",
      studentClass: "Grade 12-A",
      accessLevel: "full",
      lastLogin: "2024-01-13 16:45",
      status: "inactive",
      joinDate: "2023-07-20",
    },
    {
      id: 4,
      parentName: "Lisa Chen",
      email: "lisa.chen@email.com",
      phone: "+1 234 567 8904",
      studentName: "Kevin Chen",
      studentClass: "Grade 9-C",
      accessLevel: "view-only",
      lastLogin: "2024-01-12 11:20",
      status: "active",
      joinDate: "2023-10-05",
    },
  ]

  const getAccessBadge = (access: string) => {
    switch (access) {
      case "full":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Full Access</Badge>
      case "limited":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Limited</Badge>
      case "view-only":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">View Only</Badge>
      default:
        return <Badge variant="secondary">{access}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{t("active")}</Badge>
        )
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">{t("inactive")}</Badge>
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            {t("pending")}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterAccess === "all" || parent.accessLevel === filterAccess
    return matchesSearch && matchesFilter
  })

  return (
    <FullScreenAdminLayout title={t("parents")}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Parents</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">142</div>
              <p className="text-xs text-muted-foreground">91% active rate</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Access</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">89</div>
              <p className="text-xs text-muted-foreground">57% of parents</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Logins</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">78</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-4 w-full sm:w-auto">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
            <Select value={filterAccess} onValueChange={setFilterAccess}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("filter")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Access Levels</SelectItem>
                <SelectItem value="full">Full Access</SelectItem>
                <SelectItem value="limited">Limited</SelectItem>
                <SelectItem value="view-only">View Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-300 dark:border-gray-600">
              <Download className="h-4 w-4 mr-2" />
              {t("export")}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("grantAccess")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-white">{t("grantAccess")}</DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    Grant access to a new parent account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parentName" className="text-right text-gray-700 dark:text-gray-300">
                      {t("parentName")}
                    </Label>
                    <Input
                      id="parentName"
                      className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="student" className="text-right text-gray-700 dark:text-gray-300">
                      {t("studentName")}
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emma">Emma Smith</SelectItem>
                        <SelectItem value="carlos">Carlos Garcia</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="kevin">Kevin Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="accessLevel" className="text-right text-gray-700 dark:text-gray-300">
                      {t("accessLevel")}
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Access</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                        <SelectItem value="view-only">View Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    {t("grantAccess")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Parents Table */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Parents Access Management</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Manage parent accounts and access permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  <TableHead className="text-gray-700 dark:text-gray-300">{t("parentName")}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Contact</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{t("studentName")}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Class</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{t("accessLevel")}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">{t("lastLogin")}</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParents.map((parent) => (
                  <TableRow key={parent.id} className="border-gray-200 dark:border-gray-700">
                    <TableCell className="font-medium text-gray-900 dark:text-white">{parent.parentName}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      <div>{parent.email}</div>
                      <div className="text-sm text-gray-500">{parent.phone}</div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{parent.studentName}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{parent.studentClass}</TableCell>
                    <TableCell>{getAccessBadge(parent.accessLevel)}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      <div>{parent.lastLogin.split(" ")[0]}</div>
                      <div className="text-sm text-gray-500">{parent.lastLogin.split(" ")[1]}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(parent.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
