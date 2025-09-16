// Управление аудио в приложении
let audioEnabled = true;

export function initAudio() {
    const musicControl = document.querySelector('.music-control');
    const bgMusic = document.getElementById('bg-music');

    if (musicControl && bgMusic) {
        musicControl.addEventListener('click', toggleMusic);
    }
}

export function toggleMusic() {
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.querySelector('.music-control i');

    if (!bgMusic) return;

    if (audioEnabled) {
        bgMusic.pause();
        musicIcon.className = 'fas fa-volume-mute';
        audioEnabled = false;
    } else {
        bgMusic.play().catch(e => {
            console.log('Не удалось воспроизвести музыку:', e);
        });
        musicIcon.className = 'fas fa-volume-up';
        audioEnabled = true;
    }
}

export function playSound(soundUrl) {
    if (!audioEnabled) return;

    const sound = new Audio(soundUrl);
    sound.play().catch(e => {
        console.log('Не удалось воспроизвести звук:', e);
    });
}

export function isAudioEnabled() {
    return audioEnabled;
}