"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, Lock, User, Shield, Building2 } from "lucide-react"

type UserRole = "admin" | "staff" | "user"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const getRedirectPath = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "/admin"
      case "staff":
        return "/staff"
      case "user":
        return "/user"
      default:
        return "/login"
    }
  }

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select your account type",
        variant: "destructive",
      })
      return
    }
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    // Simulate login - in real app, this would be an API call that returns user role
    toast({
      title: "Success",
      description: `Logged in as ${selectedRole === "admin" ? "Admin" : selectedRole === "staff" ? "Staff" : "Taxpayer"}`,
    })
    // Redirect based on selected role
    router.push(getRedirectPath(selectedRole))
  }

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select your account type",
        variant: "destructive",
      })
      return
    }
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
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select your account type",
        variant: "destructive",
      })
      return
    }
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
      description: `Logged in as ${selectedRole === "admin" ? "Admin" : selectedRole === "staff" ? "Staff" : "Taxpayer"}`,
    })
    router.push(getRedirectPath(selectedRole))
  }

  // Role selection screen
  if (!selectedRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Tax Collection System</CardTitle>
            <CardDescription className="text-center">
              Select your account type to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <button
                onClick={() => setSelectedRole("admin")}
                className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
              >
                <div className="rounded-full bg-primary/10 p-4 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Admin</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Full system access and management
                </p>
              </button>

              <button
                onClick={() => setSelectedRole("staff")}
                className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
              >
                <div className="rounded-full bg-primary/10 p-4 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Staff</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Tax collection and management
                </p>
              </button>

              <button
                onClick={() => setSelectedRole("user")}
                className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
              >
                <div className="rounded-full bg-primary/10 p-4 mb-4 group-hover:bg-primary/20 transition-colors">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Taxpayer</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Pay taxes and view receipts
                </p>
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            <div className="flex gap-4 justify-center text-xs text-muted-foreground pt-2 border-t">
              <Link href="/admin/login" className="hover:text-primary">
                Admin/Staff Login
              </Link>
              <span>•</span>
              <Link href="/user/login" className="hover:text-primary">
                Taxpayer Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedRole(null)
                setShowOTP(false)
                setOtp("")
                setEmail("")
                setPhone("")
                setPassword("")
              }}
            >
              ← Back
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {selectedRole === "admin"
              ? "Admin Login"
              : selectedRole === "staff"
              ? "Staff Login"
              : "Taxpayer Login"}
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your {selectedRole === "admin" ? "admin" : selectedRole === "staff" ? "staff" : "taxpayer"} account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                        placeholder="name@example.com"
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
          <div className="text-xs text-center text-muted-foreground">
            Logging in as: <span className="font-semibold capitalize">{selectedRole}</span>
          </div>
          <div className="flex gap-4 justify-center text-xs text-muted-foreground pt-2 border-t">
            <Link href="/admin/login" className="hover:text-primary">
              Admin/Staff Login
            </Link>
            <span>•</span>
            <Link href="/user/login" className="hover:text-primary">
              Taxpayer Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
