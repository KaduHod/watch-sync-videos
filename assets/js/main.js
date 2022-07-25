const text              = document.getElementById('youtube-url')
const botaoMudarVideo   = document.getElementById('url-button') 

const changeButtonTitle = title => {
    if(!botaoMudarVideo) return
    botaoMudarVideo.innerText = title
};
var playerCreated = false;
var lastTimeUpdate = 0;
const resetButtonValue  = () => text.value = '';

botaoMudarVideo.addEventListener('click', changeVideo)

function changeVideo(event){
    const videoid = getVideoId(text.value)
    lastTimeUpdate = 0;
    switch (!!player){
        case true:
            player.loadVideoById({
                'videoId' : videoid,
                'startSeconds' : 0,
                'suggestedQuality': 'large'
            })
            
            break;
        case false:
            createPlayer(videoid)
            break;
    } 
    sendActionToTheServer({action:'switch-video', data: {videoid}})
    handleSetVideoDuration(videoid)
}