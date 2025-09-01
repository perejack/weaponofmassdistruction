import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RechargePayment } from "./recharge-payment"
import { 
  Zap, 
  Crown, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Rocket, 
  Heart, 
  Eye, 
  DollarSign,
  Sparkles,
  Timer,
  Award,
  Target,
  Flame,
  X,
  CheckCircle,
  ArrowRight,
  Coins,
  Banknote
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RechargePopupProps {
  isOpen: boolean
  onClose: () => void
  onRecharge: (packageId: string) => void
  platform: 'tiktok' | 'instagram' | 'facebook' | 'youtube'
  currentFollowers: number
}

export function RechargePopup({ isOpen, onClose, onRecharge, platform, currentFollowers }: RechargePopupProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const [showPackages, setShowPackages] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedPackageInfo, setSelectedPackageInfo] = useState<any>(null)

  if (!isOpen) return null

  const platformConfig = {
    tiktok: {
      name: "TikTok",
      icon: "🎵",
      color: "from-pink-500 to-red-500",
      followerText: "followers"
    },
    instagram: {
      name: "Instagram", 
      icon: "📸",
      color: "from-purple-500 to-pink-500",
      followerText: "followers"
    },
    facebook: {
      name: "Facebook",
      icon: "👥", 
      color: "from-blue-500 to-indigo-500",
      followerText: "followers"
    },
    youtube: {
      name: "YouTube",
      icon: "🎬",
      color: "from-red-500 to-orange-500", 
      followerText: "subscribers"
    }
  }

  const config = platformConfig[platform]

  const rechargePackages = [
    {
      id: "starter",
      name: "Boost Starter",
      price: "350",
      originalPrice: "500",
      savings: "30%",
      followers: "2,000",
      popular: false,
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      glowColor: "shadow-emerald-500/25",
      benefits: [
        { icon: Users, text: "2,000 Premium Followers", highlight: true },
        { icon: Rocket, text: "3x Faster Loading", highlight: false },
        { icon: Shield, text: "Account Protection", highlight: false }
      ],
      badge: "BEST VALUE"
    },
    {
      id: "pro", 
      name: "Viral Pro",
      price: "500",
      originalPrice: "750",
      savings: "33%",
      followers: "5,000",
      popular: true,
      gradient: "from-violet-400 via-purple-500 to-indigo-600",
      glowColor: "shadow-purple-500/30",
      benefits: [
        { icon: Users, text: "5,000 Elite Followers", highlight: true },
        { icon: TrendingUp, text: "Viral Algorithm Boost", highlight: true },
        { icon: Star, text: "Priority Support", highlight: false }
      ],
      badge: "MOST POPULAR"
    },
    {
      id: "legend",
      name: "Legend Elite", 
      price: "750",
      originalPrice: "1200",
      savings: "37%",
      followers: "12,000",
      popular: false,
      gradient: "from-amber-400 via-orange-500 to-red-600",
      glowColor: "shadow-orange-500/30",
      benefits: [
        { icon: Crown, text: "12,000 VIP Followers", highlight: true },
        { icon: DollarSign, text: "Monetization Ready", highlight: true },
        { icon: Award, text: "Influencer Status", highlight: true }
      ],
      badge: "PREMIUM"
    }
  ]

  if (!showPackages) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[9999] p-2 sm:p-4">
        <Card className="w-full max-w-sm sm:max-w-lg border-2 border-amber-500/50 bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500 relative overflow-hidden max-h-[95vh] overflow-y-auto">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 hover:bg-red-500/20 z-10"
          >
            <X className="w-4 h-4" />
          </Button>

          <CardHeader className="text-center pb-3 sm:pb-4 relative z-10 px-3 sm:px-6">
            {/* Warning icon with pulsing effect */}
            <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-ping opacity-75" />
              <div className="absolute inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Timer className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white animate-bounce" />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1 sm:px-4 text-xs sm:text-sm animate-pulse">
                ⚡ BOOST LIMIT REACHED
              </Badge>
              
              <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                Your Free Boost is Finished!
              </CardTitle>
              
              <CardDescription className="text-sm sm:text-base leading-relaxed px-2 sm:px-0">
                <span className="text-amber-400 font-semibold">You're almost there!</span> Recharge your account to complete the boost and unlock your full potential.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 relative z-10 px-3 sm:px-6">
            {/* Progress indicator */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm font-medium text-foreground">Boost Progress</span>
                <span className="text-xs sm:text-sm font-bold text-amber-400">85% Complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 sm:h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Current stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-400">
                  +{(1800).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">New {config.followerText}</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400">
                  {currentFollowers.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Total {config.followerText}</p>
              </div>
            </div>

            {/* Important notice */}
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-red-400">Important Notice</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Your {config.followerText} will display in your {config.name} account once boost reaches 100% completion. 
                    <span className="text-amber-400 font-medium"> Recharge now to avoid interruption and losing gained {config.followerText}.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setShowPackages(true)}
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Coins className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              Recharge Account Now
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 animate-spin" />
            </Button>

            {/* Social proof */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full border-2 border-background flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  ))}
                </div>
                <span>2,847 creators recharged in the last hour</span>
                <Star className="w-3 h-3 text-yellow-400 fill-current animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[9999] p-2 sm:p-4 overflow-y-auto">
      <Card className="w-full max-w-sm sm:max-w-4xl lg:max-w-6xl border-2 border-purple-500/50 bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500 relative overflow-hidden my-4 sm:my-8 max-h-[95vh] overflow-y-auto">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 hover:bg-red-500/20 z-10"
        >
          <X className="w-5 h-5" />
        </Button>

        <CardHeader className="text-center pb-4 sm:pb-6 relative z-10 px-3 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl">{config.icon}</div>
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center sm:text-left">
                Upgrade Your {config.name} Boost
              </CardTitle>
            </div>
            
            <CardDescription className="text-sm sm:text-base lg:text-lg px-2 sm:px-0">
              Choose your perfect package and continue your journey to viral success
            </CardDescription>

            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30 text-xs sm:text-sm">
                <Flame className="w-3 h-3 mr-1" />
                Limited Time Offers
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 px-3 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {rechargePackages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className={cn(
                  "relative cursor-pointer transition-all duration-500 hover:scale-105 border-2 overflow-hidden group",
                  selectedPackage === pkg.id 
                    ? "border-purple-500 shadow-2xl" 
                    : "border-card-border hover:border-purple-400/50",
                  pkg.popular && "ring-2 ring-purple-400/50 ring-offset-2 ring-offset-background",
                  `hover:${pkg.glowColor}`
                )}
                onClick={() => setSelectedPackage(pkg.id)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient background */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity", pkg.gradient)} />
                
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-4 py-1 shadow-lg animate-bounce">
                      ⭐ {pkg.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center relative z-10 pt-6 sm:pt-8 px-3 sm:px-6">
                  <div className="space-y-2 sm:space-y-3">
                    <CardTitle className="text-lg sm:text-xl font-bold text-foreground">{pkg.name}</CardTitle>
                    
                    {/* Price display */}
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-foreground">KSH {pkg.price}</span>
                        <div className="text-center sm:text-right">
                          <div className="text-xs sm:text-sm text-muted-foreground line-through">KSH {pkg.originalPrice}</div>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                            Save {pkg.savings}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Main benefit */}
                      <div className={cn("text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent", pkg.gradient)}>
                        +{pkg.followers} {config.followerText}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4 relative z-10 px-3 sm:px-6">
                  {/* Benefits list */}
                  <div className="space-y-2 sm:space-y-3">
                    {pkg.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 sm:gap-3">
                        <div className={cn("p-1 sm:p-1.5 rounded-lg", benefit.highlight ? "bg-purple-500/20" : "bg-card/50")}>
                          <benefit.icon className={cn("w-3 h-3 sm:w-4 sm:h-4", benefit.highlight ? "text-purple-400" : "text-muted-foreground")} />
                        </div>
                        <span className={cn("text-xs sm:text-sm", benefit.highlight ? "font-semibold text-foreground" : "text-muted-foreground")}>
                          {benefit.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Select button */}
                  <Button
                    onClick={() => {
                      setSelectedPackage(pkg.id)
                      setSelectedPackageInfo(pkg)
                      setShowPayment(true)
                    }}
                    className={cn(
                      "w-full h-10 sm:h-12 text-sm sm:text-base font-semibold transition-all duration-300 relative overflow-hidden group",
                      selectedPackage === pkg.id
                        ? `bg-gradient-to-r ${pkg.gradient} text-white shadow-lg`
                        : "bg-card/50 hover:bg-card/80 text-foreground border border-card-border"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Banknote className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Choose Package
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* Payment Modal */}
      {showPayment && selectedPackageInfo && (
        <RechargePayment
          isOpen={showPayment}
          onClose={() => {
            setShowPayment(false)
            setSelectedPackageInfo(null)
            setSelectedPackage("")
          }}
          onSuccess={() => {
            onRecharge(selectedPackage)
            setShowPayment(false)
            setSelectedPackageInfo(null)
            setSelectedPackage("")
          }}
          packageInfo={selectedPackageInfo}
          platform={platform}
        />
      )}
    </div>
  )
}
