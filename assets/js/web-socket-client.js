const webSocket       = new WebSocket('wss://watch-sync-videos.herokuapp.com/')
const text            = document.getElementById('youtube-url')
const botaoMudarVideo = document.getElementById('url-button')

webSocket.addEventListener('open', () => {
    console.log('Connected to the server!')
})

webSocket.addEventListener('message', handlerMessage)
botaoMudarVideo.addEventListener('click', sendNewVideo)

function sendNewVideo(){
    let url = document.getElementById('youtube-url').value
    let id  = getVideoId(url)
    if(!id) return
    handleYoutubeEmbeddedPlayer(id)
    webSocket.send(JSON.stringify({ dado: id, action: 'switch-video'}))
    resetButtonValue()
    changeButtonTitle('Mudar de vídeo')
}

function handleMassegeFromServer(event){
    const { action, dado } = JSON.parse(event.data)




    switch (action) {
        case 'switch-video' :
            changeVideo(dado)
            break;
        case 'pause-video':
            player.pauseVideo()
            break;
        case 'seek-too':
            player.seekTo(dado.seconds, true)
            break;
        case 'run-video':
            player.playVideo()
            break;
    }
}

function handlerMessage({data}){
    const { action, dado } = JSON.parse(data)

    const actions = {
        'switch-video' : changeVideo(dado),
        'pause-video'  : player.pauseVideo(),
        // 'seek-too'     : player.seekTo(dado.seconds, true),
        'run-video'    : player.playVideo()
    }
    
    return true
}

function sendNewState(state){
    webSocket.send(JSON.stringify(state))
}

        