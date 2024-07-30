"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Cards() {
  return (
    <Card sx={{ maxWidth: 345, margin: "25px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Test Playlist Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This Playlist is for testing
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
