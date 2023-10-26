let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'Circle';

function init() {
    render();
}


function render() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            tableHTML += `<td onclick="handleCellClick(${index})">`;

            let symbol = '';
            if (fields[index] === 'Circle') {
                symbol = generateAnimatedCircle();
            } else if (fields[index] === 'Cross') {
                symbol = generateAnimatedCross();
            }

            tableHTML += `${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    contentDiv.innerHTML = tableHTML;
}

function handleCellClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        currentPlayer = currentPlayer === 'Circle' ? 'Cross' : 'Circle';
        render();

        // Remove the onclick attribute after the cell is clicked
        const cell = document.querySelector(`[onclick="handleCellClick(${index})"]`); //Auswahlmethode DOM-Elemente mit CSS Eigenschaften oder onclick-Events
        if (cell) {
            cell.removeAttribute('onclick');
        }
    }
}

function generateAnimatedCircle() {
    const width = 70;
    const height = 70;
    const color = 'rgb(0, 176, 239)';
    const animationDuration = 124; // Animation in Millisekunden

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2}" fill="transparent" stroke="${color}" stroke-width="5" stroke-dasharray="220" stroke-dashoffset="220">
          <animate attributeName="stroke-dashoffset" from="220" to="0" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </circle>
      </svg>
    `;

    return svg;
}

function generateAnimatedCross() {
    const width = 70;
    const height = 70;
    const color = 'rgb(204, 156, 13)';
    const animationDuration = 124; // Animation in Millisekunden

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="5">
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="${color}" stroke-width="5">
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="${animationDuration}ms" begin="0s" fill="freeze" />
        </line>
      </svg>
    `;

    return svg;
}