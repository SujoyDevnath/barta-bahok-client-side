import { Avatar, Button, ButtonGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { auth } from '../../../../Hooks/useFirebase';
import { firebase } from '../../../../redux/actions';
import Header from '../../../Shared/Header/Header';
import About from '../About/About';
import ProfileFollowers from '../ProfileFollowers/ProfileFollowers';
import ProfileFollowing from '../ProfileFollowing/ProfileFollowing';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import './Profile.css';

const Profile = () => {

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    let { path, url } = useRouteMatch();
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
        <>
            <Header></Header>
            <Box className='users-profile'>
                <Box className="profile-image-container mx-auto">
                    <img src="https://image.freepik.com/free-photo/colorful-leaves-autumn-park-japan_335224-232.jpg" style={{ width: '100%', height: '100%', borderRadius: '0 0 20px 20px' }} alt="" />
                    <Box sx={{ textAlign: 'center', position: 'absolute', top: '70%', left: '43%' }}>
                        <Avatar
                            alt={displayName}
                            src={photoURL}
                            sx={{ width: 150, height: 150, mx: 'auto', fontSize: '50px', border: '3px solid white' }}
                        />
                        <Typography variant="h5" className='text-color font'>{displayName}</Typography>
                        <Typography variant="h6" className='text-muted font'>0 followers</Typography>
                    </Box>
                </Box>
                <hr />
                <ButtonGroup variant="primary" sx={{ mx: 'auto' }} aria-label="outlined button group">
                    <NavLink exact activeClassName="profile-active-btn" to={`${url}`} className="profile-tab font fs-5"><Button>Posts</Button></NavLink>
                    <NavLink exact activeClassName="profile-active-btn" to={`${url}/about`} className="profile-tab font fs-5"><Button>About</Button></NavLink>
                    <NavLink exact activeClassName="profile-active-btn" to={`${url}/followers`} className="profile-tab font fs-5"><Button>Followers</Button></NavLink>
                    <NavLink exact activeClassName="profile-active-btn" to={`${url}/following`} className="profile-tab font fs-5"><Button>Following</Button></NavLink>
                    <Button
                        onClick={logout}
                        className="font"
                        variant='contained'
                        color="error"
                        sx={{ padding: '0px 25px', fontSize: '15px', ml: 3, mb: 1 }}
                    >Logout</Button>
                </ButtonGroup>
            </Box>

            <Box>
                <Switch>
                    <Route exact path={path}>
                        <ProfilePosts></ProfilePosts>
                    </Route>
                    <Route path={`${path}/about`}>
                        <About></About>
                    </Route>
                    <Route path={`${path}/followers`}>
                        <ProfileFollowers></ProfileFollowers>
                    </Route>
                    <Route path={`${path}/following`}>
                        <ProfileFollowing></ProfileFollowing>
                    </Route>
                    {/* <Route path={`${path}/payment`}>
                        <Payment></Payment>
                    </Route>
                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                    <AdminRoute path={`${path}/addNewCar`}>
                        <AddNewCar></AddNewCar>
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageAllOrders`}>
                        <ManageAllOrders></ManageAllOrders>
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageCars`}>
                        <ManageCars></ManageCars>
                    </AdminRoute> */}
                </Switch>
            </Box>

        </>
    );
};

export default Profile;