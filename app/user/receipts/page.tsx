"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Mail, Printer, Eye } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import jsPDF from "jspdf"

const receipts = [
  {
    id: "RCP001",
    transactionId: "TXN001",
    type: "GST",
    amount: 45000,
    date: new Date("2024-01-15"),
    status: "Paid",
    method: "UPI",
    referenceNo: "UPI123456789",
  },
  {
    id: "RCP002",
    transactionId: "TXN002",
    type: "Property Tax",
    amount: 25000,
    date: new Date("2024-01-10"),
    status: "Paid",
    method: "Net Banking",
    referenceNo: "NEFT987654321",
  },
  {
    id: "RCP003",
    transactionId: "TXN003",
    type: "Local Tax",
    amount: 15000,
    date: new Date("2024-01-05"),
    status: "Paid",
    method: "Card",
    referenceNo: "CARD456789123",
  },
  {
    id: "RCP004",
    transactionId: "TXN004",
    type: "Income Tax",
    amount: 35000,
    date: new Date("2023-12-20"),
    status: "Paid",
    method: "UPI",
    referenceNo: "UPI111111111",
  },
]

export default function ReceiptsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null)

  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch =
      receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || receipt.type === filterType
    return matchesSearch && matchesFilter
  })

  const downloadReceipt = (receipt: any) => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text("TAX PAYMENT RECEIPT", 105, 20, { align: "center" })
    
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text("________________________", 20, 30)
    
    doc.setTextColor(0)
    doc.setFontSize(11)
    doc.text(`Receipt ID: ${receipt.id}`, 20, 45)
    doc.text(`Transaction ID: ${receipt.transactionId}`, 20, 55)
    
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(`Tax Type: ${receipt.type}`, 20, 70)
    doc.setFont("helvetica", "normal")
    
    doc.text(`Amount: ${formatCurrency(receipt.amount)}`, 20, 80)
    doc.text(`Payment Date: ${formatDate(receipt.date)}`, 20, 90)
    doc.text(`Payment Method: ${receipt.method}`, 20, 100)
    doc.text(`Reference No: ${receipt.referenceNo}`, 20, 110)
    doc.text(`Status: ${receipt.status}`, 20, 120)
    
    doc.setTextColor(100)
    doc.setFontSize(9)
    doc.text("This is a digitally generated receipt. No signature is required.", 20, 260)
    
    doc.save(`receipt-${receipt.id}.pdf`)
    toast({
      title: "Success",
      description: "Receipt downloaded successfully",
    })
  }

  const printReceipt = (receipt: any) => {
    const printWindow = window.open("", "", "height=600,width=800")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt - ${receipt.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { text-align: center; margin-bottom: 30px; }
              .receipt-info { margin: 10px 0; }
              .amount { font-size: 18px; font-weight: bold; color: #2c3e50; }
              .label { color: #7f8c8d; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>TAX PAYMENT RECEIPT</h1>
            <div class="receipt-info"><span class="label">Receipt ID:</span> ${receipt.id}</div>
            <div class="receipt-info"><span class="label">Transaction ID:</span> ${receipt.transactionId}</div>
            <div class="receipt-info"><span class="label">Tax Type:</span> ${receipt.type}</div>
            <div class="receipt-info amount"><span class="label">Amount:</span> ${formatCurrency(receipt.amount)}</div>
            <div class="receipt-info"><span class="label">Date:</span> ${formatDate(receipt.date)}</div>
            <div class="receipt-info"><span class="label">Method:</span> ${receipt.method}</div>
            <div class="receipt-info"><span class="label">Reference:</span> ${receipt.referenceNo}</div>
            <div class="receipt-info"><span class="label">Status:</span> ${receipt.status}</div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const sendEmail = (receipt: any) => {
    toast({
      title: "Email Sent",
      description: `Receipt ${receipt.id} has been sent to your registered email`,
    })
  }

  const totalAmount = filteredReceipts.reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Receipts</h1>
          <p className="text-muted-foreground">View and manage your payment receipts</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receipts.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Amount Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-muted-foreground">{filteredReceipts.length} filtered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{receipts.filter(r => r.status === "Paid").length}</div>
            <p className="text-xs text-muted-foreground">Paid Receipts</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Search Receipts</label>
              <Input
                placeholder="Search by receipt ID or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Filter by Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="GST">GST</SelectItem>
                  <SelectItem value="Property Tax">Property Tax</SelectItem>
                  <SelectItem value="Local Tax">Local Tax</SelectItem>
                  <SelectItem value="Income Tax">Income Tax</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Receipts</CardTitle>
          <CardDescription>Your complete receipt history ({filteredReceipts.length} receipts)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt ID</TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.length > 0 ? (
                  filteredReceipts.map((receipt) => (
                    <TableRow key={receipt.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{receipt.id}</TableCell>
                      <TableCell>{receipt.transactionId}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{receipt.type}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{formatCurrency(receipt.amount)}</TableCell>
                      <TableCell>{formatDate(receipt.date)}</TableCell>
                      <TableCell>{receipt.method}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {receipt.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Download"
                            onClick={() => downloadReceipt(receipt)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Print"
                            onClick={() => printReceipt(receipt)}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Email"
                            onClick={() => sendEmail(receipt)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No receipts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
