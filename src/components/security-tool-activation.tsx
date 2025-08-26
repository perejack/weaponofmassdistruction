import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Lock, CheckCircle, Star, Crown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface SecurityToolActivationProps {
  isOpen: boolean
  onActivate: () => void
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

export function SecurityToolActivation({
  isOpen,
  onActivate,
  onClose,
  platform
}: SecurityToolActivationProps) {
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

          {/* Floating Security Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 200 - 100]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className={`absolute ${
                  i % 4 === 0 ? 'top-10 left-10' :
                  i % 4 === 1 ? 'top-10 right-10' :
                  i % 4 === 2 ? 'bottom-10 left-10' : 'bottom-10 right-10'
                }`}
              >
                <Shield className="w-8 h-8 text-green-400" />
              </motion.div>
            ))}
          </div>

          {/* Main Popup */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
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
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="mx-auto mb-3 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg border-4 border-white/20">
                      <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      🛡️ Activate Security Tool
                    </h1>
                    <p className="text-sm text-gray-300">
                      Professional bot removal for {config.name}
                    </p>
                  </motion.div>
                </div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 space-y-3"
                >
                  <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-white text-sm font-medium">Remove all bot followers instantly</span>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                    <span className="text-white text-sm font-medium">Complete transfer immediately</span>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <Lock className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="text-white text-sm font-medium">Lifetime account protection</span>
                  </div>
                </motion.div>

                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30"
                >
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-yellow-300 font-bold text-sm">PREMIUM SECURITY TOOL</span>
                    <Crown className="w-5 h-5 text-yellow-400 ml-2" />
                  </div>
                  <div className="flex justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
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
                      onClick={onActivate}
                      className="relative w-full py-3 text-base font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg transform transition-all duration-200 hover:scale-105"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Activate Security Tool
                      <Zap className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="w-full text-gray-400 hover:text-white hover:bg-white/10 text-sm"
                  >
                    Maybe Later
                  </Button>
                </motion.div>

                {/* Trust Indicators */}
                <div className="flex justify-center items-center space-x-4 pt-4 text-xs text-gray-400">
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-1" />
                    Secure
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Trusted
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Guaranteed
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
