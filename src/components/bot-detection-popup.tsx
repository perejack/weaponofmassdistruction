import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Users, Bot, X, RefreshCw, Zap, CheckCircle, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface BotDetectionPopupProps {
  isOpen: boolean
  onRetryTransfer: () => void
  onUseSecurity: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
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

const BotIcon = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 1
    }}
    className="absolute w-8 h-8 text-red-400"
  >
    <Bot className="w-full h-full" />
  </motion.div>
)

export function BotDetectionPopup({
  isOpen,
  onRetryTransfer,
  onUseSecurity,
  platform
}: BotDetectionPopupProps) {
  const [isScanning, setIsScanning] = useState(false)
  const config = platformConfig[platform]

  const handleRetry = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      onRetryTransfer()
    }, 3000)
  }

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

          {/* Floating Bot Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <BotIcon delay={i * 0.2} />
              </div>
            ))}
          </div>

          {/* Main Popup */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative z-10 w-full max-w-2xl"
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-red-900/40 via-orange-900/40 to-yellow-900/40 backdrop-blur-xl">
              {/* Warning Animation Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 70% 60%, rgba(245, 101, 101, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0"
                />
              </div>

              <CardContent className="relative p-8">
                {/* Warning Header */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mx-auto mb-4 w-20 h-20 flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg border-4 border-yellow-400">
                      <AlertTriangle className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">
                      🚨 Security Alert! 🚨
                    </h2>
                    <p className="text-xl text-red-200 font-semibold">
                      Bot Followers Detected
                    </p>
                  </motion.div>
                </div>

                {/* Detection Details */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 p-6 bg-red-500/20 border-2 border-red-500/50 rounded-xl backdrop-blur-sm"
                >
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-red-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Security Scan Results</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <span className="text-white font-medium">Bot Accounts Detected:</span>
                      <Badge className="bg-red-500 text-white border-0 px-3 py-1">
                        <Bot className="w-4 h-4 mr-1" />
                        4 Accounts
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <span className="text-white font-medium">Risk Level:</span>
                      <Badge className="bg-orange-500 text-white border-0 px-3 py-1">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        High Risk
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <span className="text-white font-medium">Transfer Status:</span>
                      <Badge className="bg-yellow-500 text-black border-0 px-3 py-1">
                        <X className="w-4 h-4 mr-1" />
                        Blocked at 95%
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Warning Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl"
                >
                  <p className="text-yellow-100 text-center">
                    <AlertTriangle className="w-5 h-5 inline mr-2 text-yellow-400" />
                    Our security software has detected that your account is currently being followed by 
                    <span className="font-bold text-yellow-300"> 4 bot accounts</span> (non-real users). 
                    Please unfollow these bot followers so that the transfer can complete successfully.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-4"
                >
                  {/* Manual Retry Button */}
                  <Button
                    onClick={handleRetry}
                    disabled={isScanning}
                    className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    {isScanning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </motion.div>
                        Scanning Account...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        I Have Unfollowed - Try Transfer Again
                      </>
                    )}
                  </Button>

                  {/* Premium Security Software Button */}
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(34, 197, 94, 0.3)",
                          "0 0 30px rgba(34, 197, 94, 0.6)",
                          "0 0 20px rgba(34, 197, 94, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-lg"
                    />
                    
                    <Button
                      onClick={onUseSecurity}
                      className="relative w-full py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg transform transition-all duration-200 hover:scale-105"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Use Our Security Software to Remove Bot Followers
                      <Zap className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  {/* Benefits List */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                  >
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-400" />
                      Premium Security Benefits:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        Instantly removes all bot and fake followers
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        Protects your account from future bot attacks
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        Helps you monetize with real, engaged followers
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        Completes your follower transfer immediately
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
