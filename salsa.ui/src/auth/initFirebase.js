import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { // NOTE Old import, removing those not used
//   getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,
// } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCWfWSpcDHX6dK2WKfmW0-Cl-1Bpf6Ee18',
  authDomain: 'salsa-9e0ce.firebaseapp.com',
  projectId: 'salsa-9e0ce',
  storageBucket: 'salsa-9e0ce.appspot.com',
  messagingSenderId: '860464436589',
  appId: '1:860464436589:web:eaea969e792f67ca517664',
  measurementId: 'G-LMBWMBFRX6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signIn = () => signInWithPopup(auth, provider)
  .then(result => { // NOTE old line, do not know function other than logging
  // .then(() => { // NOTE replacement since wasn't used
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

// const getUsers = async () => {
//   const usersCol = collection(db, 'users');
//   const userSnapshot = await getDocs(usersCol);
//   const userList = userSnapshot.docs.map(doc => doc.data());
//   return userList;
// };

export { auth, signIn };
// export { // NOTE old export, removing objects that are not used
//   getUsers, app, auth, signIn, onAuthStateChanged,
// };
