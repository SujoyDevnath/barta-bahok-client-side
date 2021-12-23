import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PostModal = ({ open, handleClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const date = new Date();
    const time = date.toLocaleDateString();
    const user = useSelector((state) => state?.firebaseReducer?.firebase);
    const { displayName, photoURL, email } = user;
    const [postData, setPostData] = useState({ displayName, photoURL, email, time, like: 0, likedPeople: [] });


    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newPostData = { ...postData };
        newPostData[field] = value;
        setPostData(newPostData);
    }
    console.log(postData);

    const handleSubmit = (e) => {
        axios.post(`http://localhost:5000/posts`, postData )
            .then(res => {
                console.log(res);
                console.log(res.data);
                handleClose();
            })
        e.preventDefault();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h4" className='font' sx={{ mb: 3 }}>
                    Create Your Post
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        onBlur={handleOnBlur}
                        name="description"
                        color='secondary'
                        sx={{ width: "100%", mb: 2 }}
                        label="Description"
                        multiline
                        focused
                        required
                        maxRows={7}
                    />
                    <TextField
                        onBlur={handleOnBlur}
                        name="postPhotoURL"
                        color='secondary'
                        sx={{ width: "100%", mb: 2 }}
                        label="PhotoURL"
                        focused
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='secondary'
                        sx={{ width: '40%' }}>Post</Button>
                    <Button
                        onClick={handleClose}
                        variant='contained'
                        color='error'
                        sx={{ width: '40%', ml: 2 }}
                    >Close</Button>
                </form>

            </Box>
        </Modal>
    );
};

export default PostModal;