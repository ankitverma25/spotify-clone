let audio; // Declare a global variable to hold the audio object
let songs = []; // Array to store song links

let div = document.createElement("div");
let connect = fetch("http://127.0.0.1:5501/song")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    div.innerHTML = data;
    let links = div.getElementsByTagName("a");
    let num = 1;
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      if (element.href.endsWith("mp3")) {
        songs.push(element.href); // Add song to the array
        createSongCard(element.href, `Song ${num}`);
        num = num + 1;
      }
    }
  });

function createSongCard(songLink, title) {
  const card = document.createElement('div');
  card.className = 'card';

  const imgDiv = document.createElement('div');
  imgDiv.className = 'img';
  const img = document.createElement('img');
  img.className = 'songimg';
  img.src = 'music.svg';
  img.alt = 'mp3 logo';
  imgDiv.appendChild(img);
  card.appendChild(imgDiv);

  const songTitle = document.createElement('h3');
  songTitle.className = 'songname';
  songTitle.textContent = title;
  card.appendChild(songTitle);

  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = 'Lorem ipsum dolor sit amet consectetur.'; // You can modify or make it dynamic
  card.appendChild(description);

  const playButton = document.createElement('button');
  playButton.classList.add('play');
  playButton.textContent = 'Play';
  playButton.onclick = () => playSong(songLink);
  card.appendChild(playButton);

  document.querySelector('.playlist-container').appendChild(card);
}

function playSong(songLink) {
  // Pause the currently playing song (if any)
  if (audio) {
    audio.pause();
  }

  // Create a new audio object and play the selected song
  audio = new Audio(songLink);
  audio.play();
}
