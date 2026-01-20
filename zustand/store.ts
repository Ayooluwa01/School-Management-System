// store/useAuthStore.ts
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';




interface JWTPayload {
  user_id: string;
  login_id: string;
  role: string;
  school_id: string;
  exp: number; 
}

interface AuthState {
  accessToken: string | null;
  user: JWTPayload | null; 
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAccessToken: (token) => {
    if (token) {
      try {
        const decoded = jwtDecode<JWTPayload>(token);
        set({ accessToken: token, user: decoded });

// Fectch  school data
      } catch (error) {
        console.error("Failed to decode token", error);
        set({ accessToken: null, user: null });
      }
    } else {
      set({ accessToken: null, user: null });
    }
  },

  logout: () => set({ accessToken: null, user: null }),
}));