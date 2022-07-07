import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCwYctmoCPahdLcTW4JhPT1-M3TetXZWhQ",
  authDomain: "footstorage-4c7c9.firebaseapp.com",
  projectId: "footstorage-4c7c9",
  storageBucket: "footstorage-4c7c9.appspot.com",
  messagingSenderId: "116924519694",
  appId: "1:116924519694:web:d3f68aebf0c1469681335f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getProducts = async () => {

  const querySnapshot = await getDocs(collection(db, "Products"));

  const products = [];

  querySnapshot.forEach((doc) => {
    products.push(doc);
  });

  return products;

}

export const getProduct = async (id) => {

  const docRef = doc(db, "Products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap
  } else {
    console.log("No such document!");
  }

}

