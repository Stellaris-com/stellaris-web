import { JoinServerModalContext } from "@/context/model/joinServerModalContext";
import { useContext } from "react";

export function useJoinServerModal() {
  const context = useContext(JoinServerModalContext);

  if (!context) {
    throw new Error(
      "useJoinServerModal deve estar dentro de JoinServerModalProvider",
    );
  }

  return context;
}
