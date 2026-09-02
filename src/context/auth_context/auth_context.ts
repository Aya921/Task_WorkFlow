import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '../../features/auth/domain/entity/profile';
import { createContext } from 'react';


 type AuthContextType={
    user: User | null;
  session: Session | null;
  profile: Profile | undefined;
  sessionLoading: boolean;          
  profileLoading: boolean;   
  profileError: Error | null;
  profileFetching:boolean;
  getProfile:()=>void
}
export const AuthContext=createContext<AuthContextType|null>(null);


