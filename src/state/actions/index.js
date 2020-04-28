import ytAPI from "../../api/ytAPI";

// ACTION CREATORS
export const SET_VIDEO_HANDLER = (handler) => ({
  type: "SET_VIDEO_HANDLER",
  handler,
});

export const SET_VIDEO_URL = (url) => ({
  type: "SET_VIDEO_URL",
  url,
});

export const SET_VIDEO_ID = (id) => ({
  type: "SET_VIDEO_ID",
  id: id,
});

export const SET_HOST_ID = (id) => ({
  type: "SET_HOST_ID",
  id: id,
});

export const SET_CLIENT_ID = (id) => ({
  type: "SET_CLIENT_ID",
  id: id,
});

export const SET_PLAYER_STATE = (state) => ({
  type: "SET_PLAYER_STATE",
  state,
});

export const SET_YOUTUBE_PLAYER = (player) => ({
  type: "SET_YOUTUBE_PLAYER",
  player,
});

export const SET_CHANNEL_HANDLER = (handler) => ({
  type: "SET_CHANNEL_HANDLER",
  handler,
});

export function FETCH_VIDEO_HANDLE(videoID) {
  return function(dispatch) {
    return ytAPI.get(
      `/videos?&id=${videoID}&key=${process.env.REACT_APP_YT_API}&part=snippet,contentDetails`
      ).then(({ data }) => {
        const video = data.items[0];
        dispatch(SET_VIDEO_HANDLER(video));
        dispatch(FETCH_CHANNEL_HANDLE(video.snippet.channelId));
      })
  }
}

export function FETCH_CHANNEL_HANDLE(channelID) {
  return function(dispatch) {
    return ytAPI.get(
      `/channels?id=${channelID}&key=${process.env.REACT_APP_YT_API}&part=contentDetails,snippet`
      ).then(({ data }) => {
        dispatch(SET_CHANNEL_HANDLER(data.items[0].snippet));  
      })
  }
}
