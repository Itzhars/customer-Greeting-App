import { AuthForm } from "@/components/auth/AuthForm";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] h-[50%] w-[30%] rounded-full bg-indigo-500/20 blur-[120px]" />
      </div>

      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-500 text-primary-foreground shadow-xl">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">WishesApp</h2>
      </div>

      <AuthForm />
    </div>
  );
}
