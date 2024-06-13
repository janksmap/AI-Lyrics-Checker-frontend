const API_PORT = 3000;
// const API_URL = `http://localhost:${API_PORT}`;
const API_URL = `https://taylorenglish.dev`;

async function checkLyrics(songTitle, artist) {
    const payload = {
        songTitle: songTitle,
        artist: artist
    };

    try {
        const response = await fetch(API_URL + '/check-lyrics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        // console.log(result);

        return result;
    } catch (error) {
        console.error('Error: ', error);
    }
}