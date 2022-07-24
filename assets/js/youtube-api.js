const googleApiKey = 'AIzaSyAJpy-7F14BAQLcxOQd13nDUWxt2X1LpRs'
async function getVideoDuration(videoId){
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${googleApiKey}&part=snippet,contentDetails,statistics,status`
    const res = await axios.get(url)
    return res.data.items[0].contentDetails.duration
}

function createPlayer(videoid){
    let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.dataset.videoid = videoid
        tag.id = 'videoid'

    let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    playerCreated = true
    if(!!lastTimeUpdate) lastTimeUpdate = 0
}

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '500',
    width: '800',
    videoId: document.getElementById('videoid').dataset.videoid,
    color: 'black',
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': e => {
            alert('Infelzimente ocorreu um erro com o Player ;-;')
            console.log(e.data)
            console.log(errorApi[e.data.toString()])
            },
        }   
    });
    handleSetVideoDuration(document.getElementById('videoid').dataset.videoid)
    // This is the source "window" that will emit the events.
    handleVideoTimer(player)
}

function handleVideoTimer(player){
    const iframeWindow = player.getIframe().contentWindow;

  // So we can compare against new updates.
    

  // Listen to events triggered by postMessage.
    window.addEventListener("message", function(event) {
      // Check that the event was sent from the YouTube IFrame.
      if (event.source === iframeWindow) {
        const data = JSON.parse(event.data);
  
        // The "infoDelivery" event is used by YT to transmit any
        // kind of information change in the player,
        // such as the current time or a playback quality change.
        if (
            data.event === "infoDelivery" &&
            data.info &&
            data.info.currentTime
        ) {
          // currentTime is emitted very frequently,
          // but we only care about whole second changes.
            let time = Math.floor(data.info.currentTime);
            if (time - 2 > lastTimeUpdate || time + 2 < lastTimeUpdate) {
                sendNewState({action:'seek-to', seconds: time, key:clientKey})
            }
            lastTimeUpdate = time
            setRangeValue(time)
        }
      }
    });
}

var playerTimer;
function onPlayerReady(event) {
   player.mute()
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) done = true;
    let state = stateTypes.getType(event.data)
    if(state.action == 'Default') return
    changeButtonTitle('Mudar de vídeo');
    sendNewState(state)
}