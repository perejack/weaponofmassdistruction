import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { STKPush } from "@/components/stk-push"
import { 
  Shield, 
  CheckCircle, 
  Users, 
  Heart, 
  Crown, 
  Star, 
  TrendingUp, 
  Zap,
  CreditCard,
  Banknote,
  X,
  Scan, 
  Search, 
  UserCheck, 
  Smartphone, 
  Send, 
  Loader2,
  Eye,
  ArrowLeft,
  Unlock,
  Lock
} from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

interface VerificationPopupProps {
  username: string
  currentFollowers: number
  isOpen: boolean
  onClose: () => void
  onVerify: () => void
}

export function VerificationPopup({ username, currentFollowers, isOpen, onClose, onVerify }: VerificationPopupProps) {
  const [verificationStep, setVerificationStep] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showSTKPush, setShowSTKPush] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [isSendingStk, setIsSendingStk] = useState(false)
  const [showBenefits, setShowBenefits] = useState(false)
  const [apiError, setApiError] = useState("")

  const verificationSteps = [
    { icon: Search, text: "Connecting to Instagram servers..." },
    { icon: Scan, text: "Scanning account authenticity..." },
    { icon: Shield, text: "Validating account security..." },
    { icon: UserCheck, text: "Verifying account eligibility..." },
    { icon: CheckCircle, text: "Preparing verification..." }
  ]

  // Verification animation effect
  useEffect(() => {
    if (isVerifying) {
      const stepInterval = setInterval(() => {
        setVerificationStep(prev => {
          if (prev >= verificationSteps.length - 1) {
            clearInterval(stepInterval)
            setTimeout(() => {
              setIsVerifying(false)
              setShowPayment(true)
            }, 1500)
            return prev
          }
          return prev + 1
        })
      }, 2000)

      const progressInterval = setInterval(() => {
        setVerificationProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 2
        })
      }, 100)

      return () => {
        clearInterval(stepInterval)
        clearInterval(progressInterval)
      }
    }
  }, [isVerifying])

  const handleStartVerification = () => {
    setIsVerifying(true)
    setVerificationStep(0)
    setVerificationProgress(0)
  }

  const handleCompletePayment = () => {
    setShowPayment(false)
    setShowSTKPush(true)
  }

  const validatePhoneNumber = (num: string) => {
    // Validates Kenyan phone numbers (e.g., 07..., 01..., 7..., 2547...)
    const kenyanPhoneRegex = /^(?:254|\+254|0)?(7|1)\d{8}$/
    return kenyanPhoneRegex.test(num.trim())
  }

  const initiateStkPush = async (phone: string) => {
    // This is a placeholder for the actual API call.
    // Replace '/api/stk-push' with your actual backend endpoint.
    try {
      /*
      const response = await fetch('/api/stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to initiate STK push.');
      }

      return await response.json();
      */

      // Simulate a successful API call for now
      await new Promise(resolve => setTimeout(resolve, 3000));
      return { success: true, message: "STK push initiated successfully." };

    } catch (error) {
      console.error("STK Push API error:", error);
      if (error instanceof Error) {
          throw new Error(error.message);
      }
      throw new Error("An unknown error occurred.");
    }
  };

  const handleStkPush = async () => {
    if (validatePhoneNumber(phoneNumber)) {
      setPhoneError("");
      setApiError(""); // Clear previous API errors
      setIsSendingStk(true);

      try {
        await initiateStkPush(phoneNumber);
        setIsSendingStk(false);
        setShowSTKPush(false);
        setShowSuccess(true);
      } catch (error) {
        setIsSendingStk(false);
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      setPhoneError("Please enter a valid Kenyan phone number (e.g., 0712345678).");
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Format as Kenyan number
    if (digits.startsWith('254')) {
      return digits.slice(0, 12)
    } else if (digits.startsWith('0')) {
      return digits.slice(0, 10)
    } else if (digits.startsWith('7')) {
      return digits.slice(0, 9)
    }
    return digits.slice(0, 10)
  }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (phoneError) {
      setPhoneError("")
    }
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  if (!isOpen) return null

  const verificationBenefits = [
    {
      icon: Users,
      title: "Up to 2,000 Real Followers",
      description: "Attract genuine, active followers from your target audience",
      value: "2,000+",
      color: "text-blue-400"
    },
    {
      icon: Heart,
      title: "100K+ Guaranteed Likes",
      description: "Boost engagement with authentic likes on your posts",
      value: "100K+",
      color: "text-red-400"
    },
    {
      icon: TrendingUp,
      title: "5x Faster Growth",
      description: "Accelerated growth rate compared to unverified accounts",
      value: "5x Speed",
      color: "text-green-400"
    },
    {
      icon: Eye,
      title: "Premium Reach Boost",
      description: "Your content reaches 10x more people organically",
      value: "10x Reach",
      color: "text-purple-400"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "24/7 dedicated support and account protection",
      value: "24/7",
      color: "text-yellow-400"
    },
    {
      icon: Crown,
      title: "VIP Status Badge",
      description: "Stand out with exclusive verified badge and features",
      value: "VIP",
      color: "text-amber-400"
    }
  ]

  // Verification Loading Screen
  if (isVerifying) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-2 sm:p-4">
        <Card className="w-full max-w-md border-2 border-primary/50 bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
          <CardHeader className="text-center pb-6">
            <div className="relative mx-auto w-24 h-24 mb-6">
              {/* Animated scanning rings */}
              <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping" />
              <div className="absolute inset-2 border-4 border-primary/50 rounded-full animate-pulse" />
              <div className="absolute inset-4 border-4 border-primary rounded-full animate-spin" />
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-bounce">
                  {React.createElement(verificationSteps[verificationStep]?.icon || Shield, { 
                    className: "w-6 h-6 text-white" 
                  })}
                </div>
              </div>
            </div>
            
            <CardTitle className="text-xl font-bold text-foreground mb-2">
              Verifying Account
            </CardTitle>
            <CardDescription className="text-sm">
              @{username} • Please wait while we verify your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
              <Progress value={verificationProgress} className="h-3" />
              <div className="text-center text-sm text-muted-foreground">
                {Math.round(verificationProgress)}% Complete
              </div>
            </div>
            
            {/* Current step */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  {React.createElement(verificationSteps[verificationStep]?.icon || Shield, { 
                    className: "w-4 h-4 text-primary" 
                  })}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {verificationSteps[verificationStep]?.text || "Processing..."}
                </span>
              </div>
              
              {/* Step indicators */}
              <div className="flex justify-center gap-2">
                {verificationSteps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index <= verificationStep 
                        ? "bg-primary scale-125" 
                        : "bg-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // STK Push Screen
  if (showSTKPush) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-2 sm:p-4">
        <STKPush
          amount={20}
          onSuccess={(reference) => {
            setShowSTKPush(false)
            setShowSuccess(true)
            onVerify()
          }}
          onCancel={() => {
            setShowSTKPush(false)
            setShowPayment(true)
          }}
          description="Social Media Boost Verification"
        />
      </div>
    )
  }

  // Success Screen
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-2 sm:p-4">
        <Card className="w-full max-w-md border-2 border-green-500/50 bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
          <CardHeader className="text-center pb-4">
            <div className="relative mx-auto w-20 h-20 mb-4">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-foreground mb-2">
              Verification Complete!
            </CardTitle>
            <CardDescription className="text-sm">
              Congratulations, @{username}! Your account is now verified.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-center text-foreground">Premium Benefits Unlocked:</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-muted-foreground">Real Followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-muted-foreground">Guaranteed Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-muted-foreground">5x Faster Growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span className="text-muted-foreground">Premium Reach</span>
                </div>
              </div>
            </div>
            <Button
              onClick={onVerify}
              variant="default"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Boosting
              <Crown className="w-4 h-4 ml-2 text-yellow-300" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Payment Screen
  if (showPayment) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-2 sm:p-4">
        <Card className="w-full max-w-md border-2 border-green-500/50 bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
          <CardHeader className="text-center pb-4">
            <div className="relative mx-auto w-20 h-20 mb-4">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <CardTitle className="text-xl font-bold text-foreground mb-2">
              Account Verified Successfully!
            </CardTitle>
            <CardDescription className="text-sm">
              Complete your verification with a one-time fee
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Verification fee */}
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Banknote className="w-6 h-6 text-green-400" />
                  <span className="text-lg font-bold text-green-400">Account Verification Fee</span>
                </div>
                <div className="text-3xl font-black text-foreground mb-2">
                  KSH 20
                </div>
                <p className="text-xs text-muted-foreground">
                  One-time payment to activate premium features and continue boosting your account
                </p>
              </div>
              
              {/* Benefits reminder */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-card/30 rounded-lg p-3 text-center">
                  <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <div className="font-semibold text-blue-400">2,000+</div>
                  <div className="text-muted-foreground">Real Followers</div>
                </div>
                <div className="bg-card/30 rounded-lg p-3 text-center">
                  <Heart className="w-4 h-4 text-red-400 mx-auto mb-1" />
                  <div className="font-semibold text-red-400">100K+</div>
                  <div className="text-muted-foreground">Guaranteed Likes</div>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleCompletePayment}
                variant="default"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Complete Verification - KSH 20
                <Crown className="w-4 h-4 ml-2 text-yellow-300" />
              </Button>
              
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full hover:bg-red-500/10 hover:border-red-500/50 text-sm"
              >
                Cancel Verification
              </Button>
            </div>
            
            {/* Security note */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3 text-green-400" />
                <span>Secure payment • SSL encrypted • Money-back guarantee</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-2 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-2xl border-2 border-red-500/50 bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 hover:bg-red-500/20"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="text-center space-y-4">
            {/* Warning Icon */}
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Account Not Verified
              </CardTitle>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-semibold">@{username}</span>
                <Badge variant="destructive" className="text-xs">
                  UNVERIFIED
                </Badge>
              </div>
              <CardDescription className="text-sm sm:text-base">
                Verify account to enable people to follow your account
              </CardDescription>
            </div>

            {/* Current Stats */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div>
                  <div className="text-sm sm:text-lg font-bold text-red-400">{currentFollowers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Current Followers</div>
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-bold text-red-400">Limited</div>
                  <div className="text-xs text-muted-foreground">Growth Speed</div>
                </div>
                <div>
                  <div className="text-sm sm:text-lg font-bold text-red-400">Basic</div>
                  <div className="text-xs text-muted-foreground">Features</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6">
          {!showBenefits ? (
            <>
              {/* See Benefits Button */}
              <div className="text-center">
                <Button
                  onClick={() => setShowBenefits(true)}
                  variant="outline"
                  className="w-full border-primary/50 hover:bg-primary/10 h-10 sm:h-12 text-sm sm:text-base"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  See What Verified Accounts Get
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Back Button */}
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBenefits(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              </div>

              {/* Benefits Grid */}
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    🚀 Verified Account Benefits
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Join thousands of verified creators growing faster
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {verificationBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={cn(
                        "group p-3 sm:p-4 rounded-lg border border-card-border bg-card/30 hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-lg",
                        "animate-in slide-in-from-bottom-4 duration-300"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={cn("p-1.5 sm:p-2 rounded-lg bg-card/50 group-hover:scale-110 transition-transform", benefit.color)}>
                          <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-xs sm:text-sm text-foreground truncate">
                              {benefit.title}
                            </h4>
                            <Badge variant="secondary" className={cn("text-xs font-bold", benefit.color)}>
                              {benefit.value}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verify Button in Benefits View */}
                <div className="pt-4">
                  <Button
                    onClick={handleStartVerification}
                    variant="default"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12 sm:h-14 text-sm sm:text-base"
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Verify Account Now
                    <Crown className="w-4 h-4 ml-2 text-yellow-300" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons - Only show on main screen */}
          {!showBenefits && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 hover:bg-red-500/10 hover:border-red-500/50 h-10 sm:h-12 text-xs sm:text-sm"
              >
                Continue Unverified
                <span className="text-xs text-red-400 ml-2 hidden sm:inline">(Limited Growth)</span>
              </Button>
              <Button
                onClick={handleStartVerification}
                variant="default"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-10 sm:h-12 text-xs sm:text-sm"
              >
                <Unlock className="w-4 h-4 mr-2" />
                Verify Account Now
                <Crown className="w-4 h-4 ml-2 text-yellow-300" />
              </Button>
            </div>
          )}

          {/* Social Proof */}
          <div className="text-center pt-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full border-2 border-background flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                ))}
              </div>
              <span>12,847 creators verified today</span>
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
