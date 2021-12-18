import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../../../../Hooks/useFirebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import initializeFirebase from '../../../../Firebase/Firebase.init';
import { firebase } from '../../../../redux/actions';
import { useLocation } from 'react-router-dom';
initializeFirebase()
const SignUp = () => {

    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const [signupData, setSignupData] = useState({});
    const {photo, name, email, password} = signupData;
    const [user, setUser] = useState({});
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const history = useHistory();

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newSignupData = { ...signupData };
        newSignupData[field] = value;
        setSignupData(newSignupData);
    }

    // creating user
    const registerUser = (e) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name, photoURL: photo };
                setUser(newUser);
                dispatch(firebase(newUser));
                // save user to the database
                // saveUser(email, password, name, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photo
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
        e.preventDefault();
    }

    // observer user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth])

    // Google signin
    const signInUsingGoogle = () => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log('from google', result.user);
                setUser(result.user);
                dispatch(firebase(result.user));
                const destination = location?.state?.from || '/';
                history.replace(destination);
            })
            .finally(() => setIsLoading(false));
    }
    
    return (
        <Box className="loginContainer">
            <Box className='login'>
                <Grid container spacing={2} sx={{ padding: '30px' }}>
                    <Grid item xs={12} md={6} className='login-text-field'>
                        <Box>
                            <Typography variant="h4" className='text-color font mb-3'>Barta Bahok</Typography>
                            <Typography variant="h6" className='text-muted font'>A social Communicational media to communicate with new people</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} className='login-input-field'>
                        <form onSubmit={registerUser}>
                            <TextField
                                name='photo'
                                onBlur={handleOnBlur}
                                label="Photo URL"
                                color="secondary"
                                placeholder='Photo URL'
                                sx={{ width: '100%', mb: 2 }}
                                focused />
                            <TextField
                                name='name'
                                onBlur={handleOnBlur}
                                label="Your Name"
                                color="secondary"
                                placeholder='Your Name'
                                sx={{ width: '100%', mb: 2 }}
                                focused />
                            <TextField
                                name='email'
                                onBlur={handleOnBlur}
                                label="Your Email"
                                type="email"
                                color="secondary"
                                placeholder='Your Name'
                                sx={{ width: '100%', mb: 2 }}
                                focused />
                            <TextField
                                name='password'
                                onBlur={handleOnBlur}
                                label="Your Password"
                                color="secondary"
                                placeholder='Your Password'
                                sx={{ width: '100%', mb: 1 }}
                                focused />
                            <Button
                                type="submit"
                                variant='contained'
                                color="secondary"
                                size="large"
                                sx={{ width: '100%', mb: 1 }}
                            >Sign up</Button>
                        </form>
                        <Link to="/login" className='text-decoration-none'>
                            <Typography className='font text-color'>Already registered? Please login</Typography>
                        </Link>
                        <Typography className='font text-color'>------------------- OR ----------------</Typography>
                        <Button
                            onClick={signInUsingGoogle}
                            variant='contained'
                            color="error"
                            endIcon={<GoogleIcon />}
                            size="large"
                            sx={{ width: '100%' }}
                        >Continue With Google</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SignUp;