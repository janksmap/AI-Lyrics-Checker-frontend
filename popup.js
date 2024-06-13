let recentSongs = {};

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "addToList") {
//         console.log('message received');
//         const { songTitle, artist } = request;
//         addToList(songTitle, artist);
//     }
// });

function addToList(songTitle, artist) {
    let list = document.querySelector('#recent-songs');
    let listItem = document.createElement('li');
    let row = document.createElement('div');
    let p = document.createElement('p');
    let vote = document.createElement('div');
    let upVote = document.createElement('div');
    let downVote = document.createElement('div');

    vote.appendChild(upVote, downVote);
    p.innerText = `${songTitle} by ${artist}`;

    row.appendChild(p, vote);
    listItem.appendChild(row);
    list.appendChild(listItem);


}