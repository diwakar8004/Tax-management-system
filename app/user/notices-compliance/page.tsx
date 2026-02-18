"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { formatDate } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Clock, FileText, Send, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const notices = [
  {
    id: "NOT001",
    type: "Intimation u/s 143(1)",
    assessmentYear: "2022-23",
    issueDate: new Date("2024-01-15"),
    dueDate: new Date("2024-02-15"),
    status: "Pending",
    priority: "High",
    description: "Intimation for processing of return",
  },
  {
    id: "NOT002",
    type: "Notice u/s 148",
    assessmentYear: "2021-22",
    issueDate: new Date("2024-01-10"),
    dueDate: new Date("2024-02-10"),
    status: "Responded",
    priority: "High",
    description: "Notice for reopening of assessment",
  },
  {
    id: "NOT003",
    type: "Demand Notice",
    assessmentYear: "2023-24",
    issueDate: new Date("2024-01-20"),
    dueDate: new Date("2024-02-20"),
    status: "Pending",
    priority: "Medium",
    description: "Tax demand of ₹15,000",
  },
]

const complianceTasks = [
  {
    id: "COMP001",
    task: "File GSTR-3B for January 2024",
    dueDate: new Date("2024-02-20"),
    status: "Pending",
    priority: "High",
  },
  {
    id: "COMP002",
    task: "Submit TDS Return for Q3",
    dueDate: new Date("2024-02-15"),
    status: "In Progress",
    priority: "High",
  },
  {
    id: "COMP003",
    task: "File Annual GST Return",
    dueDate: new Date("2024-03-31"),
    status: "Pending",
    priority: "Medium",
  },
]

export default function NoticesCompliancePage() {
  const [selectedNotice, setSelectedNotice] = useState<any>(null)
  const [response, setResponse] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notice & Compliance Center</h1>
          <p className="text-muted-foreground">
            View and respond to tax notices, manage compliance tasks
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Notices</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notices.filter((n) => n.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Tasks</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {complianceTasks.filter((t) => t.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming deadlines</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notices.filter((n) => n.status === "Responded").length}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tax Notices</CardTitle>
            <CardDescription>Notices from Income Tax Department</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Notice ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableCell className="font-medium">{notice.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{notice.type}</p>
                        <p className="text-xs text-muted-foreground">
                          AY: {notice.assessmentYear}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(notice.dueDate)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          notice.status === "Responded"
                            ? "default"
                            : notice.priority === "High"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {notice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedNotice(notice)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{notice.type}</DialogTitle>
                            <DialogDescription>
                              Notice ID: {notice.id} | Assessment Year:{" "}
                              {notice.assessmentYear}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Description</Label>
                              <p className="text-sm mt-1">{notice.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Issue Date</Label>
                                <p className="text-sm mt-1">
                                  {formatDate(notice.issueDate)}
                                </p>
                              </div>
                              <div>
                                <Label>Due Date</Label>
                                <p className="text-sm mt-1">
                                  {formatDate(notice.dueDate)}
                                </p>
                              </div>
                            </div>
                            <div>
                              <Label>Response</Label>
                              <Textarea
                                placeholder="Enter your response..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                rows={5}
                                className="mt-1"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download Notice
                              </Button>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>
                              <Send className="mr-2 h-4 w-4" />
                              Submit Response
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Tasks</CardTitle>
            <CardDescription>Upcoming compliance deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between p-4 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{task.task}</p>
                      <Badge
                        variant={
                          task.priority === "High"
                            ? "destructive"
                            : task.priority === "Medium"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Due: {formatDate(task.dueDate)}
                    </p>
                    <Badge
                      variant={
                        task.status === "Pending"
                          ? "destructive"
                          : task.status === "In Progress"
                          ? "secondary"
                          : "default"
                      }
                      className="mt-2"
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
