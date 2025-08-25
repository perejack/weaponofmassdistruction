import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Play, Star, Quote, TrendingUp, Users, Instagram, Youtube, Facebook, ChevronLeft, ChevronRight } from "lucide-react"

// TikTok Icon
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

export function AdvancedTestimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Content Creator",
      avatar: "/api/placeholder/64/64",
      platform: "instagram",
      platformIcon: <Instagram className="w-4 h-4" />,
      followers: "2.3M",
      content: "This platform completely transformed my Instagram presence. I went from 50K to 2.3M followers in just 8 months. The engagement quality is incredible - these are real people who actually care about my content.",
      stats: "+2.25M followers",
      rating: 5,
      verified: true,
      videoThumbnail: "/api/placeholder/400/225",
      hasVideo: true
    },
    {
      id: 2,
      name: "Marcus Rivera",
      role: "Brand Influencer",
      avatar: "/api/placeholder/64/64",
      platform: "tiktok",
      platformIcon: <TikTokIcon />,
      followers: "5.8M",
      content: "The AI-powered targeting is insane. My TikTok videos now consistently hit 1M+ views. Brands are literally fighting over partnerships with me. This investment paid for itself in the first month.",
      stats: "+5.2M followers",
      rating: 5,
      verified: true,
      videoThumbnail: "/api/placeholder/400/225",
      hasVideo: true
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Lifestyle Blogger",
      avatar: "/api/placeholder/64/64",
      platform: "youtube",
      platformIcon: <Youtube className="w-4 h-4" />,
      followers: "1.2M",
      content: "My YouTube channel exploded after using this service. The subscriber quality is amazing - 85% watch time and incredible engagement rates. I'm now making 6 figures monthly from ad revenue alone.",
      stats: "+950K subscribers",
      rating: 5,
      verified: true,
      videoThumbnail: "/api/placeholder/400/225",
      hasVideo: false
    },
    {
      id: 4,
      name: "David Park",
      role: "Business Coach",
      avatar: "/api/placeholder/64/64",
      platform: "facebook",
      platformIcon: <Facebook className="w-4 h-4" />,
      followers: "890K",
      content: "As a business coach, credibility is everything. This platform helped me build a massive, engaged audience that trusts my expertise. My course sales have increased by 400% since I started.",
      stats: "+750K followers",
      rating: 5,
      verified: true,
      videoThumbnail: "/api/placeholder/400/225",
      hasVideo: true
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getPlatformGradient = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-instagram'
      case 'tiktok': return 'bg-gradient-tiktok'
      case 'youtube': return 'bg-gradient-youtube'
      case 'facebook': return 'bg-gradient-facebook'
      default: return 'bg-gradient-primary'
    }
  }

  return (
    <section id="testimonials" className="py-24 px-4 bg-gradient-to-br from-card/10 via-background to-card/10">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-success/10 text-success border-success/20">
            Success Stories
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            Real Results from Real Creators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators who've transformed their social media presence and built thriving communities.
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl shadow-2xl">
                    <CardContent className="p-8 lg:p-12">
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Video/Image Side */}
                        <div className="relative group">
                          <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40 relative">
                            <img 
                              src={testimonial.videoThumbnail}
                              alt={`${testimonial.name} testimonial`}
                              className="w-full h-full object-cover"
                            />
                            {testimonial.hasVideo && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                                <Button
                                  variant="hero"
                                  size="lg"
                                  className="rounded-full w-16 h-16 shadow-2xl group-hover:scale-110 transition-transform duration-300"
                                >
                                  <Play className="w-6 h-6 ml-1" />
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          {/* Platform Badge */}
                          <div className={cn(
                            "absolute -top-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                            getPlatformGradient(testimonial.platform)
                          )}>
                            {testimonial.platformIcon}
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className="space-y-6">
                          {/* Quote */}
                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                            <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed pl-6">
                              "{testimonial.content}"
                            </blockquote>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16 border-2 border-primary/20">
                              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                              <AvatarFallback className="bg-gradient-primary text-white font-bold">
                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                {testimonial.verified && (
                                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground">{testimonial.role}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {testimonial.followers} followers
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-4">
                            <Badge 
                              variant="secondary" 
                              className="bg-success/10 text-success border-success/20 px-4 py-2"
                            >
                              <TrendingUp className="w-4 h-4 mr-2" />
                              {testimonial.stats}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                "px-4 py-2 text-white border-0",
                                getPlatformGradient(testimonial.platform)
                              )}
                            >
                              {testimonial.platformIcon}
                              <span className="ml-2 capitalize">{testimonial.platform}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-xl border-card-border hover:bg-card"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-xl border-card-border hover:bg-card"
            onClick={nextSlide}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentSlide 
                    ? "bg-primary scale-125" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-card/30 backdrop-blur-xl rounded-2xl p-6 border border-card-border">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Happy Creators</div>
          </div>
          <div className="text-center bg-card/30 backdrop-blur-xl rounded-2xl p-6 border border-card-border">
            <div className="text-3xl font-bold text-accent mb-2">2.5M+</div>
            <div className="text-sm text-muted-foreground">Followers Generated</div>
          </div>
          <div className="text-center bg-card/30 backdrop-blur-xl rounded-2xl p-6 border border-card-border">
            <div className="text-3xl font-bold text-success mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center bg-card/30 backdrop-blur-xl rounded-2xl p-6 border border-card-border">
            <div className="text-3xl font-bold text-secondary mb-2">4.9★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
