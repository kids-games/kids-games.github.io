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
    
    // Настраиваем обработчики событий
    setupEventListeners();
    
    // Сбрасываем состояние
    resetGameState();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Обработчик для кнопки "Назад" с подтверждением
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            navigateTo('game-select', true); // true - запросить подтверждение
        });
    }
    
    // Обработчик для кнопки "Подсказка"
    document.getElementById('hint-btn').addEventListener('click', toggleHint);
    
    // Обработчик для кнопки "Завершить игру"
    document.querySelector('.next-level-btn').addEventListener('click', () => {
        navigateTo('game-select');
    });
    
    // Обработчики для перетаскивания
    const draggableItems = document.querySelectorAll('.draggable');
    const dropZones = document.querySelectorAll('.target-dropzone');
    
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
    });
}

// Сбросить состояние игры
function resetGameState() {
    const hintContent = document.getElementById('hint-content');
    const resultContainer = document.getElementById('result-container');
    const successMessage = document.getElementById('success-message');

    // Сбрасываем состояние
    hintUsed = false;
    hintContent.style.display = 'none';
    resultContainer.style.display = 'none';
    successMessage.style.display = 'none';
    document.getElementById('hint-btn').innerHTML = '<i class="fas fa-lightbulb"></i> Подсказка';

    // Очищаем все зоны сброса
    const dropZones = document.querySelectorAll('.target-dropzone');
    dropZones.forEach(zone => {
        zone.innerHTML = '';
        zone.classList.remove('correct', 'incorrect');
    });

    // Возвращаем все слова в исходное положение
    const nounsContainer = document.querySelector('.nouns-container');
    const draggableItems = document.querySelectorAll('.draggable');

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
    const nounElement = document.querySelector(`.draggable[data-word="${noun}"]`);
    e.target.appendChild(nounElement.cloneNode(true));

    // Удаляем оригинальный элемент
    nounElement.remove();

    // Проверяем правильность сочетания
    checkCombination(adjective, noun, e.target);
}

// Проверить сочетание
function checkCombination(adjective, noun, dropZone) {
    const resultContainer = document.getElementById('result-container');
    const resultImage = document.getElementById('result-image');
    const resultText = document.getElementById('result-text');

    resultContainer.style.display = 'block';

    if (correctCombinations[adjective] === noun) {
        // Правильное сочетание
        playSound('assets/audio/effects/success.mp3');
        dropZone.classList.add('correct');
        resultImage.innerHTML = '✅';
        resultText.textContent = 'Правильно! Отличная работа!';
        resultText.className = 'result-text correct';

        completedPairs++;

        // Проверяем, все ли пары собраны
        if (completedPairs === Object.keys(correctCombinations).length) {
            // Все пары собраны правильно
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'block';
            }, 1500);
        }
    } else {
        // Неправильное сочетание
        playSound('assets/audio/effects/error.mp3');
        dropZone.classList.add('incorrect');
        resultImage.innerHTML = '❌';
        resultText.textContent = 'Попробуй другое сочетание!';
        resultText.className = 'result-text incorrect';

        // Через 2 секунды сбрасываем неправильное сочетание
        setTimeout(() => {
            resetIncorrectCombination(dropZone, noun);
            resultContainer.style.display = 'none';
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

        document.querySelector('.nouns-container').appendChild(originalNoun);
    }
}

// Переключить подсказку
function toggleHint() {
    const hintContent = document.getElementById('hint-content');
    const hintBtn = document.getElementById('hint-btn');

    if (hintContent.style.display === 'block') {
        hintContent.style.display = 'none';
        hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Подсказка';
    } else {
        hintContent.style.display = 'block';
        hintBtn.innerHTML = '<i class="fas fa-lightbulb" style="text-decoration: line-through;"></i> Подсказка';
        hintUsed = true;
    }
}

// Вернуться назад
function goBack() {
    import('./router.js').then(module => {
        module.navigateTo('main');
    });
}