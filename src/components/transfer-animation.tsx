import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Users, Shield, Zap, CheckCircle, ArrowRight, Download, Upload, Wifi, Server } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransferAnimationProps {
  isOpen: boolean
  onBotDetected: () => void
  onTransferComplete: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
  followersToTransfer: number
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

const DataPacket = ({ delay, direction }: { delay: number; direction: "up" | "down" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: direction === "up" ? [-20, -100] : [20, 100]
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 1
    }}
    className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
  />
)

export function TransferAnimation({
  isOpen,
  onBotDetected,
  onTransferComplete,
  platform,
  followersToTransfer
}: TransferAnimationProps) {
  const [transferProgress, setTransferProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("initializing")
  const [transferredCount, setTransferredCount] = useState(0)
  const config = platformConfig[platform]

  const steps = [
    { id: "initializing", label: "Initializing secure connection...", duration: 2000 },
    { id: "authenticating", label: "Authenticating with platform servers...", duration: 3000 },
    { id: "scanning", label: "Scanning follower database...", duration: 2000 },
    { id: "transferring", label: "Transferring followers to your account...", duration: 0 } // Dynamic duration
  ]

  useEffect(() => {
    if (!isOpen) return

    let timeoutId: NodeJS.Timeout
    let intervalId: NodeJS.Timeout

    const runSteps = async () => {
      for (const step of steps) {
        setCurrentStep(step.id)
        
        if (step.id === "transferring") {
          // Start the transfer animation (1% every 1 second)
          intervalId = setInterval(() => {
            setTransferProgress(prev => {
              const next = prev + 1
              setTransferredCount(Math.floor((next / 100) * followersToTransfer))
              
              if (next >= 95) {
                clearInterval(intervalId)
                // Trigger bot detection at 95%
                setTimeout(() => onBotDetected(), 1000)
                return 95
              }
              
              if (next >= 100) {
                clearInterval(intervalId)
                setTimeout(() => onTransferComplete(), 1000)
                return 100
              }
              
              return next
            })
          }, 1000) // 1% every 1 second
          return
        } else {
          await new Promise(resolve => {
            timeoutId = setTimeout(resolve, step.duration)
          })
        }
      }
    }

    runSteps()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [isOpen, followersToTransfer, onBotDetected, onTransferComplete])

  const getCurrentStepLabel = () => {
    const step = steps.find(s => s.id === currentStep)
    return step?.label || "Processing..."
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Main Transfer Interface */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-sm mx-2 sm:max-w-md"
          >
            <Card className={cn(
              "relative overflow-hidden border-0 shadow-2xl",
              `bg-gradient-to-br ${config.bgGradient} backdrop-blur-xl`
            )}>
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 40% 50%, rgba(120, 255, 198, 0.3) 0%, transparent 50%)"
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
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mx-auto mb-3 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center"
                  >
                    <div className={cn(
                      "w-full h-full rounded-full flex items-center justify-center",
                      `bg-gradient-to-r ${config.color} shadow-lg`
                    )}>
                      <Download className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Transferring Followers
                  </h2>
                  <p className="text-sm text-gray-300">
                    {followersToTransfer.toLocaleString()} to {config.name}
                  </p>
                </div>

                {/* Connection Visualization */}
                <div className="relative mb-6 h-20 sm:h-24 flex items-center justify-center">
                  {/* Server Icon */}
                  <div className="absolute left-4 sm:left-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg"
                    >
                      <Server className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                    <p className="text-xs text-center text-gray-300 mt-1">Servers</p>
                  </div>

                  {/* Data Flow Animation */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full flex flex-col justify-center">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                    />
                    {Array.from({ length: 5 }).map((_, i) => (
                      <DataPacket key={i} delay={i * 0.3} direction={i % 2 === 0 ? "up" : "down"} />
                    ))}
                  </div>

                  {/* Your Account Icon */}
                  <div className="absolute right-4 sm:right-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className={cn(
                        "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-lg",
                        `bg-gradient-to-r ${config.color}`
                      )}
                    >
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                    <p className="text-xs text-center text-gray-300 mt-1">Account</p>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base font-semibold text-white">Progress</span>
                    <span className="text-xl font-bold text-white">{transferProgress}%</span>
                  </div>
                  
                  <div className="relative">
                    <Progress 
                      value={transferProgress} 
                      className="h-3 bg-white/20"
                    />
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{ width: `${transferProgress}%` }}
                      animate={{ 
                        boxShadow: [
                          "0 0 10px rgba(34, 197, 94, 0.5)",
                          "0 0 20px rgba(34, 197, 94, 0.8)",
                          "0 0 10px rgba(34, 197, 94, 0.5)"
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-base font-bold text-white">{transferredCount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-300 text-center">Transferred</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="flex items-center justify-center mb-1">
                      <Wifi className="w-4 h-4 text-blue-400 mr-1" />
                      <span className="text-base font-bold text-white">Secure</span>
                    </div>
                    <p className="text-xs text-gray-300 text-center">Connection</p>
                  </div>
                </div>

                {/* Current Step */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-3"
                  >
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                  <span className="text-white font-medium text-sm">{getCurrentStepLabel()}</span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
