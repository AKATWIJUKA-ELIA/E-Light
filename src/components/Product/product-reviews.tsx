"use client"

import { useEffect, useState } from "react"
import { ReviewsList } from "./reviews-list"
import { ReviewsSummary } from "./reviews-summary"
import { ReviewFilters } from "./review-filters"
import { ReviewForm } from "./review-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenLine } from "lucide-react"
import useGetReviewsByProduct from "@/hooks/useGetReviewsByProduct"
import useGetAllCustomers from "@/hooks/useGetAllCustomers"
import { useAppSelector } from "@/hooks"


interface ProductReviewsProps {
  productId: string
  productName: string
}

export function ProductReview({ productId, productName }: ProductReviewsProps) {
  const {data:Reviews} = useGetReviewsByProduct(productId)
  const user = useAppSelector((state) => state.user.user)
  console.log(user)
//   console.log("Reviews", Reviews)
    type Review = {
        author?: string
        _id: string
        _creationTime: number
        verified?: boolean
        helpful?: number
        notHelpful?: number
        product_id: string
        reviewer_id: string
        title: string
        rating: number
        review: string

    }
    const [reviews, setReviews] = useState<Review[]>([])
        const [loggedIn, setLoggedIn] = useState(false)
    const {data:Customers} = useGetAllCustomers()
    useEffect(()=>{
         if (Reviews && Reviews.length > 0) {
                const finalReviews = Reviews.map((review) =>({
                        ...review,
                        author: Customers?.find((customer) => customer._id === review.reviewer_id)?.username || "Anonymous",
                }))
                setReviews(finalReviews)
        }
    },[ productId,Reviews,])
//     console.log("Final Reviews", reviews)

  // Calculate average rating
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, review) => acc + (review?.rating ?? 0), 0) / reviews.length
      : 0

  // Calculate rating distribution
  const ratingDistribution = Array(5)
    .fill(0)
    .map((_, index) => {
      const count = reviews.filter((review) => review.rating === 5 - index).length
      return {
        rating: 5 - index,
        count,
        percentage: (count / reviews.length) * 100,
      }
    })

  // Filter reviews based on rating
  const filterReviewsByRating = (rating: number | null) => {
    if (rating === null) {
      return Reviews
    }
    return Reviews?.filter((review) => review.rating === rating)
  }

  // Sort reviews
  const sortReviews = (reviews: Review[], sortBy: string) => {
    switch (sortBy) {
      case "newest":
        return [...(reviews ?? [])].sort((a, b) => new Date(b._creationTime).getTime() - new Date(a._creationTime).getTime())
      case "oldest":
        return [...reviews ?? []].sort((a, b) => new Date(a._creationTime).getTime() - new Date(b._creationTime).getTime())
      case "highest":
        return [...reviews ?? []].sort((a, b) => b.rating - a.rating)
      case "lowest":
        return [...reviews ?? []].sort((a, b) => a.rating - b.rating)
      case "most-helpful":
        return [...(reviews ?? [])].sort((a, b) => (b?.helpful ?? 0) - (a?.helpful ?? 0))
      default:
        return reviews
    }
  }

  const handleFilterChange = (rating: number | null) => {
    setReviews(filterReviewsByRating(rating) || [])
  }

  const handleSortChange = (sortBy: string) => {
    setReviews(sortReviews(reviews, sortBy) || [])
  }
useEffect(()=>{
         if (!user) {
          setLoggedIn(false)
        }
        setLoggedIn(true)
},[user])


  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="all-reviews" >
        <div className="flex flex-col gap-3 sm:flex-row justify-between items-center mb-6 ">
          <TabsList className="flex gap-4 mx-auto">
            <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
            {loggedIn ? (<TabsTrigger value="write-review"><PenLine className="mr-2 h-4 w-4" /> Write a Review</TabsTrigger>):(
            <TabsTrigger className="text-red-700 border border-red-700"  value="login"> Login to write a review</TabsTrigger>)}
          </TabsList>
        </div>

        <TabsContent value="all-reviews">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ReviewsSummary
                productName={productName}
                averageRating={averageRating}
                totalReviews={reviews.length}
                distribution={ratingDistribution}
                onFilterByRating={handleFilterChange}
              />
              <div className="mt-6">
                <ReviewFilters onSortChange={handleSortChange} />
              </div>
            </div>
            <div className="lg:col-span-2">
              <ReviewsList reviews={reviews||[]}  />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="write-review">
          <ReviewForm
            productId={productId}
            productName={productName}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
