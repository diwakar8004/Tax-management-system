"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Smartphone, Building2, Download, CheckCircle2, Clock } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import jsPDF from "jspdf"

const pendingPayments = [
  {
    id: "PAY001",
    type: "GST",
    amount: 45000,
    dueDate: "2024-01-31",
    description: "GST Payment for Q4 2023",
    status: "Pending",
  },
  {
    id: "PAY002",
    type: "Property Tax",
    amount: 25000,
    dueDate: "2024-02-15",
    description: "Annual Property Tax 2024",
    status: "Pending",
  },
  {
    id: "PAY003",
    type: "Local Tax",
    amount: 15000,
    dueDate: "2024-01-25",
    description: "Local Tax for January 2024",
    status: "Pending",
  },
  {
    id: "PAY004",
    type: "Income Tax",
    amount: 75000,
    dueDate: "2024-03-31",
    description: "Income Tax for FY 2023-24",
    status: "Pending",
  },
]

const paymentHistory = [
  {
    id: "TXN001",
    type: "GST",
    amount: 35000,
    date: new Date("2024-01-15"),
    status: "Success",
    method: "UPI",
  },
  {
    id: "TXN002",
    type: "Property Tax",
    amount: 20000,
    date: new Date("2024-01-10"),
    status: "Success",
    method: "Net Banking",
  },
  {
    id: "TXN003",
    type: "Local Tax",
    amount: 10000,
    date: new Date("2024-01-05"),
    status: "Success",
    method: "Card",
  },
]

export default function PaymentPage() {
  const { toast } = useToast()
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [processing, setProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")

  const handlePayment = async () => {
    if (!selectedPayment || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment and payment method",
        variant: "destructive",
      })
      return
    }

    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      toast({
        title: "Success",
        description: "Payment processed successfully",
      })
      setSelectedPayment(null)
      setPaymentMethod("")
    }, 2000)
  }

  const downloadReceipt = (payment: any) => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Tax Payment Receipt", 105, 20, { align: "center" })
    doc.setFontSize(12)
    doc.text(`Transaction ID: ${payment.id}`, 20, 40)
    doc.text(`Tax Type: ${payment.type}`, 20, 50)
    doc.text(`Amount: ${formatCurrency(payment.amount)}`, 20, 60)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70)
    doc.text("Status: Paid", 20, 80)
    doc.save(`receipt-${payment.id}.pdf`)
    toast({
      title: "Success",
      description: "Receipt downloaded successfully",
    })
  }

  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0)
  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Payments</h1>
          <p className="text-muted-foreground">Manage and track your tax payments</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-muted-foreground">{pendingPayments.length} payments due</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Paid (This Year)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-muted-foreground">{paymentHistory.length} payments made</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 25</div>
            <p className="text-xs text-muted-foreground">Local Tax Payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Interface */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Select a payment to proceed with transaction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                    selectedPayment?.id === payment.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPayment(payment)}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{payment.type}</p>
                        <Badge variant="outline">{payment.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{payment.description}</p>
                      <p className="text-xs text-muted-foreground">Due: {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
                      {selectedPayment?.id === payment.id && (
                        <Badge className="mt-2 bg-primary">Selected</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedPayment ? (
                <>
                  <div className="rounded-lg border p-4 bg-muted">
                    <p className="text-sm text-muted-foreground">Payment Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(selectedPayment.amount)}</p>
                    <p className="text-xs text-muted-foreground mt-2">{selectedPayment.type}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMethod && (
                    <div className="space-y-2">
                      {paymentMethod === "upi" && (
                        <div>
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input id="upiId" placeholder="yourname@upi" className="text-sm" />
                        </div>
                      )}
                      {paymentMethod === "card" && (
                        <>
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="text-sm" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="expiry">Expiry</Label>
                              <Input id="expiry" placeholder="MM/YY" className="text-sm" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" className="text-sm" type="password" />
                            </div>
                          </div>
                        </>
                      )}
                      {paymentMethod === "netbanking" && (
                        <div>
                          <Label>Select Bank</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sbi">State Bank of India</SelectItem>
                              <SelectItem value="hdfc">HDFC Bank</SelectItem>
                              <SelectItem value="icici">ICICI Bank</SelectItem>
                              <SelectItem value="axis">Axis Bank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    className="w-full"
                    onClick={handlePayment}
                    disabled={processing || !paymentMethod}
                  >
                    {processing ? "Processing..." : `Pay Now`}
                  </Button>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-6">
                  Select a payment to continue
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Your recent tax payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tax Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.type}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadReceipt(payment)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
