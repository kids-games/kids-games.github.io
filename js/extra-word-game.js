import { playSound } from './audio.js';
import { navigateTo } from './router.js';

// Задания для игры "Найди лишнее слово"
const extraWordTasks = [
    {
        words: ["булат", "палица", "гусли"],
        correctIndex: 2, // гусли
        hint: `
            <div class="word-definition">
                <h3>Булат</h3>
                <p>— это особый, очень-очень крепкий и упругий вид стали. Часто мечи богатырей из русских сказок были сделаны из особенного металла, который назывался БУЛАТ.</p>
            </div>
            <div class="word-definition">
                <h3>Палица</h3>
                <p>— это такое старинное мощное оружие, похожее на большую и тяжёлую дубинку.</p>
                <div class="hint-image">🗡️</div>
            </div>
            <div class="word-definition">
                <h3>Гусли</h3>
                <p>— это старинный струнный музыкальный инструмент. Это один из самых древних инструментов на Руси.</p>
                <div class="hint-image">🎵</div>
            </div>
        `,
        remember: `
            <div class="remember-item">
                <h3>Булат</h3>
                <p>— особый вид крепкой стали для оружия</p>
            </div>
            <div class="remember-item">
                <h3>Палица</h3>
                <p>— старинное оружие, большая дубинка</p>
                <div class="remember-image">🗡️</div>
            </div>
            <div class="remember-item">
                <h3>Гусли</h3>
                <p>— старинный музыкальный инструмент</p>
                <div class="remember-image">🎵</div>
            </div>
            <p class="remember-summary">Булат и палица — это оружие, а гусли — музыкальный инструмент!</p>
        `
    },
    {
        words: ["аршин", "сажень", "метр"],
        correctIndex: 2, // метр
        hint: `
            <div class="word-definition">
                <h3>Аршин</h3>
                <p>— это старинная единица измерения длины. Один аршин был равен примерно 71 сантиметру.</p>
            </div>
            <div class="word-definition">
                <h3>Сажень</h3>
                <p>— это старинная единица измерения для больших расстояний. Одна сажень — это примерно 2 метра 13 сантиметров.</p>
            </div>
            <div class="word-definition">
                <h3>Метр</h3>
                <p>— это основная единица измерения длины в современном мире. Она является частью метрической системы, которую используют почти во всех странах, включая Россию. Один метр — это 100 сантиметров.</p>
            </div>
        `,
        remember: `
            <div class="remember-item">
                <h3>Аршин</h3>
                <p>— старинная мера длины (~71 см)</p>
            </div>
            <div class="remember-item">
                <h3>Сажень</h3>
                <p>— старинная мера длины (~2,13 м)</p>
            </div>
            <div class="remember-item">
                <h3>Метр</h3>
                <p>— современная единица измерения</p>
            </div>
            <p class="remember-summary">Аршин и сажень — это старинные единицы измерения, а метр — современная!</p>
        `
    }
];

let currentTaskIndex = 0;
let hintUsed = false;

// Инициализация игры
export function initExtraWordGame() {
    currentTaskIndex = 0;
    hintUsed = false;

    // Сначала скрываем все элементы результатов
    hideAllGameElements();

    // Показываем первое задание
    showTask(currentTaskIndex);

    // Настраиваем обработчик для кнопки "Назад" с подтверждением
    const backBtn = document.querySelector('#extra-word-game .back-btn');
    if (backBtn) {
        backBtn.onclick = () => navigateTo('game-select', true);
    }

    // Настраиваем обработчик для кнопки "Подсказка"
    const hintBtn = document.querySelector('#extra-word-game #hint-btn');
    if (hintBtn) {
        hintBtn.onclick = toggleHint;
    }

    // Настраиваем обработчик для кнопки "Следующий уровень"
    const nextLevelBtn = document.querySelector('#extra-word-game .next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.onclick = nextLevel;
    }
}

// Скрыть все игровые элементы
function hideAllGameElements() {
    const gameArea = document.querySelector('#extra-word-game .game-area');
    const successMessage = document.querySelector('#extra-word-game .success-message');
    const resultContainer = document.querySelector('#extra-word-game #result-container');

    if (gameArea) gameArea.style.display = 'block';
    if (successMessage) successMessage.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
}

