"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"
import { TrendingUp, Users, CreditCard, AlertCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const stats = [
  {
    title: "Total Tax Collected",
    value: "₹12,45,67,890",
    change: "+12.5%",
    icon: TrendingUp,
    description: "This month",
  },
  {
    title: "Pending Payments",
    value: "₹2,34,56,789",
    change: "-5.2%",
    icon: AlertCircle,
    description: "Overdue",
  },
  {
    title: "Active Taxpayers",
    value: "1,234",
    change: "+8.1%",
    icon: Users,
    description: "Total registered",
  },
  {
    title: "Monthly Revenue",
    value: "₹45,67,890",
    change: "+15.3%",
    icon: CreditCard,
    description: "Current month",
  },
]

const monthlyData = [
  { month: "Jan", revenue: 4000000, collected: 3800000 },
  { month: "Feb", revenue: 4500000, collected: 4200000 },
  { month: "Mar", revenue: 5000000, collected: 4800000 },
  { month: "Apr", revenue: 5500000, collected: 5200000 },
  { month: "May", revenue: 6000000, collected: 5800000 },
  { month: "Jun", revenue: 6500000, collected: 6200000 },
]

const recentTransactions = [
  {
    id: "TXN001",
    taxpayer: "Rajesh Kumar",
    type: "GST",
    amount: 45000,
    status: "Success",
    date: new Date("2024-01-15"),
  },
  {
    id: "TXN002",
    taxpayer: "Priya Sharma",
    type: "Property Tax",
    amount: 25000,
    status: "Pending",
    date: new Date("2024-01-14"),
  },
  {
    id: "TXN003",
    taxpayer: "Amit Patel",
    type: "Local Tax",
    amount: 15000,
    status: "Success",
    date: new Date("2024-01-14"),
  },
  {
    id: "TXN004",
    taxpayer: "Sneha Reddy",
    type: "GST",
    amount: 67000,
    status: "Failed",
    date: new Date("2024-01-13"),
  },
  {
    id: "TXN005",
    taxpayer: "Vikram Singh",
    type: "Property Tax",
    amount: 32000,
    status: "Success",
    date: new Date("2024-01-13"),
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of tax collection system</p>
        </div>
        <div className="text-sm font-medium text-muted-foreground bg-muted px-4 py-2 rounded-lg">
          <span className="text-foreground">Creator:</span> Dhyanchand Gond
        </div>
      </div>

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
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>{" "}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Chart</CardTitle>
          <CardDescription>Revenue vs Collected over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Expected Revenue" />
              <Line type="monotone" dataKey="collected" stroke="#82ca9d" name="Collected" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Taxpayer</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.taxpayer}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        transaction.status === "Success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : transaction.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
