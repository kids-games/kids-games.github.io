import { playSound } from './audio.js';

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

    // Показываем первое задание
    showTask(currentTaskIndex);

    // Настраиваем обработчик для кнопки "Назад" с подтверждением
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            navigateTo('game-select', true); // true - запросить подтверждение
        });
    }

    // Настраиваем обработчик для кнопки "Подсказка"
    document.getElementById('hint-btn').addEventListener('click', toggleHint);

    // Настраиваем обработчик для кнопки "Следующий уровень"
    document.querySelector('.next-level-btn').addEventListener('click', nextLevel);
}

// Показать задание
function showTask(index) {
    if (index >= extraWordTasks.length) {
        // Все задания выполнены
        showGameComplete();
        return;
    }

    const task = extraWordTasks[index];
    const wordsContainer = document.getElementById('words-container');
    const hintContent = document.getElementById('hint-content');
    const resultContainer = document.getElementById('result-container');
    const successMessage = document.getElementById('success-message');

    // Сбрасываем состояние
    hintUsed = false;
    wordsContainer.innerHTML = '';
    hintContent.innerHTML = task.hint;
    hintContent.style.display = 'none';
    resultContainer.style.display = 'none';
    successMessage.style.display = 'none';
    document.getElementById('hint-btn').innerHTML = '<i class="fas fa-lightbulb"></i> Подсказка';

    // Создаем кнопки со словами
    task.words.forEach((word, i) => {
        const wordButton = document.createElement('button');
        wordButton.className = 'word-btn';
        wordButton.textContent = word;
        wordButton.addEventListener('click', () => checkAnswer(i, task.correctIndex));
        wordsContainer.appendChild(wordButton);
    });

    // Заполняем контент для запоминания
    document.getElementById('remember-content').innerHTML = task.remember;
}

// Проверить ответ
function checkAnswer(selectedIndex, correctIndex) {
    const wordButtons = document.querySelectorAll('.word-btn');
    const resultContainer = document.getElementById('result-container');
    const resultImage = document.getElementById('result-image');
    const resultText = document.getElementById('result-text');

    resultContainer.style.display = 'block';

    if (selectedIndex === correctIndex) {
        // Правильный ответ
        playSound('assets/audio/effects/success.mp3');
        wordButtons[selectedIndex].classList.add('correct');
        resultImage.innerHTML = '✅';
        resultText.textContent = 'Правильно! Молодец!';
        resultText.className = 'result-text correct';

        // Через 2 секунды показываем экран "ЗАПОМНИ"
        setTimeout(() => {
            document.getElementById('success-message').style.display = 'block';
        }, 2000);
    } else {
        // Неправильный ответ
        playSound('assets/audio/effects/error.mp3');
        wordButtons[selectedIndex].classList.add('incorrect');
        resultImage.innerHTML = '❌';
        resultText.textContent = 'Попробуй еще раз!';
        resultText.className = 'result-text incorrect';

        // Через 2 секунды сбрасываем результат
        setTimeout(() => {
            resultContainer.style.display = 'none';
            wordButtons[selectedIndex].classList.remove('incorrect');
        }, 2000);
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

// Перейти на следующий уровень
function nextLevel() {
    currentTaskIndex++;
    showTask(currentTaskIndex);
}

// Показать завершение игры
function showGameComplete() {
    const gameArea = document.querySelector('.game-area');
    const successMessage = document.getElementById('success-message');

    gameArea.style.display = 'none';
    successMessage.style.display = 'block';
    successMessage.innerHTML = `
        <h2>Поздравляем! 🎉</h2>
        <p>Ты успешно завершил все задания!</p>
        <button class="btn play-again-btn">Играть снова</button>
    `;

    document.querySelector('.play-again-btn').addEventListener('click', () => {
        gameArea.style.display = 'block';
        initExtraWordGame();
    });
}

// Вернуться назад
function goBack() {
    import('./router.js').then(module => {
        module.navigateTo('main');
    });
}