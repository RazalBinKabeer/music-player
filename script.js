const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const music = document.querySelector("audio");

// Music
const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: "Jacinto Design",
    },

    {
        name: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Jacinto Design",
    },

    {
        name: "metric-1",
        displayName: "Front Row (Remix)",
        artist: "Metric/Jacintio Design",
    },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    music.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    isPlaying = true;
}

// Pause
function pauseSong() {
    music.pause();
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    isPlaying = false;
}

// Play or pause event listener
playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous song
function prevSong() {
    if (songIndex === 0) {
        songIndex = songs.length;
    }
    songIndex--;
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    if (songIndex === songs.length - 1) {
        songIndex = -1;
    }
    songIndex++;
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select first song
loadSong(songs[songIndex]);

// Update Progress Bar & time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progres bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes} : ${durationSeconds}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes} : ${currentSeconds}`;
    }
}

// Set Progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
