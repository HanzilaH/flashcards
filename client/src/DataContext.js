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

        const updateQuestionJson = ( subject, oldQuestion, newQuestion) => {
          // Find the subject object in the previous data array
          const subjectObject = data.find((item) => item.subject === subject);
        
          // If the subject is found, update the questions array
          if (subjectObject) {
            const updatedQuestions = subjectObject.questions.map((questionObj) => {
              if (questionObj.question === oldQuestion.question && questionObj.answer === oldQuestion.answer) {
                // Replace the old question/answer pair with the new one
                return newQuestion;
              } else {
                // Keep the existing question/answer pair
                return questionObj;
              }
            });
        
            // Update the subject object with the updated questions array
            subjectObject.questions = updatedQuestions;
          }
        
          // Return the updated data array
          return [...data];
        };


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

        const removeEntryBySubject = (subjectName) => {
          setData((prevData) =>
            prevData.filter((entry) => entry.subject !== subjectName)
          );
        };

        const removeQuestion = (subjectName, questionToRemove) => {
          setData((prevData) =>
            prevData.map((entry) => {
              if (entry.subject === subjectName) {
                const updatedQuestions = entry.questions.filter(
                  (question) => question.question !== questionToRemove
                );
                // return { ...entry, questions: updatedQuestions };
              }
              // return entry;
            })
          );
        };
          


    const [currentSubject, setSubject] = useState("sub1")
    const setCurrentSubject = (data)=>{
        setSubject(data)
    }


    const findQuestionArray = (subjectName) => {
      const entry = data.find((entry) => entry.subject === subjectName);
    
      return entry ? entry.questions : null;
    };
  
    return (
      <DataContext.Provider value={{ data, pushData, currentSubject, setCurrentSubject, addSubjectEntry, removeEntryBySubject, removeQuestion, findQuestionArray, updateQuestionJson }}>
        {children}
      </DataContext.Provider>
    );
};

export default DataContext;
