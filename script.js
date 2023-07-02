console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let gif=document.getElementById('gif');
let bannerSongName = document.getElementById('bannerSongName');

let songs = [
    { songName: "G-Shit", filePath: "songs/0.mp3", coverPath: "covers/1.jpg" },
    { songName: "Mi-Amor", filePath: "songs/1.mp3", coverPath: "covers/2.jpg" },
    { songName: "Lifestyle", filePath: "songs/2.mp3", coverPath: "covers/3.jpg" },
    { songName: "Dhakka", filePath: "songs/3.mp3", coverPath: "covers/4.jpg" },
    { songName: "4 X 4", filePath: "songs/4.mp3", coverPath: "covers/11.jpeg" },

];


songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
   

});

function updateDurations() {
    songItem.forEach((element, i) => {
      const audio = new Audio(songs[i].filePath);
      audio.addEventListener('loadedmetadata', () => {
        const duration = formatTime(audio.duration);
        element.getElementsByClassName('timeDuration')[0].textContent = duration;
      });
    });
  }
  
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
updateDurations();  
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updateTimestamps();

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } 
    else{

        audioElement.pause();
        
        allPause();
        
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {

    progress = parseInt((audioElement.currentTime) / (audioElement.duration) * 100);

    myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

       
        songIndex=parseInt(e.target.id);

        allPause();
        audioElement.src = `songs/${songIndex}.mp3`;
        bannerSongName.innerText=songs[songIndex].songName;

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        

    })
}

)
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex=0;
    }
    else{
        songIndex++;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    bannerSongName.innerText=songs[songIndex].songName;

    
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateTimestamps();
    

})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=4;
    }
    else{
        songIndex--;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    bannerSongName.innerText=songs[songIndex].songName;

   
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateTimestamps();
    

})
function allPause(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}
function updateTimestamps() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        const iconId = parseInt(element.id);
        if (iconId === songIndex) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        } else {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    });
}
