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
import { trackConversion } from "@/lib/google-analytics"

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
  const [step, setStep] = useState<'phone' | 'payment' | 'success'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [paymentReference, setPaymentReference] = useState<string | null>(null)
  const [paymentStep, setPaymentStep] = useState<'input' | 'processing' | 'success'>('input')
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
      setError('')
      setPaymentReference(null)
      setPaymentStep('input')
    }
  }, [isOpen])

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
    setPaymentStep('processing')
    
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)
      const amount = parseInt(packageInfo.price)
      
      const response = await fetch('/.netlify/functions/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: amount,
          description: `${packageInfo.name} - ${config.name} Boost Recharge`
        })
      })

      const data = await response.json()

      if (data.success) {
        const requestId = data.data.checkoutRequestId || data.data.externalReference
        setPaymentReference(requestId)
        
        // Start polling for payment status
        pollPaymentStatus(requestId)
      } else {
        throw new Error(data.message || 'Failed to initiate payment')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setError(error.message || 'Failed to initiate payment')
      setIsLoading(false)
      setPaymentStep('input')
      setStep('phone')
    }
  }

  const pollPaymentStatus = async (requestId) => {
    let attempts = 0
    const maxAttempts = 50 // Poll for up to 50 attempts (25 seconds at 0.5s intervals)
    
    const checkStatus = async () => {
      try {
        const response = await fetch(`/.netlify/functions/payment-status/${requestId}`)
        const data = await response.json()
        
        if (data.success && data.payment) {
          if (data.payment.status === 'SUCCESS') {
            setPaymentStep('success')
            setIsLoading(false)
            
            // Track Google Analytics conversion
            const amount = parseInt(packageInfo.price)
            trackConversion(amount, 'KES', requestId)
            
            // After 2 seconds, trigger success callback
            setTimeout(() => {
              setStep('success')
              toast({
                title: "Payment Successful!",
                description: "Your boost has been recharged successfully!",
              })
              
              // Auto close and trigger success after showing success screen
              setTimeout(() => {
                onSuccess()
                onClose()
              }, 2000)
            }, 2000)
            return
          } else if (data.payment.status === 'FAILED') {
            throw new Error(data.payment.resultDesc || 'Payment failed')
          }
        }
        
        // Continue polling if still pending
        attempts++
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 500) // Check every 0.5 seconds
        } else {
          throw new Error('Payment timeout - please try again')
        }
      } catch (error) {
        console.error('Status check error:', error)
        setError(error.message || 'Payment verification failed')
        setIsLoading(false)
        setPaymentStep('input')
        setStep('phone')
      }
    }
    
    checkStatus()
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
              if (step === 'payment') setStep('phone')
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
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value)
                      setError('')
                    }}
                    className="h-12 text-base border-2 border-emerald-500/30 focus:border-emerald-500 bg-background/50"
                    maxLength={10}
                  />
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
                {paymentStep === 'processing' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-ping opacity-75" />
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                      <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin" />
                    </div>
                  </>
                )}
                {paymentStep === 'success' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-75" />
                    <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {paymentStep === 'processing' && (
                  <>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 text-xs sm:text-sm animate-pulse">
                      📱 STK PUSH SENT
                    </Badge>
                    
                    <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                      Processing Payment
                    </CardTitle>
                    
                    <CardDescription className="text-sm leading-relaxed">
                      Check your phone for M-Pesa prompt
                    </CardDescription>
                  </>
                )}
                {paymentStep === 'success' && (
                  <>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-3 py-1 text-xs sm:text-sm">
                      ✅ PAYMENT SUCCESSFUL
                    </Badge>
                    
                    <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                      Payment Successful!
                    </CardTitle>
                    
                    <CardDescription className="text-sm leading-relaxed">
                      Completing boost recharge...
                    </CardDescription>
                  </>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10 px-4 sm:px-6">
              {paymentStep === 'processing' && (
                <div className="text-center space-y-3">
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-xs text-blue-100">
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      Enter your M-Pesa PIN when prompted
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
                  
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs text-red-400">
                        {error}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {paymentStep === 'success' && (
                <div className="text-center space-y-3">
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-xs text-green-100">
                      Please wait while we activate your boost recharge
                    </p>
                  </div>
                </div>
              )}
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
