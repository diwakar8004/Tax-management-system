"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import * as XLSX from "xlsx"
import { useToast } from "@/hooks/use-toast"

const reportData = [
  { month: "Jan", collections: 1200000 },
  { month: "Feb", collections: 1350000 },
  { month: "Mar", collections: 1500000 },
  { month: "Apr", collections: 1650000 },
  { month: "May", collections: 1800000 },
  { month: "Jun", collections: 1950000 },
]

export default function StaffReportsPage() {
  const { toast } = useToast()

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Collections")
    XLSX.writeFile(wb, "collections-report.xlsx")
    toast({
      title: "Success",
      description: "Report exported to Excel",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">View your collection reports</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Collections</CardTitle>
          <CardDescription>Your collection performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="collections" fill="#8884d8" name="Collections" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <Button onClick={exportToExcel}>
              <Download className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
