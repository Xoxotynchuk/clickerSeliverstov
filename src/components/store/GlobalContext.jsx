import React, {  } from "react";
const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  return (
  <GlobalContext.Provider 
  value={{}}>
    {children}
</GlobalContext.Provider>
  )
};

export { GlobalContext, GlobalProvider };
