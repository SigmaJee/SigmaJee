import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create context
const TestProvider = createContext();

// Create provider
export const TestContext = ({ children }) => {
  const api = import.meta.env.VITE_API;
  const [trig, settrig] = useState(false);
  const [Attempted, setAttempted] = useState([]);
  const [Unattempted, setUnAttempted] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api}/get-userTest`);
        setUnAttempted(res.data?.UnAttempted);  // ✅ match new API structure
        setAttempted(res.data?.Attempted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [trig]);

  return (
    <TestProvider.Provider value={{ Attempted, Unattempted, settrig }}>
      {children}
    </TestProvider.Provider>
  );
};

// Custom hook to use this context
export const TestAuth = () => {
  return useContext(TestProvider);
};
