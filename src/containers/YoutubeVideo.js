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
