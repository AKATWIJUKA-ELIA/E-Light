"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Check } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Review {
  id: string
  rating: number
  title: string
  content: string
  author: string
  date: string
  verified: boolean
  helpful: number
  notHelpful: number
  images?: string[]
}

interface ReviewsListProps {
  reviews: Review[]
  onVote: (reviewId: string, isHelpful: boolean) => void
}

export function ReviewsList({ reviews, onVote }: ReviewsListProps) {
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({})
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({})

  const toggleExpand = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }))
  }

  const handleVote = (reviewId: string, isHelpful: boolean) => {
    if (votedReviews[reviewId]) return

    onVote(reviewId, isHelpful)
    setVotedReviews((prev) => ({
      ...prev,
      [reviewId]: true,
    }))
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
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
        const isExpanded = expandedReviews[review.id]
        const hasVoted = votedReviews[review.id]
        const isLongContent = review.content.length > 300

        return (
          <Card key={review.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
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
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
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
                    <span>{formatDate(review.date)}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                  <div className="prose prose-sm max-w-none">
                    {isLongContent && !isExpanded ? (
                      <>
                        <p>{review.content.slice(0, 300)}...</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-auto p-0 font-medium"
                          onClick={() => toggleExpand(review.id)}
                        >
                          Read more <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <p>{review.content}</p>
                        {isLongContent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 h-auto p-0 font-medium"
                            onClick={() => toggleExpand(review.id)}
                          >
                            Show less <ChevronUp className="ml-1 h-4 w-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-6">
                    <div className="text-sm">Was this review helpful?</div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-1 ${hasVoted ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleVote(review.id, true)}
                        disabled={hasVoted}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpful}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-1 ${hasVoted ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleVote(review.id, false)}
                        disabled={hasVoted}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>{review.notHelpful}</span>
                      </Button>
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
