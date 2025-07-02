"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Clock,
  Trash2, 
  DollarSign,
  Eye,
  ShoppingCart,
  Star,
  Zap,
  Crown,
  Rocket,
  BarChart3,
  Users,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBoostContext } from "@/app/BoostContext"
import useGetProductsByIds from "@/hooks/useGetProductsByIds"
import { Id } from "../../../convex/_generated/dataModel"


interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  views: number
  likes: number
  sales: number
  rating: number
  isActive: boolean
  currentBoost?: {
    type: string
    endDate: string
    performance: {
      impressions: number
      clicks: number
      conversions: number
    }
  }
}

interface BoostOption {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  pricing: {
    quarterly: number
    weekly: number
    monthly: number
  }
  estimatedReach: {
    min: number
    max: number
  }
  color: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    views: 1250,
    likes: 89,
    sales: 23,
    rating: 4.5,
    isActive: true,
    currentBoost: {
      type: "Premium",
      endDate: "2024-01-20",
      performance: {
        impressions: 5420,
        clicks: 234,
        conversions: 12,
      },
    },
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Clothing",
    views: 890,
    likes: 45,
    sales: 67,
    rating: 4.8,
    isActive: true,
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    views: 2100,
    likes: 156,
    sales: 34,
    rating: 4.3,
    isActive: false,
  },
]

const boostOptions: BoostOption[] = [
  {
    id: "basic",
    name: "Basic Boost",
    description: "Increase visibility in search results",
    icon: TrendingUp,
    features: ["Higher search ranking", "Category page placement", "Basic analytics"],
    pricing: { weekly: 5, monthly: 30, quarterly: 100 },
    estimatedReach: { min: 500, max: 1000 },
    color: "bg-blue-500",
  },
  {
    id: "premium",
    name: "Premium Boost",
    description: "Featured placement and enhanced visibility",
    icon: Star,
    features: ["Featured product placement", "Homepage visibility", "Advanced analytics", "Priority customer support"],
    pricing: { weekly: 15, monthly: 90, quarterly: 300 },
    estimatedReach: { min: 2000, max: 5000 },
    color: "bg-purple-500",
  },
  {
    id: "elite",
    name: "Elite Boost",
    description: "Maximum exposure with premium features",
    icon: Crown,
    features: [
      "Top banner placement",
      "Social media promotion",
      "Influencer outreach",
      "Dedicated account manager",
      "Custom marketing materials",
    ],
    pricing: { weekly: 35, monthly: 210, quarterly: 700 },
    estimatedReach: { min: 10000, max: 25000 },
    color: "bg-gold-500",
  },
]

