const webSocket = new WebSocket('ws://127.0.0.1:3000')
const text      = document.getElementById('message')
const botao     = document.getElementById('botao')
webSocket.addEventListener('open', () => {
    console.log('Connected to the server!')
})
webSocket.addEventListener('message', handleMassegeFromServer)
botao.addEventListener('click', () => {
    webSocket.send(JSON.stringify({message : text.value, client:text.dataset.clientId}))
})
function handleMassegeFromServer(event){
    console.log(JSON.parse(event.data))
}
        