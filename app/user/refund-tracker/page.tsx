"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const refunds = [
  {
    id: "REF001",
    assessmentYear: "2023-24",
    amount: 25000,
    status: "Processed",
    processedDate: new Date("2024-01-20"),
    expectedDate: new Date("2024-01-25"),
    bankAccount: "****1234",
    mode: "NEFT",
  },
  {
    id: "REF002",
    assessmentYear: "2022-23",
    amount: 15000,
    status: "In Process",
    processedDate: null,
    expectedDate: new Date("2024-02-15"),
    bankAccount: "****1234",
    mode: "NEFT",
  },
  {
    id: "REF003",
    assessmentYear: "2021-22",
    amount: 5000,
    status: "Pending",
    processedDate: null,
    expectedDate: new Date("2024-03-01"),
    bankAccount: "****1234",
    mode: "NEFT",
  },
]

const refundHistory = [
  {
    year: "2022-23",
    amount: 18000,
    receivedDate: new Date("2023-08-15"),
    status: "Received",
  },
  {
    year: "2021-22",
    amount: 12000,
    receivedDate: new Date("2022-09-20"),
    status: "Received",
  },
]

export default function RefundTrackerPage() {
  const totalPending = refunds
    .filter((r) => r.status !== "Processed")
    .reduce((sum, r) => sum + r.amount, 0)
  const totalProcessed = refunds
    .filter((r) => r.status === "Processed")
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Refund Tracker</h1>
          <p className="text-muted-foreground">
            Track your income tax refunds status and history
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-muted-foreground">
              {refunds.filter((r) => r.status !== "Processed").length} refunds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalProcessed)}
            </div>
            <p className="text-xs text-muted-foreground">
              {refunds.filter((r) => r.status === "Processed").length} refunds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalPending + totalProcessed)}
            </div>
            <p className="text-xs text-muted-foreground">{refunds.length} total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Refunds</CardTitle>
          <CardDescription>Current refund status and expected dates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refund ID</TableHead>
                <TableHead>Assessment Year</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Processed Date</TableHead>
                <TableHead>Expected Date</TableHead>
                <TableHead>Bank Account</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell className="font-medium">{refund.id}</TableCell>
                  <TableCell>{refund.assessmentYear}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(refund.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        refund.status === "Processed"
                          ? "default"
                          : refund.status === "In Process"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {refund.status === "Processed" && (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      )}
                      {refund.status === "In Process" && (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {refund.status === "Pending" && (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {refund.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {refund.processedDate
                      ? formatDate(refund.processedDate)
                      : "-"}
                  </TableCell>
                  <TableCell>{formatDate(refund.expectedDate)}</TableCell>
                  <TableCell>{refund.bankAccount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Refund History</CardTitle>
          <CardDescription>Previously received refunds</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment Year</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refundHistory.map((refund) => (
                <TableRow key={refund.year}>
                  <TableCell className="font-medium">{refund.year}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(refund.amount)}
                  </TableCell>
                  <TableCell>{formatDate(refund.receivedDate)}</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {refund.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
