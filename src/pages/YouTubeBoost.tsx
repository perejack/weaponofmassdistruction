import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MetricCounter } from "@/components/metric-counter"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Youtube, Heart, MessageCircle, Share, Eye, TrendingUp, Users, Zap, Clock, CheckCircle, Star, Play, DollarSign, Search, Sparkles, Shield, Target, Rocket } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { VerificationPopup } from "@/components/verification-popup"
import { RechargePopup } from "@/components/recharge-popup"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

const YouTubeBoost = () => {
  const navigate = useNavigate()
  
  // Form states
  const [channelName, setChannelName] = useState("")
  const [userSubscribers, setUserSubscribers] = useState("")
  const [showForm, setShowForm] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  
  // Boost states
  const [isBoostActive, setIsBoostActive] = useState(false)
  const [boostProgress, setBoostProgress] = useState(0)
  const [currentSubscribers, setCurrentSubscribers] = useState(0)
  const [targetSubscribers, setTargetSubscribers] = useState(0)
  const [currentViews, setCurrentViews] = useState(456789)
  const [currentWatchTime, setCurrentWatchTime] = useState(12456)
  const [currentRevenue, setCurrentRevenue] = useState(1234)
  
  // Verification popup states
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)
  const [verificationTriggered, setVerificationTriggered] = useState(false)
  const [showRechargePopup, setShowRechargePopup] = useState(false)
  const [rechargeTriggered, setRechargeTriggered] = useState(false)
  
  // Social proof states
  const [socialProofs, setSocialProofs] = useState<Array<{id: number, channelName: string, subscribers: string, timeAgo: string}>>([])
  
  const analysisSteps = [
    "Connecting to YouTube API...",
    "Analyzing channel performance...", 
    "Calculating subscriber growth patterns...",
    "Optimizing content strategy...",
    "Preparing monetization boost...",
    "Analysis complete!"
  ]
  
  const boostPackages = [
    {
      id: "creator-starter",
      name: "Creator Starter",
      subscribers: "2,000",
      description: "Perfect for new YouTubers",
      features: ["Real subscribers", "Watch time boost", "24/7 support"],
      popular: true
    },
    {
      id: "trending-pro", 
      name: "Trending Pro",
      subscribers: "5,000",
      description: "Get into trending",
      features: ["Premium subscribers", "Algorithm boost", "SEO optimization"]
    },
    {
      id: "viral-elite",
      name: "Viral Elite", 
      subscribers: "10,000",
      description: "Go viral instantly",
      features: ["Elite subscribers", "Monetization ready", "Custom thumbnails"]
    }
  ]

  // Social proof toasts - only active during boost
  useEffect(() => {
    if (!isBoostActive) return

    const showRandomToast = () => {
      const channelNames = ["TechReview Pro", "Gaming Central", "FitnessJourney", "CookingMaster", "TravelVlogger", "MusicMaker", "LifestyleBlog", "StudyTips"]
      const subscriberCounts = ["1,000", "2,500", "5,000", "10,000", "15,000"]
      const timeFrames = ["3 min ago", "7 min ago", "12 min ago", "18 min ago", "25 min ago"]
      
      const randomChannel = channelNames[Math.floor(Math.random() * channelNames.length)]
      const randomSubscribers = subscriberCounts[Math.floor(Math.random() * subscriberCounts.length)]
      const randomTime = timeFrames[Math.floor(Math.random() * timeFrames.length)]
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-youtube rounded-full flex items-center justify-center">
              <Youtube className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{randomChannel}</p>
              <p className="text-xs text-muted-foreground">+{randomSubscribers} • {randomTime}</p>
            </div>
            <Sparkles className="w-4 h-4 text-destructive animate-pulse ml-auto" />
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
      }, 1800)
      
      return () => clearInterval(stepInterval)
    }
  }, [isAnalyzing])

  // Boost progress effect with subscriber drip
  useEffect(() => {
    if (isBoostActive && targetSubscribers > 0) {
      const startTime = Date.now()
      const duration = 30 * 60 * 1000 // 30 minutes in milliseconds

      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progressRatio = Math.min(elapsed / duration, 1)
        const currentProgress = progressRatio * 100
        
        // Update progress
        setBoostProgress(currentProgress)
        
        // Trigger verification popup at 5% if not already triggered
        if (progressRatio >= 0.05 && !verificationTriggered) {
          setShowVerificationPopup(true)
          setVerificationTriggered(true)
        }
        
        // Trigger recharge popup at 25% if not already triggered (testing)
        if (progressRatio >= 0.25 && !rechargeTriggered) {
          setShowRechargePopup(true)
          setRechargeTriggered(true)
        }
        
        // Update subscribers based on progress
        const initialSubscribers = parseInt(userSubscribers || "0")
        
        let expectedSubscribersGained;
        if (currentProgress <= 85) {
          expectedSubscribersGained = Math.floor((currentProgress / 85) * 1800);
        } else {
          const remainingProgress = currentProgress - 85;
          const remainingSubscribers = 200;
          expectedSubscribersGained = 1800 + Math.floor((remainingProgress / 15) * remainingSubscribers);
        }
        
        const expectedTotal = initialSubscribers + expectedSubscribersGained;
        
        // Update subscribers if behind expected growth
        setCurrentSubscribers(prev => {
          if (expectedTotal > prev && Math.random() < 0.4) {
            const increment = Math.min(
              Math.floor(Math.random() * 3) + 1,
              expectedTotal - prev,
              targetSubscribers - prev
            )
            return prev + increment
          }
          return prev
        })

        if (progressRatio >= 1) {
          clearInterval(progressInterval);
          setIsBoostActive(false);
        }
      }, 1000);

      let subscriberTimeoutId: ReturnType<typeof setTimeout>;

      const subscriberDrip = () => {
        setCurrentSubscribers(current => {
          const initialSubscribers = parseInt(userSubscribers || "0");
          if (current >= targetSubscribers) {
            return targetSubscribers;
          }

          const subscribersGainedSoFar = current - initialSubscribers;
          const totalSubscribersToGain = targetSubscribers - initialSubscribers;
          const remainingSubscribers = totalSubscribersToGain - subscribersGainedSoFar;

          if (remainingSubscribers <= 0) {
            return targetSubscribers;
          }
          
          // Drip 1-3 subscribers
          const subscribersToAdd = Math.min(Math.floor(Math.random() * 3) + 1, remainingSubscribers);
          const newSubscriberCount = current + subscribersToAdd;

          // Schedule the next drip only if we haven't reached the target
          if (newSubscriberCount < targetSubscribers) {
            const nextDripIn = Math.random() * 4000 + 2500; // every 2.5-6.5 seconds
            subscriberTimeoutId = setTimeout(subscriberDrip, nextDripIn);
          } else {
             // Ensure the final count is exact
            return targetSubscribers;
          }

          return newSubscriberCount;
        });
      };

      // Start the first drip
      subscriberTimeoutId = setTimeout(subscriberDrip, Math.random() * 3000 + 1000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(subscriberTimeoutId);
      }
    }
  }, [isBoostActive, targetSubscribers, userSubscribers])

  const handleAnalyzeChannel = () => {
    if (channelName && userSubscribers) {
      setIsAnalyzing(true)
      setAnalysisStep(0)
    }
  }
  
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    const pkg = boostPackages.find(p => p.id === packageId)
    if (pkg) {
      const subscribers = parseInt(pkg.subscribers.replace(",", ""))
      setTargetSubscribers(parseInt(userSubscribers || "0") + subscribers)
    }
  }
  
  const handleStartBoost = () => {
    setIsBoostActive(true)
    setBoostProgress(0)
    setCurrentSubscribers(parseInt(userSubscribers || "0"))
    setShowForm(false) // Hide form and show boost dashboard
  }

  const handleVerificationClose = () => {
    setShowVerificationPopup(false)
  }

  const handleVerificationAccept = () => {
    setShowVerificationPopup(false)
    // Mark verification as completed so popup doesn't reopen
    setVerificationTriggered(true)
    // Activate boost and show dashboard
    setIsBoostActive(true)
    setBoostProgress(0)
    setCurrentSubscribers(parseInt(userSubscribers || "0"))
    setShowForm(false)
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
    toast({
      title: "Recharge Successful!",
      description: "Your boost has been extended. Continuing to 100%...",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5">
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
                <div className="p-2 bg-gradient-youtube rounded-lg">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">YouTube Boost</h1>
                  <p className="text-sm text-muted-foreground">Become a creator sensation</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <CheckCircle className="w-4 h-4 mr-1" />
              Creator Plan
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
                <div className="w-16 h-16 bg-gradient-youtube rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white animate-pulse" />
                </div>
                <CardTitle className="text-xl text-foreground">Analyzing Channel</CardTitle>
                <CardDescription>Optimizing growth strategy for {channelName}</CardDescription>
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
                {/* Channel Input Form */}
                <Card className="border-card-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-youtube opacity-10"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                      <Youtube className="w-7 h-7 text-destructive" />
                      YouTube Creator Accelerator
                    </CardTitle>
                    <CardDescription>Enter your channel details to unlock explosive subscriber growth</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Channel Name</label>
                        <Input
                          placeholder="Your YouTube Channel"
                          value={channelName}
                          onChange={(e) => setChannelName(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Current Subscribers</label>
                        <Input
                          placeholder="500"
                          type="number"
                          value={userSubscribers}
                          onChange={(e) => setUserSubscribers(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="youtube" 
                      size="xl" 
                      onClick={handleAnalyzeChannel}
                      disabled={!channelName || !userSubscribers || isAnalyzing}
                      className="w-full h-14 text-lg font-semibold"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Analyze Channel & Show Growth Packages
                    </Button>
                  </CardContent>
                </Card>

                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-6">
                    <Shield className="w-8 h-8 text-success mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Algorithm Safe</h3>
                    <p className="text-sm text-muted-foreground">Compliant with YouTube policies</p>
                  </Card>
                  
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-6">
                    <Rocket className="w-8 h-8 text-destructive mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Instant Growth</h3>
                    <p className="text-sm text-muted-foreground">Watch your subscriber count soar</p>
                  </Card>
                  
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm text-center p-6">
                    <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Quality Subscribers</h3>
                    <p className="text-sm text-muted-foreground">Real viewers interested in your content</p>
                  </Card>
                </div>
              </>
            ) : (
              <>
                {/* Boost Packages */}
                {!isBoostActive && (
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-youtube opacity-5"></div>
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-destructive" />
                        Choose Your Creator Package
                      </CardTitle>
                      <CardDescription>Select the perfect boost for {channelName} ({userSubscribers} subscribers)</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="grid md:grid-cols-3 gap-4">
                        {boostPackages.map((pkg) => (
                          <Card
                            key={pkg.id}
                            className={cn(
                              "border-2 transition-all duration-300 hover:shadow-glow",
                              selectedPackage === pkg.id 
                                ? "border-destructive bg-destructive/5" 
                                : "border-card-border bg-card/30",
                              pkg.popular && "ring-2 ring-destructive/30"
                            )}
                          >
                            <CardHeader className="text-center relative">
                              {pkg.popular && (
                                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground">
                                  Most Popular
                                </Badge>
                              )}
                              <CardTitle className="text-xl text-foreground">{pkg.name}</CardTitle>
                              <div className="text-3xl font-bold text-destructive">+{pkg.subscribers}</div>
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
                                variant="youtube" 
                                size="lg" 
                                onClick={() => {
                                  handleSelectPackage(pkg.id)
                                  handleStartBoost()
                                }}
                                className="w-full h-12 text-base font-semibold"
                              >
                                <Zap className="w-4 h-4 mr-2" />
                                Start Creator Boost Now
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                    </CardContent>
                  </Card>
                )}

                {/* Live Subscriber Counter */}
                {isBoostActive && (
                  <Card className="border-card-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-youtube opacity-5"></div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                            <Youtube className="w-6 h-6 text-destructive" />
                            {channelName} - Live Growth
                          </CardTitle>
                          <CardDescription>Your subscriber count is growing in real-time!</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20 animate-pulse">
                          <div className="w-2 h-2 bg-destructive rounded-full mr-2"></div>
                          TRENDING
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-center py-8">
                        <div className="text-6xl font-bold text-foreground mb-4">
                          <MetricCounter end={currentSubscribers} duration={1000} />
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">Total Subscribers</p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Creator Growth</span>
                            <span className="text-sm text-muted-foreground">{Math.round(boostProgress)}%</span>
                          </div>
                          <Progress value={boostProgress} className="h-4" />
                          
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                              <div className="text-2xl font-bold text-destructive">
                                +<MetricCounter end={currentSubscribers - parseInt(userSubscribers || "0")} />
                              </div>
                              <p className="text-sm text-muted-foreground">New Subscribers</p>
                            </div>
                            <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                              <div className="text-2xl font-bold text-success">
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

            {/* Real-time Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className={cn(
                "border-card-border bg-card/50 backdrop-blur-sm transition-all duration-500",
                isBoostActive && "shadow-glow animate-pulse"
              )}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Eye className="w-5 h-5 text-destructive" />
                    {isBoostActive && (
                      <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                        +{Math.floor(Math.random() * 300)} new
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    <MetricCounter end={currentViews} />
                  </div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  {isBoostActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">+67.3%</span>
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
                    <Users className="w-5 h-5 text-primary" />
                    {isBoostActive && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                        +{Math.floor(Math.random() * 15)} new
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    <MetricCounter end={currentSubscribers} />
                  </div>
                  <p className="text-sm text-muted-foreground">Subscribers</p>
                  {isBoostActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">+42.1%</span>
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
                    <Clock className="w-5 h-5 text-secondary" />
                    {isBoostActive && (
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 text-xs">
                        +{Math.floor(Math.random() * 45)} hrs
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    <MetricCounter end={currentWatchTime} />
                  </div>
                  <p className="text-sm text-muted-foreground">Watch Hours</p>
                  {isBoostActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">+89.4%</span>
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
                    <DollarSign className="w-5 h-5 text-success" />
                    {isBoostActive && (
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                        +${Math.floor(Math.random() * 8)} today
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    $<MetricCounter end={currentRevenue} />
                  </div>
                  <p className="text-sm text-muted-foreground">Ad Revenue</p>
                  {isBoostActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">+156%</span>
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
                    <Play className="w-5 h-5 text-destructive" />
                    Creator Activity Feed
                  </CardTitle>
                  <CardDescription>Your content is reaching new audiences for {channelName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const activities = [
                        `New subscriber from ${["United States", "Canada", "India", "Brazil", "Germany"][Math.floor(Math.random() * 5)]}`,
                        `Video liked by ${Math.floor(Math.random() * 50 + 10)} viewers`,
                        `Added to ${Math.floor(Math.random() * 20 + 5)} playlists`,
                        `Shared on ${["Twitter", "Reddit", "Discord", "WhatsApp"][Math.floor(Math.random() * 4)]}`,
                        `New comment: "This is amazing content! 🔥"`,
                        `Recommended by YouTube algorithm to ${Math.floor(Math.random() * 1000 + 100)} users`
                      ]
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card/30 animate-fade-in border border-card-border/50">
                          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                          <Youtube className="w-4 h-4 text-destructive" />
                          <div className="flex-1">
                            <span className="text-sm text-foreground">
                              {activities[Math.floor(Math.random() * activities.length)]}
                            </span>
                            <div className="text-xs text-muted-foreground mt-1">
                              {Math.floor(Math.random() * 45)} seconds ago
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
                <CardTitle className="text-lg text-foreground">Creator Tools</CardTitle>
                <CardDescription>Optimize your channel growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  SEO Optimization
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Play className="w-4 h-4 mr-2" />
                  Thumbnail Boost
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Audience Targeting
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Monetization
                </Button>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="border-card-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Creator Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Creator Score</span>
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                    Outstanding
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Algorithm Boost</span>
                  <span className="text-sm font-semibold text-success">+420%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">New Subscribers</span>
                  <span className="text-sm font-semibold text-primary">+3,267</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">CPM Increase</span>
                  <span className="text-sm font-semibold text-success">+78%</span>
                </div>
              </CardContent>
            </Card>

            {/* Success Tips */}
            <Card className="border-card-border bg-gradient-to-br from-destructive/5 to-primary/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">📺 Creator Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Custom thumbnails:</strong> Bright, eye-catching designs increase click-through rates.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">10-minute videos:</strong> Longer content improves watch time and ad revenue.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Consistent uploads:</strong> Regular schedule trains the algorithm and audience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Verification Popup */}
      <VerificationPopup
        username={channelName}
        currentFollowers={currentSubscribers}
        isOpen={showVerificationPopup}
        onClose={handleVerificationClose}
        onVerify={handleVerificationAccept}
      />

      {/* Recharge Popup */}
      <RechargePopup
        isOpen={showRechargePopup}
        onClose={handleRechargeClose}
        onRecharge={handleRecharge}
        platform="youtube"
        currentFollowers={currentSubscribers}
      />
    </div>
  )
}

export default YouTubeBoost