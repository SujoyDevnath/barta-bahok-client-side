// import { Typography } from '@mui/material';
import './App.css';
import Header from './Components/Shared/Header/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from './Components/Pages/NotFound/NotFound';
import Home from './Components/Pages/Home/Home/Home';
import People from './Components/Pages/People/People/People';
import Profile from './Components/Pages/Profile/profile/Profile';
import Posts from './Components/Pages/Posts/Posts/Posts';
import Chats from './Components/Pages/Chats/Chats/Chats';
import Login from './Components/Pages/Login/Login/Login';
import SignUp from './Components/Pages/Login/SignUp/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import axios from 'axios';
import { setPosts } from './redux/actions';
import { useEffect } from 'react';

function App() {

  const user = useSelector((state) => state?.firebaseReducer?.firebase);
  const posts = useSelector((state) => state.postsReduser.posts)
  
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost:5000/posts")
      .catch((err) => {
        console.error("Err: ", err);
      });
    dispatch(setPosts(response.data));
  };
  useEffect(() => {
    fetchProducts();
  }, [posts]);
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {user.email ? <Home /> : <Login />}
          </Route>
          <PrivateRoute path="/home">
            <Home></Home>
          </PrivateRoute>
          <PrivateRoute path="/posts">
            <Posts></Posts>
          </PrivateRoute>
          <PrivateRoute path="/people">
            <People></People>
          </PrivateRoute>
          <PrivateRoute path="/chats">
            <Chats></Chats>
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile></Profile>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
        </Router>
    </>
  );
}

export default App;
