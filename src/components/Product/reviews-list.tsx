"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ChevronDown, ChevronUp, Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Review {
  _id: string
  rating: number
  reviewer_id: string
  title: string
  review: string
  author?: string
  _creationTime: number
  verified?: boolean
  helpful?: number
  notHelpful?: number
}

interface ReviewsListProps {
  reviews: Review[]
}

export function ReviewsList({ reviews, }: ReviewsListProps) {
        // console.log("ReviewsList", reviews)
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({})


  const toggleExpand = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }))
  }



  const formatDate = (dateValue: string | number) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateValue).toLocaleDateString(undefined, options)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
        <p className="text-gray-500">Be the first to review this product</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => {
        const isExpanded = expandedReviews[review._id]
        const isLongContent = review.review.length > 300

        return (
          <Card key={review._id} className="overflow-hidden dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{getInitials(review?.author ?? "")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-medium">{review.author}</h4>
                    {review.verified && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500  mb-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span>{formatDate(review._creationTime)}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                  <div className="prose prose-sm max-w-none">
                    {isLongContent && !isExpanded ? (
                      <>
                        <p>{review.review.slice(0, 300)}...</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-auto p-0 font-medium"
                          onClick={() => toggleExpand(review._id)}
                        >
                          Read more <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <p>{review.review}</p>
                        {isLongContent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 h-auto p-0 font-medium"
                            onClick={() => toggleExpand(review._id)}
                          >
                            Show less <ChevronUp className="ml-1 h-4 w-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-6">
                    <div className="text-sm">
                        <h1 className="flex items-center gap-1  text-gray-400">
                                 <span className="text-gray-500 font-semibold ">Note: </span>Reviews are based on user feedback and may not reflect the overall product quality.
                        </h1>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {reviews.length > 5 && (
        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}
    </div>
  )
}
