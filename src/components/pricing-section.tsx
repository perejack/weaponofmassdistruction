import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Check, Zap, Crown, Rocket, Star, TrendingUp, Users, Shield } from "lucide-react"

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for beginners",
      icon: <Zap className="w-6 h-6" />,
      monthlyPrice: 29,
      yearlyPrice: 290,
      color: "primary",
      features: [
        "Up to 3 social accounts",
        "10K followers/month",
        "Basic analytics",
        "Email support",
        "Content scheduler",
        "Growth insights"
      ],
      popular: false
    },
    {
      name: "Professional",
      description: "Most popular choice",
      icon: <Crown className="w-6 h-6" />,
      monthlyPrice: 79,
      yearlyPrice: 790,
      color: "accent",
      features: [
        "Up to 10 social accounts",
        "50K followers/month",
        "Advanced analytics",
        "Priority support",
        "AI content generation",
        "Competitor analysis",
        "Custom targeting",
        "Team collaboration"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      description: "For serious creators",
      icon: <Rocket className="w-6 h-6" />,
      monthlyPrice: 199,
      yearlyPrice: 1990,
      color: "secondary",
      features: [
        "Unlimited social accounts",
        "500K followers/month",
        "Real-time analytics",
        "24/7 phone support",
        "White-label solution",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced automation",
        "Custom reporting"
      ],
      popular: false
    }
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice
  }

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12
    const yearlyCost = plan.yearlyPrice
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100)
  }

  return (
    <section id="pricing" className="py-24 px-4 bg-gradient-to-br from-background via-card/20 to-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Flexible Pricing
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            Choose Your Growth Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free, scale as you grow. All plans include our core features with no hidden fees.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>
              Yearly
            </span>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20 ml-2">
              Save up to 50%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={cn(
                "relative overflow-hidden transition-all duration-500 hover:scale-105 group",
                plan.popular 
                  ? "border-2 border-primary shadow-2xl shadow-primary/20 bg-gradient-to-br from-card/80 to-primary/5" 
                  : "border border-card-border bg-card/50 hover:border-primary/30",
                "backdrop-blur-xl animate-slide-in-up"
              )}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white px-6 py-1 shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Background Gradient */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500",
                `bg-gradient-${plan.color}`
              )} />

              <CardHeader className="relative z-10 text-center pb-4">
                <div className={cn(
                  "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                  `bg-gradient-${plan.color}`,
                  "text-white shadow-lg"
                )}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 text-center">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black text-foreground">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-muted-foreground">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && (
                    <Badge variant="secondary" className="mt-2 bg-success/10 text-success border-success/20">
                      Save {getSavings(plan)}%
                    </Badge>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-center gap-3 animate-slide-in-right"
                      style={{ animationDelay: `${(index * 0.2) + (featureIndex * 0.1)}s` }}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                        `bg-gradient-${plan.color}`
                      )}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  className={cn(
                    "w-full h-12 font-semibold transition-all duration-300",
                    plan.popular 
                      ? "shadow-primary hover:shadow-glow" 
                      : "hover:border-primary/50 hover:bg-primary/5"
                  )}
                >
                  {plan.popular ? "Start Free Trial" : "Get Started"}
                  <TrendingUp className="w-4 h-4" />
                </Button>

                {/* Money Back Guarantee */}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>30-day money-back guarantee</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-card/30 backdrop-blur-xl rounded-2xl p-8 border border-card-border max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Need a custom solution?
            </h3>
            <p className="text-muted-foreground mb-6">
              We offer enterprise solutions with custom features, dedicated support, and flexible pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-card/50 backdrop-blur-sm">
                <Users className="w-4 h-4" />
                Contact Sales
              </Button>
              <Button variant="ghost" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
