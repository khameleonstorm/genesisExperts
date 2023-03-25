import { initializeApp, getApps, getApp } from '@firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK8o8cgpKN0E7mu5mJMaVJ3uWJY5HqoLA",
  authDomain: "genesisxperts.firebaseapp.com",
  projectId: "genesisxperts",
  storageBucket: "genesisxperts.appspot.com",
  messagingSenderId: "765816997408",
  appId: "1:765816997408:web:0a85f8172371a499e2de45"
};
// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); 

// init services
  const db = getFirestore(app)
  const Auth = getAuth(app)
  const storage = getStorage(app);

  
  export { db, storage, Auth }