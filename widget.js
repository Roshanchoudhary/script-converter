// ============================================================
// Mithila Script Converter Widget - COMPLETE VERSION
// किसी भी website पर embed करें:
// <script src="YOUR_URL/widget.js"></script>
// ============================================================

(function () {
  'use strict';

  const CDN = 'https://script-converter.pages.dev/fonts/';

  // ============================================================
  // 1. COMPLETE UNICODE MAPS (Using actual characters for clarity)
  // ============================================================

  // Tirhuta → Devanagari
  const T2D = {
    // Vowels
    '𑒁': 'अ', '𑒂': 'आ', '𑒃': 'इ', '𑒄': 'ई',
    '𑒅': 'उ', '𑒆': 'ऊ', '𑒇': 'ऋ', '𑒈': 'ऌ',
    '𑒉': 'ए', '𑒊': 'ऐ', '𑒋': 'ओ', '𑒌': 'औ',
    
    // Consonants
    '𑒍': 'क', '𑒎': 'ख', '𑒏': 'ग', '𑒐': 'घ', '𑒑': 'ङ',
    '𑒒': 'च', '𑒓': 'छ', '𑒔': 'ज', '𑒕': 'झ', '𑒖': 'ञ',
    '𑒗': 'ट', '𑒘': 'ठ', '𑒙': 'ड', '𑒚': 'ढ', '𑒛': 'ण',
    '𑒜': 'त', '𑒝': 'थ', '𑒞': 'द', '𑒟': 'ध', '𑒠': 'न',
    '𑒡': 'प', '𑒢': 'फ', '𑒣': 'ब', '𑒤': 'भ', '𑒥': 'म',
    '𑒦': 'य', '𑒧': 'र', '𑒨': 'ल', '𑒩': 'व',
    '𑒪': 'श', '𑒫': 'ष', '𑒬': 'स', '𑒭': 'ह',
    
    // Matras (Vowel signs)
    '𑒮': 'ा', '𑒯': 'ि', '𑒰': 'ी', '𑒱': 'ु', '𑒲': 'ू',
    '𑒳': 'ृ', '𑒴': 'े', '𑒵': 'ै', '𑒶': 'ो', '𑒷': 'ौ',
    
    // Special
    '𑒸': 'ं', '𑒹': 'ः', '𑓀': '्', '𑓁': 'ँ',
    
    // Numbers
    '𑓐': '०', '𑓑': '१', '𑓒': '२', '𑓓': '३', '𑓔': '४',
    '𑓕': '५', '𑓖': '६', '𑓗': '७', '𑓘': '८', '𑓙': '९',
  };

  // Devanagari → Tirhuta (Reverse mapping)
  const D2T = {};
  for (const [tir, dev] of Object.entries(T2D)) {
    D2T[dev] = tir;
  }

  // ============================================================
  // 2. COMPLETE PHONETIC MAP (English → Devanagari)
  // ============================================================

  const PHONETIC_RULES = [
    // Special/Nukta (with .)
    ['.k', 'क़'], ['.kh', 'ख़'], ['.z', 'ज़'], ['.f', 'फ़'],
    
    // Compound consonants
    ['ksh', 'क्ष'], ['gya', 'ज्ञ'], ['tr', 'त्र'],
    
    // Aspirated consonants (with h)
    ['kh', 'ख'], ['gh', 'घ'], ['chh', 'छ'], ['jh', 'झ'],
    ['th', 'थ'], ['dh', 'ध'], ['ph', 'फ'], ['bh', 'भ'],
    
    // Retroflex (Capital letters)
    ['Th', 'ठ'], ['Dh', 'ढ'], ['N', 'ण'],
    ['T', 'ट'], ['D', 'ड'],
    
    // Vowels (long)
    ['aa', 'आ'], ['ii', 'ई'], ['uu', 'ऊ'],
    ['ai', 'ऐ'], ['au', 'औ'],
    ['A', 'आ'], ['I', 'ई'], ['U', 'ऊ'],
    
    // Vowels (short)
    ['a', 'अ'], ['i', 'इ'], ['u', 'उ'],
    ['e', 'ए'], ['o', 'ओ'],
    
    // Consonants (regular)
    ['k', 'क'], ['g', 'ग'], ['ch', 'च'], ['j', 'ज'],
    ['t', 'त'], ['d', 'द'], ['p', 'प'], ['b', 'ब'],
    ['y', 'य'], ['r', 'र'], ['l', 'ल'], ['v', 'व'],
    ['w', 'व'], ['sh', 'श'], ['S', 'श'], ['s', 'स'],
    ['h', 'ह'], ['m', 'म'], ['n', 'न'], ['ng', 'ङ'],
    ['ny', 'ञ'], ['yn', 'ञ'],
    
    // Special
    ['M', 'ं'], ['H', 'ः'], ['~', 'ँ'],
    
    // Numbers
    ['0', '०'], ['1', '१'], ['2', '२'], ['3', '३'],
    ['4', '४'], ['5', '५'], ['6', '६'], ['7', '७'],
    ['8', '८'], ['9', '९'],
  ];

  // Sort rules by length (longest first) for proper matching
  const SORTED_RULES = [...PHONETIC_RULES].sort((a, b) => b[0].length - a[0].length);

  // ============================================================
  // 3. PHONETIC ENGINE (With matra handling)
  // ============================================================

  function phoneticToDevanagari(text) {
    if (!text) return '';
    
    let result = '';
    let i = 0;
    const input = text;
    
    // Matra map for vowels
    const matraMap = {
      'आ': 'ा', 'ई': 'ी', 'ऊ': 'ू',
      'ऐ': 'ै', 'औ': 'ौ',
      'इ': 'ि', 'उ': 'ु',
      'ए': 'े', 'ओ': 'ो'
    };
    
    // Set of vowel characters
    const vowels = new Set(['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ']);
    const matras = new Set(['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ']);
    
    while (i < input.length) {
      let matched = false;
      
      // Try to match longest rule first (case insensitive)
      for (const [pattern, replacement] of SORTED_RULES) {
        if (i + pattern.length <= input.length && 
            input.substring(i, i + pattern.length).toLowerCase() === pattern.toLowerCase()) {
          
          // Check if replacement is a vowel
          const isVowel = vowels.has(replacement);
          const isMatra = matras.has(replacement);
          
          // Get last character of result (if any)
          const lastChar = result[result.length - 1] || '';
          const isConsonant = /[क-ह]/.test(lastChar) && !matras.has(lastChar);
          
          if (isVowel && isConsonant && !isMatra) {
            // Convert vowel to matra form
            const matra = matraMap[replacement];
            if (matra) {
              result += matra;
            } else {
              result += replacement;
            }
          } else {
            result += replacement;
          }
          
          i += pattern.length;
          matched = true;
          break;
        }
      }
      
      // If no match, keep the character
      if (!matched) {
        result += input[i];
        i++;
      }
    }
    
    return result;
  }

  // ============================================================
  // 4. MAIN CONVERT FUNCTION
  // ============================================================

  function convert(text, direction, inputMode) {
    if (!text || text.trim() === '') return '';
    
    if (direction === 'dev-to-tir') {
      // Devanagari → Tirhuta
      let devanagariText = '';
      
      if (inputMode === 'phonetic') {
        // Convert phonetic to Devanagari first
        devanagariText = phoneticToDevanagari(text);
      } else {
        // Input is already Devanagari
        devanagariText = text;
      }
      
      // Convert Devanagari to Tirhuta
      let result = '';
      for (const char of devanagariText) {
        result += D2T[char] || char;
      }
      return result;
      
    } else {
      // Tirhuta → Devanagari
      let result = '';
      for (const char of text) {
        result += T2D[char] || char;
      }
      return result;
    }
  }

  // ============================================================
  // 5. WIDGET STYLES (Complete CSS)
  // ============================================================

  function injectFonts() {
    if (document.getElementById('mw-fonts')) return;
    const style = document.createElement('style');
    style.id = 'mw-fonts';
    style.textContent = `
      @font-face {
        font-family: 'Mithilauni';
        src: url('${CDN}mithilauni.ttf') format('truetype');
        font-display: swap;
      }
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tirhuta&family=Noto+Sans+Devanagari:wght@400;700&display=swap');
    `;
    document.head.appendChild(style);
  }

  function injectCSS() {
    if (document.getElementById('mw-css')) return;
    const style = document.createElement('style');
    style.id = 'mw-css';
    style.textContent = `
      /* FAB Button */
      #mw-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #8B1A1A, #D4A017);
        border-radius: 50%;
        border: none;
        color: white;
        font-size: 1.6rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(139,26,26,0.4);
        z-index: 99998;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Mithilauni', 'Noto Sans Tirhuta', serif;
      }
      #mw-fab:hover {
        transform: scale(1.1) rotate(-5deg);
        box-shadow: 0 8px 30px rgba(139,26,26,0.5);
      }
      #mw-fab:active {
        transform: scale(0.95);
      }

      /* Panel */
      #mw-panel {
        position: fixed;
        bottom: 96px;
        right: 24px;
        width: 400px;
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 120px);
        background: #FDF6E3;
        border: 2px solid #C8A96E;
        border-radius: 16px;
        box-shadow: 0 12px 60px rgba(0,0,0,0.25);
        z-index: 99999;
        font-family: 'Noto Sans Devanagari', Arial, sans-serif;
        overflow: hidden;
        display: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      #mw-panel.open {
        display: block;
        animation: mwSlideUp 0.3s ease;
      }
      @keyframes mwSlideUp {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* Panel Header */
      .mw-head {
        background: linear-gradient(135deg, #8B1A1A, #5C0F0F);
        color: white;
        padding: 14px 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
      }
      .mw-head h3 {
        font-size: 1rem;
        margin: 0;
        font-weight: 700;
        letter-spacing: 0.5px;
      }
      .mw-head h3 span {
        color: #D4A017;
      }
      .mw-x {
        background: none;
        border: none;
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
        padding: 0 6px;
        opacity: 0.7;
        transition: all 0.2s;
        line-height: 1;
      }
      .mw-x:hover {
        opacity: 1;
        transform: rotate(90deg);
      }

      /* Panel Body */
      .mw-body {
        padding: 16px;
        overflow-y: auto;
        max-height: calc(100vh - 220px);
      }

      /* Controls Row */
      .mw-row {
        display: flex;
        gap: 10px;
        margin-bottom: 12px;
      }
      .mw-row > div {
        flex: 1;
      }

      .mw-lbl {
        font-size: 0.7rem;
        color: #8B1A1A;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
        display: block;
      }

      .mw-sel {
        width: 100%;
        padding: 8px 12px;
        border: 2px solid #C8A96E;
        border-radius: 8px;
        background: white;
        font-size: 0.82rem;
        color: #2C1810;
        cursor: pointer;
        appearance: none;
        font-family: 'Noto Sans Devanagari', Arial, sans-serif;
        transition: all 0.2s;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238B1A1A' stroke-width='2' fill='none'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 10px center;
      }
      .mw-sel:focus {
        outline: none;
        border-color: #8B1A1A;
        box-shadow: 0 0 0 3px rgba(139,26,26,0.1);
      }

      /* Textareas */
      .mw-ta {
        width: 100%;
        height: 80px;
        border: 2px solid #C8A96E;
        border-radius: 8px;
        padding: 10px 12px;
        font-size: 1rem;
        line-height: 1.8;
        resize: none;
        background: white;
        color: #2C1810;
        margin-bottom: 8px;
        font-family: 'Noto Sans Devanagari', Arial, sans-serif;
        transition: all 0.2s;
      }
      .mw-ta:focus {
        outline: none;
        border-color: #8B1A1A;
        box-shadow: 0 0 0 3px rgba(139,26,26,0.1);
      }
      .mw-ta::placeholder {
        color: #B0A090;
        font-size: 0.85rem;
      }

      .mw-fm {
        font-family: 'Mithilauni', 'Noto Sans Tirhuta', serif !important;
      }
      .mw-fn {
        font-family: 'Noto Sans Tirhuta', serif !important;
      }

      /* Buttons */
      .mw-btns {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .mw-btn {
        flex: 1;
        padding: 8px 12px;
        border: none;
        border-radius: 8px;
        font-size: 0.78rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        min-width: 60px;
        font-family: 'Noto Sans Devanagari', Arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }
      .mw-btn:hover {
        transform: translateY(-1px);
      }
      .mw-btn:active {
        transform: scale(0.97);
      }

      .mw-bp {
        background: #8B1A1A;
        color: white;
      }
      .mw-bp:hover {
        background: #6B1010;
        box-shadow: 0 4px 12px rgba(139,26,26,0.3);
      }

      .mw-bs {
        background: #D4A017;
        color: #2C1810;
      }
      .mw-bs:hover {
        background: #B8860B;
        box-shadow: 0 4px 12px rgba(212,160,23,0.3);
      }

      .mw-bo {
        background: transparent;
        border: 2px solid #C8A96E;
        color: #2C1810;
      }
      .mw-bo:hover {
        border-color: #8B1A1A;
        color: #8B1A1A;
        background: rgba(139,26,26,0.05);
      }

      /* Page Converter */
      .mw-pg {
        margin-top: 10px;
        padding: 12px 14px;
        background: rgba(139,26,26,0.06);
        border-radius: 10px;
        border: 1px solid #C8A96E;
      }
      .mw-pg p {
        font-size: 0.78rem;
        color: #5C3A1E;
        margin-bottom: 8px;
        line-height: 1.4;
      }
      .mw-pg p strong {
        color: #8B1A1A;
      }
      .mw-pgbtn {
        width: 100%;
        padding: 10px;
        background: #8B1A1A;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 0.82rem;
        cursor: pointer;
        font-weight: 700;
        transition: all 0.2s;
        font-family: 'Noto Sans Devanagari', Arial, sans-serif;
      }
      .mw-pgbtn:hover {
        background: #6B1010;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(139,26,26,0.3);
      }
      .mw-pgbtn:active {
        transform: scale(0.97);
      }
      .mw-pgbtn.active {
        background: #2D6A4F;
      }
      .mw-pgbtn.active:hover {
        background: #1B4D3E;
      }

      /* Toast */
      #mw-toast {
        position: fixed;
        bottom: 96px;
        right: 24px;
        background: #2C1810;
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        font-size: 0.85rem;
        z-index: 100000;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        pointer-events: none;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        max-width: 90%;
        font-family: 'Noto Sans Devanagari', Arial, sans-serif;
      }
      #mw-toast.show {
        opacity: 1;
        transform: translateY(0);
      }
      #mw-toast.success {
        background: #2D6A4F;
      }
      #mw-toast.error {
        background: #B91C1C;
      }

      /* Mobile Responsive */
      @media (max-width: 600px) {
        #mw-panel {
          right: 8px;
          bottom: 80px;
          width: calc(100vw - 16px);
          max-height: calc(100vh - 100px);
        }
        #mw-fab {
          width: 52px;
          height: 52px;
          font-size: 1.3rem;
          bottom: 16px;
          right: 16px;
        }
        .mw-row {
          flex-direction: column;
          gap: 6px;
        }
        .mw-ta {
          height: 70px;
          font-size: 0.95rem;
        }
        .mw-body {
          padding: 12px;
        }
        #mw-toast {
          bottom: 76px;
          right: 16px;
          font-size: 0.8rem;
          padding: 10px 16px;
        }
      }

      @media (max-width: 400px) {
        .mw-btns {
          flex-direction: column;
        }
        .mw-btn {
          padding: 10px;
          font-size: 0.82rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================================
  // 6. BUILD WIDGET HTML
  // ============================================================

  function buildWidget() {
    // FAB Button
    const fab = document.createElement('button');
    fab.id = 'mw-fab';
    fab.title = 'तिरहुता ↔ देवनागरी परिवर्तक';
    fab.innerHTML = '𑒧';
    fab.setAttribute('aria-label', 'Open converter');
    fab.onclick = () => {
      document.getElementById('mw-panel').classList.toggle('open');
      document.getElementById('mw-in').focus();
    };

    // Panel
    const panel = document.createElement('div');
    panel.id = 'mw-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Script Converter');
    panel.innerHTML = `
      <div class="mw-head">
        <h3>𑒧 <span>मिथिला लिपि</span> परिवर्तक</h3>
        <button class="mw-x" onclick="document.getElementById('mw-panel').classList.remove('open')" aria-label="Close">✕</button>
      </div>
      <div class="mw-body">
        <div class="mw-row">
          <div>
            <span class="mw-lbl">🔄 दिशा</span>
            <select class="mw-sel" id="mw-dir" onchange="mwConvert()">
              <option value="dev-to-tir">देवनागरी → तिरहुता</option>
              <option value="tir-to-dev">तिरहुता → देवनागरी</option>
            </select>
          </div>
          <div>
            <span class="mw-lbl">🎤 मोड</span>
            <select class="mw-sel" id="mw-mode" onchange="mwUpdateUI()">
              <option value="phonetic">English Phonetic</option>
              <option value="direct">देवनागरी</option>
            </select>
          </div>
        </div>
        <div class="mw-row">
          <div>
            <span class="mw-lbl">🔤 फ़ॉन्ट</span>
            <select class="mw-sel" id="mw-font" onchange="mwApplyFont()">
              <option value="mithilauni">Mithilauni</option>
              <option value="noto">Noto Sans Tirhuta</option>
            </select>
          </div>
          <div>
            <span class="mw-lbl">⚡ स्वचालित</span>
            <select class="mw-sel" id="mw-auto">
              <option value="yes">हाँ</option>
              <option value="no">नहीं</option>
            </select>
          </div>
        </div>
        
        <span class="mw-lbl">📝 इनपुट</span>
        <textarea class="mw-ta" id="mw-in" placeholder="यहाँ लिखें..." oninput="mwHandleInput()"></textarea>
        
        <span class="mw-lbl">📄 आउटपुट</span>
        <textarea class="mw-ta" id="mw-out" placeholder="परिवर्तित पाठ..." readonly></textarea>
        
        <div class="mw-btns">
          <button class="mw-btn mw-bp" onclick="mwConvert()">🔄 परिवर्तित</button>
          <button class="mw-btn mw-bs" onclick="mwCopy()">📋 कॉपी</button>
          <button class="mw-btn mw-bo" onclick="mwClear()">🗑️ साफ़</button>
        </div>
        
        <div class="mw-pg">
          <p>🌐 <strong>पूरे पेज</strong> का पाठ तिरहुता में बदलें</p>
          <select class="mw-sel" id="mw-pgfont" style="margin-bottom:8px;width:100%">
            <option value="mithilauni">Mithilauni Font</option>
            <option value="noto">Noto Sans Tirhuta</option>
          </select>
          <button class="mw-pgbtn" id="mw-pgbtn" onclick="mwConvertPage()">
            🔄 पेज को तिरहुता में बदलें
          </button>
        </div>
      </div>
    `;

    // Toast
    const toast = document.createElement('div');
    toast.id = 'mw-toast';

    document.body.appendChild(fab);
    document.body.appendChild(panel);
    document.body.appendChild(toast);
  }

  // ============================================================
  // 7. WIDGET FUNCTIONS (Exposed globally)
  // ============================================================

  let pageConverted = false;
  let originals = [];

  // Main convert function exposed globally
  window.mwConvert = function () {
    const inp = document.getElementById('mw-in').value;
    const dir = document.getElementById('mw-dir').value;
    const mode = document.getElementById('mw-mode').value;
    const result = convert(inp, dir, mode);
    document.getElementById('mw-out').value = result;
    mwApplyFont();
  };

  // Handle input with auto-convert
  window.mwHandleInput = function () {
    if (document.getElementById('mw-auto').value === 'yes') {
      mwConvert();
    }
  };

  // Update UI based on mode
  window.mwUpdateUI = function () {
    const dir = document.getElementById('mw-dir').value;
    const mode = document.getElementById('mw-mode').value;
    const inp = document.getElementById('mw-in');
    
    if (dir === 'dev-to-tir') {
      if (mode === 'phonetic') {
        inp.placeholder = 'English phonetic type करें... (ka, ma, ra...)';
      } else {
        inp.placeholder = 'देवनागरी में लिखें...';
      }
    } else {
      inp.placeholder = 'तिरहुता पाठ paste करें...';
    }
    mwConvert();
  };

  // Apply font to textareas
  window.mwApplyFont = function () {
    const font = document.getElementById('mw-font').value;
    const dir = document.getElementById('mw-dir').value;
    const out = document.getElementById('mw-out');
    const inp = document.getElementById('mw-in');
    
    out.className = 'mw-ta';
    inp.className = 'mw-ta';
    
    const tirEl = dir === 'dev-to-tir' ? out : inp;
    tirEl.classList.add(font === 'mithilauni' ? 'mw-fm' : 'mw-fn');
  };

  // Copy output text
  window.mwCopy = function () {
    const text = document.getElementById('mw-out').value;
    if (!text) {
      mwToast('⚠️ पहले परिवर्तित करें!', 'error');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      mwToast('✅ कॉपी हो गया!', 'success');
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.getElementById('mw-out');
      ta.select();
      document.execCommand('copy');
      mwToast('✅ कॉपी हो गया!', 'success');
    });
  };

  // Clear all fields
  window.mwClear = function () {
    document.getElementById('mw-in').value = '';
    document.getElementById('mw-out').value = '';
    document.getElementById('mw-in').focus();
  };

  // Convert entire page
  window.mwConvertPage = function () {
    const btn = document.getElementById('mw-pgbtn');
    const font = document.getElementById('mw-pgfont').value;
    const ff = font === 'mithilauni' ? "'Mithilauni','Noto Sans Tirhuta',serif" : "'Noto Sans Tirhuta',serif";

    if (!pageConverted) {
      // Convert page to Tirhuta
      originals = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            // Skip widget elements
            if (node.parentElement && 
                (node.parentElement.closest('#mw-panel') || 
                 node.parentElement.closest('#mw-fab') || 
                 node.parentElement.closest('#mw-toast') ||
                 node.parentElement.closest('script') ||
                 node.parentElement.closest('style'))) {
              return NodeFilter.FILTER_REJECT;
            }
            // Skip empty text
            if (!node.textContent.trim()) {
              return NodeFilter.FILTER_SKIP;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let node;
      while ((node = walker.nextNode())) {
        originals.push({ node: node, orig: node.textContent });
        // Convert Devanagari text to Tirhuta
        const devText = node.textContent;
        let tirText = '';
        for (const char of devText) {
          tirText += D2T[char] || char;
        }
        node.textContent = tirText;
        // Apply font to parent element
        if (node.parentElement) {
          node.parentElement.style.fontFamily = ff;
        }
      }

      btn.textContent = '↩️ मूल पाठ वापस लाएं';
      btn.classList.add('active');
      pageConverted = true;
      mwToast('✅ पेज तिरहुता में बदल गया!', 'success');
      
    } else {
      // Restore original text
      originals.forEach(({ node, orig }) => {
        node.textContent = orig;
        if (node.parentElement) {
          node.parentElement.style.fontFamily = '';
        }
      });
      originals = [];
      btn.textContent = '🔄 पेज को तिरहुता में बदलें';
      btn.classList.remove('active');
      pageConverted = false;
      mwToast('↩️ मूल पाठ वापस आ गया!', 'success');
    }
  };

  // Toast notification
  function mwToast(msg, type = '') {
    const toast = document.getElementById('mw-toast');
    toast.textContent = msg;
    toast.className = 'show ' + type;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // ============================================================
  // 8. INITIALIZATION
  // ============================================================

  function init() {
    injectFonts();
    injectCSS();
    buildWidget();
    
    // Auto-convert on load if input has value
    setTimeout(() => {
      mwConvert();
      mwApplyFont();
    }, 100);
    
    // Close panel on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const panel = document.getElementById('mw-panel');
        if (panel.classList.contains('open')) {
          panel.classList.remove('open');
        }
      }
    });
    
    console.log('𑒧 Mithila Script Converter Widget loaded!');
    console.log('📚 Use: Phonetic typing supported!');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
