import { create } from 'zustand';

interface AuthState {
  lastToken: string | null;
  setLastToken: (token: string | null) => void; 
}

export const useLastTokenStore = create<AuthState>((set) => ({
  lastToken: null,
  setLastToken: (token) => set({ lastToken: token }), 
}));