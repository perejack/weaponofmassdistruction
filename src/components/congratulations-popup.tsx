import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Trophy, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Zap,
  CheckCircle,
  Star,
  Crown,
  Gift,
  Rocket
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CongratulationsPopupProps {
  isOpen: boolean
  onClose: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
  followersGained: number
  onStartTransfer: () => void
}

export const CongratulationsPopup = ({ 
  isOpen, 
  onClose, 
  platform, 
  followersGained,
  onStartTransfer 
}: CongratulationsPopupProps) => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setAnimationPhase(1), 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20 backdrop-blur-xl rounded-3xl" />
          
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute w-2 h-2 rounded-full animate-bounce",
                    i % 4 === 0 && "bg-yellow-400",
                    i % 4 === 1 && "bg-pink-400", 
                    i % 4 === 2 && "bg-blue-400",
                    i % 4 === 3 && "bg-green-400"
                  )}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative p-8 text-center space-y-6">
            {/* Header with Trophy */}
            <div className={cn(
              "transform transition-all duration-1000",
              animationPhase >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}>
              <div className="relative mx-auto w-24 h-24 mb-4">
                <div className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-r animate-spin-slow",
                  config.color
                )} />
                <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-yellow-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  🎉 Congratulations! 🎉
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your {config.name} boost is complete!
                </p>
              </div>
            </div>

            {/* Success Stats */}
            <div className={cn(
              "grid grid-cols-3 gap-4 transform transition-all duration-1000 delay-300",
              animationPhase >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-700">100%</p>
                  <p className="text-sm text-green-600">Complete</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-700">+{followersGained.toLocaleString()}</p>
                  <p className="text-sm text-blue-600 capitalize">{config.metric}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-700">↗️ 250%</p>
                  <p className="text-sm text-purple-600">Growth</p>
                </CardContent>
              </Card>
            </div>

            {/* Achievement Badges */}
            <div className={cn(
              "flex justify-center gap-2 flex-wrap transform transition-all duration-1000 delay-500",
              animationPhase >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}>
              <Badge variant="secondary" className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300">
                <Star className="w-3 h-3 mr-1" />
                Viral Ready
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-300">
                <Crown className="w-3 h-3 mr-1" />
                Influencer Status
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300">
                <Rocket className="w-3 h-3 mr-1" />
                Boosted
              </Badge>
            </div>

            {/* Success Message */}
            <div className={cn(
              "bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 transform transition-all duration-1000 delay-700",
              animationPhase >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">Boost Successfully Completed!</h3>
              </div>
              <p className="text-green-700 text-sm leading-relaxed">
                Your {config.name} account has been successfully boosted with {followersGained.toLocaleString()} new {config.metric}. 
                You're now ready to take your content to the next level and reach millions of users!
              </p>
            </div>

            {/* Next Step */}
            <div className={cn(
              "bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 transform transition-all duration-1000 delay-900",
              animationPhase >= 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">Final Step: Transfer to Your Account</h3>
              </div>
              <p className="text-blue-700 text-sm mb-4">
                We're now ready to transfer your new {config.metric} directly to your {config.name} account. 
                This secure process ensures all {config.metric} are real and active users.
              </p>
              
              <Button 
                onClick={onStartTransfer}
                className={cn(
                  "w-full bg-gradient-to-r text-white font-semibold py-3 px-6 rounded-xl",
                  "hover:shadow-lg transform hover:scale-105 transition-all duration-200",
                  "animate-pulse",
                  config.color
                )}
              >
                <Gift className="w-5 h-5 mr-2" />
                Start Transfer Process
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
