import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Shield, CheckCircle, Zap, TrendingUp, Users, Heart, Eye, Clock, Star, Crown, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationModalProps {
  username: string
  currentFollowers: number
  onClose: () => void
  onVerify: () => void
}

export function VerificationModal({ username, currentFollowers, onClose, onVerify }: VerificationModalProps) {
  const [step, setStep] = useState<'warning' | 'benefits'>('warning')

  const verifiedBenefits = [
    {
      icon: Users,
      title: "Up to 2,000 Real Followers",
      description: "Genuine accounts that engage with your content",
      multiplier: "4x faster",
      color: "text-blue-500"
    },
    {
      icon: Heart,
      title: "100K+ Guaranteed Likes",
      description: "Massive engagement on every post",
      multiplier: "10x boost",
      color: "text-red-500"
    },
    {
      icon: Eye,
      title: "Premium Reach Algorithm",
      description: "Your content shown to millions",
      multiplier: "50x reach",
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Viral Content Priority",
      description: "Posts pushed to trending feeds",
      multiplier: "Instant viral",
      color: "text-green-500"
    }
  ]

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-2 border-destructive/50 bg-card/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 hover:bg-destructive/10"
          >
            <X className="w-4 h-4" />
          </Button>

          {step === 'warning' ? (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center border-2 border-destructive/30">
                    <Shield className="w-10 h-10 text-destructive" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
                    <X className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-2xl text-center text-foreground mb-2">
                Account Not Verified
              </CardTitle>
              <CardDescription className="text-center text-lg">
                @{username} is missing out on premium growth features
              </CardDescription>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl">😔</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Current Status: Unverified</p>
                    <p className="text-sm text-muted-foreground">Limited to basic growth only</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Growth Speed</span>
                    <Badge variant="destructive" className="text-xs">Slow</Badge>
                  </div>
                  <Progress value={25} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Follower Quality</span>
                    <Badge variant="destructive" className="text-xs">Basic</Badge>
                  </div>
                  <Progress value={30} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Engagement Rate</span>
                    <Badge variant="destructive" className="text-xs">Limited</Badge>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary via-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                Verified Account Benefits
              </CardTitle>
              <CardDescription className="text-center text-lg">
                Unlock premium growth for @{username}
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent>
          {step === 'warning' ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Your boost is running at <strong className="text-destructive">25% efficiency</strong> because your account isn't verified.
                </p>
                <p className="text-sm text-muted-foreground">
                  Real people can't find or follow unverified accounts easily.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Continue Limited Growth
                </Button>
                <Button
                  variant="default"
                  onClick={() => setStep('benefits')}
                  className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  See Verification Benefits
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verifiedBenefits.map((benefit, index) => (
                  <Card key={index} className="border-2 border-primary/20 bg-gradient-to-br from-card/50 to-primary/5 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={cn("p-2 rounded-lg bg-background/50", benefit.color)}>
                          <benefit.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{benefit.description}</p>
                          <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                            {benefit.multiplier}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gradient-to-r from-success/10 via-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Verified Account Status</p>
                    <p className="text-sm text-muted-foreground">Premium growth unlocked</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Growth Speed</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">Ultra Fast</Badge>
                  </div>
                  <Progress value={95} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Follower Quality</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">Premium</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Engagement Rate</span>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">Maximum</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-primary">Limited Time:</strong> Verify now and get 
                  <strong className="text-success"> 2x boost speed</strong> for the next 24 hours!
                </p>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep('warning')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={onVerify}
                    className="flex-1 bg-gradient-to-r from-success via-primary to-purple-600 hover:from-success/90 hover:via-primary/90 hover:to-purple-600/90 text-white font-semibold"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify Account Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
