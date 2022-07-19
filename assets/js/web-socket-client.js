const webSocket       = new WebSocket('wss://watch-sync-videos.herokuapp.com/')
const text            = document.getElementById('youtube-url')
const botaoMudarVideo = document.getElementById('url-button')

webSocket.addEventListener('open', () => {
    console.log('Connected to the server!')
})

webSocket.addEventListener('message', serverHandler)

function serverHandler({data}){
    const { action, dado } = JSON.parse(data)
    actionsTypes[action]({ dado, player })
}

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

function sendNewState(state){
    webSocket.send(JSON.stringify(state))
}

        