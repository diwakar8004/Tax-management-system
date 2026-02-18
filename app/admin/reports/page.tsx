"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Download, FileText, Calendar } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"

const reportData = [
  { month: "Jan", gst: 1200000, property: 800000, local: 400000 },
  { month: "Feb", gst: 1350000, property: 850000, local: 450000 },
  { month: "Mar", gst: 1500000, property: 900000, local: 500000 },
  { month: "Apr", gst: 1650000, property: 950000, local: 550000 },
  { month: "May", gst: 1800000, property: 1000000, local: 600000 },
  { month: "Jun", gst: 1950000, property: 1050000, local: 650000 },
]

const detailedTransactions = [
  {
    id: "TXN001",
    taxpayer: "Rajesh Kumar",
    type: "GST",
    amount: 45000,
    date: new Date("2024-01-15"),
    status: "Success",
  },
  {
    id: "TXN002",
    taxpayer: "Priya Sharma",
    type: "Property Tax",
    amount: 25000,
    date: new Date("2024-01-14"),
    status: "Success",
  },
  {
    id: "TXN003",
    taxpayer: "Amit Patel",
    type: "Local Tax",
    amount: 15000,
    date: new Date("2024-01-14"),
    status: "Success",
  },
]

export default function ReportsPage() {
  const { toast } = useToast()
  const [reportType, setReportType] = useState("monthly")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [taxType, setTaxType] = useState("all")

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(detailedTransactions)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Transactions")
    XLSX.writeFile(wb, "tax-report.xlsx")
    toast({
      title: "Success",
      description: "Report exported to Excel",
    })
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Tax Collection Report", 105, 20, { align: "center" })
    doc.setFontSize(12)
    doc.text(`Report Type: ${reportType}`, 20, 40)
    doc.text(`Period: ${startDate || "N/A"} to ${endDate || "N/A"}`, 20, 50)
    doc.text(`Tax Type: ${taxType}`, 20, 60)
    doc.text("Total Collections: ₹12,45,67,890", 20, 70)
    doc.save("tax-report.pdf")
    toast({
      title: "Success",
      description: "Report exported to PDF",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and export tax collection reports</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Customize your report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tax Type</Label>
              <Select value={taxType} onValueChange={setTaxType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="GST">GST</SelectItem>
                  <SelectItem value="Property Tax">Property Tax</SelectItem>
                  <SelectItem value="Local Tax">Local Tax</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={exportToExcel}>
              <Download className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
            <Button onClick={exportToPDF} variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export to PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Tax Type</CardTitle>
          <CardDescription>Monthly breakdown of collections</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="gst" fill="#8884d8" name="GST" />
              <Bar dataKey="property" fill="#82ca9d" name="Property Tax" />
              <Bar dataKey="local" fill="#ffc658" name="Local Tax" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Transactions</CardTitle>
          <CardDescription>Transaction details for the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Taxpayer</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.taxpayer}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      {transaction.status}
                    </span>
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
