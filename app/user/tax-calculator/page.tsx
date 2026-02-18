"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { Calculator, TrendingDown, TrendingUp, DollarSign } from "lucide-react"

// India Income Tax Slabs for FY 2024-25 (AY 2025-26)
const INDIVIDUAL_TAX_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 },
]

const SENIOR_CITIZEN_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 },
]

const SUPER_SENIOR_CITIZEN_SLABS = [
  { min: 0, max: 500000, rate: 0 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 },
]

// Business Tax Rates
const BUSINESS_TAX_RATES = {
  company: {
    domestic: 30, // 30% for domestic companies
    foreign: 40, // 40% for foreign companies
  },
  partnership: 30, // 30% for partnership firms
  llp: 30, // 30% for LLPs
  sole_proprietorship: 30, // 30% (same as individual rates)
}

function calculateIndividualTax(
  income: number,
  age: string,
  deductions: {
    section80C: number
    section80D: number
    hra: number
    other: number
  }
): {
  grossIncome: number
  totalDeductions: number
  taxableIncome: number
  tax: number
  cess: number
  totalTax: number
  netIncome: number
} {
  const grossIncome = income
  const totalDeductions =
    deductions.section80C +
    deductions.section80D +
    deductions.hra +
    deductions.other

  // Standard deduction of ₹50,000
  const standardDeduction = 50000
  const totalDeductionsWithStandard = totalDeductions + standardDeduction

  const taxableIncome = Math.max(0, grossIncome - totalDeductionsWithStandard)

  // Select tax slabs based on age
  let slabs = INDIVIDUAL_TAX_SLABS
  if (age === "senior") {
    slabs = SENIOR_CITIZEN_SLABS
  } else if (age === "super_senior") {
    slabs = SUPER_SENIOR_CITIZEN_SLABS
  }

  // Calculate tax
  let tax = 0
  let remainingIncome = taxableIncome

  for (const slab of slabs) {
    if (remainingIncome <= 0) break

    const slabIncome = Math.min(remainingIncome, slab.max - slab.min)
    tax += (slabIncome * slab.rate) / 100
    remainingIncome -= slabIncome
  }

  // Health and Education Cess (4% of tax)
  const cess = (tax * 4) / 100
  const totalTax = tax + cess
  const netIncome = grossIncome - totalTax

  return {
    grossIncome,
    totalDeductions: totalDeductionsWithStandard,
    taxableIncome,
    tax,
    cess,
    totalTax,
    netIncome,
  }
}

function calculateBusinessTax(
  income: number,
  businessType: string,
  deductions: number
): {
  grossIncome: number
  deductions: number
  taxableIncome: number
  taxRate: number
  tax: number
  cess: number
  totalTax: number
  netIncome: number
} {
  const grossIncome = income
  const taxableIncome = Math.max(0, grossIncome - deductions)

  let taxRate = 30
  if (businessType === "company_domestic") {
    taxRate = BUSINESS_TAX_RATES.company.domestic
  } else if (businessType === "company_foreign") {
    taxRate = BUSINESS_TAX_RATES.company.foreign
  } else if (businessType === "partnership") {
    taxRate = BUSINESS_TAX_RATES.partnership
  } else if (businessType === "llp") {
    taxRate = BUSINESS_TAX_RATES.llp
  } else if (businessType === "sole_proprietorship") {
    taxRate = BUSINESS_TAX_RATES.sole_proprietorship
  }

  const tax = (taxableIncome * taxRate) / 100
  const cess = (tax * 4) / 100
  const totalTax = tax + cess
  const netIncome = grossIncome - totalTax

  return {
    grossIncome,
    deductions,
    taxableIncome,
    taxRate,
    tax,
    cess,
    totalTax,
    netIncome,
  }
}

