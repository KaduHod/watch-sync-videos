const pausePlayPlayer = document.getElementById('player-pause-play')
const inputRange      = document.getElementById('player-control-input')
const play            = document.getElementById('player-play')
const pause           = document.getElementById('player-pause')

// play.addEventListener('click', tooglePausePlay)
// pause.addEventListener('click', tooglePausePlay)
pausePlayPlayer.addEventListener('click', tooglePausePlay)

function tooglePausePlay(){
    const icons = [...pausePlayPlayer.getElementsByTagName('ion-icon')]
    icons.forEach( icon => {
        if(icon.classList.contains('hidden')) icon.classList.remove('hidden')
        else icon.classList.add('hidden')
    });
}

function setRangeValue(value){
    inputRange.value = value
}

function setMaxValueRange(value){
    inputRange.max = value
}

async function handleSetVideoDuration(videoid){
    const duration        = await getVideoDuration(videoid)
    const durationSeconds = getSecondsFromVideoDuration(duration)
    setMaxValueRange(durationSeconds)
}

