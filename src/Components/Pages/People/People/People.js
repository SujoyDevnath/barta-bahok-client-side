import { Box } from '@mui/system';
import React from 'react';
import Header from '../../../Shared/Header/Header';
import LeftBar from '../../../Shared/LeftBar/LeftBar';
import RightBar from '../../../Shared/RightBar/RightBar';
import MainPeople from '../MainPeople/MainPeople';

const People = () => {
    return (
        <>
        <Header></Header>
        <Box sx={{ w: '100%', display: 'flex' }}>
            <LeftBar></LeftBar>
            <MainPeople></MainPeople>
            <RightBar></RightBar>
        </Box>
        </>
    );
};

export default People;