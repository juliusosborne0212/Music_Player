const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'derek-1',
    displayName: 'Hips dont lie',
    artist: 'Sarkodie ft Joeboy',
  },
  {
    name: 'derek-2',
    displayName: 'Stir it Up',
    artist: 'Bob Marley ft Sarkodie',
  },
  {
    name: 'derek-3',
    displayName: 'Bounce',
    artist: 'Sarkodie',
  },
  {
    name: 'derek-4',
    displayName: 'Elijah',
    artist: 'Sarkodie ft Obrafuor',
  },
  {
    name: 'derek-5',
    displayName: '2 Paddies',
    artist: 'Sarkodie ft Joey B',
  },
  {
    name: 'derek-6',
    displayName: 'Sugarcane',
    artist: 'Camidoh ft King Promise',
  },
  {
    name: 'derek-7',
    displayName: 'Dw3',
    artist: 'Mr Drew & Krymi ft King Promise',
  },
  {
    name: 'derek-8',
    displayName: 'Calm down',
    artist: 'Rema',
  },
  {
    name: 'derek-9',
    displayName: 'Rap Attack',
    artist: 'Sarkodie ft Vector',
  },
  {
    name: 'derek-10',
    displayName: 'Hallelujah',
    artist: 'Sarkodie ft Viviane',
  },
  {
    name: 'derek-11',
    displayName: 'My Name',
    artist: 'Stonebwoy',
  },
  {
    name: 'derek-12',
    displayName: 'All Over',
    artist: 'Tiwa Savage',
  },

];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
