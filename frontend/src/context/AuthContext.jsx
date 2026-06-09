import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bootstrap: check for existing token
  useEffect(() => {
    const token = localStorage.getItem('gatherly_token');
    if (!token) {
      setLoading(false);
      return;
    }
    authService
      .me()
      .then((res) => setUser(res.data.data))
      .catch(() => {
        // Token is invalid/expired — clear it and ensure user state is null
        localStorage.removeItem('gatherly_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    const res = await authService.login({ email, password });
    const { user: userData, token } = res.data.data;
    localStorage.setItem('gatherly_token', token);
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (name, email, password) => {
    setError(null);
    const res = await authService.register({ name, email, password });
    const { user: userData, token } = res.data.data;
    localStorage.setItem('gatherly_token', token);
    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(() => {
    // Clear both localStorage and React state synchronously so
    // any subsequent navigation sees no user immediately.
    localStorage.removeItem('gatherly_token');
    setUser(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
