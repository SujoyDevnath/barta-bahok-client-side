import { Box } from '@mui/system';
import React from 'react';
import Header from '../../../Shared/Header/Header';
import LeftBar from '../../../Shared/LeftBar/LeftBar';
import RightBar from '../../../Shared/RightBar/RightBar';
import MainHome from '../MainHome/MainHome';

const Home = () => {
    return (
        <>
        <Header></Header>
        <Box sx={{w: '100%', display: 'flex'}}>
            <LeftBar></LeftBar>
            <MainHome></MainHome>
            <RightBar></RightBar>
        </Box>
        </>
    );
};

export default Home;