import { playSound } from './audio.js';
import { navigateTo } from './router.js';

// Задания для игры "Найди устаревшие слова"
const obsoleteWordsTasks = [
    {
        sentence: "Блеснет заутра луч денницы и заиграет яркий день",
        obsoleteWords: ["заутра", "денницы"],
        explanations: {
            "заутра": "Заутра - это старинное слово, которое значит «завтра утром» или «на следующее утро».",
            "денницы": "Денница - это утренняя звезда, та самая яркая звездочка, которая появляется на небе прямо перед рассветом. Чаще всего это планета Венера. Этим словом также иногда называли рассвет."
        },
        hint: `
            <div class="word-definition">
                <h3>Что такое устаревшие слова?</h3>
                <p>Устаревшие слова - это слова, которые раньше использовались в речи, но сейчас вышли из употребления.</p>
                <p>В этом предложении нужно найти два устаревших слова.</p>
            </div>
        `,
        remember: `
            <div class="remember-item">
                <h3>Заутра</h3>
                <p>— старинное слово, которое значит «завтра утром» или «на следующее утро»</p>
            </div>
            <div class="remember-item">
                <h3>Денница</h3>
                <p>— утренняя звезда (чаще всего Венера), иногда так называли рассвет</p>
            </div>
        `
    },
    {
        sentence: "И слеза ланиту орошает",
        obsoleteWords: ["ланиту"],
        explanations: {
            "ланиту": "Ланита - это старинное, очень красивое слово для обозначения щеки"
        },
        hint: `
            <div class="word-definition">
                <h3>Подсказка</h3>
                <p>В этом предложении только одно устаревшее слово. Оно обозначает часть лица.</p>
            </div>
        `,
        remember: `
            <div class="remember-item">
                <h3>Ланита</h3>
                <p>— старинное, красивое слово для обозначения щеки</p>
                <div class="image-container">
                    <img src="assets/images/jowls.jpg" alt="Щеки" class="painting-image">
                </div>
            </div>
        `
    },
    {
        sentence: "Грядущие годы таятся во мгле; но вижу твой жребий на светлом челе",
        obsoleteWords: ["жребий", "челе"],
        explanations: {
            "жребий": "Жребий в старину означал судьбу, участь, долю. Это то, что предначертано человеку в жизни.",
            "челе": "Чело - это старинное, торжественное слово для обозначения лба."
        },
        hint: `
            <div class="word-definition">
                <h3>Подсказка</h3>
                <p>В этом предложении два устаревших слова. Одно связано с судьбой, другое - с частью лица.</p>
            </div>
        `,
        remember: `
            <div class="remember-item">
                <h3>Жребий</h3>
                <p>— в старину означал судьбу, участь, долю</p>
            </div>
            <div class="remember-item">
                <h3>Чело</h3>
                <p>— старинное, торжественное слово для обозначения лба</p>
                <div class="image-container">
                    <img src="assets/images/forehead.jpg" alt="Лоб" class="painting-image">
                </div>
            </div>
        `
    },
    {
        sentence: "Но между тем какой позор\nЯвляет Киев осажденный?\nТам, устремив на нивы взор,\nНарод, уныньем пораженный,\nСтоит на башнях и стенах\nИ в страхе ждет небесной казни;\nСтенанья робкие в домах,\nНа стогнах тишина боязни;\nОдин, близ дочери своей,\nВладимир в горестной молитве;\nИ храбрый сонм богатырей\nС дружиной верною князей\nГотовится к кровавой битве.",
        obsoleteWords: ["позор", "нивы", "стенанья", "стогнах", "сонм"],
        explanations: {
            "позор": "Позор - вид, зрелище.",
            "нивы": "Нива - это поле.",
            "стенанья": "Стенание - это стон, плач.",
            "стогнах": "Стогна - это широкая улица, площадь.",
            "сонм": "Сонм - большая группа, множество."
        },
        hint: `
            <div class="word-definition">
                <h3>Подсказка</h3>
                <p>Устаревшие слова - это слова, которые раньше использовались в речи, но сейчас вышли из употребления.</p>
                <p>В этом предложении нужно найти пять устаревших слов.</p>
            </div>
        `,
        remember: `
            <div class="remember-item">
                <h3>Позор</h3>
                <p>— вид, зрелище</p>
            </div>
            <div class="remember-item">
                <h3>Нива</h3>
                <p>— это поле</p>
            </div>
            <div class="remember-item">
                <h3>Стенание</h3>
                <p>— это стон, плач</p>
            </div>
            <div class="remember-item">
                <h3>Стогна</h3>
                <p>— это широкая улица, площадь</p>
            </div>
            <div class="remember-item">
                <h3>Сонм</h3>
                <p>— большая группа, множество</p>
            </div>
        `
    },
    {
        sentence: "Двор был пустынен... Обнесённый кругом частоколом, он придавал усадьбе характер острога. С одного краю, в некотором отдалении от дома, виднелись хозяйственные постройки: конюшни, скотный двор, людские, но и там неслышно было никакого движения, потому что скот был в стаде, а дворовые на барщине.",
        obsoleteWords: ["острога", "людские", "дворовые", "барщине"],
        explanations: {
            "острога": "Острог – так в давние времена называли тюрьму, которая была окружена высокой и крепкой деревянной стеной из заострённых брёвен.",
            "людские": "Людские – это сокращение от словосочетания «людские избы» или «людские кварталы». Так называли дома, в которых жили крепостные крестьяне, работавшие на помещика. Это были простые, небогатые дома для прислуги и работников.",
            "дворовые": "Дворовые – это крепостные крестьяне, которые жили не в деревне, а прямо в усадьбе (дворе) помещика. Они работали слугами в доме: поварами, горничными, конюхами, садовниками.",
            "барщине": "Барщина – это очень тяжелая повинность, обязанность крестьян в старину. Они должны были бесплатно работать на поле своего хозяина-помещика несколько дней в неделю."
        },
        hint: `
            <div class="word-definition">
                <h3>Подсказка</h3>
                <p>Устаревшие слова - это слова, которые раньше использовались в речи, но сейчас вышли из употребления.</p>
                <p>В этом предложении нужно найти четыре устаревших слова.</p>
            </div>
        `,
        remember: `
            <div class="remember-item">
                <h3>Острог</h3>
                <p>— так в давние времена называли тюрьму, которая была окружена высокой и крепкой деревянной стеной из заострённых брёвен</p>
            </div>
            <div class="remember-item">
                <h3>Людские</h3>
                <p>— это сокращение от словосочетания «людские избы» или «людские кварталы». Так называли дома, в которых жили крепостные крестьяне, работавшие на помещика. Это были простые, небогатые дома для прислуги и работников</p>
            </div>
            <div class="remember-item">
                <h3>Дворовые</h3>
                <p>— это крепостные крестьяне, которые жили не в деревне, а прямо в усадьбе (дворе) помещика. Они работали слугами в доме: поварами, горничными, конюхами, садовниками</p>
            </div>
            <div class="remember-item">
                <h3>Барщина</h3>
                <p>— это очень тяжелая повинность, обязанность крестьян в старину. Они должны были бесплатно работать на поле своего хозяина-помещика несколько дней в неделю</p>
            </div>
        `
    }
];

