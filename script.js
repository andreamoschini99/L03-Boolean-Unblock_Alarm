/* =========================================================
   1. CONFIGURAZIONE DEI LIVELLI A DIFFICOLTÀ CRESCENTE (6x6)
   ========================================================= */
// Ogni livello è hardcodato e matematicamente verificato per essere sicuramente risolvibile.
// All'avvio si parte dal Livello 1 (5 mosse). Ad ogni Snooze, la difficoltà aumenta:
// - LIVELLO 1 (Iniziale): 7 blocchi (STOP + 6 ostacoli), risolvibile in 5 mosse logiche.
// - LIVELLO 2 (Dopo 1° Snooze): 9 blocchi (STOP + 8 ostacoli), risolvibile in 9 mosse logiche.
// - LIVELLO 3 (Dopo 2° o più Snooze): 10 blocchi (STOP + 9 ostacoli), risolvibile in 16 mosse logiche.
const LEVELS = [
  // Livello 1 (Difficoltà: Base - 5 mosse)
  [
    { id: 'target', row: 2, col: 0, len: 2, dir: 'H', isTarget: true },
    { id: 'b1',     row: 0, col: 2, len: 3, dir: 'V', isTarget: false },
    { id: 'b2',     row: 3, col: 1, len: 2, dir: 'H', isTarget: false },
    { id: 'b3',     row: 3, col: 3, len: 3, dir: 'V', isTarget: false },
    { id: 'b4',     row: 1, col: 4, len: 2, dir: 'V', isTarget: false },
    { id: 'b5',     row: 0, col: 3, len: 2, dir: 'H', isTarget: false },
    { id: 'b6',     row: 4, col: 4, len: 2, dir: 'H', isTarget: false }
  ],
  // Livello 2 (Difficoltà: Media - 9 mosse)
  // Introduce blocchi d'intralcio nell'angolo inferiore sinistro (b7 e b8)
  [
    { id: 'target', row: 2, col: 0, len: 2, dir: 'H', isTarget: true },
    { id: 'b1',     row: 0, col: 2, len: 3, dir: 'V', isTarget: false },
    { id: 'b2',     row: 3, col: 1, len: 2, dir: 'H', isTarget: false },
    { id: 'b3',     row: 3, col: 3, len: 3, dir: 'V', isTarget: false },
    { id: 'b4',     row: 1, col: 4, len: 2, dir: 'V', isTarget: false },
    { id: 'b5',     row: 0, col: 3, len: 2, dir: 'H', isTarget: false },
    { id: 'b6',     row: 4, col: 4, len: 2, dir: 'H', isTarget: false },
    { id: 'b7',     row: 3, col: 0, len: 2, dir: 'V', isTarget: false },
    { id: 'b8',     row: 5, col: 1, len: 2, dir: 'H', isTarget: false }
  ],
  // Livello 3 (Difficoltà: Difficile - 16 mosse)
  // Aggiunge anche b9 lungo la colonna del varco a destra, richiedendo una complessa reazione a catena
  [
    { id: 'target', row: 2, col: 0, len: 2, dir: 'H', isTarget: true },
    { id: 'b1',     row: 0, col: 2, len: 3, dir: 'V', isTarget: false },
    { id: 'b2',     row: 3, col: 1, len: 2, dir: 'H', isTarget: false },
    { id: 'b3',     row: 3, col: 3, len: 3, dir: 'V', isTarget: false },
    { id: 'b4',     row: 1, col: 4, len: 2, dir: 'V', isTarget: false },
    { id: 'b5',     row: 0, col: 3, len: 2, dir: 'H', isTarget: false },
    { id: 'b6',     row: 4, col: 4, len: 2, dir: 'H', isTarget: false },
    { id: 'b7',     row: 3, col: 0, len: 2, dir: 'V', isTarget: false },
    { id: 'b8',     row: 5, col: 1, len: 2, dir: 'H', isTarget: false },
    { id: 'b9',     row: 1, col: 5, len: 3, dir: 'V', isTarget: false }
  ]
];

// Indice del livello attuale (0 = Livello 1, 1 = Livello 2, 2 = Livello 3)
let currentLevelIndex = 0;

