import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Sparkles, Trophy, Star, Zap, Users, TrendingUp, Crown, Gift, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

interface CongratulationsPopupProps {
  isOpen: boolean
  onClose: () => void
  onStartTransfer: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
  followersGained: number
  currentFollowers: number
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

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 400 - 200],
      y: [0, Math.random() * 400 - 200],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2
    }}
  />
)

export function CongratulationsPopup({
  isOpen,
  onClose,
  onStartTransfer,
  platform,
  followersGained,
  currentFollowers
}: CongratulationsPopupProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const config = platformConfig[platform]

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Floating Particles */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.1} />
              ))}
            </div>
          )}

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
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-white/10 to-transparent rounded-full"
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
                    🎉 Congratulations! 🎉
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-200 font-medium">
                    Your {config.name} boost is complete!
                  </p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 gap-3 mb-6"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-lg sm:text-xl font-bold text-white">+{followersGained.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-300">New Followers</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-400 mr-1" />
                      <span className="text-lg sm:text-xl font-bold text-white">{currentFollowers.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-300">Total Followers</p>
                  </div>
                </motion.div>

                {/* Achievement Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap justify-center gap-2 mb-6"
                >
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-2 py-1 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Growth Master
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-2 py-1 text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Influencer Status
                  </Badge>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-6 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
                >
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-base font-semibold text-white">Boost Complete!</span>
                  </div>
                  <p className="text-gray-300 text-xs">
                    Engagement increased by 340%!
                  </p>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="space-y-4"
                >
                  <p className="text-gray-200 mb-4 text-sm">
                    <Sparkles className="w-4 h-4 inline mr-2 text-yellow-400" />
                    Ready to transfer followers?
                  </p>
                  
                  <Button
                    onClick={onStartTransfer}
                    className={cn(
                      "w-full py-3 text-base font-semibold text-white border-0 shadow-lg transform transition-all duration-200 hover:scale-105",
                      `bg-gradient-to-r ${config.color} hover:shadow-xl`
                    )}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Finish
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="w-full text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    Close
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
