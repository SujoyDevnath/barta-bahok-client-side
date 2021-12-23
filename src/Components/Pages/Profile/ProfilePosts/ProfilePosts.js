import { Avatar, Box, Button, ButtonGroup, Card, CardHeader, Container, Grid, IconButton, PopperUnstyled, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MakePost from '../../../Shared/MakePost/MakePost';

const ProfilePosts = () => {
    const posts = useSelector((state) => state.postsReduser.posts);
    const user = useSelector((state) => state?.firebaseReducer?.firebase);
    const { displayName, photoURL, email } = user;
    const filteredPosts = posts.filter(post => post?.email === email);

    const handleLike = (_id) => {
        const selectedPost = posts.filter(post => post._id === _id);
        const likedPeoples = selectedPost.map(people => people?.likedPeople);
        const isLiked = likedPeoples[0].some(people => people?.email === email);
        const newLikedPeoples = [...likedPeoples, { displayName, photoURL, email }];
        const updatedLike = selectedPost[0]?.like + 1;
        if (!isLiked) {
            axios.put(`http://localhost:5000/posts/${_id}`, { updatedLike: updatedLike, updatedLikedPeoples: newLikedPeoples })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        }
    }
    return (
        <Box>
            <Box sx={{ width: '50%', mx: 'auto' }}>
                <MakePost></MakePost>
            </Box>
            <Grid container spacing={2} sx={{ width: '50%', mx: 'auto', my: 3 }}>
                {
                    filteredPosts.map(post => {
                        const { _id, like, displayName, time, photoURL, postPhotoURL, description, email } = post;
                        return (
                            <Grid key={_id} item xs={12} md={12}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                alt={displayName}
                                                src={photoURL}
                                            />
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={displayName}
                                        subheader={time}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {description}
                                        </Typography>
                                    </CardContent>
                                    {postPhotoURL && <CardMedia
                                        component="img"
                                        sx={{ maxHeight: '450px' }}
                                        image={postPhotoURL}
                                        alt="..."
                                    />}
                                    <Container sx={{ borderBottom: '1px solid grey', width: '95%' }} className='mx-auto m-1 d-flex justify-content-between py-2'>
                                        <Typography variant="subtitle1" className='font text-muted'>{like} Likes</Typography>
                                        <Typography variant="subtitle1" className='font text-muted'>0 Comments</Typography>
                                    </Container>
                                    <CardActions disableSpacing>
                                        <ButtonGroup variant="primary" sx={{ display: 'flex', mx: 'auto', width: '100%' }}>
                                            <Button startIcon={<ThumbUpRoundedIcon />} sx={{ flexGrow: 1 }} className='font text-muted' onClick={() => handleLike(_id)}>Like</Button>
                                            <Button startIcon={<ForumRoundedIcon />} sx={{ flexGrow: 1 }} className='font text-muted'>Comment</Button>
                                            <Button startIcon={<SendRoundedIcon />} sx={{ flexGrow: 1 }} className='font text-muted'>Share</Button>
                                        </ButtonGroup>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default ProfilePosts;