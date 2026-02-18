"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { MessageSquare, User, FileText, Send, Phone, Mail, Bot } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const grievances = [
  {
    id: "GRV001",
    subject: "Refund Delay",
    category: "Refund",
    status: "Open",
    submittedDate: new Date("2024-01-10"),
    lastUpdate: new Date("2024-01-15"),
  },
  {
    id: "GRV002",
    subject: "Notice Response",
    category: "Notice",
    status: "Resolved",
    submittedDate: new Date("2023-12-15"),
    lastUpdate: new Date("2023-12-20"),
  },
]

const caAdvisors = [
  {
    id: "1",
    name: "CA Rajesh Kumar",
    specialization: "Income Tax, GST",
    experience: "15 years",
    rating: 4.8,
    available: true,
  },
  {
    id: "2",
    name: "CA Priya Sharma",
    specialization: "Corporate Tax, Compliance",
    experience: "12 years",
    rating: 4.9,
    available: true,
  },
]

const chatMessages = [
  { id: "1", sender: "bot", message: "Hello! How can I help you with your tax queries today?" },
  { id: "2", sender: "user", message: "What is the deadline for filing ITR?" },
  { id: "3", sender: "bot", message: "The deadline for filing ITR for AY 2024-25 is July 31, 2024. However, you can file belated returns until December 31, 2024 with a penalty." },
]

export default function SupportPage() {
  const [message, setMessage] = useState("")
  const [grievanceSubject, setGrievanceSubject] = useState("")
  const [grievanceDescription, setGrievanceDescription] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support & Help</h1>
        <p className="text-muted-foreground">
          Get help with tax queries, connect with advisors, and file grievances
        </p>
      </div>

      <Tabs defaultValue="chatbot" className="w-full">
        <TabsList>
          <TabsTrigger value="chatbot">
            <Bot className="mr-2 h-4 w-4" />
            Tax Chatbot
          </TabsTrigger>
          <TabsTrigger value="advisor">
            <User className="mr-2 h-4 w-4" />
            CA/Advisor Connect
          </TabsTrigger>
          <TabsTrigger value="grievance">
            <FileText className="mr-2 h-4 w-4" />
            Grievance & Appeals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chatbot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Query Chatbot</CardTitle>
              <CardDescription>
                Ask questions about taxes, deductions, and compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        // Handle send
                        setMessage("")
                      }
                    }}
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advisor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect with CA/Advisor</CardTitle>
              <CardDescription>
                One-click connect with certified tax advisors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caAdvisors.map((advisor) => (
                  <div
                    key={advisor.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{advisor.name}</p>
                        {advisor.available && (
                          <Badge variant="default">Available</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {advisor.specialization}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Experience: {advisor.experience} • Rating: {advisor.rating}/5
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grievance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>File Grievance</CardTitle>
                <CardDescription>
                  File a grievance or appeal with the tax department
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={grievanceSubject}
                    onChange={(e) => setGrievanceSubject(e.target.value)}
                    placeholder="Enter grievance subject"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={grievanceDescription}
                    onChange={(e) => setGrievanceDescription(e.target.value)}
                    placeholder="Describe your grievance in detail..."
                    rows={6}
                  />
                </div>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Grievance
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grievance History</CardTitle>
                <CardDescription>Your filed grievances and appeals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grievances.map((grievance) => (
                      <TableRow key={grievance.id}>
                        <TableCell className="font-medium">{grievance.id}</TableCell>
                        <TableCell>{grievance.subject}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              grievance.status === "Resolved"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {grievance.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(grievance.submittedDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
