import Image from "next/image"

export function RecommendedCollections() {
  const collections = Array(6).fill({
    title: "SOLarium Gems",
    image: "/placeholder.svg?height=200&width=400",
  })

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold gradient-text">Recommended Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg">
            <Image
              src={collection.image}
              alt={collection.title}
              width={400}
              height={200}
              className="w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="font-medium">{collection.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

