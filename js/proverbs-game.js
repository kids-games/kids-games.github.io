import { playSound } from './audio.js';
import { navigateTo } from './router.js';

// Данные для игры
const proverbsData = {
    proverbs: [
        {
            firstPart: "Красна девица в хороводе, что",
            secondPart: "весенний день",
            fullProverb: "Красна девица в хороводе, что весенний день",
            explanation: "Красота — в умении радовать других своими талантами и добрым нравом."
        },
        {
            firstPart: "Красна изба не углями, а",
            secondPart: "красна пирогами",
            fullProverb: "Красна изба не углями, а красна пирогами",
            explanation: "Ценность дома определяют не вещи, а гостеприимные и хлебосольные хозяева"
        },
        {
            firstPart: "Красно поле пшеном, а",
            secondPart: "беседа умом",
            fullProverb: "Красно поле пшеном, а беседа умом",
            explanation: "Ценность разговора — в его мудрости и смысле, а не в пустой болтовне"
        }
    ],
    hint: `
        <div class="word-definition">
            <h3>Подсказка</h3>
            <p>Вспомни смысл каждой пословицы:</p>
            <ul>
                <li>Первая пословица говорит о красоте, сравнимой с весенним днём</li>
                <li>Вторая - о том, что дом ценен угощениями, а не богатством</li>
                <li>Третья - о том, что разговор ценен умом, а не длиной</li>
            </ul>
        </div>
    `,
    remember: `
        <div class="remember-item">
            <h3>Красна девица в хороводе, что весенний день</h3>
            <p>— Красота — в умении радовать других своими талантами и добрым нравом.</p>
        </div>
        <div class="remember-item">
            <h3>Красна изба не углями, а красна пирогами</h3>
            <p>— Ценность дома определяют не вещи, а гостеприимные и хлебосольные хозяева</p>
        </div>
        <div class="remember-item">
            <h3>Красно поле пшеном, а беседа умом</h3>
            <p>— Ценность разговора — в его мудрости и смысле, а не в пустой болтовне</p>
        </div>
    `
};

let completedProverbs = 0;
let hintUsed = false;
let draggedElement = null;

// Инициализация игры
export function initProverbsGame() {
    completedProverbs = 0;
    hintUsed = false;

    // Сначала скрываем все элементы результатов
    hideAllGameElements();

    // Настраиваем обработчики событий
    setupEventHandlers();

    // Заполняем контент для запоминания
    const rememberContent = document.querySelector('#proverbs-game #remember-content');
    if (rememberContent) rememberContent.innerHTML = proverbsData.remember;

    // Заполняем подсказку
    const hintContent = document.querySelector('#proverbs-game #hint-content');
    if (hintContent) hintContent.innerHTML = proverbsData.hint;
}

// Скрыть все игровые элементы
function hideAllGameElements() {
    const gameArea = document.querySelector('#proverbs-game .game-area');
    const successMessage = document.querySelector('#proverbs-game .success-message');
    const resultContainer = document.querySelector('#proverbs-game #result-container');

    if (gameArea) gameArea.style.display = 'block';
    if (successMessage) successMessage.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
}

// Настройка обработчиков событий
function setupEventHandlers() {
    // Обработчик для кнопки "Назад"
    const backBtn = document.querySelector('#proverbs-game .back-btn');
    if (backBtn) {
        backBtn.onclick = () => navigateTo('game-select');
    }

    // Обработчик для кнопки "Подсказка"
    const hintBtn = document.querySelector('#proverbs-game #hint-btn');
    if (hintBtn) {
        hintBtn.onclick = toggleHint;
    }

    // Обработчик для кнопки "Закончить игру"
    const nextLevelBtn = document.querySelector('#proverbs-game .next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.onclick = () => navigateTo('game-select');
    }

    // Настройка drag and drop
    setupDragAndDrop();
}

// Настройка drag and drop
function setupDragAndDrop() {
    const parts = document.querySelectorAll('.part-block');
    const dropZones = document.querySelectorAll('.drop-zone');

    // Обработчики для перетаскиваемых элементов
    parts.forEach(part => {
        part.addEventListener('dragstart', handleDragStart);
        part.addEventListener('dragend', handleDragEnd);
    });

    // Обработчики для зон сброса
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
    e.dataTransfer.setData('text/plain', this.dataset.part);
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
        const droppedPart = draggedElement.dataset.part;
        const targetPart = this.dataset.target;

        // Проверяем правильность ответа
        if (droppedPart === targetPart) {
            // Правильный ответ
            playSound('assets/audio/effects/success.mp3');

            // Добавляем текст в зону сброса
            this.innerHTML = droppedPart;
            this.classList.add('correct');

            // Делаем блок неактивным
            draggedElement.style.opacity = '0.3';
            draggedElement.style.cursor = 'default';
            draggedElement.draggable = false;

            // Показываем результат
            showResult(true, 'Молодец! Правильно!');

            completedProverbs++;

            // Проверяем завершение игры
            if (completedProverbs === proverbsData.proverbs.length) {
                setTimeout(() => {
                    const successMessage = document.querySelector('#proverbs-game .success-message');
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
                const resultContainer = document.querySelector('#proverbs-game #result-container');
                if (resultContainer) resultContainer.style.display = 'none';
            }, 2000);
        }
    }
}

// Показать результат
function showResult(isCorrect, message) {
    const resultContainer = document.querySelector('#proverbs-game #result-container');
    const resultImage = document.querySelector('#proverbs-game #result-image');
    const resultText = document.querySelector('#proverbs-game #result-text');

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
    const hintContent = document.querySelector('#proverbs-game #hint-content');
    const hintBtn = document.querySelector('#proverbs-game #hint-btn');

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