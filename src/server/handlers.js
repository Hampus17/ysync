module.exports = function() {
  function handleStart() {

  }

  function handlePause(client) {
    client.emit('video-paused', client);
  }

  function updateTime(time) {
    console.log(time);
  }

  return {
    handleStart, 
    handlePause,
    updateTime
  }
}