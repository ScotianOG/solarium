"use client"

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownUp, RefreshCw, Info } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSwapQuote, getSupportedSwapTokens } from "@/lib/services/wallet-service"
import { getSonicSwapQuote, getSonicSupportedTokens } from "@/lib/services/sonic-service"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Token interface
interface TokenInfo {
  token: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl?: string;
  chain?: string;
}

export function QuickSwap() {
  const [fromToken, setFromToken] = useState('SOL')
  const [toToken, setToToken] = useState('SOLess')
  const [amount, setAmount] = useState('')
  const [estimatedAmount, setEstimatedAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [exchangeRate, setExchangeRate] = useState('')
  const [priceImpact, setPriceImpact] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [protocol, setProtocol] = useState<'solana' | 'sonic'>('solana')
  const [tokenList, setTokenList] = useState<TokenInfo[]>([])
  const [sonicTokenList, setSonicTokenList] = useState<TokenInfo[]>([])
  const { toast } = useToast()

  // Fetch token lists on component mount
  useEffect(() => {
    async function fetchTokenLists() {
      try {
        // Fetch Solana tokens
        const solanaTokens = await getSupportedSwapTokens()
        setTokenList(solanaTokens)
        
        // Fetch Sonic tokens
        const sonicTokens = await getSonicSupportedTokens()
        setSonicTokenList(sonicTokens.map(token => ({
          token: token.address,
          symbol: token.symbol,
          name: token.name,
          decimals: token.decimals,
          logoUrl: token.logoUrl
        })))
      } catch (error) {
        console.error('Error fetching token lists:', error)
        toast({
          title: "Failed to load tokens",
          description: "Please try again later",
          variant: "destructive"
        })
      }
    }
    
    fetchTokenLists()
  }, [toast])

  // Get quote when inputs change
  useEffect(() => {
    const getQuote = async () => {
      if (!amount || parseFloat(amount) <= 0) {
        setEstimatedAmount('')
        setExchangeRate('')
        setPriceImpact(0)
        return
      }
      
      setIsLoading(true)
      
      try {
        if (protocol === 'solana') {
          const quote = await getSwapQuote(fromToken, toToken, amount, slippage)
          setEstimatedAmount(quote.amountOut)
          setExchangeRate(`1 ${fromToken} ≈ ${(parseFloat(quote.amountOut) / parseFloat(amount)).toFixed(6)} ${toToken}`)
          setPriceImpact(quote.priceImpact)
        } else {
          const quote = await getSonicSwapQuote(fromToken, toToken, amount, slippage)
          setEstimatedAmount(quote.amountOut)
          setExchangeRate(`1 ${fromToken} ≈ ${(parseFloat(quote.amountOut) / parseFloat(amount)).toFixed(6)} ${toToken}`)
          setPriceImpact(quote.priceImpact)
        }
      } catch (error) {
        console.error('Error getting swap quote:', error)
        toast({
          title: "Error getting quote",
          description: "Please try again or select different tokens",
          variant: "destructive"
        })
        setEstimatedAmount('')
        setExchangeRate('')
        setPriceImpact(0)
      } finally {
        setIsLoading(false)
      }
    }
    
    // Debounce the quote request
    const timer = setTimeout(getQuote, 500)
    return () => clearTimeout(timer)
  }, [amount, fromToken, toToken, slippage, protocol, toast])

  // Handle token flipping
  const handleFlipTokens = useCallback(() => {
    setFromToken(toToken)
    setToToken(fromToken)
  }, [fromToken, toToken])

  const handleSwap = async () => {
    try {
      setIsLoading(true)
      
      // In a real app, this would execute the swap
      if (protocol === 'solana') {
        // Here you would call executeSwap() from wallet-service
        console.log(`Swapping ${amount} ${fromToken} to ${toToken} using Solana native`)
      } else {
        // Here you would call executeSonicSwap() from sonic-service
        console.log(`Swapping ${amount} ${fromToken} to ${toToken} using Sonic DEX`)
      }
      
      toast({
        title: "Swap Successful",
        description: `Swapped ${amount} ${fromToken} to ${estimatedAmount} ${toToken}`,
      })
      
      // Reset form
      setAmount('')
      setEstimatedAmount('')
    } catch (error) {
      toast({
        title: "Swap Failed",
        description: "There was an error processing your swap. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Get current token list based on selected protocol
  const currentTokenList = protocol === 'solana' ? tokenList : sonicTokenList

  return (
    <Card className="bg-[#161616] border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>QuickSwap</CardTitle>
          <Tabs defaultValue="solana" onValueChange={(value) => setProtocol(value as 'solana' | 'sonic')}>
            <TabsList className="bg-[#202020]">
              <TabsTrigger value="solana">Solana</TabsTrigger>
              <TabsTrigger value="sonic">
                Sonic
                <Badge className="ml-1 bg-cyan-600 hover:bg-cyan-700 text-white">DEX</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from-token">From</Label>
          <div className="flex space-x-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[120px] bg-[#121212] border-gray-800">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {currentTokenList.map(token => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.logoUrl ? (
                      <div className="flex items-center">
                        <img src={token.logoUrl} alt={token.symbol} className="w-4 h-4 mr-2" />
                        {token.symbol}
                      </div>
                    ) : (
                      token.symbol
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="from-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-[#121212] border-gray-800"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleFlipTokens}
            className="rounded-full border-gray-800"
            disabled={isLoading}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="to-token">To</Label>
          <div className="flex space-x-2">
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-[120px] bg-[#121212] border-gray-800">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {currentTokenList.map(token => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.logoUrl ? (
                      <div className="flex items-center">
                        <img src={token.logoUrl} alt={token.symbol} className="w-4 h-4 mr-2" />
                        {token.symbol}
                      </div>
                    ) : (
                      token.symbol
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="to-amount"
              placeholder="0.00"
              value={estimatedAmount}
              readOnly
              className="flex-1 bg-[#121212] border-gray-800"
            />
          </div>
        </div>
        
        {/* Swap details */}
        {exchangeRate && (
          <div className="py-2 px-3 bg-[#121212] rounded-md">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Exchange Rate:</span>
              <span>{exchangeRate}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span className="flex items-center">
                Price Impact:
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 ml-1 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Price impact shows how much your trade will move the market price. 
                        Higher values mean less favorable rates.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              <span className={priceImpact > 2 ? "text-amber-500" : "text-gray-400"}>
                {priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span className="flex items-center">
                Provider:
              </span>
              <span className="flex items-center">
                {protocol === 'solana' ? 'Solana' : 'Sonic DEX'}
                {protocol === 'sonic' && (
                  <Badge className="ml-1 bg-cyan-600 hover:bg-cyan-700 text-white text-xs">
                    SONIC
                  </Badge>
                )}
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSwap} 
          className="w-full gradient-button"
          disabled={isLoading || !amount || !estimatedAmount || parseFloat(amount) <= 0}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Getting best swap...
            </span>
          ) : 'Swap'}
        </Button>
      </CardFooter>
    </Card>
  )
}
