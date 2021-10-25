import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider).then((res) => {
	console.log(res);
	if(res.additionalUserInfo.isNewUser){
		const user = auth.currentUser;
		db.collection("users").doc(auth.currentUser.uid).set({
			uid: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL
		})
		.then(() => console.log("firebase.js","New user added"))
		.catch((error) => console.log("firebase.js",error));
	}
}).catch((err) => {
	switch (err.code) {
		case "auth/wrong-password":
			break;
		case "auth/invalid-email":
			break;
	}
});
export { auth }
export default db