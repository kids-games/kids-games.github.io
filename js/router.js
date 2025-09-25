import { showPage } from './main.js';

// Простой роутер для навигации между страницами
export function navigateTo(page, confirmExit = false) {
    if (confirmExit) {
        showExitConfirmation(page);
        return;
    }

    switch (page) {
        case 'extra-word-game':
            loadExtraWordGamePage();
            break;
        case 'word-combination-game':
            loadWordCombinationGamePage();
            break;
        case 'obsolete-words-game':
            loadObsoleteWordsGamePage();
            break;
        case 'proverbs-game':
            loadProverbsGamePage();
            break;
        case 'game-select':
            loadGameSelectPage();
            break;
        case 'main':
        default:
            showPage('main-page');
            break;
    }
}

// Функция подтверждения выхода
function showExitConfirmation(targetPage) {
    const modal = document.createElement('div');
    modal.className = 'exit-confirmation-modal';
    modal.innerHTML = `
        <div class="exit-confirmation-content">
            <h3>Ты точно хочешь покинуть игру?</h3>
            <p>Весь прогресс будет потерян</p>
            <div class="exit-confirmation-buttons">
                <button class="btn exit-confirm-btn">Да</button>
                <button class="btn exit-cancel-btn">Нет</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Обработчики для кнопок
    modal.querySelector('.exit-confirm-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
        navigateTo(targetPage);
    });

    modal.querySelector('.exit-cancel-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Загрузка страницы выбора игры
function loadGameSelectPage() {
    // Если страница уже загружена, просто показываем её
    if (document.getElementById('game-select-page')) {
        showPage('game-select-page');
        return;
    }

    // Динамическая загрузка страницы
    fetch('pages/game-select.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const container = document.querySelector('.container');
            const newContent = tempDiv.querySelector('#game-select-page');

            if (newContent) {
                container.appendChild(newContent);
                showPage('game-select-page');

                const backBtn = newContent.querySelector('.back-btn');
                if (backBtn) {
                    backBtn.addEventListener('click', () => {
                        navigateTo('main');
                    });
                }
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки страницы:', error);
        });
}

// Загрузка страницы игры "Найди лишнее слово"
function loadExtraWordGamePage() {
    if (document.getElementById('extra-word-game')) {
        showPage('extra-word-game');
        return;
    }

    fetch('pages/extra-word-game.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const container = document.querySelector('.container');
            const newContent = tempDiv.querySelector('#extra-word-game');

            if (newContent) {
                container.appendChild(newContent);
                showPage('extra-word-game');
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки страницы:', error);
        });
}

// Загрузка страницы игры "Составь словосочетание"
function loadWordCombinationGamePage() {
    if (document.getElementById('word-combination-game')) {
        showPage('word-combination-game');
        return;
    }

    fetch('pages/word-combination-game.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const container = document.querySelector('.container');
            const newContent = tempDiv.querySelector('#word-combination-game');

            if (newContent) {
                container.appendChild(newContent);
                showPage('word-combination-game');
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки страницы:', error);
        });
}

// Загрузка страницы игры "Найди устаревшие слова"
function loadObsoleteWordsGamePage() {
    if (document.getElementById('obsolete-words-game')) {
        showPage('obsolete-words-game');
        return;
    }

    fetch('pages/obsolete-words-game.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const container = document.querySelector('.container');
            const newContent = tempDiv.querySelector('#obsolete-words-game');

            if (newContent) {
                container.appendChild(newContent);
                showPage('obsolete-words-game');
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки страницы:', error);
        });
}

function loadProverbsGamePage() {
    if (document.getElementById('proverbs-game')) {
        showPage('proverbs-game');
        return;
    }

    fetch('pages/proverbs-game.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const container = document.querySelector('.container');
            const newContent = tempDiv.querySelector('#proverbs-game');

            if (newContent) {
                container.appendChild(newContent);
                showPage('proverbs-game');
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки страницы:', error);
        });
}