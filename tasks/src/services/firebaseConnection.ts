import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBONLuT-w01cl8Bpn1nr6RnC2Mxnn6nqxg",
  authDomain: "tarefasplus-2e0d3.firebaseapp.com",
  projectId: "tarefasplus-2e0d3",
  storageBucket: "tarefasplus-2e0d3.appspot.com",
  messagingSenderId: "208278626373",
  appId: "1:208278626373:web:b0a27417b866cd8c12432c",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
