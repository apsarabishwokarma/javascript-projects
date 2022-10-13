console.log("welcome to spotify")
// let allows you to declare variables that are limited to the scope of a block statement, or expression on which it is used
//unlike the var keyword, which declares a variable globally, or locally to an entire function regardless of block scope.


let songIndex = 0;
let audioElement = new Audio('songs/ali.mp3');
//audioElement.play();
let masterPlay = document.getElementById('masterPlay');//elementaccess
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs= [
    
    {songName: "moonlight-aliGatie", filePath: "songs/ali.mp3", coverPath: "covers/Ali1.jpg"},
    {songName: "sasto mutu-sajjan Raj vaidya", filePath: "songs/sastomutu.mp3", coverPath: "covers/srv4.jpg"},
    {songName: "najik na aau-bartika rai", filePath: "songs/najik.mp3", coverPath: "covers/najik.jpg"},
    {songName: "hataridai batasidai-sajjan raj vaidya", filePath:"songs/hataarindai.mp3", coverPath: "covers/srv2.jpg"},
    {songName: "hawaijahaj batasidai-sajjan raj vaidya", filePath:"songs/hawaijahaj.mp3", coverPath: "covers/srv1.jpg"},
    {songName: "lukamari-sajjan Raj vaidya", filePath: "songs/lukamari.mp3", coverPath: "covers/srv3.jpg"},
    {songName: "khamosiyaan-Arjit singh", filePath: "songs/khamoshiyan.mp3", coverPath: "covers/kha1.jpg"},
]


songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
}) 


// event to Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){ //geet start nahuda or pause 
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{ 
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
 
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); //%ma 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();//function 
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;//to update songs accordingly
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

//to use previous and next icon
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
   audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})