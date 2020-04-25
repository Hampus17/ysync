import React from "react";
import PropTypes from "prop-types";
import store from '../state/store';

import { SET_YOUTUBE_PLAYER } from "../state/actions";
import Socket from '../client/socket';
const socket = Socket();

export let player;

const Video = ({ video, channel }) => {

  if (!video || !channel) {
    return <div>Loading...</div>
  } 
  else {
    socket.connect()

    const loadVideo = () => {
      player = new window.YT.Player(`youtube__player#${video.id}`, {
        videoId: video.id,
        events: {
          'onStateChange': onPlayerStateChange,
        },
      });
      store.dispatch(SET_YOUTUBE_PLAYER(player));
    }

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else {
      loadVideo()
    }

    const onPlayerStateChange = (event) => {
        let playerStatus = event.data;
    
        switch (playerStatus) {
          case 1: // Playing
            socket.startVideo();
            // TODO: if host: start video for party and update their time
            //       else: pause video and set time to host time
            break;
          case 2: // Paused
            socket.pauseVideo(player.getCurrentTime());
            // TODO: if host: paus video for party and update their time
            break;
          case 3: // Buffering
            // TODO: when done buffer check host time and update video
            break;
          default:
            break;
        }
      };

    return (
      <section className="video__info">
        <div id={`youtube__player#${video.id}`}></div>
        <h1 className="youtube__video--title">Current video: {video.snippet.title}</h1>
        <img className="youtube__channel--img" src={channel.thumbnails.default.url} alt="Channel"></img>
        <h2 className="youtube__channel">{ video.snippet.channelTitle }</h2>
      </section>
    )
  }
};

Video.propTypes = {
  video: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
};

export default Video;
