var playerCreated = false;
var lastTimeUpdate = 0;
const stateTypes = {
    '-1' : { action:'Não iniciado',   stateId: "-1"},
    '0'  : { action:'Encerrado',      stateId: "0" },
    '1'  : { action:'run-video',      stateId: "1" },
    '2'  : { action:'pause-video',    stateId: "2" },
    '5'  : { action:'Vídeo indicado', stateId: "5" },
    getType(stateId){
        return this[stateId.toString()]  || { action:'Default', stateId: null }
    }
}

const actionsTypes = {
    'pause-video' : options => options.player.pauseVideo(),
    'seek-too'    : options => null,
    'run-video'   : options => options.player.playVideo(),
    'switch-video': options => changeVideo(options.dado) 
}
