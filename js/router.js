import { showPage } from './main.js';

// Простой роутер для навигации между страницами
export function navigateTo(page) {
    switch (page) {
        case 'class-select':
            loadClassSelectPage();
            break;
        case 'game':
            // Загрузка будет происходить через обработчики в class-select
            break;
        case 'main':
        default:
            showPage('main-page');
            break;
    }
}

// Загрузка страницы выбора класса
function loadClassSelectPage() {
    // Если страница уже загружена, просто показываем её
    if (document.getElementById('class-select-page')) {
        showPage('class-select-page');
        return;
    }

    // Динамическая загрузка страницы
    fetch('pages/class-select.html')
        .then(response => response.text())
        .then(html => {
            // Создаем временный контейнер
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Вставляем содержимое в основной контейнер
            const container = document.querySelector('.container');
            const newContent = tempDiv.querySelector('#class-select-page');

            if (newContent) {
                container.appendChild(newContent);
                showPage('class-select-page');
                initClassSelectPage();
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки страницы:', error);
        });
}

// Инициализация страницы выбора класса
function initClassSelectPage() {
    const classButtons = document.querySelectorAll('.class-btn');

    classButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const classNumber = e.target.getAttribute('data-class');
            startGame(classNumber);
        });
    });

    // Обработчик для кнопки "Назад"
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            navigateTo('main');
        });
    }
}

// Начать игру для выбранного класса
function startGame(grade) {
    // Если страница игры уже загружена, просто показываем её
    if (document.getElementById('game-page')) {
        showGamePage(grade);
        return;
    }

    // Динамическая загрузка страницы игры
    fetch('pages/game.html')
        .then(response => response.text())
        .then(html => {
            // Создаем временный контейнер
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Вставляем содержимое в основной контейнер
            const container = document.querySelector('.container');
            const newContent = tempDiv.querySelector('#game-page');

            if (newContent) {
                container.appendChild(newContent);
                showGamePage(grade);
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки страницы:', error);
        });
}

// Показать страницу игры и инициализировать её
function showGamePage(grade) {
    showPage('game-page');

    // Устанавливаем номер класса
    const classNumberElement = document.getElementById('class-number');
    if (classNumberElement) {
        classNumberElement.textContent = grade;
    }

    // Инициализируем игру
    import('./game.js').then(module => {
        module.initGame(grade);
    });

    // Обработчик для кнопки "Назад"
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            navigateTo('class-select');
        });
    }
}