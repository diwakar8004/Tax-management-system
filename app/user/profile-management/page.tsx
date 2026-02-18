"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { Users, Building2, DollarSign, Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const familyMembers = [
  {
    id: "1",
    name: "Spouse Name",
    relation: "Spouse",
    pan: "ABCDE1234F",
    dob: "1985-05-15",
    income: 800000,
  },
  {
    id: "2",
    name: "Parent Name",
    relation: "Parent",
    pan: "FGHIJ5678K",
    dob: "1960-03-20",
    income: 0,
    seniorCitizen: true,
  },
]

const businessProfiles = [
  {
    id: "1",
    name: "ABC Enterprises",
    type: "Sole Proprietorship",
    gstin: "29ABCDE1234F1Z5",
    pan: "ABCDE1234F",
    income: 5000000,
  },
  {
    id: "2",
    name: "XYZ Trading Co.",
    type: "Partnership",
    gstin: "29XYZTR5678G2H6",
    pan: "XYZTR5678G",
    income: 3000000,
  },
]

const incomeSources = [
  {
    id: "1",
    type: "Salary",
    source: "ABC Corporation",
    amount: 1200000,
    tds: 120000,
  },
  {
    id: "2",
    type: "Rental Income",
    source: "Property - Mumbai",
    amount: 240000,
    tds: 0,
  },
  {
    id: "3",
    type: "Interest",
    source: "Fixed Deposits",
    amount: 50000,
    tds: 5000,
  },
  {
    id: "4",
    type: "Business",
    source: "ABC Enterprises",
    amount: 500000,
    tds: 0,
  },
]

export default function ProfileManagementPage() {
  const [isFamilyDialogOpen, setIsFamilyDialogOpen] = useState(false)
  const [isBusinessDialogOpen, setIsBusinessDialogOpen] = useState(false)
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Management</h1>
          <p className="text-muted-foreground">
            Manage family members, business profiles, and income sources
          </p>
        </div>
      </div>

      <Tabs defaultValue="family" className="w-full">
        <TabsList>
          <TabsTrigger value="family">
            <Users className="mr-2 h-4 w-4" />
            Family & Dependents
          </TabsTrigger>
          <TabsTrigger value="business">
            <Building2 className="mr-2 h-4 w-4" />
            Business Profiles
          </TabsTrigger>
          <TabsTrigger value="income">
            <DollarSign className="mr-2 h-4 w-4" />
            Income Sources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="family" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Family & Dependents</CardTitle>
                  <CardDescription>
                    Add spouse, parents, and dependents for tax benefits
                  </CardDescription>
                </div>
                <Dialog open={isFamilyDialogOpen} onOpenChange={setIsFamilyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Family Member</DialogTitle>
                      <DialogDescription>
                        Add a family member or dependent
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Enter name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Relation</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="dependent">Dependent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>PAN</Label>
                        <Input placeholder="ABCDE1234F" />
                      </div>
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsFamilyDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsFamilyDialogOpen(false)}>Add</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Relation</TableHead>
                    <TableHead>PAN</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {familyMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.relation}</TableCell>
                      <TableCell className="font-mono">{member.pan}</TableCell>
                      <TableCell>{member.dob}</TableCell>
                      <TableCell>
                        {member.income > 0 ? formatCurrency(member.income) : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Business Profiles</CardTitle>
                  <CardDescription>
                    Manage multiple business entities and accounts
                  </CardDescription>
                </div>
                <Dialog open={isBusinessDialogOpen} onOpenChange={setIsBusinessDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Business
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Business Profile</DialogTitle>
                      <DialogDescription>
                        Add a new business entity
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Business Name</Label>
                        <Input placeholder="Enter business name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Business Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sole">Sole Proprietorship</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="llp">LLP</SelectItem>
                            <SelectItem value="company">Company</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>GSTIN</Label>
                        <Input placeholder="29ABCDE1234F1Z5" />
                      </div>
                      <div className="space-y-2">
                        <Label>PAN</Label>
                        <Input placeholder="ABCDE1234F" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsBusinessDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsBusinessDialogOpen(false)}>Add</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>GSTIN</TableHead>
                    <TableHead>PAN</TableHead>
                    <TableHead>Annual Income</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businessProfiles.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="font-medium">{business.name}</TableCell>
                      <TableCell>{business.type}</TableCell>
                      <TableCell className="font-mono">{business.gstin}</TableCell>
                      <TableCell className="font-mono">{business.pan}</TableCell>
                      <TableCell>{formatCurrency(business.income)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Income Sources</CardTitle>
                  <CardDescription>
                    Track all your income sources (salary, rent, business, interest)
                  </CardDescription>
                </div>
                <Dialog open={isIncomeDialogOpen} onOpenChange={setIsIncomeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Income Source
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Income Source</DialogTitle>
                      <DialogDescription>
                        Add a new income source
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Income Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salary">Salary</SelectItem>
                            <SelectItem value="rental">Rental Income</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="interest">Interest</SelectItem>
                            <SelectItem value="capital-gains">Capital Gains</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Source Name</Label>
                        <Input placeholder="Enter source name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Annual Amount (₹)</Label>
                        <Input type="number" placeholder="1000000" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsIncomeDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsIncomeDialogOpen(false)}>Add</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Annual Amount</TableHead>
                    <TableHead>TDS</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeSources.map((source) => (
                    <TableRow key={source.id}>
                      <TableCell className="font-medium">{source.type}</TableCell>
                      <TableCell>{source.source}</TableCell>
                      <TableCell>{formatCurrency(source.amount)}</TableCell>
                      <TableCell>
                        {source.tds > 0 ? formatCurrency(source.tds) : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
