import React, { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Shield, 
  Bot, 
  UserCheck, 
  TrendingUp, 
  DollarSign,
  Zap,
  CheckCircle,
  Star,
  Crown,
  Lock,
  Sparkles,
  Users,
  Eye,
  Target,
  Award,
  Rocket,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AntibotSecurityProps {
  isOpen: boolean
  onClose: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
  onActivate: () => void
}

export const AntibotSecurity = ({ 
  isOpen, 
  onClose, 
  platform,
  onActivate
}: AntibotSecurityProps) => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [showActivation, setShowActivation] = useState(false)

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

  const features = [
    {
      icon: Bot,
      title: "AI Bot Detection",
      description: "Advanced machine learning algorithms detect and remove fake followers instantly",
      benefit: "99.9% accuracy in identifying non-human accounts"
    },
    {
      icon: UserCheck,
      title: "Real User Verification", 
      description: "Ensures all your followers are genuine, active users who engage with content",
      benefit: "Increases engagement rates by up to 400%"
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Track your authentic growth with detailed insights and engagement metrics",
      benefit: "Optimize content strategy for maximum reach"
    },
    {
      icon: DollarSign,
      title: "Monetization Boost",
      description: "Clean follower base attracts brands and sponsors for partnership opportunities",
      benefit: "Increase earning potential by 300%+"
    },
    {
      icon: Lock,
      title: "Account Protection",
      description: "Continuous monitoring prevents future bot attacks and spam followers",
      benefit: "24/7 automated security protection"
    },
    {
      icon: Crown,
      title: "Premium Status",
      description: "Verified authentic account status improves algorithm visibility and reach",
      benefit: "2x higher content visibility"
    }
  ]

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentFeature(prev => (prev + 1) % features.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isOpen, features.length])

  const handleActivateClick = () => {
    setShowActivation(true)
  }

  if (showActivation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg p-0 overflow-hidden border-0 bg-transparent">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-green-500/20 backdrop-blur-xl rounded-3xl" />
            
            <div className="relative p-8 text-center space-y-6">
              {/* Activation Header */}
              <div className="space-y-4">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" />
                  <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-green-500 animate-bounce" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-green-600">
                    Activate Security Software
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    One-time activation fee
                  </p>
                </div>
              </div>

              {/* Pricing Card */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-700">250 KSH</p>
                      <p className="text-sm text-green-600">Software Activation</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Instantly remove 4 bot followers</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Complete your follower transfer</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Lifetime bot protection</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Premium analytics dashboard</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Urgency Message */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 border border-orange-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <p className="text-sm text-orange-700">
                    Your transfer is paused. Activate now to complete the process and secure your account.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur opacity-75 animate-pulse" />
                  <Button 
                    onClick={onActivate}
                    className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Confirm Activation - 250 KSH
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Secure payment processing • Money-back guarantee
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-blue-500/20 backdrop-blur-xl rounded-3xl" />
          
          <div className="relative p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-spin-slow" />
                <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-blue-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🛡️ AntiBot Security Pro
                </h1>
                <p className="text-xl text-muted-foreground">
                  Advanced AI-Powered Social Media Protection
                </p>
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300">
                  <Star className="w-3 h-3 mr-1" />
                  #1 Security Software for {config.name}
                </Badge>
              </div>
            </div>

            {/* Feature Showcase */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Current Feature */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 min-h-[300px]">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      {React.createElement(features[currentFeature].icon, { 
                        className: "w-8 h-8 text-white" 
                      })}
                    </div>
                    <CardTitle className="text-xl text-blue-800">
                      {features[currentFeature].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-blue-700 leading-relaxed">
                      {features[currentFeature].description}
                    </p>
                    <div className="bg-blue-100 rounded-lg p-3 border border-blue-200">
                      <p className="text-sm font-semibold text-blue-800">
                        ✨ {features[currentFeature].benefit}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Feature Navigation */}
                <div className="flex justify-center gap-2">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentFeature 
                          ? "bg-blue-500 w-8" 
                          : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Benefits & Stats */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-700">99.9%</p>
                      <p className="text-sm text-green-600">Bot Detection</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-700">400%</p>
                      <p className="text-sm text-purple-600">Engagement ↗</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-yellow-700">300%</p>
                      <p className="text-sm text-yellow-600">Revenue ↗</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
                    <CardContent className="p-4 text-center">
                      <Eye className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-cyan-700">2x</p>
                      <p className="text-sm text-cyan-600">Visibility</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Premium Benefits */}
                <Card className="bg-gradient-to-br from-gold-50 to-yellow-50 border-yellow-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800">
                      <Crown className="w-5 h-5" />
                      Premium Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Real-time bot detection & removal",
                      "Advanced engagement analytics",
                      "Brand partnership opportunities",
                      "Algorithm optimization tips",
                      "24/7 account monitoring",
                      "Priority customer support"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-yellow-700">
                        <CheckCircle className="w-4 h-4 text-yellow-600" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  🚀 Transform Your {config.name} Account Today
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  Join over 50,000+ creators who've boosted their earnings and engagement with AntiBot Security Pro
                </p>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur opacity-75 animate-pulse" />
                  <Button 
                    onClick={handleActivateClick}
                    className="relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Activate Security Software
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                30-day money-back guarantee • Trusted by 50,000+ creators
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
