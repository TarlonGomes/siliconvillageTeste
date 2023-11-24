import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore/lite";

export const app = initializeApp({
  apiKey: "AIzaSyBcg96jX2jNjMxcHNBR49gkjK2fZqDzDCs",
  authDomain: "com.siliconvillageteste",
  databaseURL: "https://siliconvillageteste.firebaseio.com",
  projectId: "siliconvillageteste",
  storageBucket: "siliconvillageteste.appspot.com",
  appId: "1:522162960687:android:5b5cc4a8ee943473b3c9da",
});

export const db = getFirestore(app);

export async function getNumbers() {
  const numberRef = collection(db, "teste");
  const q = query(numberRef, orderBy("Id", "desc"));
  const numbersSnapshot = await getDocs(q);
  const numberList = numbersSnapshot.docs.map((doc) => doc.data());
  return numberList as {
    Id: number;
    value: number;
  }[];
}

export async function getNumber(props: { id: number }) {
  const numbersRef = collection(db, "teste");
  const q = query(numbersRef, where("Id", "==", props.id), limit(1));
  const res = await getDocs(q);
  const number = res.docs[0]?.data();
  return number as {
    Id: number;
    value: number;
  };
}

export async function insertNumber(props: { number: number }) {
  const randomId = new Date().getTime();
  const numbers = collection(db, "teste");
  const add = await addDoc(numbers, {
    value: props.number,
    Id: Number(randomId),
  });

  return { add, randomId };
}