let currentTaskIndex = 0;
let foundWords = [];
let hintUsed = false;

// Инициализация игры
export function initObsoleteWordsGame() {
    currentTaskIndex = 0;
    foundWords = [];
    hintUsed = false;

    // Сначала скрываем все элементы результатов
    hideAllGameElements();

    // Показываем первое задание
    showTask(currentTaskIndex);

    // Настраиваем обработчик для кнопки "Назад"
    const backBtn = document.querySelector('#obsolete-words-game .back-btn');
    if (backBtn) {
        backBtn.onclick = () => navigateTo('game-select', true);
    }

    // Настраиваем обработчик для кнопки "Подсказка"
    const hintBtn = document.querySelector('#obsolete-words-game #hint-btn');
    if (hintBtn) {
        hintBtn.onclick = toggleHint;
    }

    // Настраиваем обработчик для кнопки "Следующий уровень"
    const nextLevelBtn = document.querySelector('#obsolete-words-game .next-level-btn');
    if (nextLevelBtn) {
        nextLevelBtn.onclick = nextLevel;
    }
}

// Скрыть все игровые элементы
function hideAllGameElements() {
    const gameArea = document.querySelector('#obsolete-words-game .game-area');
    const successMessage = document.querySelector('#obsolete-words-game .success-message');
    const resultContainer = document.querySelector('#obsolete-words-game #result-container');

    if (gameArea) gameArea.style.display = 'block';
    if (successMessage) successMessage.style.display = 'none';
    if (resultContainer) resultContainer.style.display = 'none';
}