export default function ProductBoost() {
        const { boost,setBoost } = useBoostContext()
        console.log("Current Boost Context:", boost)
        const { data: products, } = useGetProductsByIds((boost?.flatMap(id => id)) || []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedBoost, setSelectedBoost] = useState<BoostOption>(boostOptions[0])
  const [duration, setDuration] = useState("weekly")

  const [autoRenew, setAutoRenew] = useState(false)

  const calculateTotalCost = () => {
    const baseCost = selectedBoost.pricing[duration as keyof typeof selectedBoost.pricing]
    return baseCost
  }

  const getEstimatedReach = () => {
    const multiplier = duration === "daily" ? 1 : duration === "weekly" ? 5 : 20
    return {
      min: selectedBoost.estimatedReach.min * multiplier,
      max: selectedBoost.estimatedReach.max * multiplier,
    }
  }
  const handleRemove = (productId:Id<"products">) => {
       setBoost((prev) => prev.filter((id) => id !== productId))
  }
  const handleBoostProduct = () => {
    if (!selectedProduct) return
    console.log("Boosting product:", {
      product: selectedProduct,
      boost: selectedBoost,
      duration,
//       budget: budget[0],
//       targetAudience,
      autoRenew,
    })
    // Handle boost logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 mt-20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Boost <span className="text-gold" >Your</span> Products</h1>
          <p className="text-gray-600">Increase visibility and sales with our promotion tools</p>
        </div>

        <Tabs defaultValue="boost" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="boost">Create Boost</TabsTrigger>
            <TabsTrigger value="active">Active Boosts</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Create Boost Tab */}
          <TabsContent value="boost" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Product Selection */}
              <div className="lg:col-span-2 space-y-6 ">
                <Card className="dark:bg-gray-900" >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      <Link href="/profile/approved" className=" border text-gold rounded-md p-2 hover:bg-gray-300 transition-all " >
                      Select Products <span className="text-dark" >you would like to Boost Here</span>
                      </Link>
                    </CardTitle>
                    <CardDescription>Your Selected products will appear Here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      { products && products.length>0? (products.map((product) => (
                        <Card
                          key={product?._id}
                          className={`cursor-pointer transition-all hover:ring-2 ring-gold hover:bg-amber-50 hover:shadow-md`}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <Image
                                src={product?.product_image[0] || "/placeholder.svg"}
                                alt={product?.product_name ||"Product Image"}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex   ">
                               <div className="flex flex-col " >
                                 <h3 className="font-semibold text-gray-900 mb-1">{product?.product_name}</h3>
                                <p className="text-lg font-bold text-green-600 mb-2">${product?.product_price}</p>
                               </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1 hover:text-red-600 transition-colors" 
                                  onClick={() => handleRemove(product?._id as Id<"products">)}>
                                        <span className="text-sm ">Remove</span>
                                    <Trash2  className="w-8 h-8" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))) : (
                        <Card className="dark:bg-gray-800">
                          <CardContent className="p-12 text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Selected</h3>
                            <p className="text-gray-600">Please select products to boost from your approved products list.</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Boost Options */}
                <Card className="dark:bg-gray-900" >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="w-5 h-5" />
                      Choose Boost Type
                    </CardTitle>
                    <CardDescription>Select the level of promotion for your product</CardDescription>
                    <CardDescription className="text-lg font-semibold text-red-500 " >Note: The Boost type will apply for all the Selected products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {boostOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <Card
                            key={option.id}
                            className={`cursor-pointer dark:bg-gray-800 transition-all ${
                              selectedBoost.id === option.id ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-md"
                            }`}
                            onClick={() => setSelectedBoost(option)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${option.color} text-white`}>
                                  <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold">{option.name}</h3>
                                    <div className="text-right">
                                      <div className="text-sm text-gray-600">Starting at</div>
                                      <div className="text-lg font-bold text-green-600">
                                        ${option.pricing.weekly}/week
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 mb-3">{option.description}</p>
                                  <div className="grid md:grid-cols-2 gap-2">
                                    {option.features.map((feature, index) => (
                                      <div key={index} className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        {feature}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-3 text-sm text-gray-600">
                                    Estimated reach: {option.estimatedReach.min.toLocaleString()} -{" "}
                                    {option.estimatedReach.max.toLocaleString()} people
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Duration and Budget */}
                <Card className="dark:bg-gray-900" >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Duration & Budget
                    </CardTitle>
                    <CardDescription>Set how long and how much you want to spend</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Campaign Duration</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "weekly", label: "weekly", price: selectedBoost.pricing.weekly },
                          { value: "monthly", label: "monthly", price: selectedBoost.pricing.monthly },
                          { value: "quarterly", label: "quarterly", price: selectedBoost.pricing.quarterly },
                        ].map((option) => (
                          <Card
                            key={option.value}
                            className={`cursor-pointer transition-all ${
                              duration === option.value ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                            }`}
                            onClick={() => setDuration(option.value)}
                          >
                            <CardContent className="p-4 text-center">
                              <div className="font-semibold">{option.label}</div>
                              <div className="text-lg font-bold text-green-600">${option.price}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-renew" className="text-base font-semibold">
                        Auto-renew campaign
                      </Label>
                      <Switch id="auto-renew" checked={autoRenew} onCheckedChange={setAutoRenew} />
                    </div>
                  </CardContent>
                </Card>

                {/* Target Audience */}
                {/* <Card className="dark:bg-gray-900" >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Target Audience
                    </CardTitle>
                    <CardDescription>Define who should see your boosted product</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age-range">Age Range</Label>
                        <Select
                          value={targetAudience.ageRange}
                          onValueChange={(value) => setTargetAudience((prev) => ({ ...prev, ageRange: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="18-25">18-25 years</SelectItem>
                            <SelectItem value="25-35">25-35 years</SelectItem>
                            <SelectItem value="35-45">35-45 years</SelectItem>
                            <SelectItem value="45-55">45-55 years</SelectItem>
                            <SelectItem value="55+">55+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={targetAudience.gender}
                          onValueChange={(value) => setTargetAudience((prev) => ({ ...prev, gender: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select
                        value={targetAudience.location}
                        onValueChange={(value) => setTargetAudience((prev) => ({ ...prev, location: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nationwide">Nationwide</SelectItem>
                          <SelectItem value="local">Local Area</SelectItem>
                          <SelectItem value="regional">Regional</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="interests">Interests (Optional)</Label>
                      <Textarea
                        id="interests"
                        placeholder="e.g., technology, fitness, fashion..."
                        value={targetAudience.interests}
                        onChange={(e) => setTargetAudience((prev) => ({ ...prev, interests: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card> */}
              </div>

              {/* Summary and Checkout */}
              <div className="space-y-6">
                <Card className="sticky top-4 dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Boost Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedProduct && (
                      <div>
                        <Label className="text-sm font-semibold text-gray-600">Selected Product</Label>
                        <div className="flex items-center gap-3 mt-1">
                          <Image
                            src={selectedProduct.image || "/placeholder.svg"}
                            alt={selectedProduct.name}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                          <div>
                            <div className="font-medium text-sm">{selectedProduct.name}</div>
                            <div className="text-xs text-gray-600">${selectedProduct.price}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div>
                      <Label className="text-sm font-semibold text-gray-600">Boost Type</Label>
                      <div className="mt-1">
                        <div className="font-medium">{selectedBoost.name}</div>
                        <div className="text-sm text-gray-600">{selectedBoost.description}</div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-gray-600">Duration</Label>
                      <div className="mt-1 font-medium capitalize">{duration.replace("ly", "")}</div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-gray-600">Estimated Reach</Label>
                      <div className="mt-1 font-medium">
                        {getEstimatedReach().min.toLocaleString()} - {getEstimatedReach().max.toLocaleString()} people
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Boost Cost</span>
                        <span className="font-semibold">${calculateTotalCost()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span className="font-semibold">${(calculateTotalCost() * 0.1).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-green-600">${(calculateTotalCost() * 1.1).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" onClick={handleBoostProduct} >
                      <Zap className="w-4 h-4 mr-2" />
                      Start Boost Campaign
                    </Button>

                    <div className="text-xs text-gray-500 text-center">
                      {autoRenew ? "Campaign will auto-renew" : "One-time campaign"}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Active Boosts Tab */}
          <TabsContent value="active" className="space-y-6">
            <Card className="dark:bg-gray-900" >
              <CardHeader>
                <CardTitle>Active Boost Campaigns</CardTitle>
                <CardDescription>Monitor and manage your current product boosts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProducts
                    .filter((product) => product.currentBoost)
                    .map((product) => (
                      <Card key={product.id} className="hover:shadow-md dark:bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="font-semibold">{product.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <Badge className="bg-purple-500">{product.currentBoost?.type} Boost</Badge>
                                  <span>Ends: {product.currentBoost?.endDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                  <div className="text-lg font-bold">
                                    {product.currentBoost?.performance.impressions.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-gray-600">Impressions</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold">
                                    {product.currentBoost?.performance.clicks.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-gray-600">Clicks</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold">
                                    {product.currentBoost?.performance.conversions}
                                  </div>
                                  <div className="text-xs text-gray-600">Sales</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

              {/* Expired Boosts Tab */}
          <TabsContent value="expired" className="space-y-6">
            <Card className="dark:bg-gray-900" >
              <CardHeader>
                <CardTitle>Your Previous Boost Campaigns</CardTitle>
                <CardDescription>Monitor and manage your previous product boosts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProducts
                    .filter((product) => product.currentBoost)
                    .map((product) => (
                      <Card key={product.id} className="hover:shadow-md dark:bg-gray-800">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="font-semibold">{product.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <Badge className="bg-purple-500">{product.currentBoost?.type} Boost</Badge>
                                  <span>Ends: {product.currentBoost?.endDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                  <div className="text-lg font-bold">
                                    {product.currentBoost?.performance.impressions.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-gray-600">Impressions</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold">
                                    {product.currentBoost?.performance.clicks.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-gray-600">Clicks</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold">
                                    {product.currentBoost?.performance.conversions}
                                  </div>
                                  <div className="text-xs text-gray-600">Sales</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="dark:bg-gray-600" >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">24.5K</div>
                      <div className="text-sm text-gray-600 dark:text-gray-200">Total Impressions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-600" >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">1.2K</div>
                      <div className="text-sm text-gray-600 dark:text-gray-200 ">Clicks</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-600"  >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm text-gray-600  dark:text-gray-200">Conversions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-600"  >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-2xl font-bold">7.4%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-200">Conversion Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Track your boost campaign performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mb-2" />
                  <div className="text-center">
                    <p>Analytics chart would be displayed here</p>
                    <p className="text-sm">Showing impressions, clicks, and conversions over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
