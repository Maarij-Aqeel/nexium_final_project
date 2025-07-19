"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

// Structure of Profile
interface Profile {
  id: string;
  name: string;
  email: string;
  is_company: boolean;
}

interface UserContextType {
  user: User | null;
  profile: Profile | null;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);


export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}

// Wrap up the context to get user and profile
export function UserProvider({
  children,
  user,
  profile,
}: {
  children: ReactNode;
  user: User | null;
  profile: Profile | null;
}) {
  return (
    <UserContext.Provider value={{ user, profile }}>
      {children}
    </UserContext.Provider>
  );
}