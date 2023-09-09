// MyContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context with a default value (null in this case)
const DataContext = createContext(null);

// Create a custom provider component
export const DataContextProvider = ({ children }) => {
    const [data, setData] = useState(
        {
            subject: "sub1",
            questions: [
        {question: "1", answer: "1a"}, 
    {question: "2", answer: "2a"}, 
    {question: "3", answer: "3a"}, 
    {question: "4", answer: "4a"}]
        }
        
        );
        // const [data, setData] = useState([{question: "1", answer: "1a"}, {question: "2", answer: "2a"}, {question: "3", answer: "3a"}, {question: "4", answer: "4a"}]);


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
