function getSecondsFromVideoDuration(durationISO8603){
    console.log(durationISO8603)
    const duration = durationISO8603.split('PT')[1]
    const durationObjt = filterHoursMinutesSecods(duration)
    
    let secondsAcc = 0;
    for( type in durationObjt){
        let value = durationObjt[type]
        if(value) secondsAcc += convertTime({type, value})
    }
    return  secondsAcc   
}

function filterHoursMinutesSecods( duration ){
    const days     = {
        days: duration.split('D')[0] || 'Não tem dias',
        next: duration.split('D')[1] || duration
    }

    const hours    = {
        hours: days.next.split('H')[0] || 'Não tem horas',
        next : days.next.split('H')[1] || duration
    }

    const minutes  = {
        minutes : hours.next.split('M')[0] || 'Não tem minutos',
        next    : hours.next.split('M')[1] || duration
    }

    const seconds  = {
        seconds : minutes.next.split('S')[0]
    }

    return {
        day    : !hasLetters(days.days)       ? days.days       : false,
        hour   : !hasLetters(hours.hours)     ? hours.hours     : false,
        minute : !hasLetters(minutes.minutes) ? minutes.minutes : false,
        second : !hasLetters(seconds.seconds) ? seconds.seconds : false
    }
}

function hasLetters(str){
    return /[a-zA-Z]/.test(str)
}

function convertTime({type, value}){
    const convertToSeconds = {
        'day'    : value => value * 24 * 60 * 60,
        'hour'   : value => value * 60 * 60,
        'minute' : value => value * 60,
        'second' : value => value
    }
    return parseInt(convertToSeconds[type](value))
}


