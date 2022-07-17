var playerCreated = false
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
    return videoid
}

function createPlayer(videoid){
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.dataset.videoid = videoid
    tag.id = 'videoid'
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    playerCreated = true
}

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: document.getElementById('videoid').dataset.videoid,
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': error => console.log(error)
        }   
    });
}

function changeVideo(videoid){
    if(!playerCreated) return createPlayer(videoid)
    player.loadVideoById(videoid, 0, 'large')
}

function onPlayerReady(event) {
    event.target.playVideo();
}


var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
    changeButtonTitle()
}

function stopVideo() {
    player.stopVideo();
}

function changeButtonTitle(){
    botaoMudarVideo.innerText = 'Mudar de vídeo'
}

