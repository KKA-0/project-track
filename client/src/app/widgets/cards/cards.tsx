// "use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Progress from '../progress/progress';
import Link from 'next/link';

export default function Cards({ imageUri, title, info, progress }: {imageUri: string, title: string, info: string, progress: number}) {
  return (
    <Card sx={{ maxWidth: 330, margin: "25px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUri}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {info}
          </Typography>
          <Progress value={progress}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
