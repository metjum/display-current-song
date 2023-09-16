const updateNowPlaying = () => {
    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': 'Bearer your_access_token'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.item) {
            const songName = data.item.name;
            const artistName = data.item.artists[0].name;
            const albumName = data.item.album.name;
            const artistLink = document.getElementById('artist-link');
            const albumLink = document.getElementById('album-link');

            artistLink.textContent = artistName;
            artistLink.href = data.item.artists[0].external_urls.spotify;

            albumLink.textContent = albumName;
            albumLink.href = data.item.album.external_urls.spotify;

            document.getElementById('song-name').textContent = songName;
            document.getElementById('album-cover').src = data.item.album.images[0].url;

            const durationMs = data.item.duration_ms;
            const progressMs = data.progress_ms;
            const progressPercent = (progressMs / durationMs) * 100;

            document.getElementById('progress-bar').style.width = progressPercent + '%';


            const minutesLeft = Math.floor((durationMs - progressMs) / 60000);
            const secondsLeft = Math.floor((durationMs - progressMs) / 1000) % 60;
            document.getElementById('time-left').textContent = `${minutesLeft}:${(secondsLeft < 10 ? '0' : '')}${secondsLeft}`;
        } else {
            document.getElementById('now-playing').textContent = 'nic';
        }
    })
    .catch(error => {
        console.error('Chyba', error);
    });
}

setInterval(updateNowPlaying, 1000);
updateNowPlaying();