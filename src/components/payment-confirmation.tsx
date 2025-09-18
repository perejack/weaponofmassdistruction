import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CreditCard, Shield, Zap, Lock, Users, Crown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { trackConversion } from "@/lib/google-analytics"

interface PaymentConfirmationProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
  amount: string
}

const platformConfig = {
  tiktok: {
    name: "TikTok",
    color: "from-pink-500 to-red-500",
    icon: "🎵"
  },
  instagram: {
    name: "Instagram", 
    color: "from-purple-500 to-pink-500",
    icon: "📸"
  },
  youtube: {
    name: "YouTube",
    color: "from-red-500 to-orange-500", 
    icon: "📺"
  },
  facebook: {
    name: "Facebook",
    color: "from-blue-500 to-indigo-500",
    icon: "👥"
  }
}

export function PaymentConfirmation({
  isOpen,
  onConfirm,
  onCancel,
  platform,
  amount
}: PaymentConfirmationProps) {
  const [countdown, setCountdown] = useState(30)
  const config = platformConfig[platform]

  useEffect(() => {
    if (!isOpen) return
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Main Confirmation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative z-10 w-full max-w-sm mx-2 sm:max-w-md"
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-xl">
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0"
                />
              </div>

              <CardContent className="relative p-4 sm:p-6">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mx-auto mb-3 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
                      <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-xl font-bold text-white mb-2">
                    Confirm Payment
                  </h2>
                  <p className="text-sm text-gray-300">
                    Activate Premium Security
                  </p>
                </div>

                {/* Payment Details */}
                <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-sm">Service:</span>
                    <span className="text-white text-sm">Premium Security</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-sm">Platform:</span>
                    <Badge className={cn(
                      "text-white border-0 text-xs",
                      `bg-gradient-to-r ${config.color}`
                    )}>
                      {config.icon} {config.name}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-sm">Amount:</span>
                    <span className="text-xl font-bold text-green-400">{amount}</span>
                  </div>
                  
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-white">Total:</span>
                      <span className="text-xl font-bold text-green-400">{amount}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits Reminder */}
                <div className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <h3 className="text-white font-semibold mb-2 flex items-center text-sm">
                    <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                    What You Get:
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      Remove all bot followers
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      Complete transfer immediately
                    </div>
                  </div>
                </div>

                {/* Urgency Timer */}
                <motion.div
                  animate={{ 
                    scale: countdown <= 10 ? [1, 1.05, 1] : 1,
                    color: countdown <= 10 ? ["#ffffff", "#ef4444", "#ffffff"] : "#ffffff"
                  }}
                  transition={{ duration: 0.5, repeat: countdown <= 10 ? Infinity : 0 }}
                  className="text-center mb-6 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg"
                >
                  <p className="text-white font-medium text-sm">
                    <Sparkles className="w-4 h-4 inline mr-2 text-yellow-400" />
                    Expires in: <span className="font-bold text-lg">{countdown}s</span>
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button
                    onClick={() => {
                      // Track Google Analytics conversion
                      const numericAmount = parseFloat(amount.replace(/[^\d.]/g, ''))
                      trackConversion(numericAmount, 'KES')
                      onConfirm()
                    }}
                    className="w-full py-3 text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Confirm - {amount}
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={onCancel}
                    className="w-full text-gray-400 hover:text-white hover:bg-white/10 text-sm"
                  >
                    Cancel
                  </Button>
                </div>

                {/* Security Indicators */}
                <div className="flex justify-center items-center space-x-3 mt-4 text-xs text-gray-400">
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-1" />
                    Secure
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    50K+ Users
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
