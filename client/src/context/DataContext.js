// MyContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/firebaseConfig';
import { collection, query, getDocs, setDoc, updateDoc,  getDoc, where, doc } from 'firebase/firestore';
import { addDataToSubjects } from './DbFunctions';





// Create a context with a default value (null in this case)
const DataContext = createContext(null);

// Create a custom provider component
export const DataContextProvider = ({ children }) => {

  const {currentUser} = useAuth()


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
        }
    ]
    
    );

    const [currentSubject, setSubject] = useState("sub1")




  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        // console.log('here');
        const userDocRef = doc(db, 'users', currentUser.uid); // 'users' is the name of my collection
    const userDoc = await getDoc(userDocRef);


        // console.log(userDoc);
        if (userDoc.exists()) {
          // console.log(userDoc);

          
          const userData = userDoc.data();
          // console.log(userData.subjects);





          // const transformedData = userData.subjects.map((sub)=>{

          //   return {id:sub.id, subject: sub.name, questions: [{id:"1", question: "1", answer: "1a"}, {id:"2", question: "2", answer: "2a"}] }

          // })

          // console.log(transformedData);
          setData(userData.subjects)


          // this was for a stupid attempt for a subcollection within a collection
          // const subjectsCollectionRef = collection(userDoc.ref, 'subjects');
          // const subjectsDocs = await getDocs(subjectsCollectionRef);
          // const subjectsData = subjectsDocs.docs.map((doc) => ({
          //   ...doc.data(),
          //   id: doc.id,
          // }));

          // // userData.subjects = subjectsData;
          // console.log(subjectsData);
        }
      }else{
      }
    };

    fetchUserData();
  }, [currentUser]);






  async function getUserByUID(uid) {
    try {
      const userDocRef = doc(db, 'users', uid); // 'users' is the name of your collection
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        // console.log('User data:', userData);
  
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

      // console.log(currentUser.uid);
      getUserByUID(currentUser.uid)
    }else{
      setData([])
    }
  }, [currentUser])



  useEffect(()=>{


    if (currentUser){

      addDataToSubjects(currentUser.uid,  data)
      .then((success) => {
       if (success) {
         console.log('Subjects array updated successfully.');
       } else {
        //  console.error('Failed to update subjects array.');
       }
     })
     .catch((error) => {
       console.error('Error:', error);
     });
    }


  },[data])


  








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
                console.log("here");
                console.log(questionToRemove);
                const updatedQuestions = entry.questions.filter(
                  (question) => question.question !== questionToRemove

                );

                console.log(updatedQuestions);
                return { ...entry, questions: updatedQuestions };
              }
              return entry;
            })
          );
        };
          


    const setCurrentSubject = (data)=>{
        setSubject(data)
    }


    const findQuestionArray = () => {

      const entry = data.find((entry) => entry.subject === currentSubject);
      // console.log(entry);
    
      return entry ? entry.questions : [];
    };
  
    return (
      <DataContext.Provider value={{  data, pushData, currentSubject, setCurrentSubject, addSubjectEntry, removeEntryBySubject, removeQuestion, findQuestionArray, updateQuestionJson }}>
        {children}
      </DataContext.Provider>
    );
};

export default DataContext;
