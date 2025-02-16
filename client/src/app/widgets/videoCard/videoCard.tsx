import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState, useEffect, Suspense } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from "./../../../libs/hooks/hooks"
import { videoStatus, currentVideo } from "./../../../libs/features/playlists.slice"
import { useSearchParams } from "next/navigation";
import { Tooltip } from 'react-tooltip'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function VideoCard({ videoData, section }: {videoData: any, section: any}) {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const playlistId = params?.playlistId;

  const handleVideoPlayer = ( link : { link: string }) => {
    dispatch(currentVideo( link ))
  }

  const handleCheckbox = (videoTitle: any, checked: boolean) => {
    // console.log(videoTitle, checked, playlistId, section)
    dispatch(videoStatus({ videoTitle, checked, playlistId, section }));
  };  
  
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      {
        (videoData) ? 
        Object.keys(videoData).map(key => (
          <Box
            key={key} 
            data-tooltip-id={playlistId} data-tooltip-content={key}
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              px: 1
            }}
          >
            <Item
              onClick={() => handleVideoPlayer(videoData[key].link)}
              sx={{
                my: 1,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'row',
                cursor: 'pointer',
              ':hover': {
                backgroundColor: '#dfdfdf', // or use a specific shade like 'grey.300'
              },
              }}
            >
              <Checkbox 
                {...label} 
                onChange={(e) => handleCheckbox(key, e.target.checked)} 
                checked={videoData[key].done} 
                color="success" 
              />
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography
                  fontSize={15}
                  noWrap
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '300px' // Adjust this value as needed
                  }}
                >
                  {key}
                </Typography>
              </Stack>
            </Item>
          </Box>
        )
      ) : null
      }
    <Tooltip id={playlistId} />
    </Suspense>
    </>
  );
}
