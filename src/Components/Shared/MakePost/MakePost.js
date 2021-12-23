import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import './MakePost.css';
import PostModal from '../PostModal/PostModal';

const MakePost = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const user = useSelector((state) => state?.firebaseReducer?.firebase);
    const { displayName, photoURL } = user;

    return (
        <Box className='bg-white py-3 my-3 rounded-3 d-flex flex-column'>
            <Box className="mx-auto mb-2 w-75 d-flex justify-content-between align-items-center"
            sx={{borderBottom: '1px solid grey'}}>
                <Box className='post-text-field w-75 py-1 rounded-pill mx-auto mb-2'>
                    <Avatar
                        alt={displayName}
                        src={photoURL}
                        sx={{ width: 50, height: 50, bgcolor: "#8A61CE", fontSize: '20px' }}
                    />
                    <Typography variant="h5" className='text-color font'>What's going on your mind</Typography>
                </Box>
                <Button
                onClick={handleOpen}
                    variant="contained"
                    color="secondary"
                    className='font'
                    sx={{ height: 50 }}
                >Create Post</Button>
            </Box>
            <Box sx={{ mx: 'auto' }} className='d-flex justify-content-around w-75'>
                <Button color="error" variant="contained" sx={{ px: 3 }} size="small" startIcon={<PhotoLibraryIcon />} className="font fs-6">Photos</Button>
                <Button color="success" variant="contained" sx={{ px: 3 }} size="small" startIcon={<VideoLibraryIcon />} className="font fs-6">Videos</Button>
                <Button color="warning" variant="contained" sx={{ px: 3 }} size="small" startIcon={<EmojiEmotionsIcon />} className="font fs-6">Felling</Button>
            </Box>
            <PostModal open={open} handleClose={handleClose}></PostModal>
        </Box>
    );
};

export default MakePost;