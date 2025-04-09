let title = document.querySelector('.title')
let subTitle = document.querySelector('.subtitle')
let play = document.querySelector('.play')
let next= document.querySelector('.forward')
let prev= document.querySelector('.back')
let player = document.querySelector('.player')
let footer = document.querySelector('.footer__wrapper')
let image = document.querySelector('.image')
let line = document.querySelector('.line')
let end = document.querySelector('.time-end')
let start = document.querySelector('.time-current')
let body = document.querySelector('body')
let bar = document.querySelector('.progress-bar-line')
let vinil = document.querySelector('.vinil')
let isPlay = false
const audio = new Audio();
const stopIcon = 'assets/icons/pause.png'
const playIcon = 'assets/icons/play.png'
let currentTime
let duration
let playNum = 0

const tracks = [
    {
        artist: 'Klangkarussell',
        song: 'Home',
        songLink: 'assets/audio/Klangkarussell-Home.mp3',
        songCover: 'assets/images/1.jpg',
        songColors: 'rgb(160, 133, 0)',
        titleColors: 'rgb(255, 255, 255)'
    },
    {
        artist: 'Bloodhound Gang',
        song: 'The Bad Touch',
        songLink: 'assets/audio/Bloodhound Gang-The Bad Touch.mp3',
        songCover: 'assets/images/2.jpg',
        songColors: 'rgb(255, 255, 255)',
        titleColors: 'rgb(255, 255, 255)'
    },
    {
        artist: 'Armin van Buuren',
        song: 'Not Giving Up On Love',
        songLink: 'assets/audio/Armin van Buuren-Not Giving Up On Love.mp3',
        songCover: 'assets/images/3.jpg',
        songColors: 'rgb(0, 0, 139)',
        titleColors: 'rgb(255, 215, 0)'
    },
    {
        artist: 'Caesars',
        song: 'Jerk It Out',
        songLink: 'assets/audio/Caesars-Jerk It Out.mp3',
        songCover: 'assets/images/4.jpg',
        songColors: 'rgb(255, 215, 0)',
        titleColors: 'rgb(255, 255, 255)'
    },
    {
        artist: 'Paul Van Dyk',
        song: 'Lets Go',
        songLink: 'assets/audio/Paul Van Dyk -Lets Go.mp3',
        songCover: 'assets/images/5.jpg',
        songColors: 'rgb(255, 215, 0)',
        titleColors: 'rgb(255, 255, 255)'
    },
    {
        artist: 'Survivor',
        song: 'Eye Of The Tiger',
        songLink: 'assets/audio/Survivor-Eye Of The Tiger.mp3',
        songCover: 'assets/images/6.jpg',
        songColors: 'rgb(0, 255, 255)',
        titleColors: 'rgb(255, 255, 255)'
    },
]

play.addEventListener('click', playPause)

function playPause(){
    if(isPlay === true){
        audio.pause();
        currentTime = audio.currentTime
        isPlay = false;
        play.src = playIcon
        stopVinil()
    } else {
        playAudio(playNum)
}
}

function playAudio(i){
    audio.src = tracks[i].songLink;
    if (currentTime > 0) {
        audio.currentTime = currentTime;
    }
    audio.play();
    startVinil()
    play.src = stopIcon
    title.textContent = tracks[i].artist
    subTitle.textContent = tracks[i].song
    body.style.backgroundImage = `url(${tracks[i].songCover})`
    image.src = tracks[i].songCover
    player.style.boxShadow = `0 0 25rem ${tracks[i].songColors}`
    footer.style.boxShadow = `0 0 25rem ${tracks[i].songColors}`
    title.style.color = `${tracks[i].titleColors}`
    subTitle.style.color = `${tracks[i].titleColors}`
    isPlay = true
    
}


    audio.addEventListener('loadedmetadata', () => {
        setInterval(()=>{
            duration = Math.trunc(audio.duration)
            currentTime = Math.trunc(audio.currentTime)
            let listenedProgress = currentTime / duration * 100;
            line.style.width = `${listenedProgress}%`
            if(listenedProgress == 100){
                fn.nextSong()
            }
        },500)
        setInterval(()=>{
            let remaindTime = duration - currentTime
            end.textContent = getTimeTrack(remaindTime)
            let listenedTime = currentTime
            start.textContent = getTimeTrack(listenedTime)
            
        },1000)
        
     });




function getTimeTrack(a){
    let minutes = Math.trunc(a / 60)
    let seconds = a - minutes * 60
    if(seconds < 10){
        seconds = '0'+ seconds
    }
    let timeTrackEnd = `${minutes}:${seconds}`
    return timeTrackEnd
}

function getNextSong() {
    function nextSong() {
        currentTime = 0
        if(playNum > tracks.length - 2){
            playNum = 0
        } else {
            playNum += 1;
        }
        playAudio(playNum)
        return playNum;
    }

    function prevSong() {
        currentTime = 0
        if(playNum < 1){
            playNum = tracks.length - 1
        } else {
            playNum -= 1;
        }
        playAudio(playNum)
        return playNum;
    }
    return {
        nextSong,
        prevSong,
    };
}

let fn = getNextSong();

next.addEventListener('click', fn.nextSong);
prev.addEventListener('click', fn.prevSong);




bar.addEventListener('click', useMouse);

function useMouse(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

useMouse(e)


function startVinil(){
    vinil.classList.remove('pause-vinil')
        vinil.classList.add('start-vinil')
}


function stopVinil(){
        vinil.classList.remove('start-vinil')
        vinil.classList.add('pause-vinil')
}

// let isDragging = false;

// dot.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     useMouse(e);
// });

// document.addEventListener('mousemove', (e) => {
//     if (isDragging) {
//         useMouse(e);
//     }
// });

// document.addEventListener('mouseup', () => {
//     isDragging = false;
// });
