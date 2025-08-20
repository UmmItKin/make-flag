import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import { toast, Toaster } from "sonner"

export default function FlagGenerator() {
  const [inputText, setInputText] = useState("")
  const [flagPrefix, setFlagPrefix] = useState("flag")
  const [generatedFlag, setGeneratedFlag] = useState("flag{THE_FLA9}")
  const [isGenerating, setIsGenerating] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const generateFlag = () => {
    if (!inputText.trim()) return
    
    setIsGenerating(true)
    
    setTimeout(() => {
      // Character substitutions (basic leetspeak style)
      const charMap: { [key: string]: string } = {
        'a': '4', 'A': '4',
        'e': '3', 'E': '3',
        'i': '1', 'I': '1',
        'l': '1', 'L': '1',
        'o': '0', 'O': '0',
        's': '5', 'S': '5',
        't': '7', 'T': '7'
      }
      
      let transformedText = inputText
        .split('')
        .map(char => charMap[char] || char)
        .join('')
      
      // Replace only spaces with underscores, preserve everything else
      transformedText = transformedText
        .replace(/\s+/g, "_")
        // Clean up multiple underscores
        .replace(/_+/g, "_")
        // Remove leading/trailing underscores
        .replace(/^_|_$/g, "")
      
      const newFlag = `${flagPrefix}{${transformedText}}`
      setGeneratedFlag(newFlag)
      setIsGenerating(false)
      
      if (mounted) {
        toast.success("Flag generated successfully!", {
          description: newFlag,
          action: {
            label: "Copy",
            onClick: () => copyToClipboard(),
          },
        })
      }
    }, 500)
  }

  const copyToClipboard = async () => {
    if (!mounted) return
    
    try {
      await navigator.clipboard.writeText(generatedFlag)
      toast.success("Flag copied to clipboard!", {
        description: generatedFlag,
        action: {
          label: "Close",
          onClick: () => {},
        },
      })
    } catch (err) {
      toast.error("Failed to copy flag", {
        description: "Please try again or copy manually",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateFlag()
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-2xl mx-2 sm:mx-0">
        <CardHeader className="text-center px-4 sm:px-6">
          <CardTitle className="text-2xl sm:text-4xl font-bold mb-2">CTF Flag Generator</CardTitle>
          <CardDescription className="text-sm sm:text-lg">
            Transform your text into a CTF-style flag and paste it in your CTF platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="flag-prefix" className="text-sm font-medium text-muted-foreground">
                Flag prefix:
              </label>
              <Input
                id="flag-prefix"
                type="text"
                placeholder="flag"
                value={flagPrefix}
                onChange={(e) => setFlagPrefix(e.target.value)}
                className="text-base sm:text-lg"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="flag-input" className="text-sm font-medium text-muted-foreground">
                Enter your text:
              </label>
              <Input
                id="flag-input"
                type="text"
                placeholder="Enter your flag here"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-base sm:text-lg"
              />
            </div>
          </div>
          
          <Button 
            onClick={generateFlag} 
            disabled={mounted ? (!inputText.trim() || isGenerating) : false}
            className="w-full text-base sm:text-lg py-4 sm:py-6"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Flag"
            )}
          </Button>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Generated Flag:
            </label>
            <div className="relative">
              <div className="p-3 sm:p-4 bg-muted rounded-lg font-mono text-xs sm:text-lg text-center text-primary break-all overflow-wrap-anywhere">
                {generatedFlag}
              </div>
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 sm:top-3 sm:right-3 h-8 w-8 sm:h-9 sm:w-9 p-0"
              >
                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster 
        theme="dark"
        position="bottom-right"
        richColors
        duration={Infinity}
      />
    </div>
  )
}