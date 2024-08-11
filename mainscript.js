let songs = [];
let currentsong=null;
let currentbutton=null;

fetch("http://127.0.0.1:5501/song")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
    let div1 = document.createElement("div");
    div1.innerHTML = data;
    let song = div1.getElementsByTagName("a");
    let count = 1;
    for (let i = 0; i < song.length; i++) {
      if (song[i].href.endsWith("mp3")) {
        songs.push(song[i].href);
        toString(song[i])
        let name=song[i].href.replace(/%20/g ,' ')
        let fileName = name.substring(name.lastIndexOf('/') + 1).replace('.mp3','');
        console.log(fileName)
        console.log(song[i]);
        createSongCard(song[i].href, count,fileName);
        count = count + 1;
      }
    }
  });

function createSongCard(link, sno ,title) {
  console.log(link);
  console.log(sno);
  let songcard=document.createElement('div');
  songcard.className='card';

  let songimage=document.createElement('img')
  songimage.className='songimg';
  songimage.src='music.svg';
  songimage.alt='music'; 
  songcard.appendChild(songimage);

  let song_name=document.createElement('h4');
  song_name.className='song_name';
  song_name.textContent=`${sno}.${title}`;
  songcard.appendChild(song_name)

  let playButton=document.createElement('button');
  playButton.className='playButton';
  playButton.onclick=()=>playSong(link, playButton)
  playButton.textContent='Play';
  songcard.appendChild(playButton);
  
  document.querySelector('.playlist-container').append(songcard)
}

function playSong(songlink, button){

    if (currentsong&&currentsong.src===songlink) {
        if (currentsong.paused) {
            currentsong.play();
            button.textContent='Pause'; 
        }
        else{
            currentsong.pause();
            button.textContent='Play';
        }
    }
    else{
        if(currentsong){
            currentsong.pause();
            currentbutton.textContent='play';
        }
    
        currentsong=new Audio(songlink)
        currentsong.play();
        button.textContent='pause'
        currentbutton=button;
    }

}


let playlist_btn=document.querySelector(".create-playlist-btn")
console.log(playlist_btn)
playlist_btn.addEventListener('click',function(){
   let playlist=document.createElement('div');
   playlist.className='playlist-song';
   let referenceElement=document.querySelector('#playlist-container')
   console.log(referenceElement)
   referenceElement.insertAdjacentElement('afterend', playlist);
   for (let index = 0; index < songs.length; index++) {
    const element = songs[index].replace(/%20/g ,' ').substring(songs[index].lastIndexOf('/') + 1).replace('.mp3','');;
    playlist.innerHTML+=`<ul><li>${element} <br></ul>` 
   }
   let playlistcontainer=document.getElementById('playlist-container')
   playlistcontainer.innerHTML=`<h3>create playlist <button id='btn+'> + </button></h3>`
   playlistcontainer.classList='newplaylist-conatiner'
   let addbtn=document.getElementById('btn+')
   addbtn.addEventListener('click',function(){
    let playlist=document.createElement('div');
    playlist.className='playlist-song';
    let referenceElement=document.querySelector('#playlist-container')
    console.log(referenceElement)
    referenceElement.insertAdjacentElement('afterend', playlist);
    for (let index = 0; index < songs.length; index++) {
     const element = songs[index].replace(/%20/g ,' ').substring(songs[index].lastIndexOf('/') + 1).replace('.mp3','');;
     playlist.innerHTML+=`<ul><li>${element} <br></ul>` 
    }
  })
}
)