import { playSound } from './audio.js';
import { navigateTo } from './router.js';

// Правильные сочетания слов
const correctCombinations = {
    "тороватый": "купец",
    "ратный": "подвиг",
    "столбовой": "дворянин"
};

let completedPairs = 0;
let hintUsed = false;

// Инициализация игры
export function initWordCombinationGame() {
    completedPairs = 0;
    hintUsed = false;

    // Сначала скрываем все элементы результатов
    hideAllGameElements();

    // Настраиваем обработчики событий
    setupEventListeners();

    // Сбрасываем состояние
    resetGameState();
}

// Скрыть все игровые элементы
function hideAllGameElements() {
    const gameArea = document.querySelector('#word-combination-game .game-area');
    const successMessage = document.querySelector('#word-combination-game .success-message');
    const resultContainer = document.querySelector('#word-combination-game #result-container');

    if (gameArea) gameArea.style.display = 'block';
    if (successMessage) successMessage.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Обработчик для кнопки "Назад" с подтверждением
    const backBtn = document.querySelector('#word-combination-game .back-btn');
    if (backBtn) {
        backBtn.onclick = () => navigateTo('game-select'); // С подтверждением
    }

    // Обработчик для кнопки "Подсказка"
    const hintBtn = document.querySelector('#word-combination-game #hint-btn');
    if (hintBtn) {
        hintBtn.onclick = toggleHint;
    }

    // Обработчик для кнопки "Завершить игру" - БЕЗ подтверждения
    const nextLevelBtn = document.querySelector('#word-combination-game .next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.onclick = () => navigateTo('game-select'); // БЕЗ подтверждения
    }

    // Обработчики для перетаскивания
    setupDragAndDrop();
}

// Настройка перетаскивания
function setupDragAndDrop() {
    const draggableItems = document.querySelectorAll('#word-combination-game .draggable');
    const dropZones = document.querySelectorAll('#word-combination-game .target-dropzone');

    // Удаляем старые обработчики
    draggableItems.forEach(item => {
        item.replaceWith(item.cloneNode(true));
    });

    dropZones.forEach(zone => {
        zone.replaceWith(zone.cloneNode(true));
    });

    // Добавляем новые обработчики
    const newDraggableItems = document.querySelectorAll('#word-combination-game .draggable');
    const newDropZones = document.querySelectorAll('#word-combination-game .target-dropzone');

    newDraggableItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    newDropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
    });
}

// Сбросить состояние игры
function resetGameState() {
    const hintContent = document.querySelector('#word-combination-game #hint-content');
    const resultContainer = document.querySelector('#word-combination-game #result-container');
    const successMessage = document.querySelector('#word-combination-game .success-message');

    // Сбрасываем состояние
    hintUsed = false;
    if (hintContent) hintContent.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
    if (successMessage) successMessage.style.display = 'none';

    const hintBtn = document.querySelector('#word-combination-game #hint-btn');
    if (hintBtn) hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Подсказка';

    // Очищаем все зоны сброса
    const dropZones = document.querySelectorAll('#word-combination-game .target-dropzone');
    dropZones.forEach(zone => {
        zone.innerHTML = '';
        zone.classList.remove('correct', 'incorrect');
    });

    // Возвращаем все слова в исходное положение
    const nounsContainer = document.querySelector('#word-combination-game .nouns-container');
    const draggableItems = document.querySelectorAll('#word-combination-game .draggable');

    draggableItems.forEach(item => {
        if (!item.parentElement.classList.contains('nouns-container')) {
            nounsContainer.appendChild(item);
        }
        item.style.opacity = '1';
    });

    completedPairs = 0;
}

// Обработчики событий перетаскивания
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-word'));
    setTimeout(() => {
        e.target.style.opacity = '0.5';
    }, 0);
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const noun = e.dataTransfer.getData('text/plain');
    const adjective = e.target.getAttribute('data-target');

    // Проверяем, пустая ли зона
    if (e.target.innerHTML !== '') {
        return; // Зона уже занята
    }

    // Добавляем слово в зону
    const nounElement = document.querySelector(`#word-combination-game .draggable[data-word="${noun}"]`);
    e.target.appendChild(nounElement.cloneNode(true));

    // Удаляем оригинальный элемент
    nounElement.remove();

    // Проверяем правильность сочетания
    checkCombination(adjective, noun, e.target);
}

// Проверить сочетание
function checkCombination(adjective, noun, dropZone) {
    const resultContainer = document.querySelector('#word-combination-game #result-container');
    const resultImage = document.querySelector('#word-combination-game #result-image');
    const resultText = document.querySelector('#word-combination-game #result-text');

    if (resultContainer) resultContainer.style.display = 'block';

    if (correctCombinations[adjective] === noun) {
        // Правильное сочетание
        playSound('assets/audio/effects/success.mp3');
        dropZone.classList.add('correct');
        if (resultImage) resultImage.innerHTML = '✅';
        if (resultText) {
            resultText.textContent = 'Правильно! Отличная работа!';
            resultText.className = 'result-text correct';
        }

        completedPairs++;

        // Проверяем, все ли пары собраны
        if (completedPairs === Object.keys(correctCombinations).length) {
            // Все пары собраны правильно
            setTimeout(() => {
                const successMessage = document.querySelector('#word-combination-game .success-message');
                if (successMessage) successMessage.style.display = 'block';
            }, 1500);
        }
    } else {
        // Неправильное сочетание
        playSound('assets/audio/effects/error.mp3');
        dropZone.classList.add('incorrect');
        if (resultImage) resultImage.innerHTML = '❌';
        if (resultText) {
            resultText.textContent = 'Попробуй другое сочетание!';
            resultText.className = 'result-text incorrect';
        }

        // Через 2 секунды сбрасываем неправильное сочетание
        setTimeout(() => {
            resetIncorrectCombination(dropZone, noun);
            if (resultContainer) resultContainer.style.display = 'none';
            dropZone.classList.remove('incorrect');
        }, 2000);
    }
}

// Сбросить неправильное сочетание
function resetIncorrectCombination(dropZone, noun) {
    const nounElement = dropZone.querySelector('.noun-item');
    if (nounElement) {
        dropZone.innerHTML = '';
        const originalNoun = document.createElement('div');
        originalNoun.className = 'noun-item draggable';
        originalNoun.setAttribute('draggable', 'true');
        originalNoun.setAttribute('data-word', noun);
        originalNoun.textContent = noun;

        originalNoun.addEventListener('dragstart', handleDragStart);
        originalNoun.addEventListener('dragend', handleDragEnd);

        const nounsContainer = document.querySelector('#word-combination-game .nouns-container');
        if (nounsContainer) nounsContainer.appendChild(originalNoun);
    }
}

// Переключить подсказку
function toggleHint() {
    const hintContent = document.querySelector('#word-combination-game #hint-content');
    const hintBtn = document.querySelector('#word-combination-game #hint-btn');

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