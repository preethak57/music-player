const songs = [
{
    name: "Guitar Melody",
    path: "songs/song1.mp3",
    cover: "images/song1.jpg"
},
{
    name: "Neon Beats",
    path: "songs/song2.mp3",
    cover: "images/song2.jpg"
},
{
    name: "Soul Music",
    path: "songs/song3.mp3",
    cover: "images/song3.jpg"
}
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let currentSong = 0;

function loadSong(index) {
    audio.src = songs[index].path;
    title.textContent = songs[index].name;
    cover.src = songs[index].cover;
}

loadSong(currentSong);

playBtn.addEventListener("click", () => {

    if(audio.paused){
        audio.play();
        playBtn.textContent = "⏸";
    }else{
        audio.pause();
        playBtn.textContent = "▶";
    }

});

nextBtn.addEventListener("click", () => {

    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";

});

prevBtn.addEventListener("click", () => {

    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";

});

audio.addEventListener("ended", () => {

    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();

});



audio.addEventListener("timeupdate", () => {

    const progressPercent =
    (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent || 0;

    let currentMin =
    Math.floor(audio.currentTime / 60);

    let currentSec =
    Math.floor(audio.currentTime % 60);

    if(currentSec < 10){
        currentSec = "0" + currentSec;
    }

    currentTimeEl.textContent =
    `${currentMin}:${currentSec}`;

    let durationMin =
    Math.floor(audio.duration / 60);

    let durationSec =
    Math.floor(audio.duration % 60);

    if(durationSec < 10){
        durationSec = "0" + durationSec;
    }

    if(!isNaN(durationMin)){
        durationEl.textContent =
        `${durationMin}:${durationSec}`;
    }

});

progress.addEventListener("input", () => {

    audio.currentTime =
    (progress.value / 100) * audio.duration;

});