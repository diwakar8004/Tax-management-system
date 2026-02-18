"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatCurrency, formatDate } from "@/lib/utils"
import { FileText, CheckCircle2, Clock, AlertCircle, TrendingUp, Download, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const filingStatus = {
  "2024-25": {
    status: "In Progress",
    progress: 65,
    dueDate: new Date("2024-07-31"),
    sections: [
      { name: "Personal Information", completed: true },
      { name: "Income Details", completed: true },
      { name: "Deductions", completed: true },
      { name: "Tax Computation", completed: false },
      { name: "Verification", completed: false },
    ],
  },
  "2023-24": {
    status: "Filed",
    progress: 100,
    filingDate: "2024-07-15",
    assessmentYear: "2024-25",
  },
  "2022-23": {
    status: "Filed",
    progress: 100,
    filingDate: "2023-07-20",
    assessmentYear: "2023-24",
  },
}

const taxHealthScore = 85

export default function TaxFilingPage() {
  const [selectedYear, setSelectedYear] = useState("2024-25")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tax Filing</h1>
          <p className="text-muted-foreground">
            File your income tax returns and track filing status
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Health Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{taxHealthScore}/100</div>
            <Progress value={taxHealthScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Excellent compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Filing</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2024-25</div>
            <Badge variant="secondary" className="mt-2">
              In Progress
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Filed Returns</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Last 3 years</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full md:grid-cols-3">
          <TabsTrigger value="current">Current Filing</TabsTrigger>
          <TabsTrigger value="history">Filing History</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ITR Filing - Assessment Year 2024-25</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Due Date: July 31, 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Filing Progress</span>
                  <span className="font-bold">{filingStatus["2024-25"].progress}%</span>
                </div>
                <Progress value={filingStatus["2024-25"].progress} className="h-2" />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Sections to Complete</h3>
                {filingStatus["2024-25"].sections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {section.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      )}
                      <span className="font-medium">{section.name}</span>
                    </div>
                    {section.completed ? (
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    ) : (
                      <Button size="sm" variant="outline">
                        Fill Now
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  Continue Filing
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filing History</CardTitle>
              <CardDescription>Your previous filed returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(filingStatus)
                      .filter(([year]) => year !== "2024-25")
                      .map(([year, data]: [string, any]) => (
                        <TableRow key={year}>
                          <TableCell className="font-medium">{year}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {data.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{data.filingDate}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
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
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Tax Forms</CardTitle>
              <CardDescription>
                Choose the appropriate form for your tax filing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold">ITR-1 (Sahaj)</p>
                      <p className="text-xs text-muted-foreground">For salaried individuals</p>
                    </div>
                    <Badge variant="secondary">Auto-filled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    For individuals with income from salary, one house property, and other sources (upto ₹50 lakhs)
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Use Form</Button>
                    <Button size="sm" variant="outline">Preview</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold">ITR-2</p>
                      <p className="text-xs text-muted-foreground">For investors</p>
                    </div>
                    <Badge variant="secondary">Pre-filled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    For individuals with income from investments, capital gains, and multiple properties
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Use Form</Button>
                    <Button size="sm" variant="outline">Preview</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
