
import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/types/user";

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: UserRole | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Login function
  const login = (userData: User) => {
    setUser(userData);
    // In a real app, you might store a token in localStorage/cookies here
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    // In a real app, you would also remove tokens from localStorage/cookies
  };
  
  // Check if user is authenticated
  const isAuthenticated = user !== null;
  
  // Get user role
  const userRole = user?.role || null;
  
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        userRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook to use the auth context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
