import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      question: "What is SOLarium?",
      answer: "SOLarium is a dedicated vault and marketplace for NFT art and social content created on SOLspace. It provides a secure environment with guaranteed floor prices for NFTs, backed by SOLess tokens.",
    },
    {
      question: "How does SOLarium ensure NFT value?",
      answer: "When an NFT is minted on SOLspace and stored in SOLarium, a portion of the minting fee is allocated to SOLess tokens, establishing a base, or 'floor,' value for the NFT. This mechanism ensures that each NFT retains a minimum worth.",
    },
    {
      question: "What is the advantage of using SOLarium?",
      answer: "SOLarium offers sustainable value, instant liquidity, and a flexible gallery space for digital assets. It combines floor price guarantees, liquidity options, and user-centered management, redefining NFT ownership.",
    },
    {
      question: "How can I start using SOLarium?",
      answer: "To start using SOLarium, you need to connect your wallet and mint an NFT on SOLspace. Once minted, your NFT will automatically be stored in the SOLarium vault, ensuring its value and providing you with various management options.",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold gradient-text">FAQ</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
            <AccordionTrigger className="text-left hover:text-cyan-400">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