// Показать задание
function showTask(index) {
    if (index >= obsoleteWordsTasks.length) {
        // Все задания выполнены
        showGameComplete();
        return;
    }

    const task = obsoleteWordsTasks[index];
    const sentenceContainer = document.querySelector('#obsolete-words-game #sentence-container');
    const hintContent = document.querySelector('#obsolete-words-game #hint-content');
    const resultContainer = document.querySelector('#obsolete-words-game #result-container');
    const successMessage = document.querySelector('#obsolete-words-game .success-message');
    const nextLevelBtn = document.querySelector('#obsolete-words-game .next-level-btn');
    const progressText = document.querySelector('#obsolete-words-game #progress-text');
    const progressFill = document.querySelector('#obsolete-words-game #progress-fill');

    // Сбрасываем состояние
    foundWords = [];
    hintUsed = false;

    if (sentenceContainer) sentenceContainer.innerHTML = '';
    if (hintContent) {
        hintContent.innerHTML = task.hint;
        hintContent.style.display = 'none';
    }
    if (resultContainer) {
        resultContainer.style.display = 'none';
        resultContainer.innerHTML = `
            <div id="result-image" class="result-image"></div>
            <div id="result-text" class="result-text"></div>
            <div id="word-explanation" class="word-explanation"></div>
        `;
    }
    if (successMessage) successMessage.style.display = 'none';

    const hintBtn = document.querySelector('#obsolete-words-game #hint-btn');
    if (hintBtn) hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Подсказка';

    // Обновляем текст кнопки в зависимости от текущего уровня
    if (nextLevelBtn) {
        if (index === obsoleteWordsTasks.length - 1) {
            nextLevelBtn.textContent = 'Закончить игру';
        } else {
            nextLevelBtn.textContent = 'Следующий уровень';
        }
    }

    // Обновляем прогресс
    if (progressText) {
        progressText.textContent = `Найдено: ${foundWords.length}/${task.obsoleteWords.length}`;
    }
    if (progressFill) {
        progressFill.style.width = '0%';
    }

    // Заполняем контент для запоминания
    const rememberContent = document.querySelector('#obsolete-words-game #remember-content');
    if (rememberContent) rememberContent.innerHTML = task.remember;

    // Создаем предложение с кликабельными словами
    if (sentenceContainer) {
        // Разбиваем на строки по переносам
        const lines = task.sentence.split('\n');

        lines.forEach((line, lineIndex) => {
            // Создаем контейнер для строки
            const lineContainer = document.createElement('div');
            lineContainer.className = 'sentence-line';

            // Разбиваем строку на слова
            const words = line.split(' ');
            words.forEach((word, wordIndex) => {
                const wordElement = document.createElement('span');
                wordElement.className = 'sentence-word clickable-word';
                wordElement.textContent = word + (wordIndex < words.length - 1 ? ' ' : '');

                // Убираем знаки препинания для сравнения
                const cleanWord = word.replace(/[.,;:!?]/g, '').toLowerCase();

                // Все слова делаем кликабельными, но запоминаем какие из них устаревшие
                wordElement.dataset.word = cleanWord;
                wordElement.dataset.isObsolete = task.obsoleteWords.includes(cleanWord);

                wordElement.addEventListener('click', handleWordClick);
                lineContainer.appendChild(wordElement);
            });

            sentenceContainer.appendChild(lineContainer);

            // Добавляем перенос строки (кроме последней)
            if (lineIndex < lines.length - 1) {
                const lineBreak = document.createElement('br');
                sentenceContainer.appendChild(lineBreak);
            }
        });
    }
}

