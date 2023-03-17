import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef } from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import { StorageHandler } from "../utils";

const useVideoPlayerStyles = makeStyles({
  player: {
    width: 720,
    height: "auto",
  },
  videoContainer: {
    display: "flex",
  },
});

export const VideoPlayer = ({ id, title, url }) => {
  const classes = useVideoPlayerStyles();

  const playerRef = useRef(null);

  const onTimeUpdate = () => {
    StorageHandler.setVideoProgress(id, playerRef.current.currentTime);
  };

  useEffect(() => {
    playerRef.current.currentTime = StorageHandler.getVideoProgress(id);
  }, [id]);

  return (
    <div className={classes.videoContainer}>
      {/*
        src={url} should be used instead inside the hardcoded value, but CORS error is appearing due to server not configured properly
      */}
      <ReactHlsPlayer
        src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        autoPlay={false}
        controls={true}
        className={classes.player}
        playerRef={playerRef}
        onTimeUpdate={onTimeUpdate}
      />
      <Typography variant="h4">{title}</Typography>
    </div>
  );
};
