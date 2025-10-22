// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLGH5Nbky2knL5z5CoVtoL78XIiTcOrbY",
  authDomain: "campus-lost-and-found-e2c56.firebaseapp.com",
  projectId: "campus-lost-and-found-e2c56",
  storageBucket: "campus-lost-and-found-e2c56.appspot.com",
  messagingSenderId: "718592375701",
  appId: "1:718592375701:web:b3bf0724536feb21c5949c",
  measurementId: "G-NDG07WN5QQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Analytics (browser only)
let analytics = null;
isSupported().then((supported) => {
  if (supported && typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
});

export { auth, analytics };
