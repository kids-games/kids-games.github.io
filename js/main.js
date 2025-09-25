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
            navigateTo('game-select');
        });
    }

    // Обработчик для кнопок выбора игры
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('play-game-btn')) {
            const gameCard = e.target.closest('.game-card');
            const gameType = gameCard.getAttribute('data-game');
            navigateTo(gameType);
        }

        if (e.target.classList.contains('back-btn') && document.getElementById('game-select-page')) {
            navigateTo('main');
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

        // Инициализируем игру, если перешли на страницу игры
        if (pageId === 'extra-word-game') {
            import('./extra-word-game.js').then(module => {
                module.initExtraWordGame();
            });
        } else if (pageId === 'word-combination-game') {
            import('./word-combination-game.js').then(module => {
                module.initWordCombinationGame();
            });
        } else if (pageId === 'obsolete-words-game') {
            import('./obsolete-words-game.js').then(module => {
                module.initObsoleteWordsGame();
            });
        } else if (pageId === 'proverbs-game') {
            import('./proverbs-game.js').then(module => {
                module.initProverbsGame();
            });
        } else if (pageId === 'synonym-proverbs-game') {
            import('./synonym-proverbs-game.js').then(module => {
                module.initSynonymProverbsGame();
            });
        }
    }
}