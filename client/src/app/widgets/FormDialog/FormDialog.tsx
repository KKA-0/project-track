"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ls, {get,set} from "local-storage";


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [PlaylistVideos, setPlaylistVideos] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlaylists = async () => {
    const object = {
      title: "React Tutorial",
      imageUri: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      info: "Best in the world react course",
      progress: 90
    }
    const objects = get<Array<object>>('playlists');
    objects.push(object)

    set<Array<object>>('playlists', objects);

  }

  return (
    <React.Fragment>
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
            Just Paste the youtube playlist you want to add!
          </DialogContentText>
          <TextField
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
