import { useQueryOptions } from "@/lib/api";
import { createContext, ReactNode, useContext } from "react";
import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useQuery(useQueryOptions);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user: user?.user
          ? {
              ...user.user,
              name: `${user.user.given_name} ${user.user.family_name}`,
              avatar: user.user.picture ?? "",
            }
          : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
