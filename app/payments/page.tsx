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
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import FullScreenAdminLayout from "../components/fullscreen-admin-layout"

const payments = [
  {
    id: "PAY-2024-001",
    student: "Alice Johnson",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    amount: 450.0,
    date: "Dec 1, 2024",
    method: "Credit Card",
    status: "Paid",
    description: "Tuition fee for Mathematics Group A",
    dueDate: "Nov 30, 2024",
    transactionId: "TXN-001-2024",
    group: "Mathematics Group A",
    semester: "Fall 2024",
  },
  {
    id: "PAY-2024-002",
    student: "Bob Smith",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    amount: 450.0,
    date: "Nov 28, 2024",
    method: "Bank Transfer",
    status: "Paid",
    description: "Tuition fee for Physics Group B",
    dueDate: "Nov 30, 2024",
    transactionId: "TXN-002-2024",
    group: "Physics Group B",
    semester: "Fall 2024",
  },
  {
    id: "PAY-2024-003",
    student: "Carol Davis",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    amount: 450.0,
    date: null,
    method: null,
    status: "Pending",
    description: "Tuition fee for Chemistry Group C",
    dueDate: "Dec 15, 2024",
    transactionId: null,
    group: "Chemistry Group C",
    semester: "Fall 2024",
  },
  {
    id: "PAY-2024-004",
    student: "David Wilson",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    amount: 450.0,
    date: "Nov 25, 2024",
    method: "PayPal",
    status: "Paid",
    description: "Tuition fee for Biology Group A",
    dueDate: "Nov 30, 2024",
    transactionId: "TXN-004-2024",
    group: "Biology Group A",
    semester: "Fall 2024",
  },
  {
    id: "PAY-2024-005",
    student: "Emma Brown",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    amount: 450.0,
    date: null,
    method: null,
    status: "Overdue",
    description: "Tuition fee for Literature Group B",
    dueDate: "Nov 15, 2024",
    transactionId: null,
    group: "Literature Group B",
    semester: "Fall 2024",
  },
  {
    id: "PAY-2024-006",
    student: "Frank Miller",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    amount: 525.0,
    date: "Dec 2, 2024",
    method: "Credit Card",
    status: "Paid",
    description: "Tuition fee for Advanced Mathematics",
    dueDate: "Dec 1, 2024",
    transactionId: "TXN-006-2024",
    group: "Advanced Mathematics",
    semester: "Fall 2024",
  },
  {
    id: "PAY-2024-007",
    student: "Grace Lee",
    studentAvatar: "/placeholder.svg?height=32&width=32",
    amount: 375.0,
    date: null,
    method: null,
    status: "Pending",
    description: "Tuition fee for Creative Writing",
    dueDate: "Dec 20, 2024",
    transactionId: null,
    group: "Creative Writing",
    semester: "Fall 2024",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Paid":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "Pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "Overdue":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [newPayment, setNewPayment] = useState({
    student: "",
    amount: "",
    description: "",
    dueDate: "",
    group: "",
  })

  const filteredPayments = payments.filter(
    (payment) =>
      payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectPayment = (id: string) => {
    setSelectedPayments((prev) => (prev.includes(id) ? prev.filter((paymentId) => paymentId !== id) : [...prev, id]))
  }

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddPaymentOpen(false)
    setNewPayment({
      student: "",
      amount: "",
      description: "",
      dueDate: "",
      group: "",
    })
  }

  const totalRevenue = payments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)
  const overdueAmount = payments.filter((p) => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0)

  return (
    <FullScreenAdminLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm">
          <a href="/" className="text-muted-foreground hover:text-foreground">
            Bosh sahifa
          </a>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium">To'lovlar</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">To'lovlarni boshqarish</h1>
            <p className="text-muted-foreground mt-1">
              Talabalar to'lovlari va hisob-fakturalarini kuzatish va boshqarish
            </p>
          </div>
          <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                To'lov qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Payment</DialogTitle>
                <DialogDescription>Enter the payment details below. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPayment}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Student</Label>
                    <Select onValueChange={(value) => setNewPayment({ ...newPayment, student: value })}>
                      <SelectTrigger id="student">
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                        <SelectItem value="Bob Smith">Bob Smith</SelectItem>
                        <SelectItem value="Carol Davis">Carol Davis</SelectItem>
                        <SelectItem value="David Wilson">David Wilson</SelectItem>
                        <SelectItem value="Emma Brown">Emma Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        placeholder="$0.00"
                        value={newPayment.amount}
                        onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newPayment.dueDate}
                        onChange={(e) => setNewPayment({ ...newPayment, dueDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group">Group</Label>
                    <Select onValueChange={(value) => setNewPayment({ ...newPayment, group: value })}>
                      <SelectTrigger id="group">
                        <SelectValue placeholder="Select a group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics Group A">Mathematics Group A</SelectItem>
                        <SelectItem value="Physics Group B">Physics Group B</SelectItem>
                        <SelectItem value="Chemistry Group C">Chemistry Group C</SelectItem>
                        <SelectItem value="Biology Group A">Biology Group A</SelectItem>
                        <SelectItem value="Literature Group B">Literature Group B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newPayment.description}
                      onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddPaymentOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Save Payment
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Revenue</p>
                  <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Paid Payments</p>
                  <p className="text-3xl font-bold">{payments.filter((p) => p.status === "Paid").length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Pending Amount</p>
                  <p className="text-3xl font-bold">${pendingAmount.toLocaleString()}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Overdue Amount</p>
                  <p className="text-3xl font-bold">${overdueAmount.toLocaleString()}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="To'lovlarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={viewMode === "cards" ? "default" : "outline"} onClick={() => setViewMode("cards")}>
              Cards
            </Button>
            <Button variant={viewMode === "table" ? "default" : "outline"} onClick={() => setViewMode("table")}>
              Table
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            {selectedPayments.length > 0 && (
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete ({selectedPayments.length})
              </Button>
            )}
          </div>
        </div>

        {/* Payments Display */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPayments.map((payment) => (
              <Card key={payment.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={payment.studentAvatar || "/placeholder.svg"} alt={payment.student} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {payment.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{payment.student}</CardTitle>
                        <CardDescription className="text-sm">{payment.id}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <Badge
                        variant={
                          payment.status === "Paid"
                            ? "default"
                            : payment.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${payment.amount.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">{payment.semester}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Description:</p>
                    <p className="text-sm text-muted-foreground">{payment.description}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Group:</p>
                    <Badge variant="outline" className="text-xs">
                      {payment.group}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Due Date:</p>
                      <p className="text-muted-foreground">{payment.dueDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">Payment Date:</p>
                      <p className="text-muted-foreground">{payment.date || "Not paid"}</p>
                    </div>
                  </div>

                  {payment.method && (
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{payment.method}</span>
                    </div>
                  )}

                  {payment.transactionId && (
                    <div className="text-xs text-muted-foreground">Transaction ID: {payment.transactionId}</div>
                  )}

                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Payment Records</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No payments found. Try adjusting your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedPayments.includes(payment.id)}
                            onCheckedChange={() => toggleSelectPayment(payment.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={payment.studentAvatar || "/placeholder.svg"} alt={payment.student} />
                              <AvatarFallback>
                                {payment.student
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-foreground">{payment.student}</div>
                              <div className="text-xs text-muted-foreground">{payment.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(payment.status)}
                            <Badge
                              variant={
                                payment.status === "Paid"
                                  ? "default"
                                  : payment.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>{payment.date || "-"}</TableCell>
                        <TableCell>{payment.method || "-"}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </FullScreenAdminLayout>
  )
}
