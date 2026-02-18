"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"

const payments = [
  {
    id: "TXN001",
    taxpayer: "Rajesh Kumar",
    type: "GST",
    amount: 45000,
    status: "Success",
    date: new Date("2024-01-15"),
    method: "UPI",
  },
  {
    id: "TXN002",
    taxpayer: "Priya Sharma",
    type: "Property Tax",
    amount: 25000,
    status: "Pending",
    date: new Date("2024-01-14"),
    method: "Card",
  },
  {
    id: "TXN003",
    taxpayer: "Amit Patel",
    type: "Local Tax",
    amount: 15000,
    status: "Success",
    date: new Date("2024-01-14"),
    method: "Net Banking",
  },
  {
    id: "TXN004",
    taxpayer: "Sneha Reddy",
    type: "GST",
    amount: 67000,
    status: "Failed",
    date: new Date("2024-01-13"),
    method: "UPI",
  },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">View and manage all payment transactions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>All payment transactions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Taxpayer</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.taxpayer}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        payment.status === "Success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
