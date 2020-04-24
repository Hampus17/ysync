import React from "react";
import PropTypes from "prop-types";
const Video = ({ video, channel }) => {
  if (!video || !channel) {
    return <div>Loading...</div>
  } else {
    return (
      <section className="video__info">
        <div id={`youtube__player#${video.id}`}>
          <iframe title="Video Player" src={`https://www.youtube.com/embed/${video.id}`}></iframe>
        </div>
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