// Array mutabile con le coordinate correnti dei blocchi del livello attivo
let currentBlocks = [];

// Contatore numerico delle mosse
let moveCounter = 0;

// Riferimenti ai nodi principali del DOM
const boardElement = document.querySelector('#puzzle-board');
const movesCounterElement = document.querySelector('#moves-counter');
const levelCounterElement = document.querySelector('#level-counter');
const snoozeButtonElement = document.querySelector('#snooze-button');
const alarmClockElement = document.querySelector('#alarm-clock');
const victoryScreenElement = document.querySelector('#victory-screen');
const victorySummaryElement = document.querySelector('#victory-summary');
const restartButtonElement = document.querySelector('#restart-button');

/* =========================================================
   2. FUNZIONE DI INIZIALIZZAZIONE E RENDERING
   ========================================================= */
// Inizializza o carica un livello specifico
function initGame(levelIndex = currentLevelIndex) {
  currentLevelIndex = levelIndex;

  // Clona in profondità i blocchi del livello attivo per non alterare la matrice base
  currentBlocks = LEVELS[currentLevelIndex].map(block => ({ ...block }));
  moveCounter = 0;

  updateMovesDisplay();
  updateLevelDisplay();

  // Riattiva l'animazione di squillo e nasconde la schermata di vittoria
  alarmClockElement.classList.add('alarm-ringing');
  victoryScreenElement.classList.remove('is-active');

  renderBlocks();
}

// Aggiorna il testo del contatore mosse formattato a due cifre (es. "00", "01")
function updateMovesDisplay() {
  movesCounterElement.textContent = moveCounter < 10 ? '0' + moveCounter : moveCounter;
}

// Aggiorna la cifra del livello nella telemetria
function updateLevelDisplay() {
  if (levelCounterElement) {
    levelCounterElement.textContent = currentLevelIndex + 1;
  }
}

// Costruisce e posiziona nel DOM i blocchi della scacchiera
function renderBlocks() {
  // Rimuove i blocchi del livello precedente
  const existingBlocks = boardElement.querySelectorAll('.puzzle-block');
  existingBlocks.forEach(el => el.remove());

  currentBlocks.forEach(block => {
    const blockElement = document.createElement('div');
    blockElement.className = 'puzzle-block ' + (block.isTarget ? 'target-block' : 'obstacle-block');
    blockElement.dataset.id = block.id;

    // Calcola dimensioni e posizionamento percentuale su base 6x6
    const cellPercent = 100 / 6;
    const blockWidth = block.dir === 'H' ? block.len * cellPercent : cellPercent;
    const blockHeight = block.dir === 'V' ? block.len * cellPercent : cellPercent;
    const blockLeft = block.col * cellPercent;
    const blockTop = block.row * cellPercent;

    blockElement.style.width = blockWidth + '%';
    blockElement.style.height = blockHeight + '%';
    blockElement.style.left = blockLeft + '%';
    blockElement.style.top = blockTop + '%';

    // Superficie fisica interna del blocco
    const surfaceElement = document.createElement('div');
    surfaceElement.className = 'block-surface';

    if (block.isTarget) {
      // Blocco speciale STOP arancione
      surfaceElement.innerHTML = `
        <div class="target-content">
          <span class="target-arrow">◀</span>
          <div class="target-title-wrap">
            <span class="target-text">STOP</span>
            <div class="target-notches">
              <span class="target-notch"></span>
              <span class="target-notch"></span>
            </div>
          </div>
          <span class="target-arrow">▶</span>
        </div>
      `;
    } else {
      // Scanalature proporzionate alla lunghezza del blocco
      if (block.dir === 'H') {
        let notchesHtml = '';
        for (let i = 0; i < block.len; i++) {
          notchesHtml += '<span class="notch-h"></span>';
        }
        surfaceElement.innerHTML = `<div class="grip-notches-h">${notchesHtml}</div>`;
      } else {
        let notchesHtml = '';
        for (let i = 0; i < block.len; i++) {
          notchesHtml += '<span class="notch-v"></span>';
        }
        surfaceElement.innerHTML = `<div class="grip-notches-v">${notchesHtml}</div>`;
      }
    }

    blockElement.appendChild(surfaceElement);
    boardElement.appendChild(blockElement);

    // Assegna il gestore unificato di puntatore
    attachDragHandlers(blockElement, block);
  });
}

