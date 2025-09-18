import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

interface PlatformCardProps {
  name: string
  icon: React.ReactNode
  followers: string
  engagement: string
  growth: string
  variant: "instagram" | "tiktok" | "youtube" | "facebook"
  className?: string
  style?: React.CSSProperties
}

export function PlatformCard({ name, icon, followers, engagement, growth, variant, className, style }: PlatformCardProps) {
  const navigate = useNavigate()
  const gradientClass = `bg-gradient-${variant}`
  
  const handleBoostClick = () => {
    if (variant === "instagram") {
      navigate("/instagram-boost")
    } else if (variant === "tiktok") {
      navigate("/tiktok-boost")
    } else if (variant === "youtube") {
      navigate("/youtube-boost")
    } else if (variant === "facebook") {
      navigate("/facebook-boost")
    }
  }
  
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden border-card-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-glow cursor-pointer animate-bounce-in",
        className
      )}
      style={style}
    >
      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
        gradientClass
      )} />
      
      <CardHeader className="relative z-10 pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className={cn(
              "p-2 sm:p-2.5 rounded-lg transition-all duration-300 group-hover:scale-110 group-active:scale-95",
              gradientClass
            )}>
              {icon}
            </div>
            <div>
              <CardTitle className="text-sm sm:text-base text-card-foreground">{name}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Social Platform</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-0">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="text-center bg-primary/5 rounded-lg p-2 sm:p-3">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary animate-counter-up">{followers}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center bg-accent/5 rounded-lg p-2 sm:p-3">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-accent animate-counter-up">{engagement}</p>
            <p className="text-xs text-muted-foreground">Engagement</p>
          </div>
          <div className="text-center bg-success/5 rounded-lg p-2 sm:p-3">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-success animate-counter-up">{growth}</p>
            <p className="text-xs text-muted-foreground">Growth</p>
          </div>
        </div>
        
        <Button 
          variant={variant} 
          size="sm" 
          className="w-full h-9 sm:h-10 text-sm sm:text-base font-semibold active:scale-95 transition-transform" 
          onClick={handleBoostClick}
        >
          Boost {name}
        </Button>
      </CardContent>
    </Card>
  )
}