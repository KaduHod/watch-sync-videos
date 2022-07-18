var playerCreated = false

const changeButtonTitle = title => botaoMudarVideo.innerText = title
const resetButtonValue  = () => text.value = ''

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
}

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '360',
    width: '500',
    videoId: document.getElementById('videoid').dataset.videoid,
    color: 'black',
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': error => alert('Infelzimente ocorreu um erro com o Player ;-;'),
        }   
    });
}

function changeVideo(videoid){
    switch (playerCreated){
        case true:
            player.loadVideoById(videoid, 0, 'large')
            break;
        case false:
            createPlayer(videoid)
            break;
    }    
}

function onPlayerReady(event) {
    //event.target.mute();
}

var done = false;
newState = null;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) done = true;
    let state = getPlayerState(event.data);
    changeButtonTitle('Mudar de vídeo');
    sendNewState(state)
}



function getPlayerState(stateId){
    switch (stateId) {
        case -1:
            stateObj = { action: 'Não iniciado', stateId: "-1" };
            break;
        case 0:
            stateObj = { action:'Encerrado', stateId: "0" };
            break;
        case 1:
            stateObj = { action:'run-video', stateId: "1" };
            break;
        case 2:
            stateObj = { action:'pause-video', stateId: "2" };
            break;
        case 5:
            stateObj = { action:'Vídeo indicado', stateId: "5" };
            break;
        default : 
            stateObj = { action:'Default', stateId: null };
            break;
    }
    return stateObj;
}
