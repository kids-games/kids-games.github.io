import { playSound } from './audio.js';

// Задания для каждого класса
const classTasks = {
    1: [
        {
            description: "Дерево (нет последней буквы) + ня. Что получилось?",
            answer: "деревня",
            content: `<div class="task-content">
                <div class="word-part">дерев<span class="missing-letter">о</span> + ня = </div>
                <div class="answer-hint">?</div>
            </div>`
        },
        {
            description: "Общее название для яблок, груш и апельсинов?",
            answer: "фрукты",
            content: `<div class="task-content">
                <div class="fruit-images">
                    <div class="fruit">🍎</div>
                    <div class="fruit">🍐</div>
                    <div class="fruit">🍊</div>
                </div>
                <div class="answer-hint">Что это вместе?</div>
            </div>`
        },
        {
            description: "Собери слово из слогов: ма + ши + на",
            answer: "машина",
            content: `<div class="task-content">
                <div class="syllables">
                    <span class="syllable">ма</span>
                    <span class="syllable-operator">+</span>
                    <span class="syllable">ши</span>
                    <span class="syllable-operator">+</span>
                    <span class="syllable">на</span>
                    <span class="syllable-operator">=</span>
                    <span class="answer-hint">?</span>
                </div>
            </div>`
        }
    ],
    2: [
        {
            description: "Прочитай слово наоборот: ТОК",
            answer: "кот",
            content: `<div class="task-content">
                <div class="reverse-word">Т О К → <span class="reverse-arrow">⇄</span> </div>
                <div class="answer-hint">?</div>
            </div>`
        },
        {
            description: "Расшифруй слово используя цифры: 5 + 6 + 14",
            answer: "дом",
            content: `<div class="task-content">
                <div class="alphabet-task">
                    <table class="alphabet-table">
                        <tr>
                            <td>1-а</td><td>2-б</td><td>3-в</td><td>4-г</td><td>5-д</td>
                        </tr>
                        <tr>
                            <td>6-е</td><td>7-ё</td><td>8-ж</td><td>9-з</td><td>10-и</td>
                        </tr>
                        <tr>
                            <td>11-й</td><td>12-к</td><td>13-л</td><td>14-м</td><td>15-н</td>
                        </tr>
                    </table>
                    <div class="code-task">5 + 6 + 14 = ?</div>
                </div>
            </div>`
        },
        {
            description: "Прочитай слово наоборот: АНИШАМ",
            answer: "машина",
            content: `<div class="task-content">
                <div class="reverse-word">А Н И Ш А М → <span class="reverse-arrow">⇄</span> </div>
                <div class="answer-hint">?</div>
            </div>`
        }
    ],
    3: [
        {
            description: "Слон без буквы Л. Что получится?",
            answer: "сон",
            content: `<div class="task-content">
                <div class="word-with-missing-letter">
                    <span class="animal-emoji">🐘</span>
                    <span class="minus">-</span>
                    <span class="missing-letter">л</span>
                    <span class="equals">=</span>
                    <span class="answer-hint">?</span>
                </div>
            </div>`
        },
        {
            description: "Расшифруй слово: вфлгб",
            answer: "буква",
            content: `<div class="task-content">
                <div class="encoded-word">
                    <span class="encoded-letter">в</span>
                    <span class="encoded-letter">ф</span>
                    <span class="encoded-letter">л</span>
                    <span class="encoded-letter">г</span>
                    <span class="encoded-letter">б</span>
                </div>
                <div class="hint">Каждая буква - предыдущая в алфавите</div>
            </div>`
        },
        {
            description: "Расшифруй анаграмму. Что получится?",
            answer: "камыш",
            content: `<div class="task-content">
                <div class="reverse-word">
                    <span class="animal-emoji">🐭</span>
                    <span class="word">мышка</span>
                    <span class="reverse-arrow">⇄</span>
                </div>
                <div class="answer-hint">?</div>
            </div>`
        }
    ],
    4: [
        {
            description: "Расшифруй слово: бивфлб",
            answer: "азбука",
            content: `<div class="task-content">
                <div class="encoded-word">
                    <span class="encoded-letter">б</span>
                    <span class="encoded-letter">и</span>
                    <span class="encoded-letter">в</span>
                    <span class="encoded-letter">ф</span>
                    <span class="encoded-letter">л</span>
                    <span class="encoded-letter">б</span>
                </div>
                <div class="hint">Каждая буква - предыдущая в алфавите</div>
            </div>`
        },
        {
            description: "Расшифруй анаграмму. Что получится?",
            answer: "коршун",
            content: `<div class="task-content">
                <div class="reverse-word">
                    <span class="word">шнурок</span>
                    <span class="reverse-arrow">⇄</span>
                </div>
                <div class="answer-hint">?</div>
            </div>`
        },
        {
            description: "Вставь пропущенные буквы: к*р*в*",
            answer: "корова",
            content: `<div class="task-content">
                <div class="word-with-gaps">
                    <span class="letter">к</span>
                    <span class="gap">*</span>
                    <span class="letter">р</span>
                    <span class="gap">*</span>
                    <span class="letter">в</span>
                    <span class="gap">*</span>
                </div>
                <div class="hint">Домашнее животное</div>
            </div>`
        }
    ]
};

