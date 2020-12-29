import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import firebaseConfig from './Firebase.Config';

export const initializeLoginFramework = ()=>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    firebase.analytics();
    firebase.analytics().logEvent('notification_received');
}


export const googleSignInUser = ()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
          const {displayName, email, photoURL} = res.user;
          const signIn = {
              isSignIn : true,
              name: displayName,
              email: email,
              photo: photoURL,
              success: true
          };
          return signIn;
        //   setUser(signIn);
        //   setLoggedInUser(signIn);
        //   history.replace(from);

          console.log(displayName, email, photoURL);
          console.log(res);
      })
      .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorMessage, email);
      })
}

export const googleSignOutUser = ()=>{
    return firebase.auth().signOut()
    .then(res => {
        const signOut =  {
            isSignIn : false,
            name: '',
            email: '',
            photo: '' 
        }
        return signOut;
        // setUser(signOut);
        // setLoggedInUser(signOut);
      })
    .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}

export const handleFacebookUser = ()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(result => {
    const token = result.credential.accessToken;
    const user = result.user;
    user.success = true ;
    console.log('facebook', result, token, user);
    return user;
    })
    .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
    });
}

export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUser(name);
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;

        })
}

export const signInWithEmailAndPassword = (email, password) =>{
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
            // setUser(newUserInfo);
            // setLoggedInUser(newUserInfo);
            // history.replace(from);
            // console.log('user sign in successfully', res.user);
        })
        .catch((error) => {
            const userErrorInfo = {};
            userErrorInfo.success = false;
            userErrorInfo.error = error.message;
            return userErrorInfo;
        });
}
  

const updateUser = name =>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
        })
        .then(() => {
            console.log('successfully submitted');
        })
        .catch(error=> {
            console.log(error);
    });
}