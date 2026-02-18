"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"
import { TrendingUp, Users, CreditCard, AlertCircle } from "lucide-react"

const stats = [
  {
    title: "My Collections",
    value: "₹3,45,67,890",
    change: "+8.5%",
    icon: TrendingUp,
    description: "This month",
  },
  {
    title: "Pending Tasks",
    value: "45",
    change: "-12.2%",
    icon: AlertCircle,
    description: "Requires attention",
  },
  {
    title: "Taxpayers Assigned",
    value: "234",
    change: "+5.1%",
    icon: Users,
    description: "Total assigned",
  },
  {
    title: "Today's Collections",
    value: "₹1,23,456",
    change: "+2.3%",
    icon: CreditCard,
    description: "Today",
  },
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
]

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Dashboard</h1>
          <p className="text-muted-foreground">Your tax collection overview</p>
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
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payment transactions you've processed</CardDescription>
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
