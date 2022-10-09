import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCWfWSpcDHX6dK2WKfmW0-Cl-1Bpf6Ee18',
  authDomain: 'salsa-9e0ce.firebaseapp.com',
  projectId: 'salsa-9e0ce',
  storageBucket: 'salsa-9e0ce.appspot.com',
  messagingSenderId: '860464436589',
  appId: '1:860464436589:web:eaea969e792f67ca517664',
  measurementId: 'G-LMBWMBFRX6',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signIn = () => signInWithPopup(auth, provider)
  .catch(error => {
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(`google credential ${credential}`);
  });

export { auth, signIn };
