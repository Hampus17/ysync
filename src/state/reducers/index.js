const initialState = {
  videoID: "Yuo7AuDGNN8",
  videoURL: "https://www.youtube.com/watch?v=Yuo7AuDGNN8",
  videoTime: 0,
  videoState: "2", // Paused
  videoHandler: '',
  channelHandler: '',
};

export function player(state = initialState, action) {
  // if state is undefined, default to initialState
  switch (action.type) {
    case "SET_VIDEO_HANDLER":
      return Object.assign({}, state, {
        videoHandler: action.handler,
      });
    case "SET_CHANNEL_HANDLER":
      return Object.assign({}, state, {
        channelHandler: action.handler,
      });
    case "SET_VIDEO_URL":
      return Object.assign({}, state, {
        videoURL: action.url,
      });
    case "SET_VIDEO_ID":
      return Object.assign({}, state, {
        videoID: action.id,
      });
    default:
      return state;
  }
}

export default player;
