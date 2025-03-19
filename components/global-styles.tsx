"use client"

export function GlobalStyles() {
  return (
    <style jsx global>{`
      h1, h2, h3, h4, h5, h6 {
        font-family: 'No Flicking Thanks', var(--font-space-grotesk), system-ui, sans-serif;
      }
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(45, 212, 191, 0.5) rgba(0, 0, 0, 0.1);
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(45, 212, 191, 0.5);
        border-radius: 20px;
        border: 3px solid rgba(0, 0, 0, 0.1);
      }
    `}</style>
  )
}
