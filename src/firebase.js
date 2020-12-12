import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA8KOhSekqynFsWuHqTSriGd_DQ3Ow6yP4",
    authDomain: "clone-dc5ee.firebaseapp.com",
    projectId: "clone-dc5ee",
    storageBucket: "clone-dc5ee.appspot.com",
    messagingSenderId: "648747931031",
    appId: "1:648747931031:web:8c32e0c6a36ce24cc460d2",
    measurementId: "G-LT2EVN32N8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  export { db, auth }