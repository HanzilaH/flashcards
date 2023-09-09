// MyContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context with a default value (null in this case)
const DataContext = createContext(null);

// Create a custom provider component
export const DataContextProvider = ({ children }) => {
    const [data, setData] = useState(

        [

            {
                subject: "sub1",
                questions: [
            {question: "1", answer: "1a"}, 
        {question: "2", answer: "2a"}, 
        {question: "3", answer: "3a"}, 
        {question: "4", answer: "4a"}]
            },
            {
                subject: "sub2",
                questions: [
            {question: "1", answer: "1a"}, 
        {question: "2", answer: "2a"}, 
        {question: "3", answer: "3a"}, 
        {question: "4", answer: "4a"}]
            },
            {
                subject: "sub3",
                questions: [
            {question: "1", answer: "1a"}, 
        {question: "2", answer: "2a"}, 
        {question: "3", answer: "3a"}, 
        {question: "4", answer: "4a"}]
            },
            {
                subject: "sub4",
                questions: [
            {question: "1", answer: "1a"}, 
        {question: "2", answer: "2a"}, 
        {question: "3", answer: "3a"}, 
        {question: "4", answer: "4a"}]
            }
        ]
        
        );
        // const [data, setData] = useState([{question: "1", answer: "1a"}, {question: "2", answer: "2a"}, {question: "3", answer: "3a"}, {question: "4", answer: "4a"}]);


        const pushData = (newData) => {
            setData((prevData) => {
              // Find the subject object with the matching name
              const subjectObjectIndex = prevData.findIndex(
                (element) => element.subject === currentSubject
              );
          
              if (subjectObjectIndex !== -1) {
                // If the subject exists, update its questions array
                const updatedData = [...prevData];
                updatedData[subjectObjectIndex].questions.push(newData);
          
                return updatedData;
              } else {
                // If the subject doesn't exist, create a new subject object
                const newSubjectObject = {
                  subject: currentSubject,
                  questions: [newData],
                };
          
                return [...prevData, newSubjectObject];
              }
            });
          };

        const addSubjectEntry = (subjectName)=>{
            setData(prevData=> [...prevData, {
                subject: subjectName,
                questions: []
            }])
        }
          

    // const currentSubject = null
    const [currentSubject, setSubject] = useState(null)
    const setCurrentSubject = (data)=>{
        setSubject(data)
    }
  
    return (
      <DataContext.Provider value={{ data, pushData, currentSubject, setCurrentSubject, addSubjectEntry }}>
        {children}
      </DataContext.Provider>
    );
};

export default DataContext;
