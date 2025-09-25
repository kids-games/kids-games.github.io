import { playSound } from './audio.js';
import { navigateTo } from './router.js';

// Данные для игры
const gameData = {
    mainProverb: {
        text: "Речи как мед, а дела как полынь",
        explanation: "Не верь словам сразу, а смотри на поступки. Настоящий человек всегда старается, чтобы его дела были такими же хорошими, как и его слова"
    },
    proverbs: [
        {
            text: "Один в поле не ратник",
            correct: false,
            explanation: "В одиночку очень трудно справиться с большим делом или преодолеть серьёзную трудность. Сила — в команде, в дружных и сплочённых людях"
        },
        {
            text: "Всякий пест знай свою ступу",
            correct: false,
            explanation: "Каждый человек должен заниматься своим делом, знать свои обязанности и не лезть не в свои дела."
        },
        {
            text: "На словах, что на гуслях, а на деле, что на балалайке",
            correct: true,
            explanation: "Человек может обещать золотые горы и красиво рассказывать о своих планах, а когда доходит до дела, оказывается, что он ничего не умеет или не хочет делать хорошо"
        }
    ],
    hint: `
        <div class="word-definition">
            <h3>Подсказка</h3>
            <p>Пословица "Речи как мед, а дела как полынь" означает:</p>
            <p><strong>Не верь словам сразу, а смотри на поступки.</strong> Настоящий человек всегда старается, чтобы его дела были такими же хорошими, как и его слова.</p>
            <p>Ищи пословицу, которая тоже говорит о несоответствии слов и дел.</p>
        </div>
    `,
    remember: `
        <div class="remember-item">
            <h3>Один в поле не ратник</h3>
            <p>— В одиночку очень трудно справиться с большим делом или преодолеть серьёзную трудность. Сила — в команде, в дружных и сплочённых людях</p>
        </div>
        <div class="remember-item">
            <h3>Всякий пест знай свою ступу</h3>
            <p>— Каждый человек должен заниматься своим делом, знать свои обязанности и не лезть не в свои дела.</p>
        </div>
        <div class="remember-item">
            <h3>На словах, что на гуслях, а на деле, что на балалайке</h3>
            <p>— Человек может обещать золотые горы и красиво рассказывать о своих планах, а когда доходит до дела, оказывается, что он ничего не умеет или не хочет делать хорошо</p>
        </div>
        <div class="remember-item correct">
            <h3>Речи как мед, а дела как полынь</h3>
            <p>— Не верь словам сразу, а смотри на поступки. Настоящий человек всегда старается, чтобы его дела были такими же хорошими, как и его слова</p>
        </div>
    `
};

let gameCompleted = false;
let hintUsed = false;

// Инициализация игры
export function initSynonymProverbsGame() {
    gameCompleted = false;
    hintUsed = false;

    // Сначала скрываем все элементы результатов
    hideAllGameElements();

    // Показываем задание
    showGame();

    // Настраиваем обработчики событий
    setupEventHandlers();
}

// Скрыть все игровые элементы
function hideAllGameElements() {
    const gameArea = document.querySelector('#synonym-proverbs-game .game-area');
    const successMessage = document.querySelector('#synonym-proverbs-game .success-message');
    const resultContainer = document.querySelector('#synonym-proverbs-game #result-container');

    if (gameArea) gameArea.style.display = 'block';
    if (successMessage) successMessage.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
}

// Показать игру
function showGame() {
    const mainProverbText = document.querySelector('#synonym-proverbs-game #main-proverb-text');
    const proverbsContainer = document.querySelector('#synonym-proverbs-game #proverbs-container');
    const hintContent = document.querySelector('#synonym-proverbs-game #hint-content');
    const rememberContent = document.querySelector('#synonym-proverbs-game #remember-content');

    // Заполняем основную пословицу
    if (mainProverbText) {
        mainProverbText.textContent = gameData.mainProverb.text;
    }

    // Заполняем варианты пословиц
    if (proverbsContainer) {
        proverbsContainer.innerHTML = '';

        gameData.proverbs.forEach((proverb, index) => {
            const proverbBlock = document.createElement('div');
            proverbBlock.className = 'proverb-block';
            proverbBlock.dataset.index = index;
            proverbBlock.dataset.correct = proverb.correct;

            proverbBlock.innerHTML = `
                <div class="proverb-content">
                    <span class="proverb-number">${index + 1}</span>
                    <span class="proverb-text">${proverb.text}</span>
                </div>
            `;

            proverbBlock.addEventListener('click', handleProverbClick);
            proverbsContainer.appendChild(proverbBlock);
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
    const backBtn = document.querySelector('#synonym-proverbs-game .back-btn');
    if (backBtn) {
        backBtn.onclick = () => navigateTo('game-select', true);
    }

    // Обработчик для кнопки "Подсказка"
    const hintBtn = document.querySelector('#synonym-proverbs-game #hint-btn');
    if (hintBtn) {
        hintBtn.onclick = toggleHint;
    }

    // Обработчик для кнопки "Закончить игру"
    const nextLevelBtn = document.querySelector('#synonym-proverbs-game .next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.onclick = () => navigateTo('game-select');
    }
}

// Обработчик клика по пословице
function handleProverbClick(event) {
    if (gameCompleted) return;

    const proverbBlock = event.currentTarget;
    const isCorrect = proverbBlock.dataset.correct === 'true';
    const resultContainer = document.querySelector('#synonym-proverbs-game #result-container');
    const resultImage = document.querySelector('#synonym-proverbs-game #result-image');
    const resultText = document.querySelector('#synonym-proverbs-game #result-text');

    if (resultContainer) resultContainer.style.display = 'block';

    if (isCorrect) {
        // Правильный ответ
        playSound('assets/audio/effects/success.mp3');
        proverbBlock.classList.add('correct');

        if (resultImage) resultImage.innerHTML = '✅';
        if (resultText) {
            resultText.textContent = 'Молодец! Правильно!';
            resultText.className = 'result-text correct';
        }

        gameCompleted = true;

        // Через 2 секунды показываем экран "ЗАПОМНИ"
        setTimeout(() => {
            const successMessage = document.querySelector('#synonym-proverbs-game .success-message');
            if (successMessage) successMessage.style.display = 'block';
        }, 2000);

        // Делаем все блоки неактивными
        const allBlocks = document.querySelectorAll('#synonym-proverbs-game .proverb-block');
        allBlocks.forEach(block => {
            block.style.cursor = 'default';
            block.removeEventListener('click', handleProverbClick);
        });

    } else {
        // Неправильный ответ
        playSound('assets/audio/effects/error.mp3');
        proverbBlock.classList.add('incorrect');

        if (resultImage) resultImage.innerHTML = '❌';
        if (resultText) {
            resultText.textContent = 'Попробуй ещё раз!';
            resultText.className = 'result-text incorrect';
        }

        // Через 2 секунды сбрасываем результат
        setTimeout(() => {
            proverbBlock.classList.remove('incorrect');
            if (resultContainer) resultContainer.style.display = 'none';
        }, 2000);
    }
}

// Переключить подсказку
function toggleHint() {
    const hintContent = document.querySelector('#synonym-proverbs-game #hint-content');
    const hintBtn = document.querySelector('#synonym-proverbs-game #hint-btn');

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