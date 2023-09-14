


import React from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, getDocs, setDoc, updateDoc,  getDoc, where, doc } from 'firebase/firestore';



// this works perfectly to create a user entry
export async function createUser(uid, name, emailInput) {
    try {
      const userDocRef = doc(db, 'users', uid); // 'users' is the name of collection
      const userData = {
        displayName: name,
        email: emailInput,
        subjects: []

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



// DONOT FORGET TO SEND THE IDS AS PART OF USER DATA
  export async function addSubjectToUser(uid, subjectData) {
    try {
      const userDocRef = doc(db, 'users', uid);
      
      await updateDoc(userDocRef, {
        subjects: [...subjectData], // Add the new subject data to the existing 'subjects' array
      });
  
      console.log('Subject added to the user successfully.');
  
      return true;
    } catch (error) {
      console.error('Error adding subject to the user:', error);
      return false;
    }
  }


  export async function deleteSubjectFromUser(uid, subjectIdToDelete) {
    try {
      const userDocRef = doc(db, 'users', uid);
  
      // Fetch the user's document data
      const userDocSnapshot = await getDoc(userDocRef);
      
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        
        // Filter out the subject entry to be deleted
        // i am gonna use timestamp for the subject entries
        const updatedSubjects = userData.subjects.filter((subject) => subject.id !== subjectIdToDelete);
        
        // Update the 'subjects' array in the user's document with the filtered data
        await updateDoc(userDocRef, {
          subjects: updatedSubjects,
        });
  
        console.log('Subject deleted from the user successfully.');
  
        return true;
      } else {
        console.error('User document does not exist.');
        return false;
      }
    } catch (error) {
      console.error('Error deleting subject from the user:', error);
      return false;
    }
  }









