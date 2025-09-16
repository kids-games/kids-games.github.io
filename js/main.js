import { navigateTo } from './router.js';
import { initAudio } from './audio.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация аудио
    initAudio();

    // Обработчики событий для главной страницы
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            navigateTo('class-select');
        });
    }

    // Автовоспроизведение музыки с разрешения пользователя
    document.addEventListener('click', function () {
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic && bgMusic.paused) {
            bgMusic.play().catch(e => {
                console.log('Автовоспроизведение заблокировано. Пользователь должен взаимодействовать со страницей.');
            });
        }
    });
});

// Экспортируем функцию для навигации
export function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}