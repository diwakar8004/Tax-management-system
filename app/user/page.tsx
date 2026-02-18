"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { CreditCard, FileText, AlertCircle, CheckCircle2, Calendar, TrendingUp, Bell, Download, Calculator } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const paymentHistory = [
  { month: "Jul", amount: 35000 },
  { month: "Aug", amount: 42000 },
  { month: "Sep", amount: 38000 },
  { month: "Oct", amount: 45000 },
  { month: "Nov", amount: 40000 },
  { month: "Dec", amount: 48000 },
]

const recentPayments = [
  {
    id: "TXN001",
    type: "GST",
    amount: 45000,
    status: "Paid",
    date: new Date("2024-01-15"),
    method: "UPI",
  },
  {
    id: "TXN002",
    type: "Property Tax",
    amount: 25000,
    status: "Pending",
    date: new Date("2024-01-20"),
    method: "Card",
  },
  {
    id: "TXN003",
    type: "Local Tax",
    amount: 15000,
    status: "Paid",
    date: new Date("2024-01-10"),
    method: "Net Banking",
  },
  {
    id: "TXN004",
    type: "GST",
    amount: 35000,
    status: "Paid",
    date: new Date("2023-12-28"),
    method: "UPI",
  },
]

const upcomingDues = [
  {
    id: "DUE001",
    type: "Property Tax",
    amount: 25000,
    dueDate: new Date("2024-01-31"),
    daysLeft: 7,
    status: "Due Soon",
  },
  {
    id: "DUE002",
    type: "GST",
    amount: 45000,
    dueDate: new Date("2024-02-15"),
    daysLeft: 22,
    status: "Upcoming",
  },
  {
    id: "DUE003",
    type: "Local Tax",
    amount: 15000,
    dueDate: new Date("2024-02-28"),
    daysLeft: 35,
    status: "Upcoming",
  },
]

const taxSummary = [
  { type: "GST", paid: 80000, pending: 45000, total: 125000 },
  { type: "Property Tax", paid: 50000, pending: 25000, total: 75000 },
  { type: "Local Tax", paid: 30000, pending: 15000, total: 45000 },
]

const alerts = [
  {
    id: "ALERT001",
    message: "Property Tax payment due in 7 days",
    type: "warning",
    date: new Date("2024-01-24"),
  },
  {
    id: "ALERT002",
    message: "GST payment received successfully",
    type: "success",
    date: new Date("2024-01-15"),
  },
  {
    id: "ALERT003",
    message: "Local Tax payment reminder",
    type: "info",
    date: new Date("2024-01-20"),
  },
]

export default function UserDashboard() {
  const totalPaid = recentPayments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = recentPayments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0)

  const activeTaxesCount = taxSummary.length
  const nextDue = upcomingDues[0]

  const stats = [
    {
      title: "Total Paid",
      value: formatCurrency(totalPaid),
      icon: CheckCircle2,
      description: "All time payments",
      trend: "+12.5%",
    },
    {
      title: "Pending Amount",
      value: formatCurrency(totalPending),
      icon: AlertCircle,
      description: "Due in the next month",
      trend: "-5.2%",
    },
    {
      title: "Active Taxes",
      value: String(activeTaxesCount),
      icon: FileText,
      description: taxSummary.map((t) => t.type).join(", "),
      trend: "Active",
    },
    {
      title: "Next Due Date",
      value: formatDate(nextDue.dueDate),
      icon: Calendar,
      description: nextDue.type,
      trend: `${nextDue.daysLeft} days`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Your tax payment overview and management</p>
        </div>
        <Link href="/user/payments">
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Make Payment
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  {stat.trend && (
                    <span className={`text-xs ${
                      stat.trend.startsWith("+") 
                        ? "text-green-600" 
                        : stat.trend.startsWith("-")
                        ? "text-red-600"
                        : "text-muted-foreground"
                    }`}>
                      {stat.trend}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts and Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your payment trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={paymentHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Summary</CardTitle>
            <CardDescription>Breakdown by tax type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={taxSummary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="paid" fill="#82ca9d" name="Paid" />
                <Bar dataKey="pending" fill="#ffc658" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Dues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Due Dates
          </CardTitle>
          <CardDescription>Taxes that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Left</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingDues.map((due) => (
                <TableRow key={due.id}>
                  <TableCell className="font-medium">{due.type}</TableCell>
                  <TableCell>{formatCurrency(due.amount)}</TableCell>
                  <TableCell>{formatDate(due.dueDate)}</TableCell>
                  <TableCell>
                    <Badge variant={due.daysLeft <= 7 ? "destructive" : "secondary"}>
                      {due.daysLeft} days
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        due.status === "Due Soon"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {due.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href="/user/payments">
                      <Button size="sm" variant="outline">
                        Pay Now
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{payment.type}</p>
                    <Badge
                      variant={
                        payment.status === "Paid"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(payment.date)} • {payment.method}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(payment.amount)}</p>
                  {payment.status === "Paid" && (
                    <Link href="/user/receipts">
                      <Button size="sm" variant="ghost" className="mt-1">
                        <Download className="h-3 w-3" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <Link href="/user/receipts">
              <Button variant="outline" className="w-full">
                View All Payments
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alerts & Notifications
            </CardTitle>
            <CardDescription>Important updates and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg border p-3 ${
                  alert.type === "warning"
                    ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                    : alert.type === "success"
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                    : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                }`}
              >
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(alert.date)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/user/payments" className="block">
              <Button className="w-full" variant="default" size="lg">
                <CreditCard className="mr-2 h-5 w-5" />
                Make Payment
              </Button>
            </Link>
            <Link href="/user/receipts" className="block">
              <Button className="w-full" variant="outline" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                View Receipts
              </Button>
            </Link>
            <Link href="/user/tax-calculator" className="block">
              <Button className="w-full" variant="outline" size="lg">
                <Calculator className="mr-2 h-5 w-5" />
                Tax Calculator
              </Button>
            </Link>
            <Link href="/user/settings" className="block">
              <Button className="w-full" variant="outline" size="lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
