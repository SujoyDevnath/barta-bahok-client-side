import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../../Hooks/useFirebase';
import { firebase } from '../../../redux/actions';
import './LeftBar.css';

const LeftBar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const user = useSelector((state) => state?.firebaseReducer?.firebase);
    const { displayName, photoURL, email } = user;

    const logout = () => {
        signOut(auth)
            .then(() => {
                dispatch(firebase({}))
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <Box className="left-bar text-center bg-white">
            <Box className="left-bar-profile">
                <Avatar
                    alt={displayName}
                    src={photoURL}
                    sx={{ width: 150, height: 150, mx: 'auto', fontSize: '50px' }}
                />
                <Typography variant="h5" className='text-color font'>{displayName}</Typography>
                <Typography variant="h6" className='text-muted font'>25 followers</Typography>
                <Link to="/profile" className='text-decoration-none'>
                <Button
                    variant="contained"
                    color='error'
                    sx={{ width: '75%', mx: 'auto' }}
                    className="font mt-2"
                >View Profile</Button>
                </Link>
                <Button
                onClick={logout}
                    variant="contained"
                    color='secondary'
                    sx={{ width: '75%', mx: 'auto' }}
                    className="font mt-2"
                >Logout</Button>
            </Box>
            <Box>
                <NavLink activeClassName="active" to='profile' className="dashboard-tabs"><Button color="inherit">Dashboard</Button></NavLink>
                <NavLink activeClassName="active" to='profile' className="dashboard-tabs"><Button color="inherit">My Orders</Button></NavLink>
                <NavLink activeClassName="active" to='profile' className="dashboard-tabs"><Button color="inherit">Review</Button></NavLink>
                <NavLink activeClassName="active" to='profile' className="dashboard-tabs"><Button color="inherit">Payment</Button></NavLink>
            </Box>

        </Box>
    );
};

export default LeftBar;