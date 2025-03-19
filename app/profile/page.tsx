"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileTabs } from "@/components/profile-tabs"
import { CreatorTable } from "@/components/creator-table"
import { CustomizableGallery } from "@/components/customizable-gallery"
import { CreatedGrid } from "@/components/created-grid"
import { FavoritedGrid } from "@/components/favorited-grid"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("gallery")

  return (
    <div className="min-h-screen bg-[#121212]">
      <ProfileHeader />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "gallery" && <CustomizableGallery />}
        {activeTab === "followed" && <CreatorTable />}
        {activeTab === "created" && <CreatedGrid />}
        {activeTab === "favorited" && <FavoritedGrid />}
      </div>
    </div>
  )
}

