import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import './Login.css';
import { Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../../Hooks/useFirebase';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../../../../redux/actions';
import initializeFirebase from '../../../../Firebase/Firebase.init';
initializeFirebase()
const Login = () => {

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState({});
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({});
    const { email, password } = loginData;
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    console.log('authError', authError);
    const history = useHistory();
    const location = useLocation();
    // console.log(email, password)
    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newloginData = { ...loginData };
        newloginData[field] = value;
        setLoginData(newloginData);
    }
    console.log(email, password)

    // login user
    const loginUser = (e) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                dispatch(firebase(userCredential.user));
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('login succcessful');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
        e.preventDefault();
    }
    // console.log(user)

    // Google signin
    // const signInUsingGoogle = () => {
    //     setIsLoading(true);
    //     const googleProvider = new GoogleAuthProvider();
    //     const destination = location?.state?.from || '/';
    //     history.replace(destination);
    //     return signInWithPopup(auth, googleProvider)
    // }
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
                        <form onSubmit={loginUser}>
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
                            >Login</Button>
                        </form>
                        <Link to='signup' className='text-decoration-none'><Typography className='font text-color'>New user? Please register</Typography></Link>
                        <Typography>------------------- OR ----------------</Typography>
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

export default Login;