import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import initializeFirebase from "../Firebase/Firebase.init";
import { useDispatch } from "react-redux";
import { firebase } from "../redux/actions";

initializeFirebase();

 export const auth = getAuth();
// Google signin
// const signInUsingGoogle = () => {
//     setIsLoading(true);
//     const googleProvider = new GoogleAuthProvider();

//     return signInWithPopup(auth, googleProvider)
// }
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const dispatch = useDispatch();
    // const [admin, setAdmin] = useState(false);


    // // creating user
    // const registerUser = (email, password, name, photo, history) => {
    //     setIsLoading(true);
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             setAuthError('');
    //             const newUser = { email, displayName: name, photoURL: photo };
    //             setUser(newUser);
    //             // save user to the database
    //             // saveUser(email, password, name, 'POST');
    //             // send name to firebase after creation
    //             updateProfile(auth.currentUser, {
    //                 displayName: name,
    //                 photoURL: photo
    //             }).then(() => {
    //             }).catch((error) => {
    //             });
    //             history.replace('/');
    //         })
    //         .catch((error) => {
    //             setAuthError(error.message);
    //         })
    //         .finally(() => setIsLoading(false));
    // }

    // // login user
    // const loginUser = (email, password, location, history) => {
    //     setIsLoading(true);
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             const destination = location?.state?.from || '/';
    //             history.replace(destination);
    //             setAuthError('');
    //         })
    //         .catch((error) => {
    //             setAuthError(error.message);
    //         })
    //         .finally(() => setIsLoading(false));
    // }

    // observer user state
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user);
    //         } else {
    //             setUser({})
    //         }
    //         setIsLoading(false);
    //     });
    //     return () => unsubscribe;
    // }, [auth])

    // admin
    // useEffect(() => {
    //     fetch(`https://intense-dawn-05513.herokuapp.com/users/${user.email}`)
    //         .then(res => res.json())
    //         .then(data => setAdmin(data.admin))
    // }, [user.email])

    // log out
    // const logOut = () => {
    //     signOut(auth)
    //         .then(() => {
    //             // Sign-out successful.
    //         })
    //         .catch((error) => {
    //             // An error happened.
    //         })
    //         .finally(() => setIsLoading(false));
    // }

    // const saveUser = (email, password, displayName, method) => {
    //     const user = { email, password, displayName };
    //     fetch('https://intense-dawn-05513.herokuapp.com/users', {
    //         method: method,
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then()
    // }
    // const firebase = {
    //     user: user,
    //     isLoading: isLoading,
    //     authError: authError,
    //     registerUser,
    //     loginUser,
    //     logOut
    // }

    // console.log(firebase)
    // useEffect(() => {
    //     dispatch(firebase(firebase))
    //     // Safe to add dispatch to the dependencies array
    // }, [dispatch])
    return {
        // user,
        // // admin,
        // isLoading,
        // authError,
        // registerUser,
        // loginUser,
        // logOut
    }
}

export default useFirebase;