import firebaseConfig from "config/firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import userSessionStore from "stores/userSessionStore";

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

export const fetchImage = (id: string) => {
  return db
    .doc("images/" + id)
    .get()
    .then(res => {
      return res.data();
    });
};

export const updateDoc = (
  collectionName: string,
  docName: string,
  data: any
) => {
  var docRef = db.collection(collectionName).doc(docName);

  return docRef
    .update(data)
    .then(() => {
      userSessionStore.notifications.push({
        message: docName + " Successfully updated!",
        autoHideDuration: 6000
      });
    })
    .catch(error => {
      // The document probably doesn't exist.
      userSessionStore.notifications.push({
        message: "Error updating " + docName + ": " + error,
        autoHideDuration: 6000
      });
    });

  return;
};
