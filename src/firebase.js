import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
	apiKey: "AIzaSyC1aImaP6UJdCqXonkW93UlDv1o-PfLFFA",
	authDomain: "foodie-2ecd7.firebaseapp.com",
	projectId: "foodie-2ecd7",
	storageBucket: "foodie-2ecd7.appspot.com",
	messagingSenderId: "788384583151",
	appId: "1:788384583151:web:72c7a2c17dfdfa12f5ba1a"
});

const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
// signInWithGoogle() function.
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