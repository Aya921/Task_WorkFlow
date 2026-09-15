import type { User, Session } from "@supabase/supabase-js";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const newUser = session?.user ?? null;

  setSession(session);
  setSessionLoading(false);
  setUser(newUser);

  console.log("came here to get user and session", { user: newUser, session });
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
    isFetching: profileFetching,
  } = useProfile(user?.id);

  const updataProfileData = useCallback((userId?:string) => {
    
    const id=userId??user?.id;
    console.log("getProfile called");
    if (id) {
      console.log("invalidating profile query for user", id);
      queryClient.invalidateQueries({
        queryKey: ["profile", id],
      });
      
    }
  }, [user?.id]);


  const updateUser=(user:User)=>{
    setUser(user)

  }
  useEffect(() => {
  if (session?.user) {
    sessionStorage.removeItem("pendingVerification");
  }
}, [session]);



 

  useEffect(() => {
    console.log("USER CHANGED", user?.id);
    if (!user?.id) return;
    console.log("subscribing to profile changes for user", user.id);

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
      .subscribe((status) => {
        console.log(status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);


  

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
     updateUser
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
      updateUser
    ],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
