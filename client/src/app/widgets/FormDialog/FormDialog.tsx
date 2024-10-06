"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createPlaylist } from "./../../../libs/features/playlists.api"
import { useAppDispatch } from "./../../../libs/hooks/hooks"
import { TypeAnimation } from 'react-type-animation';
import { useSelector } from 'react-redux';
import { useEffect } from "react"

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [BackdropState, setBackdropState] = React.useState(false);
  const [PlaylistVideos, setPlaylistVideos] = React.useState("");
  const URI = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch()

  const StatePlaylists = useSelector((state: any) => state.store.playlists)

  useEffect(() => {
    handleCloseBackdrop()
  }, [StatePlaylists])
  

  const handleCloseBackdrop = () => {
    setBackdropState(false);
  };
  const handleOpenBackdrop = () => {
    setBackdropState(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlaylists = async () => {

    if (URI.current) {
      if(URI.current.value != null && URI.current.value != ""){
        handleClose()
        handleOpenBackdrop()
        dispatch(createPlaylist({ url: URI.current.value }))
      }
    }
  }

  return (
    <React.Fragment>
      <Backdrop
        sx={(theme: any) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={BackdropState}
        
      >
        <div className="flex flex-col justify-center items-center h-screen">
          <CircularProgress color="inherit" />
          <TypeAnimation
            sequence={[
              'Fetching playlist data',
              3000, // Waits 3s
              'Generating playlist data',
              10000, // Waits 10s
              'Using AI Magic 🪄',
              10000, // Waits 10s
              'Making Things Ready!!!',
              5000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: '1em', display: 'inline-block' }}
          />
          <h2 style={{ color: "grey" }}>Please wait a moment, this may take up to a minute.</h2>
          <button className='text-white hover:text-red-500' onClick={handleCloseBackdrop}>Close</button>
        </div>
        
      </Backdrop>
      <Button variant="outlined" className='m-8' onClick={handleClickOpen}>
        Add New Playlist
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            setPlaylistVideos(email)
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please provide the link to the YouTube playlist you wish to add.
          </DialogContentText>
          <TextField
            inputRef={URI}
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="https://www.youtube.com/playlist"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handlePlaylists}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
