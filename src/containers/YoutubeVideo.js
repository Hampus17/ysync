import React, { Component } from "react";
import { connect } from "react-redux";

import Video from "../components/Video";

import * as Actions from "../state/actions";

// TODO: import styling

class YoutubeVideo extends Component {
  componentDidMount() {
    // Get video ID
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = this.props.videoURL.match(regExp);
    const id = match && match[7].length === 11 ? match[7] : false;
    
    this.props.dispatch(Actions.SET_VIDEO_ID(id)); 
    this.props.dispatch(Actions.FETCH_VIDEO_HANDLE(id));
  };

  // onPlayerStateChange(event) {
  //   let playerStatus = event.data;

  //   switch (playerStatus) {
  //     case 1: // Playing
  //       // TODO: if host: start video for party and update their time
  //       //       else: pause video and set time to host time
  //       break;
  //     case 2: // Paused
  //       // TODO: if host: paus video for party and update their time
  //       break;
  //     case 3: // Buffering
  //       // TODO: when done buffer check host time and update video
  //       break;
  //     default:
  //       break;
  //   }
  // };
  render() {
    return <Video 
      video={this.props.videoHandler} 
      videoID={this.props.videoID} 
      channel={this.props.channelHandler}
    />;
  }
};

const mapStateToProps = (state) => {
  return {
    videoID: state.videoID,
    videoURL: state.videoURL,
    videoHandler: state.videoHandler, 
    channelHandler: state.channelHandler
  };
};

export default connect(mapStateToProps)(YoutubeVideo);
