import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, AlertCircle, CreditCard } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface ManualVerificationProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (transactionCode: string) => void
  amount: number
}

export function ManualVerification({ isOpen, onClose, onSuccess, amount }: ManualVerificationProps) {
  const [transactionCode, setTransactionCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  const validateTransactionCode = (code: string): boolean => {
    // Must start with 'T' and be more than 7 characters
    return code.startsWith('T') && code.length > 7
  }

  const handleVerify = async () => {
    setError('')
    
    if (!transactionCode.trim()) {
      setError('Please enter your M-Pesa transaction code')
      return
    }

    if (!validateTransactionCode(transactionCode.trim().toUpperCase())) {
      setError('Invalid transaction code. Must start with "T" and be more than 7 characters')
      return
    }

    setIsVerifying(true)

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Payment Verified! ✅",
        description: `Transaction ${transactionCode.toUpperCase()} confirmed for KSH ${amount}`,
        className: "bg-green-50 border-green-200 text-green-800",
      })

      onSuccess(transactionCode.toUpperCase())
      onClose()
    } catch (error) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setTransactionCode(value)
    setError('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-white">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Manual Payment Verification
          </DialogTitle>
          <p className="text-slate-300 text-sm">
            Enter your M-Pesa transaction code to complete verification
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment Info */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Payment Amount:</span>
              <span className="text-xl font-bold text-green-400">KSH {amount}</span>
            </div>
          </div>

          {/* Transaction Code Input */}
          <div className="space-y-3">
            <Label htmlFor="transaction-code" className="text-sm font-medium text-slate-300">
              M-Pesa Transaction Code
            </Label>
            <div className="relative">
              <Input
                id="transaction-code"
                type="text"
                placeholder="e.g., TGY7OJNMJHG"
                value={transactionCode}
                onChange={handleInputChange}
                className="bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 pr-10"
                maxLength={15}
              />
              {transactionCode && validateTransactionCode(transactionCode) && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            
            {/* Hint */}
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-300">
                  <p className="font-medium mb-1">Transaction Code Format:</p>
                  <ul className="space-y-1 text-blue-200">
                    <li>• Must start with "T"</li>
                    <li>• Must be more than 7 characters</li>
                    <li>• Example: <span className="font-mono bg-blue-800/50 px-1 rounded">TGY7OJNMJHG</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerify}
              disabled={!transactionCode || isVerifying || !validateTransactionCode(transactionCode)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
            >
              {isVerifying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify Payment'
              )}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-400">
            Your transaction code can be found in your M-Pesa SMS confirmation
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