/* =========================================================
   3. CALCOLO LIMITI DI MOVIMENTO (COLLISIONI)
   ========================================================= */
// Determina il percorso libero per il blocco attivo
function calculateLimits(activeBlock) {
  const occupiedGrid = Array.from({ length: 6 }, () => Array(6).fill(false));

  currentBlocks.forEach(b => {
    if (b.id === activeBlock.id) return;
    for (let i = 0; i < b.len; i++) {
      const r = b.dir === 'V' ? b.row + i : b.row;
      const c = b.dir === 'H' ? b.col + i : b.col;
      if (r >= 0 && r < 6 && c >= 0 && c < 6) {
        occupiedGrid[r][c] = true;
      }
    }
  });

  if (activeBlock.dir === 'H') {
    const row = activeBlock.row;

    // Limite a sinistra
    let minCol = activeBlock.col;
    while (minCol > 0 && !occupiedGrid[row][minCol - 1]) {
      minCol--;
    }

    // Limite a destra nella griglia
    let maxCol = activeBlock.col;
    while (maxCol + activeBlock.len < 6 && !occupiedGrid[row][maxCol + activeBlock.len]) {
      maxCol++;
    }

    // Se il target raggiunge la porta d'uscita, permettiamo di oltrepassare il varco
    if (activeBlock.isTarget && maxCol === (6 - activeBlock.len)) {
      maxCol = 6;
    }

    return { min: minCol, max: maxCol };
  } else {
    const col = activeBlock.col;

    // Limite verso l'alto
    let minRow = activeBlock.row;
    while (minRow > 0 && !occupiedGrid[minRow - 1][col]) {
      minRow--;
    }

    // Limite verso il basso
    let maxRow = activeBlock.row;
    while (maxRow + activeBlock.len < 6 && !occupiedGrid[maxRow + activeBlock.len][col]) {
      maxRow++;
    }

    return { min: minRow, max: maxRow };
  }
}

/* =========================================================
   4. GESTIONE DRAG & DROP (POINTER EVENTS PER MOUSE E TOUCH)
   ========================================================= */
