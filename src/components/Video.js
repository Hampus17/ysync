import React, { useEffect } from "react";
import PropTypes from "prop-types";
import store from '../state/store';

import { SET_YOUTUBE_PLAYER, SET_HOST_ID } from "../state/actions";
import Socket from '../client/socket';

import '../css/test.css';

const socket = Socket();

export let player;
export function setHost(id) {
  store.dispatch(SET_HOST_ID(id));
}

const Video = ({ video, channel, hostID }) => {

  useEffect(() => loadVideo);

  if (!video || !channel) {
    return <div>Loading...</div>
  } 
  else {
    socket.connect()
    const clientID = socket.getClientID();
    let playingState = socket.playingState();

    var loadVideo = () => {
      player = new window.YT.Player(`youtube__player#${video.id}`, {
        videoId: video.id,
        events: {
          'onStateChange': onPlayerStateChange,
        },
      });
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

    var onPlayerStateChange = (event) => {
        let playerStatus = event.data;

        console.log(event);
        console.log(player);
        playingState = socket.playingState();
        // eslint-disable-next-line default-case
        switch (playerStatus) {
          case 1: // Playing
            if (clientID === hostID && playingState === false) {
              socket.startVideo(clientID);
            }
            else if (playingState === false)
              player.pauseVideo();
            break;

          case 2: // Paused
            if (clientID === hostID && playingState === true) {
              socket.pauseVideo(player.getCurrentTime());
            }
            else if (playingState === true)
              player.playVideo()
            break;

          case 3: // Buffering
            // TODO: when done buffer check host time and update video
            break;
        }
      };
 
    return (
      <section className="video__info">
        <h2>User ID = {clientID} ({(clientID === hostID) ? "HOST" : "USER"})</h2>
        <div id={`youtube__player#${video.id}`} className="iframe"></div>
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
