"use client";

import { RegisterScreen } from "@/components/auth/register-screen";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function Register() {
  const { session, isLoading, error, register } = useAuth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="h-dvh w-full">
      <RegisterScreen
        onRegister={register}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
