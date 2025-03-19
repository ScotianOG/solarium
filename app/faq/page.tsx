import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is an AI agent in SOLarium?",
      answer: "An AI agent in SOLarium is an intelligent assistant that helps you create and deploy NFT collections on the Solana blockchain. It streamlines the process, making it accessible even to those without technical blockchain knowledge."
    },
    {
      question: "How does the AI agent create and deploy NFT collections?",
      answer: "The AI agent guides you through a step-by-step process: 1) Configuring your agent with a name and wallet address, 2) Defining your collection details like name, metadata URI, and royalties, 3) Reviewing the information, and 4) Deploying the collection to the Solana blockchain."
    },
    {
      question: "Do I need coding experience to use the AI agent?",
      answer: "No, you don't need any coding experience. The AI agent is designed to make the process user-friendly and accessible to everyone, regardless of their technical background."
    },
    {
      question: "What information do I need to provide to create a collection?",
      answer: "You'll need to provide a name for your agent, a Solana wallet address (or generate a new one), your collection name, a metadata URI (which contains information about your NFTs), royalty percentages, and creator addresses and shares."
    },
    {
      question: "What is a metadata URI and how do I create one?",
      answer: "A metadata URI is a link to a JSON file that contains information about your NFT collection, such as name, description, and image links. You can create this file and host it on a service like Arweave or IPFS. SOLarium provides templates and guides to help you create this metadata."
    },
    {
      question: "Can I use my existing Solana wallet?",
      answer: "Yes, you can use an existing Solana wallet address. Alternatively, you can generate a new wallet address through our platform if you don't have one."
    },
    {
      question: "How are royalties managed for my NFT collection?",
      answer: "You can set royalty percentages when creating your collection. These royalties are automatically enforced on supported marketplaces whenever your NFTs are sold, ensuring you receive a percentage of secondary sales."
    },
    {
      question: "Is the AI agent secure? How is my data protected?",
      answer: "Security is our top priority. The AI agent doesn't store your private keys. If you generate a new wallet, the private key is securely managed by our platform. All transactions are signed on-device to ensure the safety of your assets."
    },
    {
      question: "How long does it take to deploy a collection?",
      answer: "The deployment process typically takes a few minutes, depending on network congestion. The AI agent handles all the complex blockchain interactions, making the process as quick and smooth as possible."
    },
    {
      question: "What happens after my collection is deployed?",
      answer: "After deployment, you'll receive confirmation with your collection's address on the Solana blockchain. You can then manage your collection through SOLarium, including minting individual NFTs, setting up sales, and tracking analytics."
    },
    {
      question: "Can I modify my collection after it's deployed?",
      answer: "While the core details of the collection (like supply and royalty structure) become immutable after deployment, you can still mint new NFTs to the collection and manage other aspects through SOLarium's interface."
    },
    {
      question: "What fees are associated with creating and deploying a collection?",
      answer: "There's a small network fee for deploying on Solana, which is typically a fraction of a SOL. SOLarium may charge a service fee, which will be clearly disclosed before deployment. Always ensure your wallet has sufficient SOL to cover these fees."
    }
  ]

  return (
    <div className="min-h-screen bg-[#121212] py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold gradient-text mb-8">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

