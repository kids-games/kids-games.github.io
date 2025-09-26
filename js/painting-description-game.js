import { playSound } from './audio.js';
import { navigateTo } from './router.js';

// Данные для игры
const gameData = {
    text: "На картине Васнецова изображен русский (пусто), который в раздумье стоит перед камнем с надписью. На голове его островерхий (пусто). На нем (пусто) богатырские. Стальная (пусто) надежно защищает витязя от стрел врага. Но и сам воин может постоять за землю-матушку: в одной его руке (пусто), а в другой - (пусто). Колчан полон легкий, послушных стрел. Вся фигура выражает задумчивость и в то же время достоинство и силу.",

    words: ["витязь", "шелом", "доспехи", "броня", "булава", "щит"],

    correctAnswers: {
        1: "витязь",
        2: "шелом",
        3: "доспехи",
        4: "броня",
        5: ["булава", "щит"], // Можно два варианта
        6: ["щит", "булава"]  // Можно два варианта
    },

    hint: `
        <div class="word-definition">
            <h3>Подсказка</h3>
            <p><strong>Витязь</strong> – храбрый воин, богатырь, защитник земли Русской.</p>
            <p><strong>Шелом</strong> – старинный воинский шлем.</p>
            <p><strong>Доспехи</strong> – общее название для всего вооружения, защищающего воина.</p>
            <p><strong>Броня</strong> – в древности так называли не только стальные пластины, но и любую защитную одежду воина.</p>
            <p><strong>Булава</strong> – тяжелое ударное оружие с шипастым набалдашником.</p>
            <p><strong>Щит</strong> – прочное изделие из дерева и металла, которое воин держит в руке для защиты от ударов мечом или стрел. Это главный и самый древний доспех любого воина.</p>
        </div>
    `,

    remember: `
        <div class="remember-item">
            <h3>Витязь</h3>
            <p>– храбрый воин, богатырь, защитник земли Русской.</p>
        </div>
        <div class="remember-item">
            <h3>Шелом</h3>
            <p>– старинный воинский шлем.</p>
        </div>
        <div class="remember-item">
            <h3>Доспехи</h3>
            <p>– общее название для всего вооружения, защищающего воина.</p>
        </div>
        <div class="remember-item">
            <h3>Броня</h3>
            <p>– в древности так называли не только стальные пластины, но и любую защитную одежду воина.</p>
        </div>
        <div class="remember-item">
            <h3>Булава</h3>
            <p>– тяжелое ударное оружие с шипастым набалдашником.</p>
        </div>
        <div class="remember-item">
            <h3>Щит</h3>
            <p>– прочное изделие из дерева и металла, которое воин держит в руке для защиты от ударов мечом или стрел. Это главный и самый древний доспех любого воина.</p>
        </div>
    `
};

let completedGaps = 0;
let hintUsed = false;
let draggedElement = null;

// Инициализация игры
export function initPaintingDescriptionGame() {
    completedGaps = 0;
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
    const gameArea = document.querySelector('#painting-description-game .game-area');
    const successMessage = document.querySelector('#painting-description-game .success-message');
    const resultContainer = document.querySelector('#painting-description-game #result-container');

    if (gameArea) gameArea.style.display = 'block';
    if (successMessage) successMessage.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
}

// Показать игру
function showGame() {
    const textContainer = document.querySelector('#painting-description-game #text-container');
    const wordsContainer = document.querySelector('#painting-description-game #words-container');
    const hintContent = document.querySelector('#painting-description-game #hint-content');
    const rememberContent = document.querySelector('#painting-description-game #remember-content');

    // Заполняем текст с пустыми местами
    if (textContainer) {
        textContainer.innerHTML = createTextWithGaps();
    }

    // Заполняем слова для перетаскивания
    if (wordsContainer) {
        wordsContainer.innerHTML = '';

        gameData.words.forEach((word, index) => {
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

// Создать текст с пустыми местами
function createTextWithGaps() {
    let text = gameData.text;
    let gapCount = 0;

    // Заменяем (пусто) на интерактивные элементы
    text = text.replace(/\(пусто\)/g, () => {
        gapCount++;
        return `<span class="gap-container"><span class="gap" data-gap="${gapCount}"></span></span>`;
    });

    return `<div class="description-text">${text}</div>`;
}

// Настройка обработчиков событий
function setupEventHandlers() {
    // Обработчик для кнопки "Назад"
    const backBtn = document.querySelector('#painting-description-game .back-btn');
    if (backBtn) {
        backBtn.onclick = () => navigateTo('game-select');
    }

    // Обработчик для кнопки "Подсказка"
    const hintBtn = document.querySelector('#painting-description-game #hint-btn');
    if (hintBtn) {
        hintBtn.onclick = toggleHint;
    }

    // Обработчик для кнопки "Закончить игру"
    const nextLevelBtn = document.querySelector('#painting-description-game .next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.onclick = () => navigateTo('game-select');
    }

    // Настройка drop zones после загрузки DOM
    setTimeout(() => {
        const gaps = document.querySelectorAll('#painting-description-game .gap');
        gaps.forEach(gap => {
            gap.addEventListener('dragover', handleDragOver);
            gap.addEventListener('dragenter', handleDragEnter);
            gap.addEventListener('dragleave', handleDragLeave);
            gap.addEventListener('drop', handleDrop);
        });
    }, 100);
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
        const gapNumber = parseInt(this.dataset.gap);
        const correctAnswer = gameData.correctAnswers[gapNumber];

        // Проверяем правильность ответа (учитываем варианты ответов)
        const isCorrect = Array.isArray(correctAnswer)
            ? correctAnswer.includes(droppedWord)
            : correctAnswer === droppedWord;

        if (isCorrect) {
            // Правильный ответ
            playSound('assets/audio/effects/success.mp3');

            // Добавляем слово в gap
            this.textContent = droppedWord;
            this.classList.add('correct');
            this.dataset.filled = 'true';

            // Делаем блок неактивным
            draggedElement.style.opacity = '0.3';
            draggedElement.style.cursor = 'default';
            draggedElement.draggable = false;

            // Показываем результат
            showResult(true, 'Молодец! Правильно!');

            completedGaps++;

            // Проверяем завершение игры
            if (completedGaps === Object.keys(gameData.correctAnswers).length) {
                setTimeout(() => {
                    const successMessage = document.querySelector('#painting-description-game .success-message');
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
                const resultContainer = document.querySelector('#painting-description-game #result-container');
                if (resultContainer) resultContainer.style.display = 'none';
            }, 2000);
        }
    }
}

// Показать результат
function showResult(isCorrect, message) {
    const resultContainer = document.querySelector('#painting-description-game #result-container');
    const resultImage = document.querySelector('#painting-description-game #result-image');
    const resultText = document.querySelector('#painting-description-game #result-text');

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
    const hintContent = document.querySelector('#painting-description-game #hint-content');
    const hintBtn = document.querySelector('#painting-description-game #hint-btn');

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