import { createContext, useState, useContext } from 'react';

export const App = createContext({});

export function AppContext({ children }) {
  const [bills, setBills] = useState({});

  const saveBills = (data) => {
    setBills(data);
  };

  return <App.Provider value={{ bills, saveBills }}>{children}</App.Provider>;
}

export function useBill() {
  const context = useContext(App);
  return context;
}
