// 1. VIDEO LIST (Data)
const myVideos = [
    { link: "https://youtu.be/8U98Mp-JVMY", title: "Para 1 (Alif Laam Meem)", desc: "Complete recitation of Juz 1." },
    { link: "https://youtu.be/fy6gJJyjvMQ", title: "Para 2 (Sayaqool)", desc: "Complete recitation of Juz 2." },
    { link: "https://youtu.be/y0jgDe3REKQ", title: "Para 3 (Tilkar Rusul)", desc: "Complete recitation of Juz 3." },
    { link: "https://youtu.be/Y-ye7uzebJU", title: "Para 4 (Lan Tanalu)", desc: "Complete recitation of Juz 4." },
    { link: "https://youtu.be/01WzRtycK04", title: "Para 5 (Wal Mohsanat)", desc: "Complete recitation of Juz 5." },
    { link: "https://youtu.be/XOuKaNll_V8", title: "Para 6 (La Yuhibbullah)", desc: "Complete recitation of Juz 6." },
    { link: "https://youtu.be/ZYaMy2_sEQM", title: "Para 7 (Wa Iza Samiu)", desc: "Complete recitation of Juz 7." },
    { link: "https://youtu.be/ve4yun9JrC8", title: "Para 8 (Wa Lau Annana)", desc: "Complete recitation of Juz 8." },
    { link: "https://youtu.be/shKRqUWfDeM", title: "Para 9 (Qalal Malao)", desc: "Complete recitation of Juz 9." },
    { link: "https://youtu.be/tbN0sPUeXnw", title: "Para 10 (Wa A'lamu)", desc: "Complete recitation of Juz 10." },
    { link: "https://youtu.be/oCyLR9uqxyI", title: "Para 11 (Yatazeroona)", desc: "Complete recitation of Juz 11." },
    { link: "https://youtu.be/hB6BR7E6PaA", title: "Para 12 (Wa Mamin Da'abat)", desc: "Complete recitation of Juz 12." },
    { link: "https://youtu.be/eG3uu-WS7qg", title: "Para 13 (Wa Ma Ubrioo)", desc: "Complete recitation of Juz 13." },
    { link: "https://youtu.be/l-izSXX3Xr0", title: "Para 14 (Rubama)", desc: "Complete recitation of Juz 14." },
    { link: "https://youtu.be/_gA5EB1R5Uo", title: "Para 15 (Subhanallazi)", desc: "Complete recitation of Juz 15." },
    { link: "https://youtu.be/Z0stqnmm7qM", title: "Para 16 (Qala Alam)", desc: "Complete recitation of Juz 16." },
    { link: "https://youtu.be/iEqhAed2wTk", title: "Para 17 (Iqtaraba)", desc: "Complete recitation of Juz 17." },
    { link: "https://youtu.be/8qMobOugcP4", title: "Para 18 (Qadd Aflaha)", desc: "Complete recitation of Juz 18." },
    { link: "https://youtu.be/peANvy-0PY0", title: "Para 19 (Wa Qalallazina)", desc: "Complete recitation of Juz 19." },
    { link: "https://youtu.be/c29NOTqyW9M", title: "Para 20 (Aman Khalaq)", desc: "Complete recitation of Juz 20." }
];

// 2. LOGIC (Brain)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('videoContainer');
    const searchInput = document.getElementById('searchInput');
    
    // YouTube ID Extractor
    function getYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Load Videos
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

    // Search Engine
    searchInput.addEventListener('keyup', function() {
        const filter = searchInput.value.toLowerCase();
        const cards = container.getElementsByClassName('video-card');

        Array.from(cards).forEach(card => {
            const title = card.querySelector('.video-title').textContent.toLowerCase();
            const desc = card.querySelector('.video-desc').textContent.toLowerCase();
            
            if (title.includes(filter) || desc.includes(filter)) {
                card.style.display = ""; // Show
            } else {
                card.style.display = "none"; // Hide
            }
        });
    });
});