let currentClass = 1;
let currentTaskIndex = 0;
let tasks = [];

// Инициализация игры
export function initGame(grade) {
    currentClass = grade;
    currentTaskIndex = 0;
    tasks = classTasks[grade] || [];

    // Обновляем интерфейс
    document.getElementById('class-number').textContent = grade;
    document.getElementById('total-tasks').textContent = tasks.length;

    // Показываем первое задание
    showTask(currentTaskIndex);

    // Настраиваем обработчик для кнопки проверки
    document.getElementById('check-answer-btn').addEventListener('click', checkAnswer);

    // Настраиваем обработчик для поля ввода (проверка по Enter)
    document.getElementById('answer-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
}

// Показать задание
function showTask(index) {
    if (index >= tasks.length) {
        // Все задания выполнены
        showSuccess();
        return;
    }

    const task = tasks[index];
    const taskContainer = document.getElementById('task-container');
    const taskDescription = document.getElementById('task-description');
    const currentTaskElement = document.getElementById('current-task');
    const progressFill = document.getElementById('progress-fill');

    // Обновляем описание задания
    taskDescription.textContent = task.description;

    // Обновляем контент задания
    taskContainer.innerHTML = task.content;

    // Обновляем прогресс
    currentTaskElement.textContent = index + 1;
    progressFill.style.width = `${(index / tasks.length) * 100}%`;

    // Очищаем поле ввода и фокусируемся на нем
    const answerInput = document.getElementById('answer-input');
    answerInput.value = '';
    answerInput.focus();
}

// Проверить ответ
function checkAnswer() {
    const answerInput = document.getElementById('answer-input');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = tasks[currentTaskIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        // Правильный ответ
        playSound('assets/audio/effects/success.mp3');
        currentTaskIndex++;
        showTask(currentTaskIndex);
    } else {
        // Неправильный ответ
        playSound('assets/audio/effects/error.mp3');
        answerInput.classList.add('error');
        setTimeout(() => {
            answerInput.classList.remove('error');
        }, 1000);
    }
}

// Показать сообщение об успехе
function showSuccess() {
    const successMessage = document.getElementById('success-message');
    if (!successMessage) return;

    successMessage.style.display = 'block';

    // Создаем конфетти
    createConfetti();

    // Воспроизводим звук победы
    playSound('assets/audio/effects/victory.mp3');

    // Настраиваем кнопку "Играть еще"
    document.querySelector('.play-again-btn').addEventListener('click', () => {
        // Возвращаемся к выбору класса
        import('./router.js').then(module => {
            module.navigateTo('class-select');
        });
    });
}

// Создать анимацию конфетти
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#6B5B95', '#88D8B0'];
    const container = document.querySelector('.game-area');

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

        container.appendChild(confetti);

        // Анимация
        setTimeout(() => {
            confetti.style.opacity = '1';
            confetti.style.transition = 'all 1s ease-out';
            confetti.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = '0';
        }, 10);

        // Удаляем конфетти после анимации
        setTimeout(() => {
            confetti.remove();
        }, 1100);
    }
}