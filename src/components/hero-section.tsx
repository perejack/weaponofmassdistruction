import { Button } from "@/components/ui/enhanced-button"
import { MetricCounter } from "@/components/metric-counter"
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react"
import heroImage from "@/assets/hero-bg.jpg"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80 md:bg-background/70" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-card-border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-card-foreground">
              #1 Social Growth Platform
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight px-2">
            <span className="block">Skyrocket Your</span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent mt-1 sm:mt-2">
              Social Presence
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Transform your social media into a powerful growth engine. Get real followers, 
            increase engagement, and start earning through partnerships, affiliate marketing, and sponsored content.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
            <div className="text-center bg-card/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-card-border">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">
                <MetricCounter end={2500000} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Followers Generated</p>
            </div>
            <div className="text-center bg-card/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-card-border">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-1 sm:mb-2">
                <MetricCounter end={450} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Average Growth</p>
            </div>
            <div className="text-center bg-card/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-card-border">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-success mb-1 sm:mb-2">
                <MetricCounter end={98} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Success Rate</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4">
            <Button variant="hero" size="xl" className="w-full sm:w-auto min-w-[200px] h-12 sm:h-14 text-base sm:text-lg group">
              Start Growing Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto min-w-[200px] h-12 sm:h-14 text-base sm:text-lg bg-card/50 backdrop-blur-sm border-card-border">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              View Analytics
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground px-4">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Trusted by 50,000+ creators worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}