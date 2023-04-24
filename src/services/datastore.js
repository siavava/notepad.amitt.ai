// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// import { firebase } from '@firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCmWMaXTBvV7mj-TmqyBn4ywmjo3iBHl8w',
  authDomain: 'firenotes-c.firebaseapp.com',
  databaseURL: 'https://firenotes-c-default-rtdb.firebaseio.com',
  projectId: 'firenotes-c',
  storageBucket: 'firenotes-c.appspot.com',
  messagingSenderId: '1049417737081',
  appId: '1:1049417737081:web:ba2f7e745c64fa2a2445a8',
  measurementId: 'G-QE23EEVP8P',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function onNotesValueChange(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const notes = snapshot.val();
    callback(notes);
  });
}

/**
 * Saves a **new** note to the database.
 * @param {*} note: the note to save.
 */
export function addNote(note) {
  firebase.database().ref('notes').push(note);
}

/**
 * Updates an existing note in the database.
 * @param {string} id: the id of the note to update.
 * @param {*} updates: the updates to apply.
 */
export function updateNote(id, updates) {
  // update only the fields that are passed in the note object
  firebase.database().ref('notes').child(id).update(updates);
}

/**
 * Delete an existing note from the database.
 * @param {*} id: the id of the note to delete.
 */
export function deleteNote(id) {
  firebase.database().ref('notes').child(id).remove();
}
