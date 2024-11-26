import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();

export const signInWithGoogle = async () => {
    try {
        const ggProvider = new GoogleAuthProvider(auth);
        let result = await signInWithPopup(auth, ggProvider);
        console.log("Login successfully");
        console.log(result.user.reloadUserInfo);
        return result.user.reloadUserInfo;
    } catch (error) {
        console.error(error);
    }
    //Sign in with Google
    // var token = result.credential.accessToken;
    // var user = result.user;
    // console.log("User>>Goole>>>>", user);
    // userId = user.uid;
};
