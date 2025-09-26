import { playSound } from './audio.js';
import { navigateTo } from './router.js';

// Данные для игры
const gameData = {
    categories: {
        face: {
            title: "Части лица",
            correctWords: ["ланиты", "око", "чело"],
            color: "#43cea2"
        },
        length: {
            title: "Меры длины",
            correctWords: ["пядь", "аршин", "сажень"],
            color: "#ff6a88"
        },
        weight: {
            title: "Меры веса",
            correctWords: ["золотник", "фунт", "пуд"],
            color: "#6a4c93"
        }
    },

    words: ["ланиты", "око", "чело", "пядь", "аршин", "сажень", "золотник", "фунт", "пуд"],

    hint: `
        <div class="word-definition">
            <h3>Подсказка</h3>
            
            <div class="category-hint">
                <p><strong>Ланиты</strong> – красивое, поэтическое слово для щёк.</p>
                <p><strong>Око</strong> – поэтическое и устаревшее слово для глаза.</p>
                <p><strong>Чело</strong> – высокое, книжное слово для обозначения лба.</p>
            </div>
            
            <div class="category-hint">
                <p><strong>Пядь</strong> – расстояние между растянутыми большим и указательным пальцами (17-19 см).</p>
                <p><strong>Аршин</strong> – мера длины, равная 71 см.</p>
                <p><strong>Сажень</strong> – большая мера, равная трём аршинам (около 2,13 метров).</p>
            </div>
            
            <div class="category-hint">
                <p><strong>Золотник</strong> – очень маленькая мера веса (около 4,26 грамма).</p>
                <p><strong>Фунт</strong> – равен 96 золотникам (около 409,5 грамма).</p>
                <p><strong>Пуд</strong> – большая мера веса, равная 40 фунтам (около 16,38 кг).</p>
            </div>
        </div>
    `,

    remember: `
        <div class="remember-category">
            <h3 style="color: #43cea2;">Части лица</h3>
            <div class="remember-item">
                <h4>Ланиты</h4>
                <p>– красивое, поэтическое слово для щёк.</p>
            </div>
            <div class="remember-item">
                <h4>Око</h4>
                <p>– поэтическое и устаревшее слово для глаза.</p>
            </div>
            <div class="remember-item">
                <h4>Чело</h4>
                <p>– высокое, книжное слово для обозначения лба.</p>
            </div>
        </div>
        
        <div class="remember-category">
            <h3 style="color: #ff6a88;">Меры длины</h3>
            <div class="remember-item">
                <h4>Пядь</h4>
                <p>– одна из самых маленьких мер. Это расстояние между растянутыми большим и указательным пальцами. Была около 17-19 см.</p>
            </div>
            <div class="remember-item">
                <h4>Аршин</h4>
                <p>– более поздняя мера, пришедшая с Востока. Равен 71 см. Этой мерой пользовались купцы.</p>
            </div>
            <div class="remember-item">
                <h4>Сажень</h4>
                <p>– большая мера, равная трём аршинам (около 2,13 метров).</p>
            </div>
        </div>
        
        <div class="remember-category">
            <h3 style="color: #6a4c93;">Меры веса</h3>
            <div class="remember-item">
                <h4>Золотник</h4>
                <p>– очень маленькая мера веса, около 4,26 грамма. Использовалась для взвешивания драгоценностей или очень ценных товаров.</p>
            </div>
            <div class="remember-item">
                <h4>Фунт</h4>
                <p>– одна из самых известных старых мер. Равен 96 золотникам, или примерно 409,5 граммам (почти полкилограмма).</p>
            </div>
            <div class="remember-item">
                <h4>Пуд</h4>
                <p>– большая мера веса, равная 40 фунтам. Это около 16,38 килограмма.</p>
            </div>
        </div>
    `
};

let placedWords = 0;
let hintUsed = false;
let draggedElement = null;

// Инициализация игры
export function initWordCategoriesGame() {
    placedWords = 0;
    hintUsed = false;

    // Сначала скрываем все элементы результатов
    hideAllGameElements();

    // Показываем игру
    showGame();

    // Настраиваем обработчики событий
    setupEventHandlers();
}

// Скрыть все игровые элементы
function hideAllGameElements() {
    const gameArea = document.querySelector('#word-categories-game .game-area');
    const successMessage = document.querySelector('#word-categories-game .success-message');
    const resultContainer = document.querySelector('#word-categories-game #result-container');

    if (gameArea) gameArea.style.display = 'block';
    if (successMessage) successMessage.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
}

