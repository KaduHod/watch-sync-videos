const text              = document.getElementById('youtube-url')
const botaoMudarVideo   = document.getElementById('url-button')
const changeButtonTitle = title => {
    if(!!botaoMudarVideo == false) return
    botaoMudarVideo.innerText = title
};
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
    handleSetVideoDuration(videoid)
}



function sendNewState(state){
    state.key = clientKey
    webSocket.send(JSON.stringify(state))
}
