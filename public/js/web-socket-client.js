const webSocket = new WebSocket('ws://127.0.0.1:3000')
const text      = document.getElementById('youtube-url')
const botaoMudarVideo     = document.getElementById('url-button')

webSocket.addEventListener('open', () => {
    console.log('Connected to the server!')
})
webSocket.addEventListener('message', handleMassegeFromServer)
botaoMudarVideo.addEventListener('click', sendNewVideo)

function sendNewVideo(){
    let url = document.getElementById('youtube-url').value
    let id = getVideoId(url)
    handleYoutubeEmbeddedPlayer(id)
    console.log('enviando para o servidor', { dado: id, action: 'switch-video'})
    webSocket.send(JSON.stringify({ dado: id, action: 'switch-video'}))
}


function handleMassegeFromServer(event){
    const { action, dado } = JSON.parse(event.data)
    switch (action) {
        case 'switch-video' :
            changeVideo(dado)
            break;
    }
}
        