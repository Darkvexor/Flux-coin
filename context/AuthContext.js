import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { authAPI } from '../lib/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cachedUser = localStorage.getItem('flux_user');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (e) {}
    }
    setLoading(false);
  }, []);

  const register = async (formData) => {
    try {
      const { data } = await authAPI.register(formData);
      Cookies.set('flux_token', data.token, { expires: 7 });
      setUser(data.user);
      localStorage.setItem('flux_user', JSON.stringify(data.user));
      toast.success('Account created!');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.error || 'Registration failed';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      Cookies.set('flux_token', data.token, { expires: 7 });
      setUser(data.user);
      localStorage.setItem('flux_user', JSON.stringify(data.user));
      toast.success('Welcome back!');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.error || 'Login failed';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    Cookies.remove('flux_token');
    localStorage.removeItem('flux_user');
    setUser(null);
    toast.success('Logged out');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);