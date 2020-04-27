import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../components/Input";

// TODO: import styling

class AddVideo extends Component {
  componentDidMount() {
    
  };

  render() {
    return <Input />
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

export default connect(mapStateToProps)(AddVideo);