export default function TaxCalculatorPage() {
  const [individualData, setIndividualData] = useState({
    income: "",
    age: "below_60",
    section80C: "",
    section80D: "",
    hra: "",
    other: "",
  })

  const [businessData, setBusinessData] = useState({
    income: "",
    businessType: "company_domestic",
    deductions: "",
  })

  const [individualResult, setIndividualResult] = useState<any>(null)
  const [businessResult, setBusinessResult] = useState<any>(null)

  const handleIndividualCalculate = () => {
    const income = parseFloat(individualData.income) || 0
    const deductions = {
      section80C: parseFloat(individualData.section80C) || 0,
      section80D: parseFloat(individualData.section80D) || 0,
      hra: parseFloat(individualData.hra) || 0,
      other: parseFloat(individualData.other) || 0,
    }

    const result = calculateIndividualTax(income, individualData.age, deductions)
    setIndividualResult(result)
  }

  const handleBusinessCalculate = () => {
    const income = parseFloat(businessData.income) || 0
    const deductions = parseFloat(businessData.deductions) || 0

    const result = calculateBusinessTax(
      income,
      businessData.businessType,
      deductions
    )
    setBusinessResult(result)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calculator className="h-8 w-8 text-primary" />
          Income Tax Calculator
        </h1>
        <p className="text-muted-foreground">
          Calculate your income tax for FY 2024-25 (AY 2025-26)
        </p>
      </div>

      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        {/* Individual Tax Calculator */}
        <TabsContent value="individual" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Income Details</CardTitle>
                <CardDescription>Enter your income and deductions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="1000000"
                    value={individualData.income}
                    onChange={(e) =>
                      setIndividualData({ ...individualData, income: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age Category</Label>
                  <Select
                    value={individualData.age}
                    onValueChange={(value) =>
                      setIndividualData({ ...individualData, age: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below_60">Below 60 years</SelectItem>
                      <SelectItem value="senior">60-80 years (Senior Citizen)</SelectItem>
                      <SelectItem value="super_senior">Above 80 years (Super Senior)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section80C">Section 80C (Max ₹1,50,000)</Label>
                  <Input
                    id="section80C"
                    type="number"
                    placeholder="150000"
                    value={individualData.section80C}
                    onChange={(e) =>
                      setIndividualData({
                        ...individualData,
                        section80C: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    PPF, ELSS, Life Insurance, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section80D">Section 80D - Health Insurance (₹)</Label>
                  <Input
                    id="section80D"
                    type="number"
                    placeholder="25000"
                    value={individualData.section80D}
                    onChange={(e) =>
                      setIndividualData({
                        ...individualData,
                        section80D: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hra">HRA Exemption (₹)</Label>
                  <Input
                    id="hra"
                    type="number"
                    placeholder="0"
                    value={individualData.hra}
                    onChange={(e) =>
                      setIndividualData({ ...individualData, hra: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="other">Other Deductions (₹)</Label>
                  <Input
                    id="other"
                    type="number"
                    placeholder="0"
                    value={individualData.other}
                    onChange={(e) =>
                      setIndividualData({ ...individualData, other: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Section 80G, 80E, etc.
                  </p>
                </div>

                <Button onClick={handleIndividualCalculate} className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>

            {/* Results Card */}
            {individualResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Tax Calculation Result</CardTitle>
                  <CardDescription>Your income tax breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Gross Income</span>
                      <span className="font-semibold">
                        {formatCurrency(individualResult.grossIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Deductions</span>
                      <span className="font-semibold text-green-600">
                        -{formatCurrency(individualResult.totalDeductions)}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Taxable Income</span>
                        <span className="font-bold">
                          {formatCurrency(individualResult.taxableIncome)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">Income Tax</span>
                      <span className="font-semibold">
                        {formatCurrency(individualResult.tax)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Cess (4%)</span>
                      <span className="font-semibold">
                        {formatCurrency(individualResult.cess)}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total Tax</span>
                        <span className="text-lg font-bold text-red-600">
                          {formatCurrency(individualResult.totalTax)}
                        </span>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Net Income After Tax</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(individualResult.netIncome)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> This is an estimate. Actual tax may vary based on
                      specific deductions and exemptions applicable to your case. Please consult a
                      tax advisor for accurate calculations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Business Tax Calculator */}
        <TabsContent value="business" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Business Income Details</CardTitle>
                <CardDescription>Enter your business income and deductions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-income">Annual Business Income (₹)</Label>
                  <Input
                    id="business-income"
                    type="number"
                    placeholder="5000000"
                    value={businessData.income}
                    onChange={(e) =>
                      setBusinessData({ ...businessData, income: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Select
                    value={businessData.businessType}
                    onValueChange={(value) =>
                      setBusinessData({ ...businessData, businessType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company_domestic">
                        Domestic Company (30%)
                      </SelectItem>
                      <SelectItem value="company_foreign">
                        Foreign Company (40%)
                      </SelectItem>
                      <SelectItem value="partnership">Partnership Firm (30%)</SelectItem>
                      <SelectItem value="llp">LLP (30%)</SelectItem>
                      <SelectItem value="sole_proprietorship">
                        Sole Proprietorship (30%)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-deductions">Total Deductions (₹)</Label>
                  <Input
                    id="business-deductions"
                    type="number"
                    placeholder="500000"
                    value={businessData.deductions}
                    onChange={(e) =>
                      setBusinessData({ ...businessData, deductions: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Business expenses, depreciation, etc.
                  </p>
                </div>

                <Button onClick={handleBusinessCalculate} className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>

            {/* Business Results Card */}
            {businessResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Tax Calculation Result</CardTitle>
                  <CardDescription>Your business tax breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Gross Income</span>
                      <span className="font-semibold">
                        {formatCurrency(businessResult.grossIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Deductions</span>
                      <span className="font-semibold text-green-600">
                        -{formatCurrency(businessResult.deductions)}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Taxable Income</span>
                        <span className="font-bold">
                          {formatCurrency(businessResult.taxableIncome)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">Tax Rate</span>
                      <span className="font-semibold">{businessResult.taxRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Income Tax</span>
                      <span className="font-semibold">
                        {formatCurrency(businessResult.tax)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Cess (4%)</span>
                      <span className="font-semibold">
                        {formatCurrency(businessResult.cess)}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total Tax</span>
                        <span className="text-lg font-bold text-red-600">
                          {formatCurrency(businessResult.totalTax)}
                        </span>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Net Income After Tax</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(businessResult.netIncome)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Note:</strong> This is an estimate. Actual tax may vary based on
                      specific business deductions, exemptions, and applicable tax laws. Please
                      consult a tax advisor for accurate calculations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
