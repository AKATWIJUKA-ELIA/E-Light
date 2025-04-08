"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Types for our cart items
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function Cart() {
  // Sample cart items - in a real app, this would come from a state management solution
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Smartphone Case",
      price: 24.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "USB-C Cable",
      price: 12.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate tax (example: 8%)
  const tax = subtotal * 0.08

  // Calculate total
  const total = subtotal + tax

  // Function to update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Function to remove item from cart
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Your Shopping Cart
        </CardTitle>
      </CardHeader>

      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button className="mt-4">Continue Shopping</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart items */}
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>

                  <span className="w-8 text-center">{item.quantity}</span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>

                <div className="text-right min-w-[80px]">${(item.price * item.quantity).toFixed(2)}</div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            ))}

            <Separator className="my-4" />

            {/* Cart summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">Continue Shopping</Button>
        <Button disabled={cartItems.length === 0}>Checkout</Button>
      </CardFooter>
    </Card>
  )
}
