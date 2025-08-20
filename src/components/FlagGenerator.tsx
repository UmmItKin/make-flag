import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"
import { toast, Toaster } from "sonner"

export default function FlagGenerator() {
  const [inputText, setInputText] = useState("")
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
      const transformedText = inputText
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "")
      
      const newFlag = `flag{${transformedText}}`
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2">CTF Flag Generator</CardTitle>
          <CardDescription className="text-lg">
            Transform your text into a CTF-style flag and paste it in your CTF platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              className="text-lg"
            />
          </div>
          
          <Button 
            onClick={generateFlag} 
            disabled={mounted ? (!inputText.trim() || isGenerating) : false}
            className="w-full text-lg py-6"
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
              <div className="p-4 bg-muted rounded-lg font-mono text-lg text-center text-primary">
                {generatedFlag}
              </div>
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
              >
                <Copy className="h-4 w-4" />
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