// Показать игру
function showGame() {
    const wordsContainer = document.querySelector('#word-categories-game #words-container');
    const hintContent = document.querySelector('#word-categories-game #hint-content');
    const rememberContent = document.querySelector('#word-categories-game #remember-content');

    // Заполняем слова для перетаскивания
    if (wordsContainer) {
        wordsContainer.innerHTML = '';

        // Перемешиваем слова
        const shuffledWords = [...gameData.words].sort(() => Math.random() - 0.5);

        shuffledWords.forEach((word, index) => {
            const wordBlock = document.createElement('div');
            wordBlock.className = 'word-block';
            wordBlock.draggable = true;
            wordBlock.dataset.word = word;

            wordBlock.textContent = word;

            wordBlock.addEventListener('dragstart', handleDragStart);
            wordBlock.addEventListener('dragend', handleDragEnd);

            wordsContainer.appendChild(wordBlock);
        });
    }

    // Заполняем подсказку
    if (hintContent) {
        hintContent.innerHTML = gameData.hint;
        hintContent.style.display = 'none';
    }

    // Заполняем контент для запоминания
    if (rememberContent) {
        rememberContent.innerHTML = gameData.remember;
    }
}

// Настройка обработчиков событий
function setupEventHandlers() {
    // Обработчик для кнопки "Назад"
    const backBtn = document.querySelector('#word-categories-game .back-btn');
    if (backBtn) {
        backBtn.onclick = () => navigateTo('game-select');
    }

    // Обработчик для кнопки "Подсказка"
    const hintBtn = document.querySelector('#word-categories-game #hint-btn');
    if (hintBtn) {
        hintBtn.onclick = toggleHint;
    }

    // Обработчик для кнопки "Закончить игру"
    const nextLevelBtn = document.querySelector('#word-categories-game .next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.onclick = () => navigateTo('game-select');
    }

    // Настройка drop zones
    const dropZones = document.querySelectorAll('#word-categories-game .drop-zone');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

// Обработчики событий drag and drop
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.word);
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedElement = null;
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    if (draggedElement) {
        const droppedWord = draggedElement.dataset.word;
        const category = this.dataset.category;
        const correctWords = gameData.categories[category].correctWords;

        // Проверяем правильность ответа
        const isCorrect = correctWords.includes(droppedWord);

        if (isCorrect) {
            // Правильный ответ
            playSound('assets/audio/effects/success.mp3');

            // Добавляем слово в ячейку
            const wordElement = document.createElement('div');
            wordElement.className = 'placed-word';
            wordElement.textContent = droppedWord;
            wordElement.style.backgroundColor = gameData.categories[category].color;
            this.appendChild(wordElement);

            // Делаем блок неактивным
            draggedElement.style.opacity = '0.3';
            draggedElement.style.cursor = 'default';
            draggedElement.draggable = false;

            // Показываем результат
            showResult(true, 'Молодец! Правильно!');

            placedWords++;

            // Проверяем завершение игры
            if (placedWords === gameData.words.length) {
                setTimeout(() => {
                    const successMessage = document.querySelector('#word-categories-game .success-message');
                    if (successMessage) successMessage.style.display = 'block';
                }, 2000);
            }
        } else {
            // Неправильный ответ
            playSound('assets/audio/effects/error.mp3');
            this.classList.add('incorrect');
            showResult(false, 'Попробуй ещё раз!');

            // Сбрасываем стиль через 2 секунды
            setTimeout(() => {
                this.classList.remove('incorrect');
                const resultContainer = document.querySelector('#word-categories-game #result-container');
                if (resultContainer) resultContainer.style.display = 'none';
            }, 2000);
        }
    }
}

// Показать результат
function showResult(isCorrect, message) {
    const resultContainer = document.querySelector('#word-categories-game #result-container');
    const resultImage = document.querySelector('#word-categories-game #result-image');
    const resultText = document.querySelector('#word-categories-game #result-text');

    if (resultContainer) resultContainer.style.display = 'block';

    if (resultImage) {
        resultImage.innerHTML = isCorrect ? '✅' : '❌';
    }

    if (resultText) {
        resultText.textContent = message;
        resultText.className = `result-text ${isCorrect ? 'correct' : 'incorrect'}`;
    }
}

// Переключить подсказку
function toggleHint() {
    const hintContent = document.querySelector('#word-categories-game #hint-content');
    const hintBtn = document.querySelector('#word-categories-game #hint-btn');

    if (hintContent && hintBtn) {
        if (hintContent.style.display === 'block') {
            hintContent.style.display = 'none';
            hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Подсказка';
        } else {
            hintContent.style.display = 'block';
            hintBtn.innerHTML = '<i class="fas fa-lightbulb" style="text-decoration: line-through;"></i> Подсказка';
            hintUsed = true;
        }
    }
}