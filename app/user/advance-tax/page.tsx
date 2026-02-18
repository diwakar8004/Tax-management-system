"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Calendar, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const advanceTaxSchedule = [
  {
    id: "AT001",
    installment: "Q1 (June 15)",
    dueDate: new Date("2024-06-15"),
    estimatedAmount: 50000,
    paidAmount: 50000,
    status: "Paid",
    paymentDate: new Date("2024-06-10"),
  },
  {
    id: "AT002",
    installment: "Q2 (Sept 15)",
    dueDate: new Date("2024-09-15"),
    estimatedAmount: 50000,
    paidAmount: 50000,
    status: "Paid",
    paymentDate: new Date("2024-09-12"),
  },
  {
    id: "AT003",
    installment: "Q3 (Dec 15)",
    dueDate: new Date("2024-12-15"),
    estimatedAmount: 50000,
    paidAmount: 50000,
    status: "Paid",
    paymentDate: new Date("2024-12-10"),
  },
  {
    id: "AT004",
    installment: "Q4 (March 15)",
    dueDate: new Date("2025-03-15"),
    estimatedAmount: 50000,
    paidAmount: 0,
    status: "Pending",
    paymentDate: null,
  },
]

export default function AdvanceTaxPage() {
  const [estimatedIncome, setEstimatedIncome] = useState("2000000")
  const [estimatedTax, setEstimatedTax] = useState("")

  const calculateAdvanceTax = () => {
    const income = parseFloat(estimatedIncome) || 0
    // Simplified calculation - in real app, use proper tax calculation
    const tax = (income * 0.3) / 4 // Rough estimate divided by 4 quarters
    setEstimatedTax(tax.toFixed(0))
  }

  const totalPaid = advanceTaxSchedule
    .filter((at) => at.status === "Paid")
    .reduce((sum, at) => sum + at.paidAmount, 0)
  const totalPending = advanceTaxSchedule
    .filter((at) => at.status === "Pending")
    .reduce((sum, at) => sum + at.estimatedAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advance Tax Planner</h1>
          <p className="text-muted-foreground">
            Plan and schedule your advance tax payments
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-muted-foreground">
              {advanceTaxSchedule.filter((at) => at.status === "Paid").length} installments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-muted-foreground">Next due: Q4</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estimated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalPaid + totalPending)}
            </div>
            <p className="text-xs text-muted-foreground">For FY 2024-25</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tax Calculator</CardTitle>
            <CardDescription>Estimate your advance tax liability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="income">Estimated Annual Income (₹)</Label>
              <Input
                id="income"
                type="number"
                value={estimatedIncome}
                onChange={(e) => setEstimatedIncome(e.target.value)}
                placeholder="2000000"
              />
            </div>
            <Button onClick={calculateAdvanceTax} className="w-full">
              Calculate
            </Button>
            {estimatedTax && (
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Estimated Tax per Quarter</p>
                <p className="text-2xl font-bold">{formatCurrency(parseFloat(estimatedTax))}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
            <CardDescription>Advance tax installment schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Installment</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advanceTaxSchedule.map((installment) => (
                  <TableRow key={installment.id}>
                    <TableCell className="font-medium">
                      {installment.installment}
                    </TableCell>
                    <TableCell>{formatDate(installment.dueDate)}</TableCell>
                    <TableCell>
                      {formatCurrency(installment.estimatedAmount)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          installment.status === "Paid"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {installment.status === "Paid" && (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        )}
                        {installment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="w-full mt-4">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