// Обработчик клика по слову
function handleWordClick(event) {
    const wordElement = event.currentTarget;
    const word = wordElement.dataset.word;
    const isObsolete = wordElement.dataset.isObsolete === 'true';
    const task = obsoleteWordsTasks[currentTaskIndex];

    // Если слово уже найдено, игнорируем клик
    if (foundWords.includes(word)) {
        return;
    }

    const resultContainer = document.querySelector('#obsolete-words-game #result-container');
    const resultImage = document.querySelector('#obsolete-words-game #result-image');
    const resultText = document.querySelector('#obsolete-words-game #result-text');
    const wordExplanation = document.querySelector('#obsolete-words-game #word-explanation');
    const progressText = document.querySelector('#obsolete-words-game #progress-text');
    const progressFill = document.querySelector('#obsolete-words-game #progress-fill');

    if (resultContainer) resultContainer.style.display = 'block';

    if (isObsolete) {
        // Правильный ответ - устаревшее слово
        playSound('assets/audio/effects/success.mp3');
        wordElement.classList.add('correct');
        foundWords.push(word);

        if (resultImage) resultImage.innerHTML = '✅';
        if (resultText) {
            resultText.textContent = 'Правильно! Это устаревшее слово!';
            resultText.className = 'result-text correct';
        }
        if (wordExplanation) {
            wordExplanation.innerHTML = `<strong>${word}:</strong> ${task.explanations[word]}`;
            wordExplanation.style.display = 'block';
        }

        // Обновляем прогресс
        if (progressText) {
            progressText.textContent = `Найдено: ${foundWords.length}/${task.obsoleteWords.length}`;
        }
        if (progressFill) {
            const progress = (foundWords.length / task.obsoleteWords.length) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Проверяем, все ли слова найдены
        if (foundWords.length === task.obsoleteWords.length) {
            // Все слова найдены
            setTimeout(() => {
                const successMessage = document.querySelector('#obsolete-words-game .success-message');
                if (successMessage) successMessage.style.display = 'block';
            }, 2000);
        }
    } else {
        // Неправильный ответ - обычное слово
        playSound('assets/audio/effects/error.mp3');
        wordElement.classList.add('incorrect');

        if (resultImage) resultImage.innerHTML = '❌';
        if (resultText) {
            resultText.textContent = 'Неправильно! Попробуй найти другое!';
            resultText.className = 'result-text incorrect';
        }
        if (wordExplanation) {
            wordExplanation.style.display = 'none';
        }

        // Через 2 секунды сбрасываем неправильный выбор
        setTimeout(() => {
            wordElement.classList.remove('incorrect');
            if (resultContainer) resultContainer.style.display = 'none';
        }, 2000);
    }
}

// Переключить подсказку
function toggleHint() {
    const hintContent = document.querySelector('#obsolete-words-game #hint-content');
    const hintBtn = document.querySelector('#obsolete-words-game #hint-btn');

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
    if (currentTaskIndex === obsoleteWordsTasks.length - 1) {
        // Последний уровень завершен - возвращаемся к выбору игр
        navigateTo('game-select');
    } else {
        // Переходим на следующий уровень
        currentTaskIndex++;
        showTask(currentTaskIndex);
    }
}

// Показать завершение игры
function showGameComplete() {
    const successMessage = document.querySelector('#obsolete-words-game .success-message');
    const gameArea = document.querySelector('#obsolete-words-game .game-area');

    if (gameArea) gameArea.style.display = 'none';
    if (successMessage) successMessage.style.display = 'block';
}