"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Search,
  Calendar,
  MapPin,
  Phone,
  Star,
  RotateCcw,
  Eye,
} from "lucide-react"
import Image from "next/image"
import useGetOrders from "@/hooks/usegetOrders"


interface Order {
        _id: string
        quantity:number
        order_status: string
        user_id: string
        _creationTime: number
        product?: {
                _id: string;
                product_name: string;
                product_image: string[];
                product_price: string;
                product_description: string;
                product_owner_id:string
  }|null;
}


const statusConfig = {
  pending: { color: "bg-yellow-500", icon: Clock, label: "Pending" },
  confirmed: { color: "bg-blue-500", icon: CheckCircle, label: "Confirmed" },
  preparing: { color: "bg-orange-500", icon: Package, label: "Preparing" },
  ready: { color: "bg-purple-500", icon: CheckCircle, label: "Ready" },
  "out-for-delivery": { color: "bg-indigo-500", icon: Truck, label: "Out for Delivery" },
  delivered: { color: "bg-green-500", icon: CheckCircle, label: "Delivered" },
  cancelled: { color: "bg-red-500", icon: XCircle, label: "Cancelled" },
}

export default function OrdersTracking() {
        
        const { data: orders } = useGetOrders()
        const [selectedOrder, setSelectedOrder] = useState<Order |null>(null)
        const [searchTerm, setSearchTerm] = useState("")
        const [statusFilter, setStatusFilter] = useState<string>("all")
        const [activeTab, setActiveTab] = useState("all")
        const filteredOrders = orders?.filter((order) => {
        const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase())
// order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
// order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.order_status === statusFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && !["delivered", "cancelled"].includes(order.order_status)) ||
      (activeTab === "completed" && ["delivered", "cancelled"].includes(order.order_status))

    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusBadge = (
    status: keyof typeof statusConfig
  ) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const formatDate = (dateString: number) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

//   const reorderItems = (order: Order) => {
//     // This would typically add items to cart and redirect to checkout
//     console.log("Reordering items from order:", order.orderNumber)
//     // Implementation would depend on your cart/ordering system
//   }

  return (
    <div className="min-h-screen mt-20 bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2"> Orders</h1>
          <p className="text-gray-600">Track your current orders and view order history</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Orders</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by order number, restaurant, or item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Label htmlFor="status-filter">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders?.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-600">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "You haven't placed any orders yet"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredOrders?.map((order) => (
                  <Card key={order._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{order.product?.product_name}</h3>
                           {getStatusBadge(order.order_status as keyof typeof statusConfig)}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(order._creationTime)}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {/* {order.restaurant.name} */}
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4" />
                              {order.quantity}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="text-right">
                            {/* <div className="text-lg font-bold">${order.total.toFixed(2)}</div> */}
                            {order.order_status === "delivered" && (
                              <div className="flex items-center gap-1 text-sm text-yellow-600">
                                <Star className="w-3 h-3" />
                                Rate Order
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Order Details for - {selectedOrder?.product?.product_name}</DialogTitle>
                                  <DialogDescription>
                                    Placed on {selectedOrder && formatDate(selectedOrder._creationTime)}
                                  </DialogDescription>
                                </DialogHeader>

                                {selectedOrder && (
                                  <div className="space-y-6">
                                    <Separator />

                                    {/* Order Items */}
                                    <div>
                                      <h4 className="font-semibold mb-3">Order Items</h4>
                                      <div className="space-y-3">
                                        <div  className="flex items-center gap-3">
                                            <Image
                                              src={selectedOrder.product?.product_image[0] || "/placeholder.svg"}
                                              alt={selectedOrder.product?.product_name || "Product Image"}
                                              width={60}
                                              height={60}
                                              className="rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                              <h5 className="font-medium">{selectedOrder.product?.product_name}</h5>
                                              {/* {item.customizations && (
                                                <p className="text-sm text-gray-600">
                                                  {item.customizations.join(", ")}
                                                </p>
                                              )} */}
                                              <p className="text-sm text-gray-500">Qty: {selectedOrder.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                              <p className="font-medium">Ugx:{(Number(selectedOrder.product?.product_price) * selectedOrder.quantity).toLocaleString()}</p>
                                            </div>
                                          </div>
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Order Summary */}
                                    <div>
                                      <h4 className="font-semibold mb-3">Order Summary</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span>Subtotal</span>
                                          {/* <span>${selectedOrder.subtotal.toFixed(2)}</span> */}
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Tax</span>
                                          {/* <span>${selectedOrder.tax.toFixed(2)}</span> */}
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Delivery Fee</span>
                                          {/* <span>${selectedOrder.deliveryFee.toFixed(2)}</span> */}
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between font-semibold text-base">
                                          <span>Total</span>
                                          {/* <span>${selectedOrder.total.toFixed(2)}</span> */}
                                        </div>
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Delivery & Payment Info */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                      <div>
                                        <h4 className="font-semibold mb-2">Delivery Address</h4>
                                        {/* <p className="text-sm text-gray-600">{selectedOrder.deliveryAddress}</p> */}
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Payment Method</h4>
                                        {/* <p className="text-sm text-gray-600">{selectedOrder.paymentMethod}</p> */}
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Restaurant Info */}
                                    <div>
                                      <h4 className="font-semibold mb-2">Restaurant</h4>
                                      <div className="text-sm text-gray-600 space-y-1">
                                        {/* <p className="font-medium">{selectedOrder.restaurant.name}</p> */}
                                        <div className="flex items-center gap-2">
                                          <Phone className="w-4 h-4" />
                                          {/* {selectedOrder.restaurant.phone} */}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MapPin className="w-4 h-4" />
                                          {/* {selectedOrder.restaurant.address} */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            {order.order_status === "delivered" && (
                              <Button variant="outline" size="sm" 
                        //       onClick={() => reorderItems(order)}
                              >
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}