import firebaseConfig from "config/firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export const fetchCollection = (collectionName: string) => {
  return db
    .collection(collectionName)
    .get()
    .then(res => {
      return res.docs.map(collection => {
        const returnCollection = collection.data();
        returnCollection.id = collection.id;
        return returnCollection;
      });
    });
};
