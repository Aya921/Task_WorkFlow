import type { User, Session } from "@supabase/supabase-js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../../core/supabase/supabase_client";
import { AuthContext } from "./auth_context";
import { useProfile } from "../../features/auth/presentation/profile/hook/use_get_profile";
import { queryClient } from "../../query/query_client";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    // when the app fire he try to get the user
    let mount = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mount) return;

      setUser(session?.user ?? null);
      setSessionLoading(false);
      setSession(session);
    });

    return () => {
      mount = false;
      subscription.unsubscribe();
    };
  }, []);

  const {
    // if the user exist then he try to get his info
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useProfile(user?.id);

  const getProfile = useCallback(() => {
    if (user?.id) {
      queryClient.invalidateQueries({
        queryKey: ["profile", user.id],
      });
    }
  }, [user?.id]);

  const values = useMemo(
    () => ({
      user,
      profile,
      session,
      sessionLoading,
      profileLoading,
      profileError,
      getProfile,
    }),
    [
      user,
      profile,
      session,
      sessionLoading,
      profileError,
      profileLoading,
      getProfile,
    ],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
