"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ReviewFiltersProps {
  onSortChange: (sortBy: string) => void
}

export function ReviewFilters({ onSortChange }: ReviewFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sort-by">Sort Reviews</Label>
        <Select defaultValue="newest" onValueChange={onSortChange}>
          <SelectTrigger id="sort-by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
            <SelectItem value="most-helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
