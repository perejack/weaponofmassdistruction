import { useState } from "react"
import { CongratulationsPopup } from "./congratulations-popup"
import { TransferAnimation } from "./transfer-animation"
import { AntibotSecurity } from "./antibot-security"
import { toast } from "@/hooks/use-toast"

interface CompletionFlowProps {
  isOpen: boolean
  onClose: () => void
  platform: "tiktok" | "instagram" | "youtube" | "facebook"
  followersGained: number
}

export const CompletionFlow = ({ 
  isOpen, 
  onClose, 
  platform, 
  followersGained 
}: CompletionFlowProps) => {
  const [currentStep, setCurrentStep] = useState<"congratulations" | "transfer" | "security" | "complete">("congratulations")

  const handleStartTransfer = () => {
    setCurrentStep("transfer")
  }

  const handleSecurityDetection = () => {
    setCurrentStep("security")
  }

  const handleTransferComplete = () => {
    setCurrentStep("complete")
    toast({
      title: "🎉 Transfer Complete!",
      description: `Successfully added ${followersGained.toLocaleString()} new followers to your account!`,
      duration: 5000,
    })
    setTimeout(() => {
      onClose()
    }, 3000)
  }

  const handleSecurityActivation = () => {
    // Show payment processing
    toast({
      title: "Processing Payment...",
      description: "Activating AntiBot Security Pro - 250 KSH",
      duration: 3000,
    })
    
    setTimeout(() => {
      toast({
        title: "✅ Payment Successful!",
        description: "Security software activated. Removing bot followers...",
        duration: 3000,
      })
      
      // Continue transfer after security activation
      setTimeout(() => {
        setCurrentStep("transfer")
      }, 2000)
    }, 3000)
  }

  if (currentStep === "congratulations") {
    return (
      <CongratulationsPopup
        isOpen={isOpen}
        onClose={onClose}
        platform={platform}
        followersGained={followersGained}
        onStartTransfer={handleStartTransfer}
      />
    )
  }

  if (currentStep === "transfer") {
    return (
      <TransferAnimation
        isOpen={isOpen}
        onClose={onClose}
        platform={platform}
        followersToTransfer={followersGained}
        onSecurityDetection={handleSecurityDetection}
        onTransferComplete={handleTransferComplete}
      />
    )
  }

  if (currentStep === "security") {
    return (
      <AntibotSecurity
        isOpen={isOpen}
        onClose={onClose}
        platform={platform}
        onActivate={handleSecurityActivation}
      />
    )
  }

  return null
}
