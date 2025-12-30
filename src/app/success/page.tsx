import { Header } from "@/components/layout/header";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Clock, Pizza, Home, Sparkles } from "lucide-react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
  const sessionId = (await searchParams).session_id as string

  if (!sessionId) return redirect('/')

  const paymentSession = await stripe.checkout.sessions.retrieve(sessionId)
  if (!paymentSession) return redirect('/')

  const customerEmail = paymentSession.customer_email

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center mt-8 sm:mt-12 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary rounded-full"></div>
              <div className="relative bg-primary/5 rounded-full p-6 sm:p-8">
                <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Pedido Confirmado! 🎉
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                Obrigado pela sua compra!
              </p>
            </div>
          </div>

          <div className="border border-border rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="space-y-6">

              <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg border border-border/50">
                <div className="shrink-0 mt-1">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">Detalhes do pedido no seu e-mail</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Enviamos todas as informações do seu pedido para{" "}
                    <span className="font-medium text-foreground whitespace-nowrap">{customerEmail}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg sm:text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  O que acontece agora?
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg border border-border/50">
                    <div className="shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base mb-1">Preparação</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Estamos preparando seu pedido com muito carinho
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg border border-border/50">
                    <div className="shrink-0 mt-0.5">
                      <Pizza className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base mb-1">Entrega</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Você receberá atualizações sobre o status da entrega
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm sm:text-base text-muted-foreground text-center">
                  Em caso de dúvidas, entre em contato conosco.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px]">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Voltar para o início
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}