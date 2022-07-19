const playerActions = {
    'pause-video': (opt) => {
        console.log('pause-video acionado')
        player.pauseVideo()
    },
    'run-video' : (opt) => {
        console.log('run-video acionado')
        player.playVideo()
    },
    'seek-to' : (opt) => {
        console.log('seek-to acionado')
        player.seekTo(opt.seconds, true)
    },
    'switch-video': (opt) => {
        console.log(opt)
        console.log('switch-video')
        changeVideo(opt.videoid)
    }
}