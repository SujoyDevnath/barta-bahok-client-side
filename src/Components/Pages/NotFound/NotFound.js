import { Box, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        // not found component
        <Box className="not-found container m-5 pt-5 mx-auto">
            <img src="https://i.ibb.co/VNKFzVH/not-found-1.png" className="img-fluid" alt="" />
            <br />
            <Link to="/" className='not-found-button'>
                <Button variant='contained' color='secondary'>Back To Home</Button>
            </Link>
        </Box>
    );
};

export default NotFound;