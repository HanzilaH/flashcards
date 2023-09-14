// MyContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/firebaseConfig';
import { collection, query, getDocs, setDoc, updateDoc,  getDoc, where, doc } from 'firebase/firestore';


// Create a context with a default value (null in this case)
const DataContext = createContext(null);

// Create a custom provider component
export const DataContextProvider = ({ children }) => {

  const {currentUser} = useAuth()

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        console.log('here');
        const userDocRef = doc(db, 'users', currentUser.uid); // 'users' is the name of my collection
    const userDoc = await getDoc(userDocRef);


        console.log(userDoc);
        if (userDoc.exists()) {
          console.log(userDoc);

          
          const userData = userDoc.data();
          console.log(userData);

          // Fetch additional data if needed
          const subjectsCollectionRef = collection(userDoc.ref, 'subjects');
          const subjectsDocs = await getDocs(subjectsCollectionRef);
          const subjectsData = subjectsDocs.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          // userData.subjects = subjectsData;
          console.log(subjectsData);
          setUserData(userData);
        }
      }else{
        setUserData(null)
      }
    };

    fetchUserData();
  }, [currentUser]);



// this works perfectly to create a user entry
  async function createUser(uid, name, emailInput) {
    try {
      const userDocRef = doc(db, 'users', uid); // 'users' is the name of your collection
      const userData = {
        displayName: name,
        email: emailInput,
        subjects: []

        // Add any other user data you want to store
      };
  
      // Set the user document with the provided data
      await setDoc(userDocRef, userData);
  
      console.log('User document created successfully.');
  
      return true;
    } catch (error) {
      console.error('Error creating user document:', error);
      return false;
    }
  }



  async function getUserByUID(uid) {
    try {
      const userDocRef = doc(db, 'users', uid); // 'users' is the name of your collection
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('User data:', userData);
  
        return userData;
      } else {
        console.log('User document does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }


  useEffect(()=>{
    if(currentUser){
      console.log(currentUser.uid);
      getUserByUID(currentUser.uid)
    }
  }, [currentUser])

  // async function createUserDocument(uid, displayName, email) {
  //   try {
  //     const userDocRef = doc(db, 'users', uid);
  //     const userData = {
  //       displayName,
  //       email,
  //       subjects: [] // Initialize the 'subjects' subcollection as an empty array
  //     };
  
  //     await setDoc(userDocRef, userData);
  //     return true; // Document creation successful
  //   } catch (error) {
  //     console.error('Error creating user document:', error);
  //     return false; // Document creation failed
  //   }
  // }

  
  // async function addSubjectToUserDocument(uid, newSubjectData) {
  //   try {
  //     const userDocRef = doc(db, 'users', uid);
  //     const userDocSnapshot = await getDoc(userDocRef);
  
  //     if (userDocSnapshot.exists()) {
  //       const userDocData = userDocSnapshot.data();
  //       console.log(userDocData);


  //        // Fetch additional data if needed
  //        const subjectsCollectionRef = collection(userDocSnapshot.ref, 'subjects');
  //        const subjectsDocs = await getDocs(subjectsCollectionRef);
  //        const subjectsData = subjectsDocs.docs.map((doc) => ({
  //          ...doc.data(),
  //          id: doc.id,
  //        }));

  //        // userData.subjects = subjectsData;
  //        console.log(subjectsData);


  //       const updatedSubjects = [...subjectsData, newSubjectData];
  
  //       // Update the 'subjects' field with the updated array
  //       await updateDoc(userDocRef, { subjects: updatedSubjects });
  //       return true; // Subject added successfully
  //     } else {
  //       console.error('User document does not exist.');
  //       return false; // User document does not exist
  //     }
  //   } catch (error) {
  //     console.error('Error adding subject to user document:', error);
  //     return false; // Adding subject failed
  //   }
  // }

  // useEffect(()=>{
  //   addSubjectToUserDocument(currentUser.uid, {name:'sub for abc', questions:['q1'], answers: ['a1']})
  // }, [currentUser])










    const [data, setData] = useState(

        [

            {
                subject: "sub1",
                questions: [
            {id:"1", question: "1", answer: "1a"}, 
        {id:"2",question: "2", answer: "2a"}, 
        {id:"3",question: "3", answer: "3a"}, 
        {id:"4", question: "4", answer: "4a"}]
            },
            {
                subject: "sub2",
                questions: [
                  {id:"1", question: "1", answer: "1a"}, 
              {id:"2",question: "2", answer: "2a"}, 
              {id:"3",question: "3", answer: "3a"}, 
              {id:"4", question: "4", answer: "4a"}]
            },
            {
                subject: "sub3",
                questions: [
                  {id:"1", question: "1", answer: "1a"}, 
              {id:"2",question: "2", answer: "2a"}, 
              {id:"3",question: "3", answer: "3a"}, 
              {id:"4", question: "4", answer: "4a"}]
            },
            {
                subject: "sub4",
                questions: [
                  {id:"1", question: "1", answer: "1a"}, 
              {id:"2",question: "2", answer: "2a"}, 
              {id:"3",question: "3", answer: "3a"}, 
              {id:"4", question: "4", answer: "4a"}]
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
                return { ...entry, questions: updatedQuestions };
              }
              return entry;
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
      <DataContext.Provider value={{ userData, data, pushData, currentSubject, setCurrentSubject, addSubjectEntry, removeEntryBySubject, removeQuestion, findQuestionArray, updateQuestionJson, createUser }}>
        {children}
      </DataContext.Provider>
    );
};

export default DataContext;
