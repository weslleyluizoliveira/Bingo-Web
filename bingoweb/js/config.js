document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.getElementById('sound-toggle');
    const backgroundMusicVolume = document.getElementById('background-music-volume');
    const ballRollSoundVolume = document.getElementById('ball-roll-sound-volume');
    const backgroundMusicVolumeLabel = document.getElementById('background-music-volume-label');
    const ballRollSoundVolumeLabel = document.getElementById('ball-roll-sound-volume-label');
    const saveButton = document.getElementById('save-settings');
    const backToGameButton = document.getElementById('back-to-game');

    backgroundMusicVolume.addEventListener('input', (e) => {
        backgroundMusicVolumeLabel.textContent = `${e.target.value}%`;
    });

    ballRollSoundVolume.addEventListener('input', (e) => {
        ballRollSoundVolumeLabel.textContent = `${e.target.value}%`;
    });

    saveButton.addEventListener('click', () => {
        const settings = {
            sound: soundToggle.checked,
            backgroundMusicVolume: backgroundMusicVolume.value,
            ballRollSoundVolume: ballRollSoundVolume.value
        };

        localStorage.setItem('settings', JSON.stringify(settings));
        alert('Configurações salvas!');
    });

    backToGameButton.addEventListener('click', () => {
        window.location.href = 'sorteio.html'; // Ajuste o nome do arquivo conforme o seu jogo
    });

    const savedSettings = JSON.parse(localStorage.getItem('settings'));

    if (savedSettings) {
        soundToggle.checked = savedSettings.sound;
        backgroundMusicVolume.value = savedSettings.backgroundMusicVolume;
        ballRollSoundVolume.value = savedSettings.ballRollSoundVolume;
        backgroundMusicVolumeLabel.textContent = `${savedSettings.backgroundMusicVolume}%`;
        ballRollSoundVolumeLabel.textContent = `${savedSettings.ballRollSoundVolume}%`;
    }
});
