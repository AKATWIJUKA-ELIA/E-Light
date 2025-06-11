"use client"

import { useState } from "react"
import { ReviewsList } from "./reviews-list"
import { ReviewsSummary } from "./reviews-summary"
import { ReviewFilters } from "./review-filters"
import { ReviewForm } from "./review-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenLine } from "lucide-react"

// Mock review data - in a real app, this would come from your API
export const mockReviews = [
  {
    id: "1",
    rating: 5,
    title: "Absolutely love it!",
    content:
      "This product exceeded my expectations. The quality is outstanding and it works exactly as described. I would definitely recommend it to anyone looking for a reliable solution.",
    author: "Sarah Johnson",
    date: "2023-12-15",
    verified: true,
    helpful: 24,
    notHelpful: 2,
    images: ["/placeholder.svg?height=120&width=120", "/placeholder.svg?height=120&width=120"],
  },
  {
    id: "2",
    rating: 4,
    title: "Great product with minor issues",
    content:
      "Overall, I'm very satisfied with this purchase. The product is well-made and functions as expected. The only reason I'm not giving it 5 stars is because the setup was a bit complicated. Once you get past that, it's smooth sailing.",
    author: "Michael Chen",
    date: "2023-12-10",
    verified: true,
    helpful: 18,
    notHelpful: 3,
    images: [],
  },
  {
    id: "3",
    rating: 2,
    title: "Disappointed with quality",
    content:
      "I had high hopes for this product based on the reviews, but I was let down. The materials feel cheap and it stopped working properly after just a few weeks of use. Customer service was helpful, but I expected better quality.",
    author: "Alex Rodriguez",
    date: "2023-12-05",
    verified: true,
    helpful: 12,
    notHelpful: 5,
    images: [],
  },
  {
    id: "4",
    rating: 5,
    title: "Perfect for my needs",
    content:
      "I've been using this product for a month now and it's exactly what I needed. The design is sleek, it's easy to use, and it's made my life so much easier. Highly recommend!",
    author: "Emily Wilson",
    date: "2023-11-28",
    verified: true,
    helpful: 31,
    notHelpful: 1,
    images: ["/placeholder.svg?height=120&width=120"],
  },
  {
    id: "5",
    rating: 3,
    title: "Good but not great",
    content:
      "This product is decent for the price. It does what it's supposed to do, but there are better options out there if you're willing to spend a bit more. The customer service is excellent though.",
    author: "David Thompson",
    date: "2023-11-20",
    verified: false,
    helpful: 8,
    notHelpful: 2,
    images: [],
  },
  {
    id: "6",
    rating: 5,
    title: "Best purchase I've made this year",
    content:
      "I can't say enough good things about this product. It's durable, efficient, and has made a significant difference in my daily routine. The price point is also very reasonable for the quality you get.",
    author: "Jessica Lee",
    date: "2023-11-15",
    verified: true,
    helpful: 42,
    notHelpful: 3,
    images: ["/placeholder.svg?height=120&width=120", "/placeholder.svg?height=120&width=120"],
  },
  {
    id: "7",
    rating: 1,
    title: "Waste of money",
    content:
      "I regret this purchase. The product arrived damaged and even after replacement, it didn't work as advertised. Save your money and look elsewhere.",
    author: "Ryan Miller",
    date: "2023-11-10",
    verified: true,
    helpful: 15,
    notHelpful: 8,
    images: [],
  },
  {
    id: "8",
    rating: 4,
    title: "Solid product",
    content:
      "I've been using this for a few months now and it's held up well. It's not perfect, but it's reliable and gets the job done. The customer support team is also very responsive.",
    author: "Olivia Brown",
    date: "2023-11-05",
    verified: true,
    helpful: 19,
    notHelpful: 2,
    images: [],
  },
]

interface ProductReviewsProps {
  productId: string
  productName: string
}

export function ProductReview({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState(mockReviews)

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

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
      return mockReviews
    }
    return mockReviews.filter((review) => review.rating === rating)
  }

  // Sort reviews
  const sortReviews = (reviews: typeof mockReviews, sortBy: string) => {
    switch (sortBy) {
      case "newest":
        return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case "oldest":
        return [...reviews].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case "highest":
        return [...reviews].sort((a, b) => b.rating - a.rating)
      case "lowest":
        return [...reviews].sort((a, b) => a.rating - b.rating)
      case "most-helpful":
        return [...reviews].sort((a, b) => b.helpful - a.helpful)
      default:
        return reviews
    }
  }

  const handleFilterChange = (rating: number | null) => {
    setReviews(filterReviewsByRating(rating))
  }

  const handleSortChange = (sortBy: string) => {
    setReviews(sortReviews(reviews, sortBy))
  }

  const handleReviewSubmit = (newReview: any) => {
    // In a real app, you would send this to your API
    console.log("New review submitted:", newReview)
    // Add the new review to the list (for demo purposes)
    const reviewWithId = {
      ...newReview,
      id: `${reviews.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      verified: true,
      helpful: 0,
      notHelpful: 0,
    }
    setReviews([reviewWithId, ...reviews])
  }

  const handleHelpfulVote = (reviewId: string, isHelpful: boolean) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            helpful: isHelpful ? review.helpful + 1 : review.helpful,
            notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful,
          }
        }
        return review
      }),
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="all-reviews" >
        <div className="flex flex-col gap-3 sm:flex-row justify-between items-center mb-6 ">
          <TabsList className="flex gap-4 mx-auto">
            <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
            <TabsTrigger value="write-review"><PenLine className="mr-2 h-4 w-4" /> Write a Review</TabsTrigger>
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
              <ReviewsList reviews={reviews} onVote={handleHelpfulVote} />
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
