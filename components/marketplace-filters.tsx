"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([0, 10])

  return (
    <div className="space-y-6 p-6 bg-gray-900 rounded-lg border border-gray-800">
      <h2 className="text-2xl font-bold gradient-text">Filters</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">Search</label>
          <Input id="search" placeholder="Search by name or creator" className="bg-gray-800 border-gray-700" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Category</label>
          <Select>
            <SelectTrigger id="category" className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="collectibles">Collectibles</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="virtual-worlds">Virtual Worlds</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Price Range (SOUL)</label>
          <Slider
            min={0}
            max={10}
            step={0.1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{priceRange[0]} SOUL</span>
            <span>{priceRange[1]} SOUL</span>
          </div>
        </div>
        <Button className="w-full gradient-button">Apply Filters</Button>
      </div>
    </div>
  )
}
