const control = {
    lastAction : null,
    lastStateChangeFrom : null,
    currentVideoId : null
}
const stateTypes = {
    '1'  : { action:'run-video',      stateId: "1" },
    '2'  : { action:'pause-video',    stateId: "2" },
    getType(stateId){
        return this[stateId.toString()]  || { action:'Default', stateId: null }
    }
}

const playerActions = {
    'seek-to' :  opt => player.seekTo(opt.seconds, true),
    'pause'   :  opt => {
        player.pauseVideo()
    },
    'play'    :  opt => {
        player.playVideo()
    },
    'switch-video': opt => player.loadVideoById({
        'videoId' : opt.videoid,
        'startSeconds' : 0,
        'suggestedQuality': 'large'
    }),
    'create'  : opt => createPlayer(opt.videoid)
}

const errorApi = { 
    "2"   : "A solicitação contém um valor de parâmetro inválido. Por exemplo, este erro ocorre se você especificar um ID de vídeo que não tem 11 caracteres, ou se o ID de vídeo contém caracteres inválidos, como pontos de exclamação ou asteriscos.",
    "5"   : "O conteúdo solicitado não pode ser reproduzido em um player HTML5, ou ocorreu outro erro relacionado ao player HTML5.",
    "100" : "O vídeo solicitado não foi encontrado. Esse erro ocorrerá quando um vídeo tiver sido removido (por qualquer motivo) ou marcado como privado.",
    "101" : "O proprietário do vídeo solicitado não permite que ele seja reproduzido em players incorporados.",
    "150" : "Esse erro é o mesmo que o 101. É apenas um erro 101 disfarçado"
}