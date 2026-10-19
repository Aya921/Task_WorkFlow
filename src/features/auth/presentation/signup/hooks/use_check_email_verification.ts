import { useEffect } from "react";
import { supabase } from "../../../../../core/supabase/supabase_client";

export const useCheckEmailVerification = (onVerified: () => void) => {
  useEffect(() => {
    const checkVerification = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email_confirmed_at) {
        onVerified()
        
      };
      
    };
   

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async () => {
      await checkVerification();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
