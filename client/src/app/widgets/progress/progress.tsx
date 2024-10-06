"use client"

import React from 'react'
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Tooltip } from 'react-tooltip'

export default function progress(props: CircularProgressProps & { value: number, textColor: string }) {
  return (
    <>
    <Box sx={{ position: 'relative', display: 'inline-flex' }} data-tooltip-id="my-tooltip" data-tooltip-content={props.value+ "% of Playlist is completed"}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{color: props.textColor}}
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
    <Tooltip id="my-tooltip" />
    </>
  )
}
