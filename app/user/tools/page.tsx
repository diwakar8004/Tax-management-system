"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { Wrench, RefreshCw, FileText, CheckCircle2, Download, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const previousReturns = [
  {
    year: "2023-24",
    income: 1800000,
    tax: 250000,
    refund: 25000,
  },
  {
    year: "2022-23",
    income: 1500000,
    tax: 180000,
    refund: 0,
  },
]

export default function ToolsPage() {
  const [eligibilityIncome, setEligibilityIncome] = useState("")
  const [eligibilityAge, setEligibilityAge] = useState("below_60")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wrench className="h-8 w-8 text-primary" />
            Tax Tools
          </h1>
          <p className="text-muted-foreground">
            Utility tools for tax management and analysis
          </p>
        </div>
      </div>

      <Tabs defaultValue="reconciliation" className="w-full">
        <TabsList>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          <TabsTrigger value="comparison">Return Comparison</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility Checker</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
        </TabsList>

        <TabsContent value="reconciliation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Reconciliation</CardTitle>
              <CardDescription>
                Reconcile your tax payments and transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reconcile Transactions
              </Button>
              <div className="mt-4 p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium mb-2">Reconciliation Summary</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Transactions:</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matched:</span>
                    <span className="font-medium text-green-600">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unmatched:</span>
                    <span className="font-medium text-red-600">3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previous Return Comparison</CardTitle>
              <CardDescription>
                Compare your current return with previous years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment Year</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>Tax Paid</TableHead>
                    <TableHead>Refund</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previousReturns.map((returnData) => (
                    <TableRow key={returnData.year}>
                      <TableCell className="font-medium">{returnData.year}</TableCell>
                      <TableCell>{formatCurrency(returnData.income)}</TableCell>
                      <TableCell>{formatCurrency(returnData.tax)}</TableCell>
                      <TableCell>
                        {returnData.refund > 0 ? (
                          <span className="text-green-600">
                            {formatCurrency(returnData.refund)}
                          </span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Eligibility Checker</CardTitle>
              <CardDescription>
                Check your eligibility for tax rebates and exemptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Annual Income (₹)</Label>
                <Input
                  type="number"
                  value={eligibilityIncome}
                  onChange={(e) => setEligibilityIncome(e.target.value)}
                  placeholder="Enter your annual income"
                />
              </div>
              <div className="space-y-2">
                <Label>Age Category</Label>
                <Select value={eligibilityAge} onValueChange={setEligibilityAge}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below_60">Below 60 years</SelectItem>
                    <SelectItem value="60_80">60-80 years (Senior Citizen)</SelectItem>
                    <SelectItem value="above_80">Above 80 years (Super Senior)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Check Eligibility</Button>
              <div className="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p className="font-medium">Eligible Benefits</p>
                </div>
                <ul className="space-y-1 text-sm">
                  <li>• Section 80C deduction up to ₹1,50,000</li>
                  <li>• Section 80D health insurance deduction</li>
                  <li>• Standard deduction of ₹50,000</li>
                  {eligibilityAge !== "below_60" && (
                    <li>• Higher exemption limit for senior citizens</li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>
                Export your tax data for banks, loans, and other purposes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Export Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select export type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="itr">ITR Data</SelectItem>
                    <SelectItem value="income">Income Statement</SelectItem>
                    <SelectItem value="tax">Tax Payment History</SelectItem>
                    <SelectItem value="investment">Investment Portfolio</SelectItem>
                    <SelectItem value="complete">Complete Tax Profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Purpose</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Loan Application</SelectItem>
                    <SelectItem value="visa">Visa Application</SelectItem>
                    <SelectItem value="personal">Personal Records</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
