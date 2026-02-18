"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { formatCurrency, formatDate } from "@/lib/utils"
import { RefreshCw, CheckCircle2, AlertCircle, Download, FileText, Receipt, Bell, Zap } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const itrStatus = [
  {
    year: "2023-24",
    status: "Filed",
    filingDate: new Date("2024-07-15"),
    refundAmount: 25000,
    refundStatus: "Processed",
    notices: 0,
  },
  {
    year: "2022-23",
    status: "Filed",
    filingDate: new Date("2023-07-20"),
    refundAmount: 0,
    refundStatus: "No Refund",
    notices: 1,
  },
  {
    year: "2024-25",
    status: "In Progress",
    filingDate: null,
    refundAmount: 0,
    refundStatus: "Pending",
    notices: 0,
  },
]

const gstReturns = [
  {
    period: "Dec 2023",
    type: "GSTR-3B",
    status: "Filed",
    filingDate: new Date("2024-01-20"),
    taxLiability: 45000,
    taxPaid: 45000,
  },
  {
    period: "Nov 2023",
    type: "GSTR-3B",
    status: "Filed",
    filingDate: new Date("2023-12-20"),
    taxLiability: 38000,
    taxPaid: 38000,
  },
  {
    period: "Oct 2023",
    type: "GSTR-1",
    status: "Pending",
    filingDate: null,
    taxLiability: 32000,
    taxPaid: 0,
  },
]

export default function ITRGSTSyncPage() {
  const [itrSyncEnabled, setItrSyncEnabled] = useState(true)
  const [gstSyncEnabled, setGstSyncEnabled] = useState(true)
  const [syncing, setSyncing] = useState(false)

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">ITR & GST Sync</h1>
          <p className="text-muted-foreground">
            Auto-sync with Income Tax Department and GSTN
          </p>
        </div>
        <Button onClick={handleSync} disabled={syncing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing..." : "Sync Now"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Income Tax Sync
              </CardTitle>
              <Switch
                checked={itrSyncEnabled}
                onCheckedChange={setItrSyncEnabled}
              />
            </div>
            <CardDescription>
              Auto-sync ITR status, refunds, and notices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div>
                <p className="text-sm font-medium">Sync Status</p>
                <p className="text-xs text-muted-foreground">
                  Last synced: {formatDate(new Date())}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">PAN Number</Label>
              <p className="text-sm font-mono bg-muted p-2 rounded">ABCDE1234F</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Aadhaar Status</Label>
              <Badge variant="outline" className="w-fit">✓ Linked</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                GSTN Sync
              </CardTitle>
              <Switch
                checked={gstSyncEnabled}
                onCheckedChange={setGstSyncEnabled}
              />
            </div>
            <CardDescription>
              Auto-sync GST returns, invoices, and credits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div>
                <p className="text-sm font-medium">Sync Status</p>
                <p className="text-xs text-muted-foreground">
                  Last synced: {formatDate(new Date())}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">GSTIN</Label>
              <p className="text-sm font-mono bg-muted p-2 rounded">29ABCDE1234F1Z5</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Registration Type</Label>
              <Badge variant="outline" className="w-fit">Regular</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="itr" className="w-full">
        <TabsList className="grid w-full md:grid-cols-3">
          <TabsTrigger value="itr">ITR Status</TabsTrigger>
          <TabsTrigger value="gst">GST Returns</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>

        <TabsContent value="itr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ITR Filing History</CardTitle>
              <CardDescription>Your Income Tax Return status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Refund</TableHead>
                      <TableHead>Refund Status</TableHead>
                      <TableHead>Notices</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itrStatus.map((itr) => (
                      <TableRow key={itr.year}>
                        <TableCell className="font-medium">{itr.year}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              itr.status === "Filed"
                                ? "default"
                                : itr.status === "In Progress"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {itr.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {itr.filingDate ? formatDate(itr.filingDate) : "-"}
                        </TableCell>
                        <TableCell>
                          {itr.refundAmount > 0
                            ? formatCurrency(itr.refundAmount)
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              itr.refundStatus === "Processed"
                                ? "default"
                                : itr.refundStatus === "Pending"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {itr.refundStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {itr.notices > 0 ? (
                            <Badge variant="destructive">
                              <Bell className="h-3 w-3 mr-1" />
                              {itr.notices}
                            </Badge>
                          ) : (
                            "None"
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
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

        <TabsContent value="gst" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>GST Return History</CardTitle>
              <CardDescription>Your GST filing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Return Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Tax Liability</TableHead>
                      <TableHead>Tax Paid</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gstReturns.map((gst, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{gst.period}</TableCell>
                        <TableCell>{gst.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              gst.status === "Filed" ? "default" : "destructive"
                            }
                          >
                            {gst.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {gst.filingDate ? formatDate(gst.filingDate) : "-"}
                        </TableCell>
                        <TableCell>{formatCurrency(gst.taxLiability)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(gst.taxPaid)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
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

        <TabsContent value="notices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Notices</CardTitle>
              <CardDescription>Notices from Income Tax Department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border-l-4 border-l-yellow-600 bg-yellow-50 dark:bg-yellow-900/20">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold">Notice u/s 143(1)</p>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Assessment Year: 2022-23
                    </p>
                    <p className="text-sm mb-3">
                      Intimation for processing of return
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button size="sm" variant="outline">
                        View Notice
                      </Button>
                      <Button size="sm">Respond</Button>
                    </div>
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
