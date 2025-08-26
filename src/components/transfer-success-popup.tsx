import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Users, Sparkles, Crown, Star, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransferSuccessPopupProps {
  isOpen: boolean
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

// Confetti component
const ConfettiPiece = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: -100 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, 300],
      x: [0, Math.random() * 200 - 100],
      rotate: [0, 360]
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 2
    }}
    className={`absolute w-3 h-3 ${
      Math.random() > 0.5 ? 'bg-yellow-400' : 
      Math.random() > 0.5 ? 'bg-green-400' : 'bg-blue-400'
    } rounded-full`}
  />
)

export function TransferSuccessPopup({
  isOpen,
  onClose,
  platform
}: TransferSuccessPopupProps) {
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

          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <ConfettiPiece key={i} delay={i * 0.1} />
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
            <Card className={cn(
              "relative overflow-hidden border-0 shadow-2xl",
              `bg-gradient-to-br ${config.bgGradient} backdrop-blur-xl`
            )}>
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-r from-white/5 to-transparent rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-r from-white/5 to-transparent rounded-full"
                />
              </div>

              <CardContent className="relative p-4 sm:p-6 text-center">
                {/* Trophy Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
                  className="mx-auto mb-4 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                >
                  <div className={cn(
                    "w-full h-full rounded-full flex items-center justify-center",
                    `bg-gradient-to-r ${config.color} shadow-lg`
                  )}>
                    <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4"
                >
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                    🎉 Success! 🎉
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-200 font-medium">
                    Follower Transfer Complete!
                  </p>
                </motion.div>

                {/* Success Details */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
                >
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                    <span className="text-lg font-bold text-white">Transfer Complete!</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center text-gray-300">
                      <Shield className="w-4 h-4 mr-2 text-green-400" />
                      All bots removed successfully
                    </div>
                    <div className="flex items-center justify-center text-gray-300">
                      <Users className="w-4 h-4 mr-2 text-blue-400" />
                      Real followers transferred
                    </div>
                  </div>
                </motion.div>

                {/* Timeline Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mb-6 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg"
                >
                  <h3 className="text-white font-semibold mb-2 flex items-center justify-center text-sm">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                    Account Update Timeline
                  </h3>
                  <p className="text-blue-100 text-xs">
                    Your {config.name} account will reflect the new followers within <span className="font-bold text-blue-300">24 hours</span>
                  </p>
                </motion.div>

                {/* Achievement Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap justify-center gap-2 mb-6"
                >
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-2 py-1 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Bot-Free Account
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 px-2 py-1 text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium Protected
                  </Badge>
                </motion.div>

                {/* Final Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mb-6 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <p className="text-white text-sm">
                    <Trophy className="w-4 h-4 inline mr-2 text-yellow-400" />
                    Congratulations! Your account is now secured with real, engaged followers.
                  </p>
                </motion.div>

                {/* Close Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <Button
                    onClick={onClose}
                    className={cn(
                      "w-full py-3 text-base font-semibold text-white border-0 shadow-lg transform transition-all duration-200 hover:scale-105",
                      `bg-gradient-to-r ${config.color} hover:shadow-xl`
                    )}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
