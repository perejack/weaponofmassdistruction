import { useState, useEffect } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Send, ArrowLeft, Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface STKPushProps {
  amount: number
  onSuccess: (reference: string) => void
  onCancel: () => void
  description?: string
}

export function STKPush({ amount, onSuccess, onCancel, description = "Social Media Boost Payment" }: STKPushProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentReference, setPaymentReference] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle')
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // API URL - Use Netlify functions
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://survaypay75.netlify.app/.netlify/functions'

  // Format phone number for Kenyan format
  const formatPhoneNumber = (input: string) => {
    // Remove non-digit characters
    let cleaned = input.replace(/\D/g, '')
    
    // Format for Kenya number
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1)
    }
    
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1)
    }
    
    if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned
    }
    
    return cleaned
  }

  // Validate Kenyan phone number
  const validatePhoneNumber = (phoneNumber: string) => {
    const formatted = formatPhoneNumber(phoneNumber)
    return formatted.length === 12 && formatted.startsWith('254')
  }

  // Reset status when trying payment again
  const initiatePayment = async () => {
    // Reset status for new payment attempt
    setStatus('idle')
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    setStatus('pending')

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)
      
      const response = await fetch(`${API_URL}/initiate-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          userId: 'boost-user',
          amount: amount,
          description: description
        })
      })

      const data = await response.json()

      if (data.success && data.data.externalReference) {
        setPaymentReference(data.data.externalReference)
        
        toast({
          title: "STK Push Sent",
          description: "Please complete the payment on your phone",
        })
        
        // Start polling for payment status
        startPolling(data.data.externalReference)
      } else {
        setStatus('failed')
        setIsProcessing(false)
        toast({
          title: "Payment Failed",
          description: data.message || "Failed to initiate payment",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Payment initiation error:', error)
      setStatus('failed')
      setIsProcessing(false)
      toast({
        title: "Network Error",
        description: "Please check your connection and try again",
        variant: "destructive"
      })
    }
  }

  // Poll for payment status
  const startPolling = (reference: string) => {
    if (pollInterval) {
      clearInterval(pollInterval)
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/payment-status/${reference}`)
        const data = await response.json()

        if (data.success && data.payment) {
          if (data.payment.status === 'SUCCESS') {
            clearInterval(interval)
            setStatus('success')
            setIsProcessing(false)
            
            toast({
              title: "Payment Successful!",
              description: "Your boost has been activated. Returning to boost screen...",
            })
            
            // Call success callback after showing success message
            setTimeout(() => {
              onSuccess(reference)
            }, 2000)
          } else if (data.payment.status === 'FAILED') {
            clearInterval(interval)
            setStatus('failed')
            setIsProcessing(false)
            
            toast({
              title: "Payment Failed",
              description: "Transaction was not completed. Please try again.",
              variant: "destructive"
            })
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error)
        // Continue polling on error
      }
    }, 5000) // Check every 5 seconds

    setPollInterval(interval)
  }

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, [pollInterval])

  return (
    <Card className="w-full max-w-md mx-auto border-card-border bg-card backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl text-foreground">M-Pesa STK Push</CardTitle>
        <CardDescription>Enter your phone number to receive payment request</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Payment Amount */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-2 text-primary mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Payment Amount: KSH {amount}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You will receive an STK push to complete payment for {description.toLowerCase()}
          </p>
        </div>

        {/* Phone Number Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <Input
            type="tel"
            placeholder="712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="h-12"
            disabled={isProcessing}
          />
          <p className="text-xs text-muted-foreground">
            Enter your Safaricom number (e.g., 0712345678 or 712345678)
          </p>
        </div>

        {/* Status Display */}
        {status === 'pending' && (
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-medium">Processing Payment</span>
            </div>
            <p className="text-sm text-muted-foreground">
              STK push sent. Please complete the payment on your phone.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-success/10 rounded-lg p-4 border border-success/20">
            <div className="flex items-center gap-2 text-success mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Payment Successful!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your boost has been activated. Returning to boost screen...
            </p>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Payment Failed</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transaction was not completed. Please try payment again.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={initiatePayment}
            disabled={isProcessing || !phoneNumber || status === 'success'}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : status === 'failed' ? (
              <>
                <Send className="w-4 h-4 mr-2" />
                Try Payment Again
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send STK Push
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Payment Options
          </Button>
        </div>

        {/* Security Info */}
        <div className="bg-success/10 rounded-lg p-4 border border-success/20">
          <div className="flex items-center gap-2 text-success mb-2">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Secure M-Pesa Payment</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Check your phone for STK push notification</li>
            <li>• Enter your M-Pesa PIN to complete payment</li>
            <li>• Payment is processed securely through Safaricom</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Smartphone className="w-3 h-3" />
            <span>Powered by M-Pesa • Instant verification</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
