// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*
service firebase.storage {
 match /b/{bucket}/o {
   match /{allPaths=**} {
      allow read;
  allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
    }
  }
}

*/
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "instagram-lite-nextjs.firebaseapp.com",
  projectId: "instagram-lite-nextjs",
  storageBucket: "instagram-lite-nextjs.appspot.com",
  messagingSenderId: "245678058670",
  appId: "1:245678058670:web:79c3eddb273a83ce42113f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

