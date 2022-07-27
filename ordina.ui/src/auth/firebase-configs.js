import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getAuth, signInWithPopup,
  GoogleAuthProvider, onAuthStateChanged,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDF2HDBojl1NvCIQGG7P1x3Add12g5Mfv8',
  authDomain: 'salt-auth.firebaseapp.com',
  projectId: 'salt-auth',
  storageBucket: 'salt-auth.appspot.com',
  messagingSenderId: '747984101573',
  appId: '1:747984101573:web:30ead1d577748f6721d0ac',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signIn = () => signInWithPopup(auth, provider)
  .then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    // const { user } = result;
    // ...
    console.log(result.user);
  }).catch(error => {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(`google credential ${credential}`);
  });

const getUsers = async () => {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
};

export {
  getUsers, app, auth, signIn, onAuthStateChanged,
};
