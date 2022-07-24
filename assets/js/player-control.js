const pausePlayPlayer   = document.getElementById('player-pause-play')
const inputRange        = document.getElementById('player-control-input')
const play              = document.getElementById('player-play')
const pause             = document.getElementById('player-pause')
const stateInputControl = document.getElementById('state') 

const inputIcons = {
    'player-play'  : play,
    'player-pause' : pause
}

play.addEventListener('click', run)
pause.addEventListener('click', stop)
inputRange.addEventListener('click', seekTo)

function changeIconPlayer({toHide, toShow}){
    inputIcons[toHide].classList.add('hidden')
    inputIcons[toShow].classList.remove('hidden')
}

function run(){
    changeIconPlayer({toShow : 'player-pause', toHide : 'player-play'})
    stateInputControl.value = 'play'
    playerActions['play']({})
    sendActionToTheServer({action : 'play', data : {}})
}

function stop(){
    changeIconPlayer({toHide : 'player-pause', toShow : 'player-play'})
    stateInputControl.value = 'pause'
    playerActions['pause']({})
    sendActionToTheServer({action : 'pause', data : {}})
}

function seekTo(event){
    const seconds = event.target.value
    playerActions['seek-to']({seconds})
    sendActionToTheServer({action : 'seek-to', data : {seconds}})
}

function setRangeValue(value){
    inputRange.value = value
    setTitle(value)
}

function setTitle(value){
    inputRange.title = value
}

function setMaxValueRange(value){
    inputRange.max = value
}

async function handleSetVideoDuration(videoid){
    const duration        = await getVideoDuration(videoid)
    const durationSeconds = getSecondsFromVideoDuration(duration)
    setMaxValueRange(durationSeconds)
}

