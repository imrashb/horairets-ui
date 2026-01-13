const { beforeUserCreated, beforeUserDeleted } = require("firebase-functions/v2/identity");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createUser = beforeUserCreated((event) => {
  const user = event.data;
  const firestore = admin.firestore();
  const document = firestore.collection("users").doc(user.uid);
  const data = {
    uid: user.uid,
  };
  return document.set(data);
});

exports.deleteUser = beforeUserDeleted((event) => {
  const user = event.data;
  const firestore = admin.firestore();
  const document = firestore.collection("users").doc(user.uid);
  return document.delete();
});

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
