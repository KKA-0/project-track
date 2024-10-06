// "use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Progress from '../progress/progress';
import Link from 'next/link';

export default function Cards({ imageUri, title, info, completed, playlistId }: {imageUri: string, title: string, info: string, playlistId: string, completed: number}) {
  return (
    <Card sx={{ maxWidth: 330, margin: "25px" }}>
      <Link href={{ pathname: '/playlists/player', query: { playlistId: playlistId } }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={(imageUri) ? imageUri : "https://images.unsplash.com/photo-1723946372143-94bdf3555536?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {info}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {playlistId}
          </Typography>
          <Progress value={completed} textColor="black"/>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}
