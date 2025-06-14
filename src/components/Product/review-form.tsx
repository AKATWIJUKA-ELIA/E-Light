"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, } from "lucide-react"
import useCreateReview from "@/hooks/useCreateReview"
import { Label } from "../ui/label"
import { useAppSelector } from "@/hooks"

interface ReviewFormProps {
  productId: string
  productName: string
}
export function ReviewForm({ productId, productName }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [review, setReview] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const { CreateReview } = useCreateReview()
  const user = useAppSelector((state) => state.user.user)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (rating === 0 || !reviewTitle || !review) {
      alert("Please fill in all fields and select a rating.")
      return
    }
        const reviewData = {
          product_id: productId,
          rating: rating,
          title: reviewTitle,
          review: review,
          reviewer_id: user?.User_id || "",
          verified: true,
        }
        CreateReview(reviewData)
        // Reset form fields
        setRating(0)
        setReviewTitle("")
        setReview("")       
  }

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border">
      <h3 className="text-xl  font-medium mb-6">Review <span className="font-semibold">{productName}</span></h3>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
                <Label className="text-sm font-medium"> Your Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star)
                  }}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
         
          </div>

          
          <div>
                <Label className="text-sm font-medium">Review Title</Label>
                <Input placeholder="Summarize your experience"
                 value={reviewTitle} 
                 required
                 className="w-full"
                 onChange={(e) => setReviewTitle(e.target.value)} />
          </div>

          <div>
                <Label className="text-sm font-medium">Your Review</Label>
                <Textarea
                    placeholder="Share your experience with this product..."
                        required
                    className="min-h-[150px]"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
          </div>

      
          <div className="flex justify-end gap-3">
            <Button type="submit"
            disabled={!reviewTitle || !review|| rating === 0}
            >Submit Review
            </Button>
          </div>
        </form>
    </div>
  )
}
