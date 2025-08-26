import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  Sparkles, 
  Trophy, 
  Users, 
  Shield, 
  AlertTriangle, 
  Zap,
  Star,
  Crown,
  Rocket,
  Lock,
  Bot,
  UserCheck,
  TrendingUp,
  DollarSign,
  Eye,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface CompletionPopupProps {
  isOpen: boolean
  onClose: () => void
  platform: 'tiktok' | 'instagram' | 'youtube' | 'facebook'
  followersGained: number
  currentFollowers: number
}

export const CompletionPopup = ({ 
  isOpen, 
  onClose, 
  platform, 
  followersGained, 
  currentFollowers 
}: CompletionPopupProps) => {
  const [stage, setStage] = useState<'congratulations' | 'transferring' | 'bot-detected' | 'security-software' | 'activation'>('congratulations')
  const [transferProgress, setTransferProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [animateNumbers, setAnimateNumbers] = useState(false)

  const platformConfig = {
    tiktok: { 
      name: 'TikTok', 
      color: 'from-pink-500 to-red-500',
      icon: '🎵',
      metric: 'followers'
    },
    instagram: { 
      name: 'Instagram', 
      color: 'from-purple-500 to-pink-500',
      icon: '📸',
      metric: 'followers'
    },
    youtube: { 
      name: 'YouTube', 
      color: 'from-red-500 to-red-600',
      icon: '📺',
      metric: 'subscribers'
    },
    facebook: { 
      name: 'Facebook', 
      color: 'from-blue-500 to-blue-600',
      icon: '👥',
      metric: 'followers'
    }
  }

  const config = platformConfig[platform]

  useEffect(() => {
    if (isOpen && stage === 'congratulations') {
      setShowConfetti(true)
      setAnimateNumbers(true)
      
      // Auto transition to transfer after 4 seconds
      const timer = setTimeout(() => {
        setStage('transferring')
        setShowConfetti(false)
      }, 4000)
      
      return () => clearTimeout(timer)
    }
  }, [isOpen, stage])

  // Transfer progress animation
  useEffect(() => {
    if (stage === 'transferring') {
      const interval = setInterval(() => {
        setTransferProgress(prev => {
          const next = prev + 1
          
          // Trigger bot detection at 95%
          if (next >= 95) {
            clearInterval(interval)
            setTimeout(() => setStage('bot-detected'), 1000)
            return 95
          }
          
          return next
        })
      }, 2000) // 1% every 2 seconds
      
      return () => clearInterval(interval)
    }
  }, [stage])

  const handleTryAgain = () => {
    setTransferProgress(95)
    // Simulate trying again but failing
    setTimeout(() => {
      toast({
        title: "Transfer Failed",
        description: "Bot followers detected. Please use our security software.",
        variant: "destructive"
      })
    }, 2000)
  }

  const handleUseSecurity = () => {
    setStage('security-software')
  }

  const handleActivateSecurity = () => {
    setStage('activation')
    
    // Complete the transfer after activation
    setTimeout(() => {
      setTransferProgress(100)
      toast({
        title: "Transfer Complete! 🎉",
        description: `${followersGained.toLocaleString()} ${config.metric} successfully added to your account!`,
        duration: 5000
      })
      
      setTimeout(() => {
        onClose()
      }, 3000)
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <Card className={cn(
        "relative w-full max-w-2xl mx-auto transform transition-all duration-500",
        "bg-gradient-to-br from-background via-background to-primary/5",
        "border-2 border-primary/20 shadow-2xl",
        showConfetti && "animate-pulse"
      )}>
        <CardContent className="p-8">
          
          {/* Congratulations Stage */}
          {stage === 'congratulations' && (
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="relative mx-auto w-24 h-24">
                <div className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-r animate-spin",
                  config.color,
                  "opacity-20"
                )} />
                <div className="relative flex items-center justify-center w-full h-full">
                  <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  🎉 Congratulations! 🎉
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your {config.name} account has been successfully boosted!
                </p>
              </div>

              {/* Stats Display */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className={cn(
                  "p-4 rounded-xl bg-gradient-to-r",
                  config.color,
                  "text-white"
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="text-sm opacity-90">New {config.metric}</span>
                  </div>
                  <div className={cn(
                    "text-2xl font-bold",
                    animateNumbers && "animate-pulse"
                  )}>
                    +{followersGained.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5" />
                    <span className="text-sm opacity-90">Total {config.metric}</span>
                  </div>
                  <div className={cn(
                    "text-2xl font-bold",
                    animateNumbers && "animate-pulse"
                  )}>
                    {currentFollowers.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex justify-center gap-4 flex-wrap">
                <Badge variant="secondary" className="px-3 py-1">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Premium Quality
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <Shield className="w-4 h-4 mr-1" />
                  100% Safe
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <Zap className="w-4 h-4 mr-1" />
                  Instant Delivery
                </Badge>
              </div>

              {/* Loading indicator */}
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                <span>Preparing transfer...</span>
              </div>
            </div>
          )}

          {/* Transfer Stage */}
          {stage === 'transferring' && (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Transferring {config.metric}</h2>
                <p className="text-muted-foreground">
                  Our system is now securely transferring {followersGained.toLocaleString()} {config.metric} to your {config.name} account
                </p>
              </div>

              {/* Transfer Animation */}
              <div className="relative max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium">Our Servers</span>
                  </div>
                  
                  <div className="flex-1 mx-4 relative">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                        style={{ width: `${transferProgress}%` }}
                      />
                    </div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="animate-bounce">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <span className="text-xl">{config.icon}</span>
                    </div>
                    <span className="font-medium">Your Account</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {transferProgress}%
                  </div>
                  <Progress value={transferProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Transferring {Math.floor((transferProgress / 100) * followersGained).toLocaleString()} / {followersGained.toLocaleString()} {config.metric}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                <span>Transfer in progress... Please wait</span>
              </div>
            </div>
          )}

          {/* Bot Detection Stage */}
          {stage === 'bot-detected' && (
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-red-600">Security Alert!</h2>
                <p className="text-lg text-muted-foreground">
                  Our security software has detected your account is previously being followed by <span className="font-bold text-red-500">4 bot accounts</span> (non-real users)
                </p>
                <p className="text-muted-foreground">
                  Please unfollow the bot followers you previously followed so that the transfer can complete
                </p>
              </div>

              {/* Bot Detection Details */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-red-700">Detected Bot Accounts</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>@fake_user_2847</span>
                    <Badge variant="destructive" className="text-xs">Bot</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>@spam_account_91</span>
                    <Badge variant="destructive" className="text-xs">Bot</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>@auto_follow_bot</span>
                    <Badge variant="destructive" className="text-xs">Bot</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>@fake_engagement</span>
                    <Badge variant="destructive" className="text-xs">Bot</Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={handleTryAgain}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  I have unfollowed - Try transfer again
                </Button>
                
                <Button 
                  onClick={handleUseSecurity}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Shield className="w-4 h-4" />
                  Use our security software
                </Button>
              </div>
            </div>
          )}

          {/* Security Software Stage */}
          {stage === 'security-software' && (
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SecureBoost Pro
                </h2>
                <p className="text-lg text-muted-foreground">
                  Advanced Anti-Bot Security Software
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="p-4 rounded-lg border bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Bot className="w-6 h-6 text-purple-600" />
                    <span className="font-semibold">Bot Detection</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Instantly identifies and removes fake followers
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">Monetization Boost</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Helps you earn more from real, engaged followers
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold">Growth Analytics</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Track your real engagement and growth metrics
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-gradient-to-br from-orange-50 to-red-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="w-6 h-6 text-orange-600" />
                    <span className="font-semibold">Real-time Monitoring</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    24/7 protection against fake engagement
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-6 h-6" />
                  <span className="text-xl font-bold">Premium Plan</span>
                </div>
                <div className="text-3xl font-bold mb-1">$29.99/month</div>
                <div className="text-sm opacity-90 mb-4">
                  <span className="line-through">$59.99</span> - Limited Time Offer!
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Trusted by 100K+ creators</span>
                </div>
              </div>

              <Button 
                onClick={handleActivateSecurity}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
              >
                <Lock className="w-5 h-5 mr-2" />
                Activate SecureBoost Pro for Your Account
              </Button>

              <p className="text-xs text-muted-foreground">
                This will instantly remove non-human followers and grant you the new followers
              </p>
            </div>
          )}

          {/* Activation Stage */}
          {stage === 'activation' && (
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center animate-pulse">
                <Zap className="w-12 h-12 text-white" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-green-600">Activating SecureBoost Pro</h2>
                <p className="text-muted-foreground">
                  Removing bot followers and completing your transfer...
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Bot followers removed</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                  <span className="text-sm">Transferring real followers...</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-primary">
                Completing transfer...
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  )
}
