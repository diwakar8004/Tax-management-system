"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  CreditCard,
  BarChart3,
  Bell,
  Receipt,
  Home,
  Menu,
  X,
  Calculator,
  RefreshCw,
  Wallet,
  TrendingUp,
  Calendar,
  PieChart,
  Building2,
  DollarSign,
  Tag,
  MessageSquare,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role?: "admin" | "staff" | "user"
}

const adminMenuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/taxpayers", label: "Taxpayers", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

const staffMenuItems = [
  { href: "/staff", label: "Dashboard", icon: LayoutDashboard },
  { href: "/staff/taxpayers", label: "Taxpayers", icon: Users },
  { href: "/staff/payments", label: "Payments", icon: CreditCard },
  { href: "/staff/reports", label: "Reports", icon: BarChart3 },
  { href: "/staff/settings", label: "Settings", icon: Settings },
]

const userMenuItems = [
  { href: "/user", label: "Dashboard", icon: Home },
  { href: "/user/payments", label: "My Payments", icon: CreditCard },
  { href: "/user/receipts", label: "Receipts", icon: Receipt },
  { href: "/user/tax-calculator", label: "Tax Calculator", icon: Calculator },
  { href: "/user/tax-filing", label: "Tax Filing", icon: FileText },
  { href: "/user/itr-gst-sync", label: "ITR & GST Sync", icon: RefreshCw },
  { href: "/user/tax-wallet", label: "Tax Wallet", icon: Wallet },
  { href: "/user/refund-tracker", label: "Refund Tracker", icon: TrendingUp },
  { href: "/user/notices-compliance", label: "Notices & Compliance", icon: Bell },
  { href: "/user/investment-portfolio", label: "Investments", icon: PieChart },
  { href: "/user/advance-tax", label: "Advance Tax", icon: Calendar },
  { href: "/user/profile-management", label: "Profile", icon: Users },
  { href: "/user/expenses", label: "Expenses", icon: Tag },
  { href: "/user/tools", label: "Tools", icon: Wrench },
  { href: "/user/support", label: "Support", icon: MessageSquare },
  { href: "/user/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ role = "admin" }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuItems =
    role === "admin"
      ? adminMenuItems
      : role === "staff"
      ? staffMenuItems
      : userMenuItems

  return (
    <>
      {/* Mobile menu button - Portal-like fixed positioning */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-50 h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-card transition-transform duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold text-primary">Tax Collection</h1>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
