import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return action.payload;
      case 'CLEAR_TOKEN':
        return null;
      default:
        return state;
    }
  }, null);

  const setToken = (newToken) => {
    dispatch({ type: 'SET_TOKEN', payload: newToken });
  };

  const clearToken = () => {
    dispatch({ type: 'CLEAR_TOKEN' });
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
