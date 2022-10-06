import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOdp0DYKGiIWWC9mhB-taIH0E_vnZ0hZY",
  authDomain: "dobby-ads-3f7ec.firebaseapp.com",
  projectId: "dobby-ads-3f7ec",
  storageBucket: "dobby-ads-3f7ec.appspot.com",
  messagingSenderId: "460772156648",
  appId: "1:460772156648:web:11a0b7f06ca0dfe16d955d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth