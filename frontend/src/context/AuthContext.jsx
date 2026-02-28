import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

const STORAGE_KEY = "real_estate_auth";

const getInitialAuth = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { user: null, token: null };

  try {
    return JSON.parse(raw);
  } catch (_error) {
    return { user: null, token: null };
  }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getInitialAuth);

  const persist = (payload) => {
    setAuth(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const login = async (credentials) => {
    const data = await api.login(credentials);
    persist({ user: data.user, token: data.token });
    return data;
  };

  const register = async (payload) => {
    const data = await api.register(payload);
    persist({ user: data.user, token: data.token });
    return data;
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token),
      login,
      register,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
