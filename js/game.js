import { playSound } from './audio.js';

// Инициализация игры
export function initGame(grade) {
    initDragAndDrop(grade);
}

// Инициализация перетаскивания элементов
function initDragAndDrop(grade) {
    const draggableItems = document.querySelectorAll('.draggable-item');
    const targetArea = document.querySelector('.target-area');
    let countInTarget = 0;

    // Установка сложности в зависимости от класса
    const difficultySettings = {
        '1': { itemsToComplete: 2 },
        '2': { itemsToComplete: 3 },
        '3': { itemsToComplete: 4 },
        '4': { itemsToComplete: 5 }
    };

    const itemsToComplete = difficultySettings[grade].itemsToComplete;

    draggableItems.forEach(item => {
        item.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => {
                e.target.style.opacity = '0.5';
            }, 0);

            // Воспроизведение звука перетаскивания
            playSound('assets/audio/effects/click.mp3');
        });

        item.addEventListener('dragend', function (e) {
            e.target.style.opacity = '1';
        });
    });

    targetArea.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    targetArea.addEventListener('drop', function (e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);

        // Проверяем, был ли элемент уже помещен в цель
        if (!draggable.classList.contains('in-target')) {
            // Помещаем элемент в целевое поле
            e.target.appendChild(draggable);
            draggable.classList.add('in-target');
            draggable.style.position = 'static';
            draggable.style.margin = '5px';

            // Воспроизводим звук
            playSound('assets/audio/effects/success.mp3');

            countInTarget++;

            // Если все необходимые элементы в целевой области
            if (countInTarget >= itemsToComplete) {
                showSuccess();
            }
        }
    });
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