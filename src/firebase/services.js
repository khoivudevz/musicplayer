import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getStorage,
} from "firebase/firestore";
import { app } from "./config";

const firestore = getFirestore(app);
const db = getFirestore();

export const writeData = async () => {
  const result = await addDoc(collection(firestore, "music"), {
    name: "test",
    image: "https://picsum.photos/200/300",
    time: "02:00",
    singer: "khoi",
    src: "abccccccc",
  });
  console.log("result", result);
};

export const getDocument = async () => {
  const colRef = collection(db, "music");
  const docsSnap = await getDocs(colRef);
  docsSnap.forEach((doc) => {
    console.log(doc.data());
  });
};
