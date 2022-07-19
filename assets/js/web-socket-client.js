const webSocket       = new WebSocket('wss://watch-sync-videos.herokuapp.com/')
// const webSocket       = new WebSocket('ws://localhost:3000')
const text            = document.getElementById('youtube-url')
const botaoMudarVideo = document.getElementById('url-button')

webSocket.addEventListener('open', () => {
    console.log('Connected to the server!')
})

webSocket.addEventListener('message', handleMessageFromServer)

function handleMessageFromServer({data}){
    const { action, dado, toTime } = JSON.parse(data)
    switch(action){
        case 'switch-video':
            changeVideo(dado)
            break
        case 'pause-video':
            player.pauseVideo()
            break
        case 'run-video':
            player.playVideo()
            break
        case 'seek-to':
            player.seekTo(toTime, true)
            lastTimeUpdate = toTime
            break
    }
}

botaoMudarVideo.addEventListener('click', sendNewVideo)

function sendNewVideo(){
    let url = document.getElementById('youtube-url').value
    let id  = getVideoId(url)
    if(!id) return
    handleYoutubeEmbeddedPlayer(id)
    webSocket.send(JSON.stringify({ dado: id, action: 'switch-video', playerInfo : null, clientName :window.location.href.split('/')[5]}))
    resetButtonValue()
    changeButtonTitle('Mudar de vídeo')
}

        