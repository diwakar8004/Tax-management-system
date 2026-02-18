import { Sidebar } from "@/components/layout/sidebar"
import { Navbar } from "@/components/layout/navbar"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="admin" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          user={{
            name: "Admin User",
            email: "admin@taxsystem.gov.in",
            role: "admin",
          }}
        />
        <main className="flex-1 overflow-y-auto p-4 pt-16 md:pt-6 md:p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
