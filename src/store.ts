import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useStore = create<AuthState>((set: (arg0: { token: any; }) => any) => ({
  token: null,
  setToken: (token: any) => set({ token }),
}));