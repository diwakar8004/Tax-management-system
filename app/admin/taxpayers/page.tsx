"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

const mockTaxpayers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    gstin: "29ABCDE1234F1Z5",
    taxType: "GST",
    totalDue: 45000,
    lastPayment: new Date("2024-01-10"),
    status: "Active",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543211",
    gstin: "29ABCDE1234F1Z6",
    taxType: "Property Tax",
    totalDue: 25000,
    lastPayment: new Date("2024-01-05"),
    status: "Active",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 9876543212",
    gstin: "29ABCDE1234F1Z7",
    taxType: "Local Tax",
    totalDue: 15000,
    lastPayment: new Date("2024-01-12"),
    status: "Active",
  },
]

export default function TaxpayersPage() {
  const { toast } = useToast()
  const [taxpayers, setTaxpayers] = useState(mockTaxpayers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTaxpayer, setEditingTaxpayer] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gstin: "",
    taxType: "GST",
  })

  const filteredTaxpayers = taxpayers.filter(
    (tp) =>
      tp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tp.phone.includes(searchQuery)
  )

  const handleAdd = () => {
    setEditingTaxpayer(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      gstin: "",
      taxType: "GST",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (taxpayer: any) => {
    setEditingTaxpayer(taxpayer)
    setFormData({
      name: taxpayer.name,
      email: taxpayer.email,
      phone: taxpayer.phone,
      gstin: taxpayer.gstin,
      taxType: taxpayer.taxType,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setTaxpayers(taxpayers.filter((tp) => tp.id !== id))
    toast({
      title: "Success",
      description: "Taxpayer deleted successfully",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTaxpayer) {
      setTaxpayers(
        taxpayers.map((tp) =>
          tp.id === editingTaxpayer.id ? { ...tp, ...formData } : tp
        )
      )
      toast({
        title: "Success",
        description: "Taxpayer updated successfully",
      })
    } else {
      const newTaxpayer = {
        id: String(taxpayers.length + 1),
        ...formData,
        totalDue: 0,
        lastPayment: new Date(),
        status: "Active",
      }
      setTaxpayers([...taxpayers, newTaxpayer])
      toast({
        title: "Success",
        description: "Taxpayer added successfully",
      })
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Taxpayers</h1>
          <p className="text-muted-foreground">Manage taxpayer information</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Taxpayer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Taxpayer List</CardTitle>
          <CardDescription>All registered taxpayers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search taxpayers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>GSTIN</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead>Total Due</TableHead>
                <TableHead>Last Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTaxpayers.map((taxpayer) => (
                <TableRow key={taxpayer.id}>
                  <TableCell className="font-medium">{taxpayer.name}</TableCell>
                  <TableCell>{taxpayer.email}</TableCell>
                  <TableCell>{taxpayer.phone}</TableCell>
                  <TableCell>{taxpayer.gstin}</TableCell>
                  <TableCell>{taxpayer.taxType}</TableCell>
                  <TableCell>{formatCurrency(taxpayer.totalDue)}</TableCell>
                  <TableCell>{formatDate(taxpayer.lastPayment)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      {taxpayer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(taxpayer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(taxpayer.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTaxpayer ? "Edit Taxpayer" : "Add Taxpayer"}</DialogTitle>
            <DialogDescription>
              {editingTaxpayer ? "Update taxpayer information" : "Add a new taxpayer to the system"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gstin">GSTIN</Label>
                <Input
                  id="gstin"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="taxType">Tax Type</Label>
                <Select
                  value={formData.taxType}
                  onValueChange={(value) => setFormData({ ...formData, taxType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GST">GST</SelectItem>
                    <SelectItem value="Property Tax">Property Tax</SelectItem>
                    <SelectItem value="Local Tax">Local Tax</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingTaxpayer ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
