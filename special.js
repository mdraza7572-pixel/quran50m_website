// NEW PLAYLIST DATA
const myVideos = [
    {
        link: "https://youtu.be/EXAMPLE_LINK_1",
        title: "New Video 1",
        desc: "Description for new video."
    },
    {
        link: "https://youtu.be/EXAMPLE_LINK_2",
        title: "New Video 2",
        desc: "Description for new video."
    }
    // Add more videos here...
];

// LOGIC (Same as before)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('videoContainer');
    const searchInput = document.getElementById('searchInput');
    
    function getYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    if (typeof myVideos !== 'undefined' && myVideos.length > 0) {
        myVideos.forEach(video => {
            const videoId = getYouTubeId(video.link);
            if(videoId) {
                const card = document.createElement('a');
                card.href = video.link;
                card.target = "_blank";
                card.className = "video-card";
                card.innerHTML = `
                    <div class="thumbnail">
                        <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${video.title}">
                        <div class="play-icon"><i class="fas fa-play"></i></div>
                    </div>
                    <div class="video-info">
                        <div class="video-title">${video.title}</div>
                        <div class="video-desc">${video.desc}</div>
                    </div>
                `;
                container.appendChild(card);
            }
        });
    }

    searchInput.addEventListener('keyup', function() {
        const filter = searchInput.value.toLowerCase();
        const cards = container.getElementsByClassName('video-card');
        Array.from(cards).forEach(card => {
            const title = card.querySelector('.video-title').textContent.toLowerCase();
            const desc = card.querySelector('.video-desc').textContent.toLowerCase();
            if (title.includes(filter) || desc.includes(filter)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});
