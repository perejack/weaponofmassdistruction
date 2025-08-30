import { Navigation } from "@/components/navigation"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { PlatformCard } from "@/components/platform-card"
import { PricingSection } from "@/components/pricing-section"
import { AdvancedTestimonials } from "@/components/advanced-testimonials"
import { Footer } from "@/components/footer"
import { LiveActivityTicker } from "@/components/live-activity-ticker"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Instagram, Youtube, Facebook, Zap, Clock, Shield, Target } from "lucide-react"
import dashboardImage from "@/assets/dashboard-preview.jpg"

// TikTok Icon (since lucide doesn't have it)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

const platforms = [
  {
    name: "Instagram",
    icon: <Instagram className="w-6 h-6 text-white" />,
    followers: "150K",
    engagement: "12.5%",
    growth: "+340%",
    variant: "instagram" as const
  },
  {
    name: "TikTok",
    icon: <TikTokIcon />,
    followers: "890K",
    engagement: "18.2%",
    growth: "+520%",
    variant: "tiktok" as const
  },
  {
    name: "YouTube",
    icon: <Youtube className="w-6 h-6 text-white" />,
    followers: "95K",
    engagement: "8.7%",
    growth: "+280%",
    variant: "youtube" as const
  },
  {
    name: "Facebook",
    icon: <Facebook className="w-6 h-6 text-white" />,
    followers: "65K",
    engagement: "6.3%",
    growth: "+190%",
    variant: "facebook" as const
  }
]

const features = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Instant Growth",
    description: "See results within 24 hours. Our AI system works around the clock to boost your presence."
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "100% Safe",
    description: "Compliant with all platform guidelines. Your account security is our top priority."
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Targeted Audience",
    description: "Attract genuine followers who are actually interested in your content and niche."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "24/7 Support",
    description: "Our expert team is always available to help you maximize your growth potential."
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    content: "Gained 100K followers in just 3 months! This platform is incredible.",
    stats: "+150K followers"
  },
  {
    name: "Marcus Rivera",
    role: "Brand Influencer", 
    content: "My engagement rate tripled. Brands are now reaching out to me daily.",
    stats: "+300% engagement"
  },
  {
    name: "Emma Thompson",
    role: "Lifestyle Blogger",
    content: "Finally hit 1M followers! The growth has been absolutely insane.",
    stats: "+850K followers"
  }
]

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <EnhancedHeroSection />
      
      {/* Platforms Section */}
      <section id="platforms" className="py-12 sm:py-16 lg:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-3 sm:mb-4 bg-primary/10 text-primary border-primary/20">
              All Major Platforms
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-foreground px-4">
              Dominate Every Platform
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Our advanced algorithms work across all social media platforms to maximize your reach and engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {platforms.map((platform, index) => (
              <PlatformCard 
                key={platform.name} 
                {...platform} 
                className="animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
          
          <div className="text-center px-4">
            <Button variant="accent" size="lg" className="w-full sm:w-auto min-w-[200px] h-12 sm:h-14">
              Connect All Platforms
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 bg-card/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="secondary" className="mb-3 sm:mb-4 bg-accent/10 text-accent border-accent/20">
                Powerful Dashboard
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
                <span className="block">Track Your Success</span>
                <span className="block text-primary">In Real-Time</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                Monitor your growth across all platforms with detailed analytics, engagement metrics, 
                and performance insights that help you optimize your content strategy.
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 bg-card/30 p-3 rounded-lg backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground">Real-time follower tracking</span>
                </div>
                <div className="flex items-center gap-3 bg-card/30 p-3 rounded-lg backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground">Engagement rate optimization</span>
                </div>
                <div className="flex items-center gap-3 bg-card/30 p-3 rounded-lg backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground">Content performance insights</span>
                </div>
                <div className="flex items-center gap-3 bg-card/30 p-3 rounded-lg backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground">Competitor analysis tools</span>
                </div>
              </div>
              
              <Button variant="viral" size="lg" className="w-full sm:w-auto h-12 sm:h-14">
                View Live Demo
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-20"></div>
              <img 
                src={dashboardImage}
                alt="Analytics Dashboard"
                className="relative z-10 rounded-xl sm:rounded-2xl shadow-2xl w-full animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-12 sm:py-16 lg:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-3 sm:mb-4 bg-success/10 text-success border-success/20">
              Why Choose Us
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-foreground px-4">
              Built for Maximum Impact
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              We've engineered the most advanced social media growth system that delivers real, 
              measurable results for creators and brands.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center border-card-border bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 animate-slide-in-up group"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="mx-auto mb-3 sm:mb-4 p-3 sm:p-4 bg-primary/10 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Advanced Testimonials */}
      <AdvancedTestimonials />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4">
        <div className="container mx-auto">
          <Card className="border-card-border bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm animate-fade-in">
            <CardContent className="text-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
                Ready to Go Viral?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already dominating social media. 
                Start your explosive growth journey today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6">
                <Button variant="hero" size="xl" className="w-full sm:w-auto min-w-[200px] h-12 sm:h-14 text-base sm:text-lg">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="outline" size="xl" className="w-full sm:w-auto min-w-[200px] h-12 sm:h-14 text-base sm:text-lg bg-card/50 backdrop-blur-sm">
                  Schedule Demo
                </Button>
              </div>
              
              <p className="text-xs sm:text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Index