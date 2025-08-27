import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone, 
  CreditCard, 
  CheckCircle, 
  Loader2, 
  ArrowLeft, 
  Shield, 
  Clock, 
  AlertCircle,
  X,
  Zap,
  Timer,
  Phone,
  Lock,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface RechargePaymentProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  packageInfo: {
    name: string
    price: string
    followers: string
    gradient: string
  }
  platform: 'tiktok' | 'instagram' | 'facebook' | 'youtube'
}

export function RechargePayment({ isOpen, onClose, onSuccess, packageInfo, platform }: RechargePaymentProps) {
  const [step, setStep] = useState<'phone' | 'payment' | 'code' | 'success'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const [paymentReference, setPaymentReference] = useState<string | null>(null)
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null)
  const [codeTimer, setCodeTimer] = useState<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // API URL - Use Netlify functions
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://survaypay75.netlify.app/.netlify/functions'

  const platformConfig = {
    tiktok: {
      name: "TikTok",
      icon: "🎵",
      color: "from-pink-500 to-red-500"
    },
    instagram: {
      name: "Instagram", 
      icon: "📸",
      color: "from-purple-500 to-pink-500"
    },
    facebook: {
      name: "Facebook",
      icon: "👥", 
      color: "from-blue-500 to-indigo-500"
    },
    youtube: {
      name: "YouTube",
      icon: "🎬",
      color: "from-red-500 to-orange-500"
    }
  }

  const config = platformConfig[platform]

  // Format phone number for Kenyan format
  const formatPhoneNumber = (input: string) => {
    // Remove non-digit characters
    let cleaned = input.replace(/\D/g, '')
    
    // Format for Kenya number
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1)
    }
    
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1)
    }
    
    if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned
    }
    
    return cleaned
  }

  // Validate Kenyan phone number
  const validatePhoneNumber = (phoneNumber: string) => {
    const formatted = formatPhoneNumber(phoneNumber)
    return formatted.length === 12 && formatted.startsWith('254')
  }

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setStep('phone')
      setPhoneNumber('')
      setVerificationCode('')
      setError('')
      setCountdown(0)
      setPaymentReference(null)
      if (pollInterval) clearInterval(pollInterval)
      if (codeTimer) clearTimeout(codeTimer)
    }
  }, [isOpen])

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [countdown])

  // Cleanup polling and timers on unmount
  useEffect(() => {
    return () => {
      if (pollInterval) clearInterval(pollInterval)
      if (codeTimer) clearTimeout(codeTimer)
    }
  }, [pollInterval, codeTimer])

  const handlePhoneSubmit = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Kenyan phone number')
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number",
        variant: "destructive"
      })
      return
    }

    setError('')
    setIsLoading(true)
    setStep('payment')
    setCountdown(25)
    
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)
      const amount = parseInt(packageInfo.price)
      
      const response = await fetch(`${API_URL}/initiate-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          userId: 'boost-user',
          amount: amount,
          description: `${packageInfo.name} - ${config.name} Boost`
        })
      })

      const data = await response.json()

      if (data.success && data.data.externalReference) {
        setPaymentReference(data.data.externalReference)
        
        toast({
          title: "STK Push Sent",
          description: "Please complete the payment on your phone",
        })
        
        // Start polling for payment status and code timer
        startPolling(data.data.externalReference)
        startCodeTimer()
      } else {
        setIsLoading(false)
        setError('Failed to initiate payment')
        toast({
          title: "Payment Failed",
          description: data.message || "Failed to initiate payment",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Payment initiation error:', error)
      setIsLoading(false)
      setError('Network error. Please try again.')
      toast({
        title: "Network Error",
        description: "Please check your connection and try again",
        variant: "destructive"
      })
    }
  }

  // Poll for payment status
  const startPolling = (reference: string) => {
    if (pollInterval) {
      clearInterval(pollInterval)
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/payment-status/${reference}`)
        const data = await response.json()
        
        if (data.success && data.payment) {
          const status = data.payment.status?.toUpperCase();
          if (status === 'SUCCESS' || status === 'COMPLETE' || status === 'COMPLETED' || status === '0' || data.payment.mpesaReceiptNumber) {
            clearInterval(interval)
            setIsLoading(false)
            setStep('success')
            
            toast({
              title: "Payment Successful!",
              description: "Your boost has been activated. Returning to boost screen...",
            })
            
            // Auto close and trigger success after showing success screen
            setTimeout(() => {
              onSuccess()
              onClose()
            }, 2000)
          } else if (data.payment.status === 'FAILED') {
            clearInterval(interval)
            setIsLoading(false)
            setError('Payment failed. Please try again.')
            
            toast({
              title: "Payment Failed",
              description: "Transaction was not completed. Please try again.",
              variant: "destructive"
            })
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error)
      }
    }, 5000) // Check every 5 seconds

    setPollInterval(interval)
  }

  // Start extended timer for automatic payment detection
  const startCodeTimer = () => {
    const timer = setTimeout(() => {
      setCountdown(0)
      // Continue polling - no manual code entry needed
      // Payment will be detected automatically when successful
    }, 25000) // 25 seconds
    
    setCodeTimer(timer)
  }

  const handlePaymentComplete = () => {
    // Continue automatic polling - no manual intervention needed
    setCountdown(0)
  }

  // Validate transaction code
  const validateTransactionCode = (code: string) => {
    return code.length >= 7 && code.toUpperCase().startsWith('T')
  }

  const handleCodeSubmit = async () => {
    if (!validateTransactionCode(verificationCode)) {
      setError('Please enter a valid M-Pesa transaction code')
      toast({
        title: "Invalid Code",
        description: "Please enter a valid M-Pesa transaction code",
        variant: "destructive"
      })
      return
    }

    setError('')
    setIsLoading(true)

    try {
      // Simulate code verification (in real app, you'd verify with your backend)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsLoading(false)
      setStep('success')
      
      toast({
        title: "Transaction Verified!",
        description: "Your boost has been activated. Returning to boost screen...",
      })
      
      // Auto close and trigger success after showing success screen
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      setError('Verification failed. Please try again.')
      toast({
        title: "Verification Failed",
        description: "Please check your code and try again",
        variant: "destructive"
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[9999] p-2 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md border-2 border-emerald-500/50 bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-500 relative overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-2 top-2 hover:bg-red-500/20 z-10"
        >
          <X className="w-4 h-4" />
        </Button>

        {step !== 'success' && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (step === 'code') setStep('payment')
              else if (step === 'payment') setStep('phone')
              else onClose()
            }}
            className="absolute left-2 top-2 hover:bg-muted/20 z-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}

        {/* Phone Number Step */}
        {step === 'phone' && (
          <>
            <CardHeader className="text-center pb-4 relative z-10 px-4 sm:px-6">
              <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse opacity-75" />
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <Badge className={cn("bg-gradient-to-r text-white font-bold px-3 py-1 text-xs sm:text-sm", packageInfo.gradient)}>
                  {packageInfo.name} - KSH {packageInfo.price}
                </Badge>
                
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                  Enter M-Pesa Number
                </CardTitle>
                
                <CardDescription className="text-sm leading-relaxed">
                  Enter your M-Pesa phone number to complete your {config.name} boost purchase
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10 px-4 sm:px-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  Phone Number
                </label>
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="0712345678"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value)
                      setError('')
                    }}
                    className="pl-12 h-12 text-base border-2 border-emerald-500/30 focus:border-emerald-500 bg-background/50"
                    maxLength={10}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +254
                  </div>
                </div>
                {error && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">Secure Payment</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your payment is processed securely through Safaricom M-Pesa. You'll receive an STK push notification.
                </p>
              </div>

              <Button
                onClick={handlePhoneSubmit}
                disabled={isLoading || !phoneNumber}
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Continue to Payment
                  </>
                )}
              </Button>
            </CardContent>
          </>
        )}

        {/* Payment Processing Step */}
        {step === 'payment' && (
          <>
            <CardHeader className="text-center pb-4 relative z-10 px-4 sm:px-6">
              <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-ping opacity-75" />
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 text-xs sm:text-sm animate-pulse">
                  📱 STK PUSH SENT
                </Badge>
                
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                  Complete Payment on Your Phone
                </CardTitle>
                
                <CardDescription className="text-sm leading-relaxed">
                  Check your phone for the M-Pesa payment request and enter your PIN
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10 px-4 sm:px-6">
              <div className="text-center space-y-3">
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Timer className="w-5 h-5 text-blue-400" />
                    <span className="text-lg font-bold text-blue-400">
                      {countdown > 0 ? `${countdown}s` : 'Processing...'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {countdown > 0 
                      ? 'Waiting for payment confirmation...' 
                      : 'Payment received! Preparing verification...'
                    }
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Amount:</span>
                    <span className="font-bold">KSH {packageInfo.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Package:</span>
                    <span className="font-bold">{packageInfo.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Phone:</span>
                    <span className="font-bold">+254{phoneNumber}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-xs text-muted-foreground text-center">
                  Payment will be detected automatically. Please wait...
                </p>
              </div>
            </CardContent>
          </>
        )}


        {/* Success Step */}
        {step === 'success' && (
          <>
            <CardHeader className="text-center pb-4 relative z-10 px-4 sm:px-6">
              <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-75" />
                <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-bounce" />
                </div>
              </div>

              <div className="space-y-2">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-1 text-sm animate-pulse">
                  ✅ PAYMENT SUCCESSFUL
                </Badge>
                
                <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  Boost Activated!
                </CardTitle>
                
                <CardDescription className="text-sm leading-relaxed">
                  Your {config.name} boost has been successfully recharged and will continue automatically
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10 px-4 sm:px-6">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                <div className="space-y-2">
                  <div className={cn("text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent", packageInfo.gradient)}>
                    +{packageInfo.followers} followers
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Will be delivered over the next 30 minutes
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                <span>Returning to boost dashboard...</span>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
