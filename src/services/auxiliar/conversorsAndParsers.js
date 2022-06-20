export function getBRClock(gameJSON) { // 29out20 
    //     console.log('gameJSON = %s', gameJSON);
    var timerJSON = gameJSON.timer;
    // console.log('timerJSON = %s', timerJSON);

    var retorno = 'pre-jogo';
    if (timerJSON) {
        if (timerJSON.tm !== null && timerJSON.ts !== null) {
            var minute = timerJSON.tm;
            var second = timerJSON.ts;
        } else {
            var minute = 'mm';
            var second = 'ss';
        }

        if (second < 10) {
            second = '0' + second;
        }
        //if (gameJSON.scores[1]){
        if (gameJSON.timer.md == 1) {
            // 1T encerrado: second half or intervalo
            if (timerJSON.tt == '0') {
                if (timerJSON.tm > 75) { // há um bug quando o um jogo termina ele fica um tempo md=1, tm=90, tt=0 ts=0 ta=0
                    retorno = 'FT';
                } else {
                    retorno = 'intervalo';
                }
            } else {
                retorno = '2T' + ' ' + (minute - 45) + ":" + second;
            }
        } else if (gameJSON.timer.md > 1) {
            retorno = 'FT';
        }
        else {
            // 1T não terminou: still first half or match did not start
            if (timerJSON.tt == '0') {
                retorno = 'pre-jogo';
            } else {
                retorno = '1T' + ' ' + minute + ":" + second;
            }
        }
    }
    if (gameJSON.time_status == '3') {
        retorno = 'FT';
    }
    // } else {
    // retorno = 'erroClock';
    // }
    return retorno;
}



export function getTimeStamps_parseEpochTimeToTimeToKO(epochTimeString) { // 10jun2021 
    const getDateDDMMMhhmmMiniZone = (date) => { // 03/Jun 13:10 GMT-0300
        var dd = date.getDate();
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var MMM = months[date.getMonth()]
        var hh = date.getHours()
        var mm = date.getMinutes()

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        let dateStringed = date.toString()
        let timeZone = dateStringed.substring(dateStringed.indexOf('('), dateStringed.length);
        let miniTimeZone = dateStringed.substring(dateStringed.indexOf('GMT'), dateStringed.indexOf(' ('));
        // console.log(dateStringed)
        // console.log(timeZone)
        // console.log(miniTimeZone)
        return dd + '/' + MMM + ' ' + hh + ':' + mm + ' ' + miniTimeZone;
    }

    const msToTimeddHHmm = (msDuration) => { // 4h54m | 42m | 1d3h | 10h | -15m | -3h 
        let msDuration_absolute = Math.abs(msDuration)
        var milliseconds = parseInt((msDuration_absolute % 1000) / 100),
            seconds = Math.floor((msDuration_absolute / 1000) % 60),
            minutes = Math.floor((msDuration_absolute / (1000 * 60)) % 60),
            hours = Math.floor((msDuration_absolute / (1000 * 60 * 60)) % 24),
            days = Math.floor((msDuration_absolute / (1000 * 60 * 60)) / 24);

        let retorno = ''
        if (days > 0) {
            retorno += days + 'd'
            if (hours > 0) {
                retorno += hours + "h"
            }
        } else {
            if (hours > 0) {
                if (hours >= 5) {
                    retorno += hours + "h"
                } else {
                    retorno += hours + "h" + minutes + 'm'
                }
            } else {
                retorno += minutes + 'm'
            }
        }
        return (msDuration > 0) ? retorno : '-' + retorno;
    }

    const getTimeStamps = (epochTimeString) => {
        return {
            // NEW TIMESTAMPS properties (correct names)
            time_stringed_ISO_8601: new Date(epochTimeString * 1000), // The 0 there is the key, which sets the date to the epoch
            time_stringed_withZoneBR: getDateDDMMMhhmmMiniZone(new Date(epochTimeString * 1000)), // The 0 there is the key, which sets the date to the epoch
            timeUntilKickOff_stringed: msToTimeddHHmm(new Date(Number(epochTimeString) * 1000).getTime() - new Date().getTime()),
        }
    }
    // NEW TIMESTAMPS properties (correct names)
    let retorno = JSON.parse(JSON.stringify(getTimeStamps(epochTimeString)))

    return retorno;
}


export function getDateYYYYMMMDDhhmmZone(date) {
    var dd = date.getDate();
    var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var MMM = months[date.getMonth()]
    var hh = date.getHours()
    var mm = date.getMinutes()
    var yyyy = date.getFullYear()

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var dateStringed = date.toString()
    var timeZone = dateStringed.substring(dateStringed.indexOf('('), dateStringed.length);
    return yyyy + '.' + MMM + '.' + dd + ' ' + hh + ':' + mm + ' ' + timeZone;
}
