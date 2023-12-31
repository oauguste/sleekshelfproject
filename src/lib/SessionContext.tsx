// context/SessionContext.tsx

import React from "react";
import type { Session } from "next-auth";

interface SessionContextProps {
  session: Session | null;
}

export const SessionContext =
  React.createContext<SessionContextProps | null>(null);

export const useSessionContext = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error(
      "useSessionContext must be used within a SessionProvider"
    );
  }
  return context;
};
