"use client";

import { CreateServerModalContext } from "@/context/model/createServerModalContext";
import { useContext } from "react";

export function useCreateServerModal() {
  const context = useContext(CreateServerModalContext);

  if (!context) {
    throw new Error(
      "useCreateServerModal must be used within CreateServerModalProvider",
    );
  }

  return context;
}
