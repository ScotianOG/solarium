"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StorefrontBanner } from "@/components/storefront-banner"
import { StorefrontGallery } from "@/components/storefront-gallery"

export default function StorefrontPage() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("price")

  return (
    <div className="space-y-12">
      <StorefrontBanner />
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="buy-now">Buy Now</SelectItem>
              <SelectItem value="auction">Auction</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
              <SelectItem value="collection">Collection</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          type="search"
          placeholder="Search NFTs..."
          className="max-w-sm"
        />
      </div>
      <StorefrontGallery filter={filter} sort={sort} />
    </div>
  )
}

