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
                alert(errorApi[e.data.toString()])
                alert('Recarregando a pagina para esabeleceer nova conexão!')
                document.location.reload(true)
            },
        }   
    });
    handleSetVideoDuration(document.getElementById('videoid').dataset.videoid)
    handleVideoTimer(player)
}

function handleVideoTimer(player){
    const iframeWindow = player.getIframe().contentWindow;
    window.addEventListener("message", function(event) {
      if (event.source === iframeWindow) {
        const data = JSON.parse(event.data);
        if (
            data.event === "infoDelivery" &&
            data.info &&
            data.info.currentTime
        ) {
            let time = Math.floor(data.info.currentTime);
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
}