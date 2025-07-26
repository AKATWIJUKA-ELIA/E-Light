"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Upload,
  Store,
  User,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Building,
  Globe,
} from "lucide-react"

interface SellerFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Business Information
  businessName: string
  businessType: string
  businessRegistrationNumber: string
  taxId: string
  businessAddress: string
  city: string
  state: string
  zipCode: string
  country: string
  website: string

  // Business Details
  businessDescription: string
  yearsInBusiness: string
  numberOfEmployees: string
  categories: string[]

  // Banking Information
  bankName: string
  accountHolderName: string
  accountNumber: string
  routingNumber: string

  // Documents
  businessLicense: File | null
  taxCertificate: File | null
  identityDocument: File | null

  // Agreement
  termsAccepted: string
  privacyAccepted: string
}

const businessTypes = ["Sole Proprietorship", "Partnership", "LLC", "Corporation", "Non-Profit", "Other"]

const productCategories = [
  "Electronics",
  "Fashion & Apparel",
  "Home & Garden",
  "Sports & Outdoors",
  "Health & Beauty",
  "Books & Media",
  "Toys & Games",
  "Automotive",
  "Food & Beverages",
  "Jewelry & Accessories",
  "Art & Crafts",
  "Pet Supplies",
]

const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Other"]

export default function SellerRegistration() {
  const [formData, setFormData] = useState<SellerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    businessRegistrationNumber: "",
    taxId: "",
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    website: "",
    businessDescription: "",
    yearsInBusiness: "",
    numberOfEmployees: "",
    categories: [],
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    businessLicense: null,
    taxCertificate: null,
    identityDocument: null,
    termsAccepted: "no",
    privacyAccepted: "no",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof SellerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleFileUpload = (field: keyof SellerFormData, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.phone) newErrors.phone = "Phone number is required"
        break
      case 2:
        if (!formData.businessName) newErrors.businessName = "Business name is required"
        if (!formData.businessType) newErrors.businessType = "Business type is required"
        if (!formData.businessAddress) newErrors.businessAddress = "Business address is required"
        if (!formData.city) newErrors.city = "City is required"
        if (!formData.country) newErrors.country = "Country is required"
        break
      case 3:
        if (!formData.businessDescription) newErrors.businessDescription = "Business description is required"
        if (formData.categories.length === 0) newErrors.categories = "Please select at least one category"
        break
      case 4:
        if (!formData.bankName) newErrors.bankName = "Bank name is required"
        if (!formData.accountHolderName) newErrors.accountHolderName = "Account holder name is required"
        if (!formData.accountNumber) newErrors.accountNumber = "Account number is required"
        break
      case 5:
        if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions"
        if (!formData.privacyAccepted) newErrors.privacyAccepted = "You must accept the privacy policy"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert(
        "Registration submitted successfully! We will review your application and get back to you within 2-3 business days.",
      )
    } catch (error) {
      alert(`An error occurred.${error} Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Business Info", icon: Building },
    { number: 3, title: "Business Details", icon: Store },
    { number: 4, title: "Banking Info", icon: CreditCard },
    { number: 5, title: "Review & Submit", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Store className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Become a Seller</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful sellers on our platform. Complete the registration process to start selling
            your products to millions of customers worldwide.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={`text-sm font-medium ${isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"}`}
                    >
                      Step {step.number}
                    </p>
                    <p
                      className={`text-xs ${isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"}`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6 mr-2" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {currentStep === 1 && "Let's start with your personal information"}
              {currentStep === 2 && "Tell us about your business"}
              {currentStep === 3 && "Provide details about your business operations"}
              {currentStep === 4 && "Set up your payment information"}
              {currentStep === 5 && "Review your information and submit"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 mr-1" />
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 mr-1" />
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-1" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 mr-1" />
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      className={errors.businessName ? "border-red-500" : ""}
                      placeholder="Enter your business name"
                    />
                    {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                  </div>

                  <div>
                    <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 mr-1" />
                      Business Type *
                    </Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleInputChange("businessType", value)}
                    >
                      <SelectTrigger className={errors.businessType ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="businessRegistrationNumber"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Business Registration Number
                    </Label>
                    <Input
                      id="businessRegistrationNumber"
                      value={formData.businessRegistrationNumber}
                      onChange={(e) => handleInputChange("businessRegistrationNumber", e.target.value)}
                      placeholder="Enter registration number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxId" className="text-sm font-medium text-gray-700 mb-2 block">
                      Tax ID / EIN
                    </Label>
                    <Input
                      id="taxId"
                      value={formData.taxId}
                      onChange={(e) => handleInputChange("taxId", e.target.value)}
                      placeholder="Enter tax ID"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessAddress" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Business Address *
                  </Label>
                  <Input
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                    className={errors.businessAddress ? "border-red-500" : ""}
                    placeholder="Enter your business address"
                  />
                  {errors.businessAddress && <p className="text-red-500 text-xs mt-1">{errors.businessAddress}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={errors.city ? "border-red-500" : ""}
                      placeholder="Enter city"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700 mb-2 block">
                      State/Province
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>

                  <div>
                    <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 mb-2 block">
                      ZIP/Postal Code
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>

                  <div>
                    <Label htmlFor="website" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Globe className="w-4 h-4 mr-1" />
                      Website (Optional)
                    </Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Business Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessDescription" className="text-sm font-medium text-gray-700 mb-2 block">
                    Business Description *
                  </Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                    className={`min-h-[120px] ${errors.businessDescription ? "border-red-500" : ""}`}
                    placeholder="Describe your business, what you sell, and what makes you unique..."
                  />
                  {errors.businessDescription && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessDescription}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Years in Business</Label>
                    <Select
                      value={formData.yearsInBusiness}
                      onValueChange={(value) => handleInputChange("yearsInBusiness", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="more-than-10">More than 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Number of Employees</Label>
                    <Select
                      value={formData.numberOfEmployees}
                      onValueChange={(value) => handleInputChange("numberOfEmployees", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2-5">2-5 employees</SelectItem>
                        <SelectItem value="6-20">6-20 employees</SelectItem>
                        <SelectItem value="21-50">21-50 employees</SelectItem>
                        <SelectItem value="more-than-50">More than 50 employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Product Categories * (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {productCategories.map((category) => (
                      <div
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.categories.includes(category)
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <Checkbox
                            checked={formData.categories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="mr-2"
                          />
                          <span className="text-sm">{category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.categories && <p className="text-red-500 text-xs mt-2">{errors.categories}</p>}
                </div>

                {formData.categories.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Selected Categories:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="bg-blue-100 text-blue-800">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Banking Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Secure Banking Information</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Your banking information is encrypted and secure. This information is required to process your
                        payments.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bankName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Bank Name *
                    </Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange("bankName", e.target.value)}
                      className={errors.bankName ? "border-red-500" : ""}
                      placeholder="Enter your bank name"
                    />
                    {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="accountHolderName" className="text-sm font-medium text-gray-700 mb-2 block">
                      Account Holder Name *
                    </Label>
                    <Input
                      id="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                      className={errors.accountHolderName ? "border-red-500" : ""}
                      placeholder="Enter account holder name"
                    />
                    {errors.accountHolderName && (
                      <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700 mb-2 block">
                      Account Number *
                    </Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                      className={errors.accountNumber ? "border-red-500" : ""}
                      placeholder="Enter account number"
                      type="password"
                    />
                    {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                  </div>

                  <div>
                    <Label htmlFor="routingNumber" className="text-sm font-medium text-gray-700 mb-2 block">
                      Routing Number
                    </Label>
                    <Input
                      id="routingNumber"
                      value={formData.routingNumber}
                      onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                      placeholder="Enter routing number"
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Document Uploads
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Please upload the following documents to verify your business. All documents should be clear and
                    readable.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Business License (Optional)
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          {formData.businessLicense
                            ? formData.businessLicense.name
                            : "Click to upload or drag and drop"}
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload("businessLicense", e.target.files?.[0] || null)}
                          className="hidden"
                          id="businessLicense"
                        />
                        <Label htmlFor="businessLicense" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Choose File
                          </Button>
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Tax Certificate (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          {formData.taxCertificate ? formData.taxCertificate.name : "Click to upload or drag and drop"}
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload("taxCertificate", e.target.files?.[0] || null)}
                          className="hidden"
                          id="taxCertificate"
                        />
                        <Label htmlFor="taxCertificate" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Choose File
                          </Button>
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Identity Document (Driver&apos;s License, Passport, etc.)
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          {formData.identityDocument
                            ? formData.identityDocument.name
                            : "Click to upload or drag and drop"}
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload("identityDocument", e.target.files?.[0] || null)}
                          className="hidden"
                          id="identityDocument"
                        />
                        <Label htmlFor="identityDocument" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Choose File
                          </Button>
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Review Your Information</h3>
                  <p className="text-blue-700 text-sm">
                    Please review all the information you&apos;ve provided. Once submitted, our team will review your
                    application within 2-3 business days.
                  </p>
                </div>

                {/* Personal Information Summary */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="ml-2 font-medium">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{formData.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2 font-medium">{formData.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Business Information Summary */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Business Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Business Name:</span>
                      <span className="ml-2 font-medium">{formData.businessName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Business Type:</span>
                      <span className="ml-2 font-medium">{formData.businessType}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Address:</span>
                      <span className="ml-2 font-medium">
                        {formData.businessAddress}, {formData.city}, {formData.state} {formData.zipCode},{" "}
                        {formData.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Categories Summary */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Store className="w-4 h-4 mr-2" />
                    Product Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted=== "yes"? true : false}
                      onCheckedChange={(checked) => handleInputChange("termsAccepted", `${checked?"yes":"no"}`)}
                      className={errors.termsAccepted ? "border-red-500" : ""}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Seller Agreement
                      </a>
                      . I understand that my application will be reviewed and I will be notified of the decision via
                      email.
                    </Label>
                  </div>
                  {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyAccepted=== "yes"? true : false}
                      onCheckedChange={(checked) => handleInputChange("privacyAccepted", `${checked?"yes":"no"}`)}
                      className={errors.privacyAccepted ? "border-red-500" : ""}
                    />
                    <Label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and consent to the processing of my personal data for the purpose of seller registration and
                      account management.
                    </Label>
                  </div>
                  {errors.privacyAccepted && <p className="text-red-500 text-xs">{errors.privacyAccepted}</p>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center bg-transparent"
              >
                ← Previous
              </Button>

              <div className="flex space-x-3">
                {currentStep < 5 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center bg-blue-600 hover:bg-blue-700"
                  >
                    Next →
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

    
      </div>
    </div >
  )
}
