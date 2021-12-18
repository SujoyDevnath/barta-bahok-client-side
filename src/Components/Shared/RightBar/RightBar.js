import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './RightBar.css'

const RightBar = () => {
    return (
        <Box className="right-bar">
            <Typography variant="h5" className='ms-5 mt-5 mb-3 font' sx={{textAlign: 'left'}}>Features</Typography>
            <Box>
                <NavLink activeClassName="right-bar-active" to='profile' className="right-bar-tabs"><Button color="inherit">Jobs</Button></NavLink>
                <NavLink activeClassName="right-bar-active" to='/profile' className="right-bar-tabs"><Button color="inherit">Shop</Button></NavLink>
                <NavLink activeClassName="right-bar-active" to='/profile' className="right-bar-tabs"><Button color="inherit">Food</Button></NavLink>
                <NavLink activeClassName="right-bar-active" to='/profile' className="right-bar-tabs"><Button color="inherit">Group</Button></NavLink>
            </Box>
        </Box>
    );
};

export default RightBar;