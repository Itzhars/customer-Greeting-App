"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: any | null; // Use any to allow for both Firebase User and Mock User
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  isMockMode: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithGoogle: async () => {},
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  loginAsGuest: async () => {},
  logout: async () => {},
  isMockMode: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if we are in Mock Mode (no valid API key)
  const isMockMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
                     process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "demo-api-key";

  useEffect(() => {
    if (isMockMode) {
      // Restore mock session from session storage if exists
      const savedUser = sessionStorage.getItem("wishes-mock-user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isMockMode]);

  const loginWithGoogle = async () => {
    if (isMockMode) {
      const mockUser = { email: "guest@example.com", displayName: "Guest User", uid: "mock-123" };
      setUser(mockUser);
      sessionStorage.setItem("wishes-mock-user", JSON.stringify(mockUser));
      return;
    }
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (isMockMode) {
      const mockUser = { email, displayName: email.split("@")[0], uid: "mock-" + Date.now() };
      setUser(mockUser);
      sessionStorage.setItem("wishes-mock-user", JSON.stringify(mockUser));
      return;
    }
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string) => {
    if (isMockMode) {
      const mockUser = { email, displayName: email.split("@")[0], uid: "mock-" + Date.now() };
      setUser(mockUser);
      sessionStorage.setItem("wishes-mock-user", JSON.stringify(mockUser));
      return;
    }
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const loginAsGuest = async () => {
    if (isMockMode) {
      const mockUser = { email: "guest@wishesapp.com", displayName: "Guest User", uid: "mock-guest" };
      setUser(mockUser);
      sessionStorage.setItem("wishes-mock-user", JSON.stringify(mockUser));
      return;
    }
    await signInAnonymously(auth);
  };

  const logout = async () => {
    if (isMockMode) {
      setUser(null);
      sessionStorage.removeItem("wishes-mock-user");
      return;
    }
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        loginAsGuest,
        logout,
        isMockMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
