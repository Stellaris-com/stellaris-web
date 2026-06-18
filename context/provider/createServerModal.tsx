"use client";

import { useCallback, useMemo, useState } from "react";
import { CreateServerModalContext } from "../model/createServerModalContext";

export function CreateServerModalProvider({
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
    <CreateServerModalContext.Provider value={value}>
      {children}
    </CreateServerModalContext.Provider>
  );
}