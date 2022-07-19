const express = require('express')
const app = express()
const { createServer } = require('http')
const WebSocket  = require('ws')
const server = createServer(app)
const wss = new WebSocket.Server({server})
require('dotenv').config()

wss.on('connection', handleWSS)

function handleWSS(ws, request){
    ws.on('message', data => handleMessage(ws, data))
}

function handleMessage(ws, data){
    const { dado, action, toTime } = JSON.parse(data)
    wss.clients.forEach( function each(client){
        if(client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ dado, action, toTime }))
        }        
    }) 
}

server.listen(3000, () => 
        console.log('Web Socket server running at localhost:3000'))