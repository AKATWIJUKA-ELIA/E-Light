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
import CheckoutForm from "@/components/Stripe/CheckoutForm/checkoutForm"

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


export default function SellerRegistration() {


  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})


  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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

        <CheckoutForm/>

      </div>
    </div >
  )
}
