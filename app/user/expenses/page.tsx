"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Upload, Camera, Tag, Receipt, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const expenses = [
  {
    id: "1",
    description: "Office Supplies",
    category: "Business Expense",
    amount: 5000,
    date: new Date("2024-01-15"),
    receipt: "receipt_001.pdf",
    autoTagged: true,
  },
  {
    id: "2",
    description: "Medical Insurance Premium",
    category: "Section 80D",
    amount: 25000,
    date: new Date("2024-01-10"),
    receipt: "receipt_002.pdf",
    autoTagged: true,
  },
  {
    id: "3",
    description: "ELSS Investment",
    category: "Section 80C",
    amount: 50000,
    date: new Date("2024-01-05"),
    receipt: "receipt_003.pdf",
    autoTagged: true,
  },
  {
    id: "4",
    description: "Travel Expense",
    category: "Business Expense",
    amount: 15000,
    date: new Date("2024-01-20"),
    receipt: null,
    autoTagged: false,
  },
]

const categories = [
  "Section 80C",
  "Section 80D",
  "Section 80G",
  "Business Expense",
  "Travel",
  "Medical",
  "Education",
  "Other",
]

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Expense Management</h1>
          <p className="text-muted-foreground">
            Track and categorize expenses for tax deductions
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="text-sm">
            <Camera className="mr-2 h-4 w-4" />
            Scan Receipt
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Receipt
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                expenses.reduce((sum, exp) => sum + exp.amount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">{expenses.length} expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section 80C</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                expenses
                  .filter((e) => e.category === "Section 80C")
                  .reduce((sum, e) => sum + e.amount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Tax-saving</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section 80D</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                expenses
                  .filter((e) => e.category === "Section 80D")
                  .reduce((sum, e) => sum + e.amount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Health insurance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Tagged</CardTitle>
            <Tag className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {expenses.filter((e) => e.autoTagged).length}
            </div>
            <p className="text-xs text-muted-foreground">Smart categorization</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Expense List</CardTitle>
              <CardDescription>All your tracked expenses</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {expense.autoTagged && (
                        <Tag className="h-3 w-3 mr-1" />
                      )}
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(expense.amount)}
                  </TableCell>
                  <TableCell>
                    {expense.receipt ? (
                      <Button variant="ghost" size="sm">
                        <Receipt className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Receipt Scanner</CardTitle>
          <CardDescription>
            Upload or scan receipts for automatic categorization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-12 text-center">
            <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Scan or Upload Receipt</p>
            <p className="text-sm text-muted-foreground mb-4">
              Use your mobile camera or upload an image. We'll automatically extract
              details and categorize it.
            </p>
            <div className="flex gap-2 justify-center">
              <Button>
                <Camera className="mr-2 h-4 w-4" />
                Use Camera
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
