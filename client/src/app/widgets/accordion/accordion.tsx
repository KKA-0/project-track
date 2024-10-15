"use client"

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import VideoCard from "./../videoCard/videoCard"
import { useSelector } from 'react-redux';
import { Suspense  } from 'react';
import { useSearchParams } from "next/navigation";

interface VideoCardProps {
  videoData: Array<object>
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

    const searchParams = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const paramsPlaylistid = params.playlistId;
    const StatePlaylists = useSelector((state: any) => state.store.playlists[paramsPlaylistid]?.sections)

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      {
            (StatePlaylists) ? 
            Object.keys(StatePlaylists).map(key => (
              <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>{key}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{maxHeight: "80vh", minHeight: "fit-content", overflowY: "scroll"}}>
                  <VideoCard videoData={StatePlaylists[key]} section={key}/>
                </AccordionDetails>
              </Accordion>
              )
            )
            : null
      }
      </Suspense>
    </div>
  );
}