// Показать задание
function showTask(index) {
    if (index >= extraWordTasks.length) {
        // Все задания выполнены
        showGameComplete();
        return;
    }

    const task = extraWordTasks[index];
    const wordsContainer = document.querySelector('#extra-word-game #words-container');
    const hintContent = document.querySelector('#extra-word-game #hint-content');
    const resultContainer = document.querySelector('#extra-word-game #result-container');
    const successMessage = document.querySelector('#extra-word-game .success-message');
    const nextLevelBtn = document.querySelector('#extra-word-game .next-level-btn');

    // Сбрасываем состояние
    hintUsed = false;
    if (wordsContainer) wordsContainer.innerHTML = '';
    if (hintContent) {
        hintContent.innerHTML = task.hint;
        hintContent.style.display = 'none';
    }
    if (resultContainer) resultContainer.style.display = 'none';
    if (successMessage) successMessage.style.display = 'none';

    const hintBtn = document.querySelector('#extra-word-game #hint-btn');
    if (hintBtn) hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Подсказка';

    // Обновляем текст кнопки в зависимости от текущего уровня
    if (nextLevelBtn) {
        if (index === extraWordTasks.length - 1) {
            nextLevelBtn.textContent = 'Закончить игру';
        } else {
            nextLevelBtn.textContent = 'Следующий уровень';
        }
    }

    // Создаем кнопки со словами
    if (wordsContainer) {
        task.words.forEach((word, i) => {
            const wordButton = document.createElement('button');
            wordButton.className = 'word-btn';
            wordButton.textContent = word;
            wordButton.addEventListener('click', () => checkAnswer(i, task.correctIndex));
            wordsContainer.appendChild(wordButton);
        });
    }

    // Заполняем контент для запоминания
    const rememberContent = document.querySelector('#extra-word-game #remember-content');
    if (rememberContent) rememberContent.innerHTML = task.remember;
}

// Проверить ответ
function checkAnswer(selectedIndex, correctIndex) {
    const wordButtons = document.querySelectorAll('#extra-word-game .word-btn');
    const resultContainer = document.querySelector('#extra-word-game #result-container');
    const resultImage = document.querySelector('#extra-word-game #result-image');
    const resultText = document.querySelector('#extra-word-game #result-text');

    if (resultContainer) resultContainer.style.display = 'block';

    if (selectedIndex === correctIndex) {
        // Правильный ответ
        playSound('assets/audio/effects/success.mp3');
        wordButtons[selectedIndex].classList.add('correct');
        if (resultImage) resultImage.innerHTML = '✅';
        if (resultText) {
            resultText.textContent = 'Правильно! Молодец!';
            resultText.className = 'result-text correct';
        }

        // Через 2 секунды показываем экран "ЗАПОМНИ"
        setTimeout(() => {
            const successMessage = document.querySelector('#extra-word-game .success-message');
            if (successMessage) successMessage.style.display = 'block';
        }, 2000);
    } else {
        // Неправильный ответ
        playSound('assets/audio/effects/error.mp3');
        wordButtons[selectedIndex].classList.add('incorrect');
        if (resultImage) resultImage.innerHTML = '❌';
        if (resultText) {
            resultText.textContent = 'Попробуй еще раз!';
            resultText.className = 'result-text incorrect';
        }

        // Через 2 секунды сбрасываем результат
        setTimeout(() => {
            if (resultContainer) resultContainer.style.display = 'none';
            wordButtons[selectedIndex].classList.remove('incorrect');
        }, 2000);
    }
}

// Переключить подсказку
function toggleHint() {
    const hintContent = document.querySelector('#extra-word-game #hint-content');
    const hintBtn = document.querySelector('#extra-word-game #hint-btn');

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

// Перейти на следующий уровень или завершить игру
function nextLevel() {
    if (currentTaskIndex === extraWordTasks.length - 1) {
        // Последний уровень завершен - возвращаемся к выбору игр БЕЗ подтверждения
        navigateTo('game-select'); // БЕЗ подтверждения
    } else {
        // Переходим на следующий уровень
        currentTaskIndex++;
        showTask(currentTaskIndex);
    }
}

// Показать завершение игры
function showGameComplete() {
    // Используем стандартный экран "ЗАПОМНИ" с кнопкой "Закончить игру"
    const successMessage = document.querySelector('#extra-word-game .success-message');
    const gameArea = document.querySelector('#extra-word-game .game-area');

    if (gameArea) gameArea.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';
}