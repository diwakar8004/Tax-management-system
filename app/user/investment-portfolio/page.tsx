"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { Plus, TrendingUp, PieChart } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const investments = [
  {
    id: "1",
    type: "ELSS",
    name: "Axis Long Term Equity Fund",
    amount: 50000,
    section: "80C",
    maturityDate: "2027-01-15",
    returns: 12.5,
  },
  {
    id: "2",
    type: "PPF",
    name: "Public Provident Fund",
    amount: 100000,
    section: "80C",
    maturityDate: "2030-04-01",
    returns: 7.1,
  },
  {
    id: "3",
    name: "Life Insurance Premium",
    amount: 50000,
    section: "80C",
    maturityDate: "2025-12-31",
    returns: 0,
  },
  {
    id: "4",
    type: "Health Insurance",
    name: "Family Health Insurance",
    amount: 25000,
    section: "80D",
    maturityDate: "2024-12-31",
    returns: 0,
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function InvestmentPortfolioPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    amount: "",
    section: "80C",
    maturityDate: "",
  })

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const section80C = investments
    .filter((inv) => inv.section === "80C")
    .reduce((sum, inv) => sum + inv.amount, 0)
  const section80D = investments
    .filter((inv) => inv.section === "80D")
    .reduce((sum, inv) => sum + inv.amount, 0)

  const chartData = [
    { name: "Section 80C", value: section80C },
    { name: "Section 80D", value: section80D },
  ]

  const handleAdd = () => {
    // Add investment logic here
    setIsDialogOpen(false)
    setFormData({
      type: "",
      name: "",
      amount: "",
      section: "80C",
      maturityDate: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Investment Portfolio</h1>
          <p className="text-muted-foreground">
            Track your tax-saving investments and portfolio
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Investment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Investment</DialogTitle>
              <DialogDescription>
                Add a new tax-saving investment to your portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Investment Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elss">ELSS</SelectItem>
                    <SelectItem value="ppf">PPF</SelectItem>
                    <SelectItem value="insurance">Life Insurance</SelectItem>
                    <SelectItem value="health">Health Insurance</SelectItem>
                    <SelectItem value="nsc">NSC</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Investment Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter investment name"
                />
              </div>
              <div className="space-y-2">
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="50000"
                />
              </div>
              <div className="space-y-2">
                <Label>Tax Section</Label>
                <Select
                  value={formData.section}
                  onValueChange={(value) =>
                    setFormData({ ...formData, section: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="80C">Section 80C</SelectItem>
                    <SelectItem value="80D">Section 80D</SelectItem>
                    <SelectItem value="80G">Section 80G</SelectItem>
                    <SelectItem value="80E">Section 80E</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Maturity Date</Label>
                <Input
                  type="date"
                  value={formData.maturityDate}
                  onChange={(e) =>
                    setFormData({ ...formData, maturityDate: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add Investment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInvestment)}</div>
            <p className="text-xs text-muted-foreground">
              {investments.length} investments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section 80C</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(section80C)}</div>
            <p className="text-xs text-muted-foreground">
              Max limit: ₹1,50,000
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section 80D</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(section80D)}</div>
            <p className="text-xs text-muted-foreground">Health insurance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Portfolio</CardTitle>
            <CardDescription>Your tax-saving investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investment</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Returns</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{investment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {investment.type || "Insurance"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono">{investment.section}</span>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(investment.amount)}
                    </TableCell>
                    <TableCell>
                      {investment.returns > 0 ? (
                        <span className="text-green-600">
                          {investment.returns}%
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Distribution</CardTitle>
            <CardDescription>Investment breakdown by tax section</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
