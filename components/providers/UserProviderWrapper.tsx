"use client";

import { useEffect, useState } from "react";
import { UserProvider } from "@/app/context/user-context";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  name: string;
  email: string;
  is_company: boolean;
}

export default function UserProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user=session?.user??null
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, name, email, is_company")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setProfile(data);
        } else {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    };

    fetchUser();
    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, _session) => {
      fetchUser();
    });

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserProvider user={user} profile={profile}>
      {children}
    </UserProvider>
  );
}
