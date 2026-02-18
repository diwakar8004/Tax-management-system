"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Upload, FileText, Image, Download, Trash2, Search, Folder, Lock, File, Archive } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

const documentCategories = [
  { id: "all", label: "All Documents", count: 186 },
  { id: "itr", label: "ITR Documents", count: 12 },
  { id: "gst", label: "GST Documents", count: 8 },
  { id: "invoices", label: "Invoices", count: 45 },
  { id: "receipts", label: "Receipts", count: 67 },
  { id: "bank", label: "Bank Statements", count: 24 },
  { id: "investment", label: "Investment Proofs", count: 15 },
  { id: "property", label: "Property Documents", count: 5 },
  { id: "other", label: "Other", count: 10 },
]

const recentDocuments = [
  {
    id: "1",
    name: "ITR_2023-24.pdf",
    category: "ITR Documents",
    size: "2.4 MB",
    uploadDate: new Date("2024-01-15"),
    type: "pdf",
  },
  {
    id: "2",
    name: "GSTR-3B_Dec2023.pdf",
    category: "GST Documents",
    size: "1.8 MB",
    uploadDate: new Date("2024-01-10"),
    type: "pdf",
  },
  {
    id: "3",
    name: "Bank_Statement_Jan2024.pdf",
    category: "Bank Statements",
    size: "3.2 MB",
    uploadDate: new Date("2024-01-20"),
    type: "pdf",
  },
  {
    id: "4",
    name: "Investment_Proof_80C.jpg",
    category: "Investment Proofs",
    size: "456 KB",
    uploadDate: new Date("2024-01-18"),
    type: "image",
  },
]

export default function TaxWalletPage() {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocs = recentDocuments.filter(doc => {
    const categoryMatch = selectedCategory === "all" || doc.category.includes(selectedCategory)
    const searchMatch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  const handleUpload = () => {
    toast({
      title: "Document Uploaded",
      description: "Your document has been securely stored",
    })
  }

  const handleDelete = (docId: string) => {
    toast({
      title: "Document Deleted",
      description: "The document has been permanently removed",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Lock className="h-8 w-8 text-primary" />
            Digital Tax Wallet
          </h1>
          <p className="text-muted-foreground">
            Secure cloud storage for all your tax documents
          </p>
        </div>
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Storage Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Used: 4.8 GB</span>
            <span>Available: 20 GB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "24%" }} />
          </div>
        </CardContent>
      </Card>

      {/* Document Categories Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {documentCategories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === category.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{category.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {category.count} docs
                    </p>
                  </div>
                  <Folder className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Search and manage your stored documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {doc.type === "pdf" ? (
                            <FileText className="h-4 w-4 text-red-500" />
                          ) : (
                            <Image className="h-4 w-4 text-blue-500" />
                          )}
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.category}</Badge>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No documents found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

