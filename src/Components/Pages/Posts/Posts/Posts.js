import { Box } from '@mui/material';
import React from 'react';
import Header from '../../../Shared/Header/Header';
import LeftBar from '../../../Shared/LeftBar/LeftBar';
import RightBar from '../../../Shared/RightBar/RightBar';
import MainPosts from '../MainPosts/MainPosts';

const Posts = () => {
    return (
        <>
        <Header></Header>
        <Box sx={{ w: '100%', display: 'flex' }}>
            <LeftBar></LeftBar>
            <MainPosts></MainPosts>
            <RightBar></RightBar>
        </Box>
        </>
    );
};

export default Posts;