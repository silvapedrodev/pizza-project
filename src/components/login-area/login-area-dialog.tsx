"use client"

import { useAuth } from "@/stores/auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useState } from "react"
import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react"
import { LoginAreaStepEmail } from "./login-area-step-email"

type Steps = "EMAIL" | "SIGNUP" | "SIGNIN"

export const LoginAreaDialog = () => {
  const auth = useAuth()

  const [step, setStep] = useState<Steps>("EMAIL")
  const [emailField, setEmailField] = useState('')

  const handleStepEmail = (hasEmail: boolean, email: string) => {
    setEmailField(email)
    if (hasEmail) {
      setStep('SIGNIN')
    } else {
      setStep("SIGNUP")
    }
  }

  return (
    <Dialog
      open={auth.open}
      onOpenChange={open => auth.setOpen(open)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step != 'EMAIL' &&
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep('EMAIL')}
              >
                <ArrowLeft className="size-4" />
              </Button>
            }

            {step === "EMAIL" && "Login / Cadastro"}
            {step === "SIGNUP" && "Cadastro"}
            {step === "SIGNIN" && "Login"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {step === 'EMAIL' &&
            <LoginAreaStepEmail
              onValidade={handleStepEmail}
            />
          }
          {step === 'SIGNIN' &&
            <div>Login</div>
          }
          {step === 'SIGNUP' &&
            <div>Cadastro</div>
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}