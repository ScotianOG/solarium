"use client"

interface ProfileTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    { id: "gallery", label: "Gallery" },
    { id: "created", label: "Created" },
    { id: "favorited", label: "Favorited" },
    { id: "followed", label: "Followed Creators" },
  ]

  return (
    <div className="border-b border-gray-800 mb-6">
      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 relative ${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600" />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
