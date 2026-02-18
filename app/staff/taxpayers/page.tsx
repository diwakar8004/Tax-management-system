"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"

const taxpayers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    taxType: "GST",
    totalDue: 45000,
    lastPayment: new Date("2024-01-10"),
    status: "Active",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543211",
    taxType: "Property Tax",
    totalDue: 25000,
    lastPayment: new Date("2024-01-05"),
    status: "Active",
  },
]

export default function StaffTaxpayersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Taxpayers</h1>
          <p className="text-muted-foreground">View assigned taxpayers</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Taxpayers</CardTitle>
          <CardDescription>Taxpayers assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead>Total Due</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxpayers.map((taxpayer) => (
                <TableRow key={taxpayer.id}>
                  <TableCell className="font-medium">{taxpayer.name}</TableCell>
                  <TableCell>{taxpayer.email}</TableCell>
                  <TableCell>{taxpayer.phone}</TableCell>
                  <TableCell>{taxpayer.taxType}</TableCell>
                  <TableCell>{formatCurrency(taxpayer.totalDue)}</TableCell>
                  <TableCell>{formatDate(taxpayer.lastPayment)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      {taxpayer.status}
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
