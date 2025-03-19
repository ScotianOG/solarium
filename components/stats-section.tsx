export function StatsSection() {
  const stats = [
    { value: "100%", label: "Value Protected" },
    { value: "24/7", label: "Instant Liquidity" },
    { value: "0", label: "Value Lost" },
    { value: "∞", label: "Potential" },
    { value: "100%", label: "Decentralized" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold gradient-text">{stat.value}</div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

