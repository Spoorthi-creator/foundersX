import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCVfwY60ZxX-hJ_LY1tC0LiiCOEpc1Fcaw",
  authDomain: "founderx-8c7dc.firebaseapp.com",
  projectId: "founderx-8c7dc",
  storageBucket: "founderx-8c7dc.appspot.com",
  messagingSenderId: "786132528473",
  appId: "1:786132528473:web:0c7a4cff011a7df001f048"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase.firestore()