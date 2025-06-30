"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, } from "@/components/ui/tabs"
import { TbListDetails } from "react-icons/tb";
import useAddToCart from "@/hooks/useAddToCart"
import {
  Package,
  Search,
  Group ,
  Award 
} from "lucide-react"
import Image from "next/image"
import useGetProductsByIds from "@/hooks/useGetProductsByIds"
import useBookmark from "@/hooks/useBookmark"
import Link from "next/link"

export default function BookMarks() {
        const {DeleteBookmark, List:bookmarks} = useBookmark()
        const HandleAddToCart = useAddToCart();
        const productIds = bookmarks?.map((bookmark) => bookmark.product_id);
        const { data: products, } = useGetProductsByIds((productIds?.flatMap(id => id)) || []);
        const [searchTerm, setSearchTerm] = useState("")
        const Bookmarks = bookmarks?.map((bookmark)=>{
                const final = products?.find((product) => product?._id === bookmark.product_id) || null;
                return {
                        ...bookmark,
                        product: final
                }
        }) .filter((product) => {
        const matchesSearch = product.product?.product_name.toLowerCase().includes(searchTerm.toLowerCase())||
        product.product?.product_cartegory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product?.product_description.toLowerCase().includes(searchTerm.toLowerCase()) 
        return matchesSearch
})
    

  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-2"> BookMarks</h1>
          <p className="text-gray-500">Click on the bookmark icon to save your favorite products</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 dark:bg-gray-600">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search BookMarks</Label>
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
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            All BookMarks
          </TabsList>

          <div className="mt-6 ">
            {/* Orders List */}
            <div className="space-y-4">
              {Bookmarks?.length === 0 ? (
                <Card className="dark:bg-gray-700" >
                  <CardContent className="p-12 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No BookMarks found</h3>
                    <p className="text-gray-600">
                      {searchTerm  !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "You haven't placed any orders yet"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                Bookmarks?.map((bookmark) => (
                  <Card key={bookmark?._id} className="hover:shadow-md transition-shadow dark:bg-gray-900 ">
                    <CardContent className="p-6">
                      <Link href={`/product/${bookmark.product?._id}`} >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={bookmark.product?.product_image[0] || ""}
                            alt={bookmark.product?.product_name || ""}
                            width={100}
                            height={100}
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{bookmark.product?.product_name}</h3>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <Award  className="w-4 h-4" />
                              <h1 className="text-lg font-semibold">
                                Ugx: {(parseFloat(bookmark.product?.product_price ?? "0") || 0).toLocaleString()  || "NaN"}
                              </h1>
                            </div>
                            <div className="flex items-center gap-2">
                              <Group   className="w-4 h-4" />
                              <h1 className="text-lg ">
                                {bookmark.product?.product_cartegory || "No category available"}
                              </h1>
                            </div>
                            <div className="flex items-center gap-2">
                              <TbListDetails className="w-4 h-4" />
                              {bookmark.product?.product_description || "No description available"}
                            </div>
                            
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => bookmark.product && HandleAddToCart(bookmark.product)}
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => bookmark._id && DeleteBookmark(bookmark.product?._id || "")}
                          >
                            Remove
                          </Button>
                      </div>
                      </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}