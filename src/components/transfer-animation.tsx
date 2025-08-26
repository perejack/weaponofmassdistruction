import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Download, 
  Users, 
  Shield, 
  AlertTriangle, 
  Zap,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Bot,
  UserX,
  Lock,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TransferAnimationProps {
  isOpen: boolean
  onClose: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
  followersToTransfer: number
  onSecurityDetection: () => void
  onTransferComplete: () => void
}

export const TransferAnimation = ({ 
  isOpen, 
  onClose, 
  platform, 
  followersToTransfer,
  onSecurityDetection,
  onTransferComplete
}: TransferAnimationProps) => {
  const [transferProgress, setTransferProgress] = useState(0)
  const [currentFollowers, setCurrentFollowers] = useState(0)
  const [isTransferring, setIsTransferring] = useState(false)
  const [showSecurityAlert, setShowSecurityAlert] = useState(false)

  const platformConfig = {
    tiktok: {
      name: "TikTok",
      color: "from-pink-500 to-red-500",
      icon: "🎵",
      metric: "followers"
    },
    instagram: {
      name: "Instagram", 
      color: "from-purple-500 to-pink-500",
      icon: "📸",
      metric: "followers"
    },
    youtube: {
      name: "YouTube",
      color: "from-red-500 to-red-600", 
      icon: "🎥",
      metric: "subscribers"
    },
    facebook: {
      name: "Facebook",
      color: "from-blue-500 to-blue-600",
      icon: "👥", 
      metric: "followers"
    }
  }

  const config = platformConfig[platform]

  useEffect(() => {
    if (isOpen && !isTransferring) {
      setIsTransferring(true)
      setTransferProgress(0)
      setCurrentFollowers(0)
      
      // Transfer animation: 1% every 2 seconds until 95%
      const interval = setInterval(() => {
        setTransferProgress(prev => {
          const next = prev + 1
          
          // Update follower count proportionally
          setCurrentFollowers(Math.floor((next / 100) * followersToTransfer))
          
          // At 95%, trigger security detection
          if (next === 95) {
            clearInterval(interval)
            setTimeout(() => {
              setShowSecurityAlert(true)
              onSecurityDetection()
            }, 1000)
            return next
          }
          
          // Complete at 100%
          if (next >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              onTransferComplete()
            }, 1000)
            return 100
          }
          
          return next
        })
      }, 2000) // 2 seconds per 1%
      
      return () => clearInterval(interval)
    }
  }, [isOpen, isTransferring, followersToTransfer, onSecurityDetection, onTransferComplete])

  const handleRetryTransfer = () => {
    setShowSecurityAlert(false)
    setTransferProgress(95)
    
    // Continue from 95% to 100%
    const interval = setInterval(() => {
      setTransferProgress(prev => {
        const next = prev + 1
        setCurrentFollowers(Math.floor((next / 100) * followersToTransfer))
        
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onTransferComplete()
          }, 1000)
          return 100
        }
        
        return next
      })
    }, 2000)
  }

  if (showSecurityAlert) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-transparent">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-red-500/20 backdrop-blur-xl rounded-3xl" />
            
            <div className="relative p-8 text-center space-y-6">
              {/* Security Alert Header */}
              <div className="space-y-4">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse" />
                  <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500 animate-bounce" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-red-600">
                    🚨 Security Alert Detected
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Transfer paused for account security
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Transfer Progress</span>
                  <span className="font-semibold">{transferProgress}%</span>
                </div>
                <Progress value={transferProgress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {currentFollowers.toLocaleString()} / {followersToTransfer.toLocaleString()} {config.metric} transferred
                </p>
              </div>

              {/* Security Warning */}
              <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left space-y-3">
                      <h3 className="text-lg font-semibold text-red-800">
                        Bot Followers Detected
                      </h3>
                      <p className="text-red-700 text-sm leading-relaxed">
                        Our advanced security system has detected that your account is currently being followed by 
                        <span className="font-bold text-red-800"> 4 bot accounts</span> (non-real users). 
                        These must be removed before we can complete the transfer to ensure account authenticity.
                      </p>
                      <div className="bg-red-100 rounded-lg p-3 border border-red-200">
                        <p className="text-xs text-red-600 font-medium">
                          ⚠️ Bot followers can harm your account's credibility and engagement rates
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleRetryTransfer}
                  variant="outline"
                  className="w-full border-2 border-blue-300 hover:bg-blue-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  I have unfollowed the bots - Try transfer again
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur opacity-75 animate-pulse" />
                  <Button 
                    onClick={onSecurityDetection}
                    className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Use Our Security Software to Remove Bots
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Our security software will automatically detect and remove all bot followers while completing your transfer
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-blue-500/20 backdrop-blur-xl rounded-3xl" />
          
          <div className="relative p-8 text-center space-y-6">
            {/* Transfer Header */}
            <div className="space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-r animate-spin-slow",
                  config.color
                )} />
                <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                  <Download className="w-8 h-8 text-blue-500 animate-bounce" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Transferring {config.metric.charAt(0).toUpperCase() + config.metric.slice(1)}
                </h1>
                <p className="text-lg text-muted-foreground">
                  Securely adding to your {config.name} account
                </p>
              </div>
            </div>

            {/* Progress Animation */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Transfer Progress</span>
                  <span className="font-semibold">{transferProgress}%</span>
                </div>
                <Progress value={transferProgress} className="h-4" />
              </div>

              {/* Live Counter */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-4">
                    <Users className="w-8 h-8 text-blue-500" />
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-700 animate-pulse">
                        +{currentFollowers.toLocaleString()}
                      </p>
                      <p className="text-sm text-blue-600 capitalize">
                        {config.metric} transferred
                      </p>
                    </div>
                    <ArrowRight className="w-8 h-8 text-blue-500 animate-pulse" />
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Details */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-lg font-bold text-green-700">Verified</p>
                    <p className="text-xs text-green-600">Real users only</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <Lock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-lg font-bold text-purple-700">Secure</p>
                    <p className="text-xs text-purple-600">Encrypted transfer</p>
                  </CardContent>
                </Card>
              </div>

              {/* Status Message */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm text-blue-700">
                    Transferring {config.metric} at 1% every 2 seconds for optimal delivery...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
