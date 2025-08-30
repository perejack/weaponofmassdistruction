import { Button } from "@/components/ui/enhanced-button"
import { MetricCounter } from "@/components/metric-counter"
import { ParticleBackground } from "@/components/particle-background"
import { ArrowRight, TrendingUp, Users, Zap, Play, Star, Shield, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import heroImage from "@/assets/hero-bg.jpg"

export function EnhancedHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-success/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          {/* Enhanced Badge with Pulse Effect */}
          <div className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-xl border border-primary/20 rounded-full px-4 py-2 mb-8 shadow-lg animate-pulse-glow">
            <Zap className="w-4 h-4 text-primary animate-bounce" />
            <span className="text-sm font-semibold bg-gradient-primary bg-clip-text text-transparent">
              #1 Social Growth Platform
            </span>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
              Trusted by 50K+
            </Badge>
          </div>
          
          {/* Enhanced Main Headline with 3D Effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
              Skyrocket Your
            </span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2 relative">
              Social Presence
              <div className="absolute inset-0 bg-gradient-primary bg-clip-text text-transparent blur-lg opacity-30 animate-pulse" />
            </span>
          </h1>
          
          {/* Enhanced Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
            Transform your social media into a <span className="text-primary font-semibold">powerful growth engine</span>. 
            Get real followers, increase engagement, and start earning through <span className="text-accent font-semibold">partnerships, affiliate marketing, and sponsored content</span>.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>100% Safe & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Results in 24 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
          
          {/* Enhanced Stats Row with 3D Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-10 max-w-4xl mx-auto">
            <div className="group bg-card/40 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-xl sm:text-3xl lg:text-5xl font-black text-primary mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                <MetricCounter end={2500000} suffix="+" />
              </div>
              <p className="text-[10px] sm:text-sm md:text-base text-muted-foreground font-medium">Followers Generated</p>
              <div className="w-full h-1 bg-primary/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-primary rounded-full animate-slide-in-right" style={{ width: '85%' }} />
              </div>
            </div>
            
            <div className="group bg-card/40 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-xl sm:text-3xl lg:text-5xl font-black text-accent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                <MetricCounter end={450} suffix="%" />
              </div>
              <p className="text-[10px] sm:text-sm md:text-base text-muted-foreground font-medium">Average Growth</p>
              <div className="w-full h-1 bg-accent/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-accent rounded-full animate-slide-in-right" style={{ width: '92%', animationDelay: '0.2s' }} />
              </div>
            </div>
            
            <div className="group bg-card/40 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 border border-success/20 hover:border-success/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-xl sm:text-3xl lg:text-5xl font-black text-success mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                <MetricCounter end={98} suffix="%" />
              </div>
              <p className="text-[10px] sm:text-sm md:text-base text-muted-foreground font-medium">Success Rate</p>
              <div className="w-full h-1 bg-success/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-success rounded-full animate-slide-in-right" style={{ width: '98%', animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
          
          {/* Enhanced CTA Button */}
          <div className="flex justify-center items-center mb-8">
            <Button 
              variant="hero" 
              size="xl" 
              className="group w-full sm:w-auto min-w-[250px] h-14 sm:h-16 text-lg font-bold shadow-2xl hover:shadow-primary/50 relative overflow-hidden"
              onClick={() => {
                const platformsSection = document.getElementById('platforms');
                if (platformsSection) {
                  platformsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Start Growing Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
          
          {/* Enhanced Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Trusted by 50,000+ creators worldwide</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
              <span className="ml-2">4.9/5 from 12,000+ reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
