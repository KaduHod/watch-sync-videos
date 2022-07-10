const express = require('express')
const app = express()
const axios = require('axios')
const { createServer } = require('http')
const bodyParser = require('body-parser')
const WebSocket  = require('ws')
const server = createServer(app)
const wss = new WebSocket.Server({server})

require('dotenv').config()

wss.on('connection', handleWSS)

function handleWSS(ws, request){
    ws.on('message', data => handleMessage(ws, data))
}

function handleMessage(ws, data){
    const message = JSON.parse(data)
    wss.clients.forEach(function each(client){
        if(client !== ws && client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify(message))
        }
    }) 

}
server.listen(process.env.PORT, ()=>console.log('Web Socket server running at ' + process.env.SERVER_URL ))