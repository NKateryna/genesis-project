import { Alert, Snackbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import { StorageHandler } from "../utils";

const useVideoPlayerStyles = makeStyles((theme) => ({
  player: {
    width: 720,
    height: "auto",
    marginBottom: 24,
    [theme.breakpoints.down("md")]: {
      width: 480,
      marginBottom: 14,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 4,
    },
  },
  videoContainer: {
    paddingBottom: 24,
    [theme.breakpoints.down("md")]: {
      width: 480,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem !important",
    },
  },
}));

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const VideoPlayer = ({ id, title, url }) => {
  const classes = useVideoPlayerStyles();
  const playbackRate = useRef(1);
  const [open, setOpen] = useState(true);

  const playerRef = useRef(null);

  const increasePlaybackSpeed = () => {
    const oldRateIndex = PLAYBACK_RATES.indexOf(playbackRate.current);

    playerRef.current.playbackRate =
      PLAYBACK_RATES[Math.min(oldRateIndex + 1, PLAYBACK_RATES.length - 1)];
    playbackRate.current =
      PLAYBACK_RATES[Math.min(oldRateIndex + 1, PLAYBACK_RATES.length - 1)];
  };

  const decreasePlaybackSpeed = () => {
    const oldRateIndex = PLAYBACK_RATES.indexOf(playbackRate.current);

    playerRef.current.playbackRate =
      PLAYBACK_RATES[Math.max(0, oldRateIndex - 1)];
    playbackRate.current = PLAYBACK_RATES[Math.max(0, oldRateIndex - 1)];
  };

  const onTimeUpdate = () => {
    StorageHandler.setVideoProgress(id, playerRef.current.currentTime);
  };
  const speedChange = (e) => {
    switch (e.key) {
      case "+": {
        increasePlaybackSpeed();
        break;
      }
      case "-": {
        decreasePlaybackSpeed();
        break;
      }
      default:
        return;
    }
  };

  useEffect(() => {
    const player = playerRef.current;
    player.currentTime = StorageHandler.getVideoProgress(id);
    player.addEventListener("keypress", speedChange);

    return () => {
      player.removeEventListener("keypress", speedChange);
    };
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className={classes.videoContainer}>
      <ReactHlsPlayer
        // src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        src={url}
        autoPlay={false}
        controls={true}
        className={classes.player}
        playerRef={playerRef}
        onTimeUpdate={onTimeUpdate}
      />
      <Typography className={classes.title} variant="h4">
        {title}
      </Typography>
      <Snackbar open={open} onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          To change video speed use + and - buttons
        </Alert>
      </Snackbar>
    </div>
  );
};
