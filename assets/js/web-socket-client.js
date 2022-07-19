const webSocket       = new WebSocket('wss://watch-sync-videos.herokuapp.com/')
const text            = document.getElementById('youtube-url')
const botaoMudarVideo = document.getElementById('url-button')

webSocket.addEventListener('open', () => {
    console.log('Connected to the server!')
})

webSocket.addEventListener('message', handleMessageFromServer)

function serverHandler({data}){
    const { action, dado, playerInfo } = JSON.parse(data)

    console.log('recebi', action, dado, playerInfo)
    actionsTypes[action]({ dado })
}

function handleMessageFromServer({data}){
    const { action, dado, playerInfo } = JSON.parse(data)

    switch(action){
        case 'switch-video':
            changeVideo(dado)
            break
        case 'pause-video':
            player.pauseVideo()
            break
        case 'seek-too':
            break
        case 'run-video':
            player.playVideo()
            break
    }
}

botaoMudarVideo.addEventListener('click', sendNewVideo)

function sendNewVideo(){
    let url = document.getElementById('youtube-url').value
    let id  = getVideoId(url)
    if(!id) return
    handleYoutubeEmbeddedPlayer(id)
    webSocket.send(JSON.stringify({ dado: id, action: 'switch-video', playerInfo : 'oi'}))
    resetButtonValue()
    changeButtonTitle('Mudar de vídeo')
}

function sendNewState(state){
    webSocket.send(JSON.stringify(state))
}

        