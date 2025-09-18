import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Menu, X, Zap, TrendingUp, Users, Star, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Platforms", href: "#platforms" },
    { name: "Pricing", href: "#pricing" },
    { name: "Success Stories", href: "#testimonials" }
  ]

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Smooth scroll to section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to page and scroll to top
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleLogoClick = () => {
    navigate("/")
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg" 
        : "bg-transparent"
    )}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                SocialBoost
              </h1>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20 -mt-1">
                Pro
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
            <Button variant="hero" size="sm" className="shadow-primary">
              Start Free Trial
              <TrendingUp className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-4 space-y-4 bg-card/50 backdrop-blur-xl rounded-2xl mt-4 border border-border/50">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item.href)
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-200 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </button>
            ))}
            <div className="px-6 py-3 space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
              <Button variant="hero" size="sm" className="w-full">
                Start Free Trial
                <TrendingUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Social Proof Badge */}
      {isScrolled && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 animate-slide-in-up">
          <Badge 
            variant="secondary" 
            className="bg-card/90 backdrop-blur-xl border-border/50 text-xs px-3 py-1.5 shadow-lg"
          >
            <Users className="w-3 h-3 mr-1" />
            50,000+ creators trust us
            <Star className="w-3 h-3 ml-1 text-yellow-500 fill-current" />
          </Badge>
        </div>
      )}
    </header>
  )
}