function attachDragHandlers(blockElement, block) {
  let isDragging = false;
  let startPointerX = 0;
  let startPointerY = 0;
  let initialCoordinate = 0;
  let minBoundary = 0;
  let maxBoundary = 0;
  let currentDeltaPx = 0;
  let singleCellPx = 0;

  // Inizio tocco o clic
  function onPointerDown(event) {
    event.preventDefault();
    isDragging = true;
    blockElement.classList.add('is-dragging');

    // Cattura il puntatore per fluidità anche uscendo dall'elemento
    blockElement.setPointerCapture(event.pointerId);

    startPointerX = event.clientX;
    startPointerY = event.clientY;
    currentDeltaPx = 0;

    const boardRect = boardElement.getBoundingClientRect();
    singleCellPx = boardRect.width / 6;

    const limits = calculateLimits(block);
    minBoundary = limits.min;
    maxBoundary = limits.max;

    initialCoordinate = block.dir === 'H' ? block.col : block.row;

    blockElement.addEventListener('pointermove', onPointerMove);
    blockElement.addEventListener('pointerup', onPointerUp);
    blockElement.addEventListener('pointercancel', onPointerUp);
  }

  // Spostamento interattivo con vincolo d'asse
  function onPointerMove(event) {
    if (!isDragging) return;

    const deltaX = event.clientX - startPointerX;
    const deltaY = event.clientY - startPointerY;

    if (block.dir === 'H') {
      const minDeltaPx = (minBoundary - initialCoordinate) * singleCellPx;
      const maxDeltaPx = (maxBoundary - initialCoordinate) * singleCellPx;
      currentDeltaPx = Math.max(minDeltaPx, Math.min(maxDeltaPx, deltaX));
      blockElement.style.transform = 'translate3d(' + currentDeltaPx + 'px, 0px, 0px)';
    } else {
      const minDeltaPx = (minBoundary - initialCoordinate) * singleCellPx;
      const maxDeltaPx = (maxBoundary - initialCoordinate) * singleCellPx;
      currentDeltaPx = Math.max(minDeltaPx, Math.min(maxDeltaPx, deltaY));
      blockElement.style.transform = 'translate3d(0px, ' + currentDeltaPx + 'px, 0px)';
    }
  }

  // Rilascio puntatore e snap-to-grid
  function onPointerUp(event) {
    if (!isDragging) return;
    isDragging = false;
    blockElement.classList.remove('is-dragging');

    blockElement.removeEventListener('pointermove', onPointerMove);
    blockElement.removeEventListener('pointerup', onPointerUp);
    blockElement.removeEventListener('pointercancel', onPointerUp);

    try {
      blockElement.releasePointerCapture(event.pointerId);
    } catch (e) {}

    const cellSteps = Math.round(currentDeltaPx / singleCellPx);
    const newCoordinate = initialCoordinate + cellSteps;

    // Condizione di vittoria: il blocco STOP oltrepassa il varco a destra
    if (block.isTarget && (newCoordinate >= 4 || currentDeltaPx >= (4 - initialCoordinate + 0.4) * singleCellPx)) {
      block.col = 6;
      blockElement.style.transform = 'translate3d(' + ((6 - initialCoordinate) * singleCellPx) + 'px, 0px, 0px)';
      moveCounter++;
      updateMovesDisplay();
      setTimeout(handleVictory, 250);
      return;
    }

    // Se il blocco ha cambiato casella, aggiorna coordinate e incrementa mosse
    if (newCoordinate !== initialCoordinate) {
      if (block.dir === 'H') {
        block.col = newCoordinate;
      } else {
        block.row = newCoordinate;
      }
      moveCounter++;
      updateMovesDisplay();
    }

    blockElement.style.transform = '';
    renderBlocks();
  }

  blockElement.addEventListener('pointerdown', onPointerDown);
}

/* =========================================================
   5. GESTIONE VITTORIA, SNOOZE PROGRESSIVO ED EVENTI UI
   ========================================================= */
// Mostra la schermata di vittoria e spegne lo squillo della sveglia
function handleVictory() {
  alarmClockElement.classList.remove('alarm-ringing');
  const levelNum = currentLevelIndex + 1;
  victorySummaryElement.textContent = 'Hai completato il Livello ' + levelNum + ' in ' + moveCounter + ' mosse! La sveglia è stata disattivata e il tuo cervello è ora sveglio al 100%.';
  victoryScreenElement.classList.add('is-active');
}

// Gestione Snooze (5 min): fa avanzare realmente il livello a un puzzle più difficile
snoozeButtonElement.addEventListener('click', function() {
  if (currentLevelIndex < LEVELS.length - 1) {
    currentLevelIndex++;
    alert('Sveglia posticipata (5 min). Attenzione: sei passato al Livello ' + (currentLevelIndex + 1) + ', il puzzle ora è più complesso!');
  } else {
    alert('Sveglia posticipata (5 min). Sei al Livello ' + (currentLevelIndex + 1) + ' (massima difficoltà): risolvi questo puzzle per spegnerla!');
  }
  initGame(currentLevelIndex);
});

// Controllo audio opzionale per la suoneria
const soundSwitchElement = document.querySelector('#sound-switch');
const soundIconDisplay = document.querySelector('#sound-icon-display');
if (soundSwitchElement && soundIconDisplay) {
  soundSwitchElement.addEventListener('change', function() {
    soundIconDisplay.textContent = soundSwitchElement.checked ? 'volume_up' : 'volume_off';
  });
}

// Tasto per rigiocare dalla schermata di vittoria (riparte dal Livello 1)
restartButtonElement.addEventListener('click', function() {
  currentLevelIndex = 0;
  initGame(0);
});

// Avvio iniziale al caricamento
window.addEventListener('DOMContentLoaded', function() {
  initGame(0);
});
