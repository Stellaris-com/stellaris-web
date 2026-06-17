"use client";

import { LoginScreen } from "@/components/auth/login-screen";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function Login() {
  const { session, isLoading, error, login } = useAuth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="h-dvh w-full">
      <LoginScreen onLogin={login} isLoading={isLoading} error={error} />
    </main>
  );
}
