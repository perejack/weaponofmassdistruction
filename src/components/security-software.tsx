import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Zap, CheckCircle, Star, Crown, Users, TrendingUp, DollarSign, Lock, Bot, AlertTriangle, Sparkles, Target, Rocket, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface SecuritySoftwareProps {
  isOpen: boolean
  onActivate: () => void
  onClose: () => void
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

const FloatingIcon = ({ icon: Icon, delay, color }: { icon: any; delay: number; color: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: -180 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      x: [0, Math.random() * 200 - 100],
      y: [0, Math.random() * 200 - 100]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3
    }}
    className={`absolute w-8 h-8 ${color}`}
  >
    <Icon className="w-full h-full" />
  </motion.div>
)

export function SecuritySoftware({
  isOpen,
  onActivate,
  onClose,
  platform
}: SecuritySoftwareProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const config = platformConfig[platform]

  const features = [
    {
      icon: Shield,
      title: "Advanced Bot Detection",
      description: "AI-powered system identifies and removes fake followers instantly",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Real Follower Verification",
      description: "Ensures all your followers are genuine, active users",
      color: "text-green-400"
    },
    {
      icon: DollarSign,
      title: "Monetization Boost",
      description: "Higher engagement rates = more brand deals and revenue",
      color: "text-yellow-400"
    },
    {
      icon: TrendingUp,
      title: "Viral Content Amplification",
      description: "Real followers share and engage, boosting your reach",
      color: "text-purple-400"
    },
    {
      icon: Lock,
      title: "Account Protection",
      description: "24/7 monitoring prevents future bot attacks",
      color: "text-red-400"
    },
    {
      icon: Rocket,
      title: "Growth Acceleration",
      description: "Clean follower base attracts more organic growth",
      color: "text-cyan-400"
    }
  ]

  const benefits = [
    { icon: CheckCircle, text: "Remove all bot followers instantly", value: "100%" },
    { icon: Shield, text: "Protect from future bot attacks", value: "24/7" },
    { icon: TrendingUp, text: "Increase engagement rates", value: "+340%" },
    { icon: DollarSign, text: "Boost monetization potential", value: "+500%" },
    { icon: Star, text: "Improve algorithm ranking", value: "Top 1%" },
    { icon: Users, text: "Attract real, engaged followers", value: "Organic" }
  ]

  useEffect(() => {
    if (!isOpen) return
    
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isOpen, features.length])

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

          {/* Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => {
              const icons = [Shield, Users, DollarSign, TrendingUp, Lock, Rocket, Star, Crown, Zap]
              const colors = ["text-blue-400", "text-green-400", "text-yellow-400", "text-purple-400", "text-red-400", "text-cyan-400"]
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  <FloatingIcon 
                    icon={icons[Math.floor(Math.random() * icons.length)]}
                    delay={i * 0.3}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                  />
                </div>
              )
            })}
          </div>

          {/* Main Software Interface */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl">
              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
                      "radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute inset-0"
                />
              </div>

              <CardContent className="relative p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="mx-auto mb-4 w-20 h-20 flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 flex items-center justify-center shadow-lg border-4 border-white/20">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-2">
                      🛡️ Premium Anti-Bot Security
                    </h1>
                    <p className="text-xl text-gray-300">
                      Professional-grade follower protection for {config.name} influencers
                    </p>
                  </motion.div>
                </div>

                {/* Feature Showcase */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      key={currentFeature}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className={cn("w-12 h-12 mr-4", features[currentFeature].color)}
                    >
                      {React.createElement(features[currentFeature].icon, { className: "w-full h-full" })}
                    </motion.div>
                    <div>
                      <motion.h3
                        key={`title-${currentFeature}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold text-white"
                      >
                        {features[currentFeature].title}
                      </motion.h3>
                      <motion.p
                        key={`desc-${currentFeature}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-300"
                      >
                        {features[currentFeature].description}
                      </motion.p>
                    </div>
                  </div>
                  
                  {/* Feature Progress */}
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((currentFeature + 1) / features.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <benefit.icon className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-white font-medium">{benefit.text}</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 ml-2">
                        {benefit.value}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mb-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30"
                >
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-1 mr-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-yellow-300 font-semibold">Verified Influencer</span>
                  </div>
                  <p className="text-white italic mb-2">
                    "This security software transformed my account! Removed 2,847 bot followers and my engagement rate jumped from 2.1% to 8.4%. Now I'm earning $15,000/month from brand deals!"
                  </p>
                  <p className="text-gray-400 text-sm">- Sarah K., 500K+ followers</p>
                </motion.div>

                {/* Pricing Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 }}
                  className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border-2 border-green-500/50 relative overflow-hidden"
                >
                  {/* Special Offer Badge */}
                  <div className="absolute -top-2 -right-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    >
                      🔥 LIMITED TIME
                    </motion.div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      <Sparkles className="w-6 h-6 inline mr-2 text-yellow-400" />
                      Premium Security Activation
                    </h3>
                    
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-green-400">250 KSH</span>
                      <div className="ml-4 text-left">
                        <p className="text-gray-400 line-through">Regular: 500 KSH</p>
                        <p className="text-green-400 font-semibold">Save 50% Today!</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-6">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Instant bot removal
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Lifetime protection
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        24/7 monitoring
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Money-back guarantee
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="space-y-4"
                >
                  {/* Activate Button */}
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
                      className="relative w-full py-6 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg transform transition-all duration-200 hover:scale-105"
                    >
                      <Shield className="w-6 h-6 mr-3" />
                      Activate Premium Security - 250 KSH
                      <Zap className="w-6 h-6 ml-3" />
                    </Button>
                  </div>

                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    className="w-full text-gray-400 hover:text-white hover:bg-white/10 py-3"
                  >
                    Maybe Later
                  </Button>

                  {/* Trust Indicators */}
                  <div className="flex justify-center items-center space-x-6 pt-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-1" />
                      Secure Payment
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Trusted by 50K+ Users
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      30-Day Guarantee
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
