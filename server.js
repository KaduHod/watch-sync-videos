const express = require('express')
const app = express()
const { createServer } = require('http')
const WebSocket  = require('ws')
const server = createServer(app)
const wss = new WebSocket.Server({server})
const cors = require('cors')

require('dotenv').config()

let clientKey = () => (Math.random() + 1).toString(36).substring(7)

wss.on('connection', handleWSS)
    function handleWSS(ws, request, client){
        if (!ws.key) ws.key = clientKey();
        
        ws.on('message', data => handleMessage(ws, data))
    }

wss.on('close', close)
    function close(){
        console.log('disconnected')
    }

app.use(cors({
    origin: ['https://watch-sync-videos.vercel.app', 'https://www.youtube.com']
}));

function handleMessage(ws, data){
    const dado = JSON.parse(data)
    console.log(dado)
    wss.clients.forEach( client => {
        const verify = ( (client !== ws && client.key !== ws.key) && (client.readyState === WebSocket.OPEN))

        if( verify ) client.send(JSON.stringify(JSON.parse(data))); 
    }) 
}

server.listen(3000, () => 
        console.log('Web Socket server running'))