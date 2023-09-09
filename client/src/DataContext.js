// MyContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context with a default value (null in this case)
const DataContext = createContext(null);

// Create a custom provider component
export const DataContextProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const pushData = (newData) => {
      setData((prevData) => [...prevData, newData]);
    };
  
    return (
      <DataContext.Provider value={{ data, pushData }}>
        {children}
      </DataContext.Provider>
    );
};

export default DataContext;
