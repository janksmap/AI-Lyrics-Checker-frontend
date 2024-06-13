window.onload = async function() {

    async function getCurrentSong(nowPlayingElement) {
        if (!nowPlayingElement) return;

        const nowPlayingText = nowPlayingElement.getAttribute('Aria-label');
        const prefix = 'Now playing: ';
        const titleAndArtist = nowPlayingText.substring(prefix.length); // Remove the prefix and keep the rest of the string
        const splitTitleAndArtist = titleAndArtist.split(' by '); // This uses ' by ' as the delimiter to split the string.
        const songTitle = splitTitleAndArtist[0];
        const artist = splitTitleAndArtist[1];
        const songObject = await checkLyrics(songTitle, artist);
        if (songObject == null) {
            return;
        }
        const lyricsResponse = songObject.verdict;

        addToPopup(songTitle, artist);
        determineResponse(lyricsResponse);
    }

    function determineResponse(lyricsResponse) {
        if (lyricsResponse == 'Too many requests') {
            console.log('Too many requests');
        }
        else if (lyricsResponse == 'Explicit') {
            skipSong();
        }
    }

    function skipSong() {
        const skipButton = document.querySelector('[data-testid = control-button-skip-forward]');
        skipButton.click();
    }

    function addToPopup(songTitle, artist) {
        // console.log('message sent');
        // chrome.runtime.sendMessage({ action: 'addToList', songTitle: songTitle, artist: artist});
    }

    // Function to observe changes in the DOM and apply styling to newly added rows
    async function observeDOMChanges() {
        const observer = new MutationObserver(async function(mutationsList, observer) {
            let nowPlayingElement =  document.querySelector('[aria-label^="Now playing:"]');
            if (nowPlayingElement) {
                // Disconnect the observer to prevent further calls until reconnected
                observer.disconnect();
                getCurrentSong(nowPlayingElement);
                observer.observe(document.body, { childList: true, subtree: true });
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    await observeDOMChanges(); // Detect any time the current song changes
    await getCurrentSong();
};
