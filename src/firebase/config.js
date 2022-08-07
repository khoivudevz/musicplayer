import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBvaD1WLckbfnnLzNOSQrIugZEh-9oec5o",
  authDomain: "chill-music-bd2c6.firebaseapp.com",
  databaseURL:
    "https://chill-music-bd2c6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chill-music-bd2c6",
  storageBucket: "chill-music-bd2c6.appspot.com",
  messagingSenderId: "685447385074",
  appId: "1:685447385074:web:419011b616920f5f66e56b",
  measurementId: "G-YBS19YKH6Y",
};

export const app = initializeApp(firebaseConfig);
