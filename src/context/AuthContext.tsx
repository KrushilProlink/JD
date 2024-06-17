// src/context/AuthContext.tsx
import React, { createContext, useReducer, useContext, useEffect, ReactNode, FC } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; token: string } | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextProps extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { username: string; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'LOADING' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername && state.user && storedUsername !== state.user.username) {
      logout();
    }
  }, [state]);

  const login = async (username: string, password: string) => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await axios.post('/api/login', { username, password });
      const decodedToken: { username: string } = jwtDecode(response.data.token);

      if (decodedToken.username === username) {
        localStorage.setItem('username', username);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { username, token: response.data.token } });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Username mismatch' });
      }
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Login failed' });
    }
  };

  const logout = () => {
    localStorage.removeItem('username');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Check if the user stored in the state matches the username in local storage
  const storedUsername = localStorage.getItem('username');
  if (storedUsername && context.user && storedUsername !== context.user.username) {
    context.logout();
  }

  return context;
};
