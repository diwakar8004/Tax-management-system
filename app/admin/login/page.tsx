"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, Lock, Shield, Building2 } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userType, setUserType] = useState<"admin" | "staff">("admin")
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Success",
      description: `Logged in as ${userType === "admin" ? "Admin" : "Staff"}`,
    })
    router.push(userType === "admin" ? "/admin" : "/staff")
  }

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      })
      return
    }
    setShowOTP(true)
    toast({
      title: "OTP Sent",
      description: "Please check your phone for the OTP",
    })
  }

  const handleOTPVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Success",
      description: `Logged in as ${userType === "admin" ? "Admin" : "Staff"}`,
    })
    router.push(userType === "admin" ? "/admin" : "/staff")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            {userType === "admin" ? (
              <Shield className="h-6 w-6 text-primary" />
            ) : (
              <Building2 className="h-6 w-6 text-primary" />
            )}
            {userType === "admin" ? "Admin Login" : "Staff Login"}
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your {userType === "admin" ? "admin" : "staff"} account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Account Type</Label>
            <Select value={userType} onValueChange={(value: "admin" | "staff") => setUserType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </div>
                </SelectItem>
                <SelectItem value="staff">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Staff
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" onClick={() => setLoginMethod("email")}>
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" onClick={() => setLoginMethod("phone")}>
                Phone
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="space-y-4">
              {!showOTP ? (
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@taxsystem.gov.in"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOTPVerify} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="text-center text-2xl tracking-widest"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Verify OTP
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setShowOTP(false)
                      setOtp("")
                    }}
                  >
                    Back
                  </Button>
                </form>
              )}
            </TabsContent>
            <TabsContent value="phone" className="space-y-4">
              {!showOTP ? (
                <form onSubmit={handlePhoneLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Send OTP
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOTPVerify} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="text-center text-2xl tracking-widest"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Verify OTP
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setShowOTP(false)
                      setOtp("")
                    }}
                  >
                    Back
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-sm text-center">
            <Link href="/user/login" className="text-primary hover:underline">
              Taxpayer Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
