import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf5RjmPFiUYfINs1Mdh3V6RZhCPsrSB7Q",
  authDomain: "stock-cable.firebaseapp.com",
  projectId: "stock-cable",
  storageBucket: "stock-cable.appspot.com",
  messagingSenderId: "437778650217",
  appId: "1:437778650217:web:0b5edc51e4d73d7d7dfef8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
