"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, MessageSquare, Send } from "lucide-react"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notificationType, setNotificationType] = useState("email")
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    message: "",
  })

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Success",
      description: `${notificationType === "email" ? "Email" : "SMS"} sent successfully`,
    })
    setFormData({
      recipient: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Send reminders and alerts to taxpayers</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
            <CardDescription>Send email or SMS reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-2">
                <Label>Notification Type</Label>
                <Select value={notificationType} onValueChange={setNotificationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        SMS
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient">
                  {notificationType === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <Input
                  id="recipient"
                  type={notificationType === "email" ? "email" : "tel"}
                  placeholder={notificationType === "email" ? "user@example.com" : "+91 9876543210"}
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  required
                />
              </div>
              {notificationType === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Tax Payment Reminder"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send {notificationType === "email" ? "Email" : "SMS"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Due Alerts</CardTitle>
            <CardDescription>Taxpayers with upcoming due dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <p className="font-medium">Rajesh Kumar</p>
                <p className="text-sm text-muted-foreground">GST Payment Due</p>
                <p className="text-sm text-muted-foreground">Due Date: Jan 31, 2024</p>
                <Button size="sm" className="mt-2" variant="outline">
                  Send Reminder
                </Button>
              </div>
              <div className="rounded-lg border p-4">
                <p className="font-medium">Priya Sharma</p>
                <p className="text-sm text-muted-foreground">Property Tax Due</p>
                <p className="text-sm text-muted-foreground">Due Date: Feb 15, 2024</p>
                <Button size="sm" className="mt-2" variant="outline">
                  Send Reminder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
