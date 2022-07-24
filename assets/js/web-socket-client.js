const webSocket       = new WebSocket('wss://watch-sync-videos.herokuapp.com/')
//const webSocket       = new WebSocket('ws://localhost:3000')

webSocket.addEventListener('open', () => {
    webSocket.send(JSON.stringify({
        action: 'new-connection'
    }))
    console.log('Connected to the server!')
})

webSocket.addEventListener('message', handleMessageFromServer)

function handleMessageFromServer(dado){
    const serverData = JSON.parse(dado.data); 

    if(serverData.action === 'play') changeIconPlayer({toShow : 'player-pause', toHide : 'player-play'});
    
    if(serverData.action === 'pause') changeIconPlayer({toShow : 'player-play', toHide : 'player-pause'});
    
    if(!!player) return playerActions[serverData.action](serverData.data);

    return playerActions['create'](serverData.data);
}

function sendActionToTheServer({action, data}){
    webSocket.send(JSON.stringify({action, data}))
}
        