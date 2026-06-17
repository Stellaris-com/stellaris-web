import { createContext } from "react";

interface JoinServerModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const JoinServerModalContext =
  createContext<JoinServerModalContextValue | null>(null);

export { JoinServerModalContext };
