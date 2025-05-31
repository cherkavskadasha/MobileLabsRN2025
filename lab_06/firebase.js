import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyjzMD2jVLxh92xQpd8a-fODYN1rD_dKs",
    authDomain: "lab06-60983.firebaseapp.com",
    projectId: "lab06-60983",
    storageBucket: "lab06-60983.firebasestorage.app",
    messagingSenderId: "580316287022",
    appId: "1:580316287022:web:0c2fe4c3468effd3384fbf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
