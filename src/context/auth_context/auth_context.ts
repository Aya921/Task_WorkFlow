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
}
export const AuthContext=createContext<AuthContextType|null>(null);


// interface User {
//   id: string;
//   app_metadata: Record<string, any>;
//   user_metadata: Record<string, any>;
//   aud: string;
//   email?: string;
//   phone?: string;
//   created_at: string;
//   confirmed_at?: string;
//   email_confirmed_at?: string;
//   last_sign_in_at?: string;
//   role?: string;
//   // ... 
// }

// interface Session {
//   access_token: string;
//   refresh_token: string;
//   expires_in: number;
//   expires_at?: number;
//   token_type: string;
//   user: User;
// }