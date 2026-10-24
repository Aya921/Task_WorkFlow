import type { User, Session } from "@supabase/supabase-js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../../core/supabase/supabase_client";
import { AuthContext } from "./auth_context";
import { useProfile } from "../../features/auth/presentation/profile/hook/use_get_profile";
import { queryClient } from "../../query/query_client";
import { useToast } from "../../hooks/use_toast";
import i18n from "../../i18n";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    let mount = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mount) return;

      setSession(nextSession);
      setSessionLoading(false);
      setUser(nextSession?.user ?? null);
    });

    return () => {
      mount = false;
      subscription.unsubscribe();
    };
  }, []);

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
    isFetching: profileFetching,
  } = useProfile(user?.id);

  const updataProfileData = useCallback(
    (userId?: string) => {
      const id = userId ?? user?.id;
      if (!id) return;

      void queryClient
        .invalidateQueries({
          queryKey: ["profile", id],
        })
        .catch((error: unknown) => {
          const message =
            error instanceof Error
              ? error.message
              : i18n.t("common:profile.refreshFailed");

          showToast(message, "error");
        });
    },
    [user?.id, showToast],
  );

  useEffect(() => {
    if (session?.user) {
      sessionStorage.removeItem("pendingVerification");
    }
  }, [session]);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`profile-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user.id}`,
        },
        () => {
          updataProfileData();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user?.id, updataProfileData]);

  const values = useMemo(
    () => ({
      user,
      profile,
      session,
      sessionLoading,
      profileLoading,
      profileError,
      getProfile: updataProfileData,
      profileFetching,
    }),
    [
      user,
      profile,
      session,
      sessionLoading,
      profileError,
      profileLoading,
      updataProfileData,
      profileFetching,
    ],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
