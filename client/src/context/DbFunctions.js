


import React from "react";
import { db } from "../firebase/firebaseConfig";
import {arrayUnion, collection, query, getDocs, setDoc, updateDoc,  getDoc, where, doc } from 'firebase/firestore';


import { useState } from "react";


 


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
  
      // Retrieve the current user document data
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
  


        const combinedArray = [].concat(...userData.subjects, ...subjectData);

  
        // Update the user document with the modified 'subjects' array
        await updateDoc(userDocRef, { subjects: combinedArray });
  
        console.log('Subject added to the user successfully.');
  
        return true;
      } else {
        console.error('User document does not exist.');
        return false;
      }
    } catch (error) {
      console.error('Error adding subject to the user:', error);
      return false;
    }
  }



  export async function getSubjectsArray(uid) {
    try {
      const userDocRef = doc(db, 'users', uid);
  
      // Retrieve the current user document data
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
  
        // Check if the 'subjects' array exists in the user data
        if (userData && userData.subjects) {
          return userData.subjects;
        } else {
          console.error('Subjects array not found in user data.');
          return []; // Return an empty array if 'subjects' doesn't exist
        }
      } else {
        console.error('User document does not exist.');
        return null; // Return null if the user document doesn't exist
      }
    } catch (error) {
      console.error('Error fetching subjects array:', error);
      return null; // Return null in case of an error
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






export  async function addDataToSubjects(uid, data) {
  // console.log(data);
    try {
      // Reference to the user's document in Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDocSnapshot = await getDoc(userDocRef);


      // const userRef = db.collection('users').doc(uid);
      if (userDocSnapshot.exists()) {
        // const userData = userDocSnapshot.data();

        await updateDoc(userDocRef, {
          subjects: data,
        });

      }
  

  
      // console.log(`Data updated for UID: ${uid}`);
    } catch (error) {
      console.error(`Error updating data for UID ${uid}: ${error}`);
    }
  }

