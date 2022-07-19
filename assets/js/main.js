const changeButtonTitle = title => botaoMudarVideo.innerText = title;
const resetButtonValue  = () => text.value = '';
function handleYoutubeEmbeddedPlayer(videoid){
    let playerExists = !!document.getElementById('videoid')
    switch (playerExists){
        case true:
            changeVideo(videoid);
            break;
        case false:
            createPlayer(videoid);
            
            break;
    }
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
        'onError': error => alert('Infelzimente ocorreu um erro com o Player ;-;'),
        }   
    });

    // This is the source "window" that will emit the events.
    var iframeWindow = player.getIframe().contentWindow;

  // So we can compare against new updates.
    

  // Listen to events triggered by postMessage.
    window.addEventListener("message", function(event) {
      // Check that the event was sent from the YouTube IFrame.
      if (event.source === iframeWindow) {
        var data = JSON.parse(event.data);
  
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
            var time = Math.floor(data.info.currentTime);
            if (time - 2 > lastTimeUpdate || time + 2 < lastTimeUpdate) {
                sendNewState({action:'seek-to', toTime: time})
            }
            lastTimeUpdate = time
        }
      }
    });
    
}

function changeVideo(videoid){
    lastTimeUpdate = 0;
    switch (playerCreated){
        case true:
            player.loadVideoById({
                'videoId' : videoid,
                'startSeconds' : 0,
                'suggestedQuality': 'large'
            })
            break;
        case false:
            createPlayer(videoid)
            break;
    }    
}

var playerTimer;
function onPlayerReady(event) {
   
}



var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) done = true;
    let state = stateTypes.getType(event.data)
    if(state.action == 'Default') return
    state.currentTime = player.playerInfo.currentTime
    state.clientName = 'Sem nomezinho aqui rapaz!'
    changeButtonTitle('Mudar de vídeo');
    sendNewState(state)
}

function sendNewState(state){
    webSocket.send(JSON.stringify(state))
}
