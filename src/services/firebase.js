// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBY71slZXJaRJ46SAAB4j-rWDb79gvKZcA",
  authDomain: "smart-inventory-fcbab.firebaseapp.com",
  projectId: "smart-inventory-fcbab",
  storageBucket: "smart-inventory-fcbab.firebasestorage.app",
  messagingSenderId: "798067869760",
  appId: "1:798067869760:web:7f83b43e0e91bf132bb7a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;