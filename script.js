const API_KEY = 'API';
const CHANNEL_ID = 'ID';


/**
 * Загружает видео из YouTube API.
 * @param {number} maxResults Количество видео для загрузки (до 50 за один запрос).
 */
async function loadVideos(maxResults = 50) {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=${maxResults}`
    );
    const data = await response.json();

    const videoList = document.getElementById('video-list');
    videoList.innerHTML = data.items
        .map(video => `
            <div class="video-card">
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                </a>
                <h3>${video.snippet.title}</h3>
            </div>
        `)
        .join('');
}

document.addEventListener('DOMContentLoaded', () => loadVideos());


document.addEventListener('DOMContentLoaded', () => {
    // Получаем текущий путь (например, "index.html")
    const currentPage = location.pathname.split('/').pop() || 'index.html';

    // Находим все ссылки в меню
    const menuLinks = document.querySelectorAll('nav ul li a');

    // Проходим по всем ссылкам и добавляем/удаляем класс active
    menuLinks.forEach(link => {
        const page = link.getAttribute('href');
        if (currentPage === page) {
            link.classList.add('active'); // Подсветка текущей страницы
        } else {
            link.classList.remove('active'); // Удаление подсветки для остальных
        }
    });
});


