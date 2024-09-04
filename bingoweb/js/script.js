document.addEventListener('DOMContentLoaded', () => {
    // Obtém referências aos elementos HTML que serão manipulados
    const ballsContainer = document.getElementById('bingo-balls');
    const currentNumberDiv = document.getElementById('current-number');
    const numberListDiv = document.getElementById('number-list');
    const remainingNumbersDiv = document.getElementById('remaining-numbers');
    const drawButton = document.getElementById('draw-button');
    const finishButton = document.getElementById('finish-button');
    const backgroundMusic = document.getElementById('fundo-music');
    const ballRollSound = document.getElementById('bola-music');

    // Define a lista completa de números disponíveis para o jogo
    const numbers = [
        {letter: 'B', number: 1}, {letter: 'B', number: 2}, {letter: 'B', number: 3}, {letter: 'B', number: 4}, {letter: 'B', number: 5},
        {letter: 'B', number: 6}, {letter: 'B', number: 7}, {letter: 'B', number: 8}, {letter: 'B', number: 9}, {letter: 'B', number: 10},
        {letter: 'B', number: 11}, {letter: 'B', number: 12}, {letter: 'B', number: 13}, {letter: 'B', number: 14}, {letter: 'B', number: 15},
        {letter: 'I', number: 16}, {letter: 'I', number: 17}, {letter: 'I', number: 18}, {letter: 'I', number: 19}, {letter: 'I', number: 20},
        {letter: 'I', number: 21}, {letter: 'I', number: 22}, {letter: 'I', number: 23}, {letter: 'I', number: 24}, {letter: 'I', number: 25},
        {letter: 'I', number: 26}, {letter: 'I', number: 27}, {letter: 'I', number: 28}, {letter: 'I', number: 29}, {letter: 'I', number: 30},
        {letter: 'N', number: 31}, {letter: 'N', number: 32}, {letter: 'N', number: 33}, {letter: 'N', number: 34}, {letter: 'N', number: 35},
        {letter: 'N', number: 36}, {letter: 'N', number: 37}, {letter: 'N', number: 38}, {letter: 'N', number: 39}, {letter: 'N', number: 40},
        {letter: 'N', number: 41}, {letter: 'N', number: 42}, {letter: 'N', number: 43}, {letter: 'N', number: 44}, {letter: 'N', number: 45},
        {letter: 'G', number: 46}, {letter: 'G', number: 47}, {letter: 'G', number: 48}, {letter: 'G', number: 49}, {letter: 'G', number: 50},
        {letter: 'G', number: 51}, {letter: 'G', number: 52}, {letter: 'G', number: 53}, {letter: 'G', number: 54}, {letter: 'G', number: 55},
        {letter: 'G', number: 56}, {letter: 'G', number: 57}, {letter: 'G', number: 58}, {letter: 'G', number: 59}, {letter: 'G', number: 60},
        {letter: 'O', number: 61}, {letter: 'O', number: 62}, {letter: 'O', number: 63}, {letter: 'O', number: 64}, {letter: 'O', number: 65},
        {letter: 'O', number: 66}, {letter: 'O', number: 67}, {letter: 'O', number: 68}, {letter: 'O', number: 69}, {letter: 'O', number: 70},
        {letter: 'O', number: 71}, {letter: 'O', number: 72}, {letter: 'O', number: 73}, {letter: 'O', number: 74}, {letter: 'O', number: 75}
    ];

    let drawnNumbers = [];
    let availableNumbers = [...numbers];

    // Função para aplicar configurações de som salvas
    function applySettings() {
    const savedSettings = JSON.parse(localStorage.getItem('settings')) || {};

    // Aplica as configurações de som
    if (savedSettings.sound === false) {
        backgroundMusic.volume = 0;
        ballRollSound.volume = 0;
    } else {
        backgroundMusic.volume = savedSettings.backgroundMusicVolume / 100;
        ballRollSound.volume = savedSettings.ballRollSoundVolume / 100;
    }

    // Garante que o áudio de fundo comece a tocar
    backgroundMusic.play().catch(error => {
        console.log('Erro ao tentar tocar o áudio de fundo:', error);
    });
}

    // Função para tocar o áudio do número sorteado
    function playNumberAudio(number) {
        const audio = new Audio(`audio/${number.letter}-${number.number}.mp3`);
        
        audio.addEventListener('error', () => {
            console.log(`Áudio para ${number.letter}${number.number} não encontrado. Reproduzindo som padrão.`);
            ballRollSound.play(); // Reproduz o som padrão se o áudio específico não for encontrado
        });

        audio.play();
    }

    // Função para sortear um número
    function drawNumber() {
        if (availableNumbers.length === 0) {
            alert('Todos os Números já foram Sorteados!');
            return;
        }

        ballRollSound.play();

        const ballPlaceholder = document.createElement('div');
        ballPlaceholder.classList.add('ball');
        ballPlaceholder.textContent = '...';
        ballsContainer.appendChild(ballPlaceholder);

        setTimeout(() => {
            ballsContainer.removeChild(ballPlaceholder);

            const index = Math.floor(Math.random() * availableNumbers.length);
            const number = availableNumbers.splice(index, 1)[0];

            drawnNumbers.push(number);

            const newBall = document.createElement('div');
            newBall.classList.add('ball');
            newBall.textContent = `${number.letter}${number.number}`;
            ballsContainer.appendChild(newBall);

            removeNumberFromRemaining(number);

            currentNumberDiv.textContent = `NÚMERO SORTEADO: ${number.letter}${number.number}`;

            updateNumberList();
            updateRemainingNumbers();

            // Toca o áudio específico do número sorteado
            playNumberAudio(number);

        }, 1000);
    }

    function updateNumberList() {
        numberListDiv.innerHTML = '<h3>NÚMEROS SORTEADOS: <p></h3>';
        drawnNumbers.forEach(num => {
            const listItem = document.createElement('div');
            listItem.textContent = `${num.letter}${num.number}`;
            numberListDiv.appendChild(listItem);
        });
    }

    function updateRemainingNumbers() {
        remainingNumbersDiv.innerHTML = '<h3> </h3><p><p><p><p>';
        availableNumbers.forEach(num => {
            const listItem = document.createElement('div');
            listItem.textContent = `${num.letter}${num.number}`;
            listItem.id = `remaining-${num.letter}${num.number}`;
            remainingNumbersDiv.appendChild(listItem);
        });
    }

    function removeNumberFromRemaining(number) {
        const numberId = `remaining-${number.letter}${number.number}`;
        const numberElement = document.getElementById(numberId);

        if (numberElement) {
            numberElement.remove();
        }
    }

    function finishBingo() {
        backgroundMusic.pause();
        window.location.href = 'congratulation.html';
    }

    drawButton.addEventListener('click', drawNumber);
    finishButton.addEventListener('click', finishBingo);

    // Inicializa a lista de números restantes e aplica as configurações ao carregar a página
    applySettings();
    updateRemainingNumbers();
});
