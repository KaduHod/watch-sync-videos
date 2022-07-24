//const webSocket       = new WebSocket('wss://watch-sync-videos.herokuapp.com/')
const webSocket       = new WebSocket('ws://localhost:3000')

webSocket.addEventListener('open', () => {
    console.log('Connected to the server!')
})

webSocket.addEventListener('message', handleMessageFromServer)

function handleMessageFromServer({data}){
    const serverData = JSON.parse(data)
    console.log(serverData)
    control.lastStateChangeFrom = 'server'
    playerActions[serverData.action](serverData)
}

botaoMudarVideo.addEventListener('click', sendNewVideo)

function sendNewVideo(){
    let url = document.getElementById('youtube-url').value
    let id  = getVideoId(url)
    if(!id) return

    handleYoutubeEmbeddedPlayer(id)

    webSocket.send(JSON.stringify({ videoid: id, action: 'switch-video', key:clientKey }))

    resetButtonValue()
    
    changeButtonTitle('Mudar de vídeo')
    control.lastStateChangeFrom = 'client'
}

        