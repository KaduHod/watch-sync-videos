var playerCreated = false;
var lastTimeUpdate = 0;
const control = {
    lastAction : null,
    lastStateChangeFrom : null
}
const stateTypes = {
    '1'  : { action:'run-video',      stateId: "1" },
    '2'  : { action:'pause-video',    stateId: "2" },
    getType(stateId){
        return this[stateId.toString()]  || { action:'Default', stateId: null }
    }
}
