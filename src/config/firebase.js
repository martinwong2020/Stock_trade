
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCZqyGQIQ1MBQurNU8Z7YGhT8I5_KPVi4",
  authDomain: "stock-8c55d.firebaseapp.com",
  projectId: "stock-8c55d",
  storageBucket: "stock-8c55d.appspot.com",
  messagingSenderId: "412641457641",
  appId: "1:412641457641:web:aa9fa45a1db788f62c4778",
  measurementId: "G-DQB3GEB5GY"
};

const app = initializeApp(firebaseConfig);
export const google_auth=new GoogleAuthProvider();
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

export const db=getFirestore(app);