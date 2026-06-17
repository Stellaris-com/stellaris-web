"use client";

import { useCallback, useMemo, useState } from "react";
import { JoinServerModalContext } from "../model/joinServerModalContext";

export function JoinServerModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [isOpen, open, close],
  );

  return (
    <JoinServerModalContext.Provider value={value}>
      {children}
    </JoinServerModalContext.Provider>
  );
}
