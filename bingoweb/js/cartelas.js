// Atualiza as visualizações de cor quando os controles são alterados
function updateColorPreviews() {
    document.getElementById('card-background-preview').style.backgroundColor = document.getElementById('card-background-color').value;
    document.getElementById('ad-background-preview').style.backgroundColor = document.getElementById('ad-background-color').value;
    document.getElementById('ad-border-preview').style.backgroundColor = document.getElementById('ad-border-color').value;
    document.getElementById('header-background-preview').style.backgroundColor = document.getElementById('header-background-color').value;
    document.getElementById('header-text-preview').style.backgroundColor = document.getElementById('header-text-color').value;
    document.getElementById('cell-border-preview').style.backgroundColor = document.getElementById('cell-border-color').value;
    document.getElementById('cell-text-preview').style.backgroundColor = document.getElementById('cell-text-color').value;
    document.getElementById('ad-text-preview').style.backgroundColor = document.getElementById('ad-text-color').value; // Adicionado para atualizar a cor do texto da publicidade
}

// Função para gerar as cartelas de bingo
function generateBingoCards() {
    const size = parseInt(document.getElementById('size').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const advertisement = document.getElementById('advertisement').value;
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Limpa as cartelas anteriores

    // Coleta das cores selecionadas
    const cardBackgroundColor = document.getElementById('card-background-color').value;
    const adBackgroundColor = document.getElementById('ad-background-color').value;
    const adBorderColor = document.getElementById('ad-border-color').value;
    const headerBackgroundColor = document.getElementById('header-background-color').value;
    const headerTextColor = document.getElementById('header-text-color').value;
    const cellBorderColor = document.getElementById('cell-border-color').value;
    const cellTextColor = document.getElementById('cell-text-color').value;
    const adTextColor = document.getElementById('ad-text-color').value; // Adicionado

    for (let q = 0; q < quantity; q++) {
        const card = document.createElement('div');
        card.className = 'bingo-card';
        card.style.setProperty('background-color', cardBackgroundColor);

        // Adiciona a seção de publicidade
        const adSection = document.createElement('div');
        adSection.className = 'advertisement';
        adSection.style.setProperty('background-color', adBackgroundColor);
        adSection.style.setProperty('border-bottom', `2px solid ${adBorderColor}`);
        adSection.style.setProperty('color', adTextColor); // Atualiza a cor do texto da publicidade
        adSection.textContent = advertisement || 'PREMIO Nº33';
        card.appendChild(adSection);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        ['B', 'I', 'N', 'G', 'O'].forEach(letter => {
            const th = document.createElement('th');
            th.textContent = letter;
            th.style.setProperty('background-color', headerBackgroundColor);
            th.style.setProperty('color', headerTextColor);
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        const numbers = generateNumbers(size);

        for (let i = 0; i < size; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('td');
                cell.style.setProperty('border', `1px solid ${cellBorderColor}`);
                cell.style.setProperty('color', cellTextColor);
                if (size === 5 && i === 2 && j === 2) {
                    cell.innerHTML = '<img src="images/logo.png" alt="Logo" class="logo">';
                } else {
                    cell.textContent = numbers[j][i];
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        card.appendChild(table);
        container.appendChild(card);
    }
}

// Função para gerar números aleatórios para as cartelas
function generateNumbers(size) {
    const columns = [
        getRandomNumbers(1, 15, size),
        getRandomNumbers(16, 30, size),
        getRandomNumbers(31, 45, size),
        getRandomNumbers(46, 60, size),
        getRandomNumbers(61, 75, size),
    ];

    return columns;
}

// Função auxiliar para gerar números aleatórios sem repetição
function getRandomNumbers(min, max, count) {
    const numbers = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

// Atualiza as pré-visualizações de cor ao carregar a página e quando as cores são alteradas
window.onload = () => {
    updateColorPreviews();
    document.getElementById('card-background-color').addEventListener('input', updateColorPreviews);
    document.getElementById('ad-background-color').addEventListener('input', updateColorPreviews);
    document.getElementById('ad-border-color').addEventListener('input', updateColorPreviews);
    document.getElementById('header-background-color').addEventListener('input', updateColorPreviews);
    document.getElementById('header-text-color').addEventListener('input', updateColorPreviews);
    document.getElementById('cell-border-color').addEventListener('input', updateColorPreviews);
    document.getElementById('cell-text-color').addEventListener('input', updateColorPreviews);
    document.getElementById('ad-text-color').addEventListener('input', updateColorPreviews); // Adicionado para atualizar a cor do texto da publicidade
};
