const initialState = {
  videoURL: "https://www.youtube.com/watch?v=Yuo7AuDGNN8",
  videoTime: 0,
  videoHandler: '',
  channelHandler: '',
  hostID: '',
  clientID: ''
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
    case "SET_YOUTUBE_PLAYER":
      return Object.assign({}, state, {
        youtubePlayer: action.player,
      });
    case "SET_VIDEO_URL":
      return Object.assign({}, state, {
        videoURL: action.url,
      });
    case "SET_HOST_ID":
      return Object.assign({}, state, {
        hostID: action.id,
      });
    case "SET_CLIENT_ID":
      return Object.assign({}, state, {
        clientID: action.id,
      });
    default:
      return state;
  }
}

export default player;     
