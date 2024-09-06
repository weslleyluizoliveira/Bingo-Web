// Aguarda o carregamento completo do conteúdo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos do DOM que serão manipulados
    const ballsContainer = document.getElementById('bingo-balls'); // Contêiner onde as bolas de bingo serão exibidas
    const currentNumberDiv = document.getElementById('current-number'); // Elemento onde o número sorteado será mostrado
    const remainingNumbersDiv = document.getElementById('remaining-numbers'); // Elemento onde os números restantes serão listados
    const drawButton = document.getElementById('draw-button'); // Botão para sortear um número
    const finishButton = document.getElementById('finish-button'); // Botão para finalizar o jogo
    const backgroundMusic = document.getElementById('fundo-music'); // Elemento de áudio para a música de fundo
    const ballRollSound = document.getElementById('bola-music'); // Elemento de áudio para o som das bolas

    // Lista de todos os números possíveis no bingo, com suas respectivas letras
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

    // Array para armazenar os números que já foram sorteados
    let drawnNumbers = [];

    // Função para obter um número aleatório que ainda não foi sorteado
    function getRandomNumber() {
        let index;
        // Gera um índice aleatório até encontrar um número não sorteado
        do {
            index = Math.floor(Math.random() * numbers.length);
        } while (drawnNumbers.includes(numbers[index]));
        return numbers[index];
    }

    // Função para sortear um número e atualizar a interface
    function drawNumber() {
        const num = getRandomNumber(); // Obtém um número aleatório
        drawnNumbers.push(num); // Adiciona o número sorteado à lista de números sorteados

        // Adiciona uma classe de animação placeholder antes de revelar o número
        currentNumberDiv.classList.add('animation-placeholder');

        // Mostrar o número após um atraso
        setTimeout(() => {
            currentNumberDiv.classList.remove('animation-placeholder'); // Remove a classe de animação placeholder
            currentNumberDiv.classList.add('reveal'); // Adiciona a classe de animação de revelação
            currentNumberDiv.innerHTML = `${num.letter}${num.number}`; // Atualiza o texto com o número sorteado
            
            // Cria um novo elemento para a bola sorteada e adiciona ao contêiner de bolas
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = `${num.letter}${num.number}`;
            ballsContainer.appendChild(ball);

            // Desabilita o botão de sorteio se todos os números foram sorteados
            if (drawnNumbers.length === numbers.length) {
                drawButton.disabled = true;
            }
            updateRemainingNumbers(); // Atualiza a lista de números restantes
            playAudio(); // Reproduz os sons
        }, 1500); // Define o atraso antes de mostrar o número (em milissegundos)
    }

    // Função para atualizar a lista de números restantes
    function updateRemainingNumbers() {
        remainingNumbersDiv.innerHTML = ''; // Limpa o conteúdo atual
        numbers.forEach(num => {
            if (!drawnNumbers.includes(num)) { // Verifica se o número ainda não foi sorteado
                const div = document.createElement('div');
                div.textContent = `${num.letter}${num.number}`;
                remainingNumbersDiv.appendChild(div);
            }
        });
    }

    // Função para tocar os sons de fundo e de rotação da bola
    function playAudio() {
        if (backgroundMusic.paused) {
            backgroundMusic.play(); // Toca a música de fundo se não estiver tocando
        }
        if (ballRollSound.paused) {
            ballRollSound.play(); // Toca o som da rotação da bola se não estiver tocando
        }
    }

    // Adiciona um evento de clique ao botão de sorteio
    drawButton.addEventListener('click', drawNumber);

    // Adiciona um evento de clique ao botão de finalizar
    finishButton.addEventListener('click', () => {
        alert('O jogo foi finalizado.'); // Mostra um alerta indicando que o jogo foi finalizado
        drawnNumbers = []; // Limpa a lista de números sorteados
        ballsContainer.innerHTML = ''; // Limpa o contêiner de bolas
        currentNumberDiv.innerHTML = 'NENHUM NÚMERO SORTEADO AINDA!<br>VAMOS COMEÇAR O JOGO!!'; // Reseta o texto do número atual
        currentNumberDiv.classList.remove('reveal'); // Remove a classe de animação de revelação
        updateRemainingNumbers(); // Atualiza a lista de números restantes
        drawButton.disabled = false; // Reabilita o botão de sorteio
    });

    // Adiciona um evento de clique ao botão de ativar áudio
    document.getElementById('enable-audio').addEventListener('click', () => {
        backgroundMusic.play(); // Toca a música de fundo
        document.getElementById('audio-prompt').style.display = 'none'; // Esconde o aviso de áudio
    });

    // Atualiza a lista de números restantes na inicialização
    updateRemainingNumbers();
});
