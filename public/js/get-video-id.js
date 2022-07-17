function getVideoId(url){
    if(url === '') return
    const id = extractVideoID(url)
    if(!id) { alert('Video não existe ;-;'); return false }
    return id
}

function extractVideoID(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[7].length == 11) return match[7];
    return false;
}