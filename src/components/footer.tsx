import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { 
  Zap, 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Star,
  Shield,
  Award,
  Users,
  TrendingUp,
  ArrowRight
} from "lucide-react"

// TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("fill-current", className)}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Integrations", href: "#integrations" },
      { name: "API", href: "/api" },
      { name: "Changelog", href: "/changelog" }
    ],
    platforms: [
      { name: "Instagram Growth", href: "/instagram-boost" },
      { name: "TikTok Growth", href: "/tiktok-boost" },
      { name: "YouTube Growth", href: "/youtube-boost" },
      { name: "Facebook Growth", href: "/facebook-boost" },
      { name: "All Platforms", href: "/platforms" }
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Webinars", href: "/webinars" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" }
    ]
  }

  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/socialboost", color: "hover:text-pink-500" },
    { name: "TikTok", icon: <TikTokIcon className="w-5 h-5" />, href: "https://tiktok.com/@socialboost", color: "hover:text-black" },
    { name: "YouTube", icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com/socialboost", color: "hover:text-red-500" },
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com/socialboost", color: "hover:text-blue-500" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/socialboost", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/company/socialboost", color: "hover:text-blue-600" }
  ]

  const trustBadges = [
    { icon: <Shield className="w-5 h-5" />, text: "SOC 2 Compliant" },
    { icon: <Award className="w-5 h-5" />, text: "Industry Leader" },
    { icon: <Users className="w-5 h-5" />, text: "50K+ Customers" },
    { icon: <Star className="w-5 h-5" />, text: "4.9/5 Rating" }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-card/20 via-background to-card/10 border-t border-border/50">
      {/* Newsletter Section */}
      <div className="border-b border-border/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 lg:p-12 backdrop-blur-sm border border-primary/20">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                Stay Updated
              </Badge>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Get Growth Tips & Updates
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 50,000+ creators getting weekly insights, platform updates, and exclusive growth strategies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 px-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>
                <Button variant="hero" size="lg" className="h-12 px-8">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-30" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  SocialBoost
                </h3>
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                  Pro
                </Badge>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              The world's most advanced social media growth platform. Trusted by 50,000+ creators 
              to build authentic audiences and dominate their niches.
            </p>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="text-primary">{badge.icon}</div>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@socialboost.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Platforms</h4>
              <ul className="space-y-3">
                {footerLinks.platforms.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <span>© {currentYear} SocialBoost. All rights reserved.</span>
              <div className="flex items-center gap-4">
                {footerLinks.legal.map((link, index) => (
                  <span key={link.name} className="flex items-center gap-4">
                    <a href={link.href} className="hover:text-primary transition-colors duration-200">
                      {link.name}
                    </a>
                    {index < footerLinks.legal.length - 1 && (
                      <span className="text-border">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={cn(
                    "p-2 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50 text-muted-foreground transition-all duration-200 hover:scale-110",
                    social.color
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}
