"use client";

import { createContext } from "react";

interface CreateServerModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const CreateServerModalContext =
  createContext<CreateServerModalContextValue | null>(null);