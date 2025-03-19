export function CollectionsGrid() {
  const sections = [
    {
      title: "New Items",
      items: Array(6).fill({
        name: "SOLart #1",
        items: "1K items",
      }),
    },
    {
      title: "Hot Collections",
      items: Array(6).fill({
        name: "CryptoSols",
        items: "5K items",
      }),
    },
    {
      title: "Top-5 Creators",
      items: Array(6).fill({
        name: "SolMaster",
        items: "10K items",
      }),
    },
  ]

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold gradient-text">
          Make your
          <br />
          choice in the
          <br />
          NFT world
        </h2>
        <p className="text-gray-400">Explore unique digital assets on SOLarium</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-xl font-semibold gradient-text">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="bg-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center text-cyan-500">
                    S
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.items}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

