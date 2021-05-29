
const BASE_URL = 'https://api.lyrics.ovh/v1/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}

let ul = document.querySelector('ul');
let length = album.tracks.length;
   
for (let i =0; i<length; i++){
    let song = album.tracks[i];
    let li = document.createElement('li');
    let aTag = document.createElement('a');
    aTag.setAttribute("href", "#");
    li.appendChild(aTag);
    ul.appendChild(li);
    aTag.innerText = song;
}


songList.addEventListener('click', function (event) {
    let songUrl = event.target.innerText;

    axios.get(BASE_URL + `${album.artist}/${songUrl}`)
        
    .then(function (response) {
        
        let lyrics = response.data.lyrics;
        displayLyric (songUrl, lyrics);

    }).catch(function(error){
      console.log(error);
    })
})

function displayLyric (songUrl, lyrics) {
    lyricsPanel.innerHTML = `
      <h3>${songUrl}</h3>
      <pre>${lyrics}</pre>
    `
  }
