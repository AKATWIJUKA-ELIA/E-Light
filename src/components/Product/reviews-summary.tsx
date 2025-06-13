"use client"

import { Star } from "lucide-react"
// import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface ReviewsSummaryProps {
        productName: string
  averageRating: number
  totalReviews: number
  distribution: {
    rating: number
    count: number
    percentage: number
  }[]
  onFilterByRating: (rating: number | null) => void
}

export function ReviewsSummary({ productName,averageRating, totalReviews, distribution, onFilterByRating }: ReviewsSummaryProps) {
  // Format the average rating to one decimal place
  const formattedRating = averageRating.toFixed(1)

  return (
    <div className="space-y-6">
      <div className="text-center p-6 border rounded-lg">
        <h3 className="text-2xl font-medium mb-2">Reviews for <span className="font-bold">{productName}</span></h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.floor(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : star - 0.5 <= averageRating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-2xl font-bold">{formattedRating}</span>
        </div>
        <p className="text-gray-500">Based on {totalReviews} reviews</p>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium">Rating </h4>
        {distribution.map((item) => (
          <div key={item.rating} className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="min-w-[60px] px-2"
              onClick={() => onFilterByRating(item.rating)}
            >
              {item.rating} stars
            </Button>
            {/* <Progress value={item.percentage} className="h-2 flex-1" /> */}
            <span className="text-sm text-gray-500 min-w-[40px] text-right">{item.count}</span>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => onFilterByRating(null)}>
          Show All Reviews
        </Button>
      </div>
    </div>
  )
}
