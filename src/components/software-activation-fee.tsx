import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Zap, CheckCircle, AlertTriangle, Sparkles, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SoftwareActivationFeeProps {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
}

const platformConfig = {
  tiktok: {
    name: "TikTok",
    color: "from-pink-500 to-red-500",
    icon: "🎵",
    bgGradient: "from-pink-500/20 via-purple-500/20 to-red-500/20"
  },
  instagram: {
    name: "Instagram", 
    color: "from-purple-500 to-pink-500",
    icon: "📸",
    bgGradient: "from-purple-500/20 via-pink-500/20 to-orange-500/20"
  },
  youtube: {
    name: "YouTube",
    color: "from-red-500 to-orange-500", 
    icon: "📺",
    bgGradient: "from-red-500/20 via-orange-500/20 to-yellow-500/20"
  },
  facebook: {
    name: "Facebook",
    color: "from-blue-500 to-indigo-500",
    icon: "👥", 
    bgGradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20"
  }
}

export function SoftwareActivationFee({
  isOpen,
  onConfirm,
  onClose,
  platform
}: SoftwareActivationFeeProps) {
  const config = platformConfig[platform]

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

          {/* Main Popup */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative z-10 w-full max-w-sm mx-2 sm:max-w-md"
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-green-900/40 backdrop-blur-xl">
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 70% 60%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0"
                />
              </div>

              <CardContent className="relative p-4 sm:p-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mx-auto mb-3 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg border-4 border-white/20">
                      <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Software Activation
                  </h2>
                  <p className="text-sm text-gray-300">
                    One-time security software fee
                  </p>
                </div>

                {/* Fee Details */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-green-400">120 KSH</span>
                    </div>
                    <p className="text-gray-300 text-sm">One-time software security fee</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Service:</span>
                      <span className="text-white">Bot Removal Tool</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Platform:</span>
                      <Badge className={cn(
                        "text-white border-0 text-xs",
                        `bg-gradient-to-r ${config.color}`
                      )}>
                        {config.icon} {config.name}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Fee Type:</span>
                      <span className="text-green-400 font-semibold">One-time only</span>
                    </div>
                  </div>
                </motion.div>

                {/* What You Get */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
                >
                  <h3 className="text-white font-semibold mb-2 flex items-center text-sm">
                    <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                    What Happens Next:
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      Activate software & remove all bots
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      Complete new real followers transfer
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      Account reflects within 24hrs
                    </div>
                  </div>
                </motion.div>

                {/* Warning */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg"
                >
                  <p className="text-orange-100 text-center text-xs">
                    <AlertTriangle className="w-4 h-4 inline mr-2 text-orange-400" />
                    This fee will be charged to activate the software and remove bots
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(34, 197, 94, 0.4)",
                          "0 0 40px rgba(34, 197, 94, 0.8)",
                          "0 0 20px rgba(34, 197, 94, 0.4)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-lg"
                    />
                    
                    <Button
                      onClick={onConfirm}
                      className="relative w-full py-3 text-base font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg transform transition-all duration-200 hover:scale-105"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Confirm - Pay 120 KSH
                      <Sparkles className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="w-full text-gray-400 hover:text-white hover:bg-white/10 text-sm"
                  >
                    Cancel
                  </Button>
                </motion.div>

                {/* Security Indicators */}
                <div className="flex justify-center items-center space-x-3 mt-4 text-xs text-gray-400">
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure Payment
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    M-Pesa Safe
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
