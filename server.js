const express = require('express')
const app = express()
const { createServer } = require('http')
const WebSocket  = require('ws')
const server = createServer(app)
const wss = new WebSocket.Server({server})
const cors = require('cors')
const control = {
    lastKey : null
}

require('dotenv').config()

wss.on('connection', handleWSS)

function handleWSS(ws, request){
    console.log('recebi mensagem')
    ws.on('message', data => handleMessage(ws, data))
}

app.use(cors({
    origin: ['https://watch-sync-videos.vercel.app', 'https://www.youtube.com']
}));

function handleMessage(ws, data){
    const {key} = JSON.parse(data)
    wss.clients.forEach( function each(client){
        if(client !== ws && client.readyState === WebSocket.OPEN /*&& key !== control.lastKey*/) {
            console.log('to mandando pro outro cliente', JSON.parse(data))
            control.lastKey = key
            client.send(JSON.stringify(JSON.parse(data)))
        }        
    }) 
}

server.listen(3000, () => 
        console.log('Web Socket server running at localhost:3000'))