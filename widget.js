// ============================================================
// Mithila Script Converter Widget - COMPLETE CORRECT VERSION
// किसी भी website पर embed करें:
// <script src="YOUR_URL/widget.js"></script>
// ============================================================

(function () {
  'use strict';

  const CDN = 'https://script-converter.pages.dev/fonts/';

  // ============================================================
  // 1. COMPLETE UNICODE MAPS (CORRECT)
  // ============================================================

  // Tirhuta → Devanagari
  const T2D = {
    // Vowels (ALL 14)
    '𑒁': 'अ', '𑒂': 'आ', '𑒃': 'इ', '𑒄': 'ई',
    '𑒅': 'उ', '𑒆': 'ऊ', '𑒇': 'ऋ', '𑒈': 'ॠ',
    '𑒉': 'ऌ', '𑒊': 'ॡ', '𑒋': 'ए', '𑒌': 'ऐ',
    '𑒍': 'ओ', '𑒎': 'औ',
    
    // Consonants (CORRECT)
    '𑒏': 'क', '𑒐': 'ख', '𑒑': 'ग', '𑒒': 'घ', '𑒓': 'ङ',
    '𑒔': 'च', '𑒕': 'छ', '𑒖': 'ज', '𑒗': 'झ', '𑒘': 'ञ',
    '𑒙': 'ट', '𑒚': 'ठ', '𑒛': 'ड', '𑒜': 'ढ', '𑒝': 'ण',
    '𑒞': 'त', '𑒟': 'थ', '𑒠': 'द', '𑒡': 'ध', '𑒢': 'न',
    '𑒣': 'प', '𑒤': 'फ', '𑒥': 'ब', '𑒦': 'भ', '𑒧': 'म',
    '𑒨': 'य', '𑒩': 'र', '𑒪': 'ल', '𑒫': 'व',
    '𑒬': 'श', '𑒭': 'ष', '𑒮': 'स', '𑒯': 'ह',
    
    // Matras (Vowel signs)
   '𑒰': 'ा',   // AA
    '𑒱': 'ि',   // I
    '𑒲': 'ी',   // II
    '𑒳': 'ु',   // U
    '𑒴': 'ू',   // UU
    '𑒵': 'ृ',   // Vocalic R
    '𑒶': 'ॄ',   // Vocalic RR
    '𑒷': 'ॢ',   // Vocalic L
    '𑒸': 'ॣ',   // Vocalic LL
    '𑒹': 'े',   // E
    '𑒺': 'ॅ',   // Short E (यदि उपयोग करना चाहें)
    '𑒻': 'ै',   // AI
    '𑒼': 'ो',   // O
    '𑒽': 'ॉ',   // Short O (यदि उपयोग करना चाहें)
    '𑒾': 'ौ',    // AU
    
'𑒿':'्',
'𑓀':'ं',
'𑓁':'ः',
'𑓂':'ँ',
  
    // Special
    
    // Numbers
    '𑓐': '०', '𑓑': '१', '𑓒': '२', '𑓓': '३', '𑓔': '४',
    '𑓕': '५', '𑓖': '६', '𑓗': '७', '𑓘': '८', '𑓙': '९',
  };

  // Devanagari → Tirhuta (Reverse)
  const D2T = {};
  for (const [tir, dev] of Object.entries(T2D)) {
    D2T[dev] = tir;
  }

  // ============================================================
  // 2. PHONETIC RULES (English → Devanagari)
  // ============================================================

const PHONETIC_RULES = [

  // Special Conjuncts
  ['ksh','क्ष'],
  ['shr','श्र'],
  ['gya','ज्ञ'],
  ['gy','ज्ञ'],
  ['tr','त्र'],

  // Long vowels
  ['aa','आ'],
  ['ii','ई'],
  ['uu','ऊ'],
  ['ai','ऐ'],
  ['au','औ'],

  // Short vowels
  ['a','अ'],
  ['i','इ'],
  ['u','उ'],
  ['e','ए'],
  ['o','ओ'],

  // Aspirated
  ['kh','ख'],
  ['gh','घ'],
  ['chh','छ'],
  ['jh','झ'],
  ['th','थ'],
  ['dh','ध'],
  ['ph','फ'],
  ['bh','भ'],

  // Retroflex
  ['Th','ठ'],
  ['Dh','ढ'],
  ['T','ट'],
  ['D','ड'],
  ['N','ण'],

  // Consonants
  ['k','क'],
  ['g','ग'],
  ['ch','च'],
  ['j','ज'],
  ['t','त'],
  ['d','द'],
  ['p','प'],
  ['b','ब'],
  ['m','म'],
  ['n','न'],
  ['y','य'],
  ['r','र'],
  ['l','ल'],
  ['v','व'],
  ['w','व'],
  ['sh','श'],
  ['S','ष'],
  ['s','स'],
  ['h','ह'],

  // Signs
  ['M','ं'],
  ['H','ः'],
  ['~','ँ']
];

  // Sort by length (longest first)
  const SORTED_RULES = [...PHONETIC_RULES].sort((a, b) => b[0].length - a[0].length);

  // ============================================================
  // 3. CONVERSION ENGINE
  // ============================================================

  // Matra map (vowel → matra)
  const MATRA_MAP = {
    'आ':'ा',
'इ':'ि',
'ई':'ी',
'उ':'ु',
'ऊ':'ू',
'ऋ':'ृ',
'ॠ':'ॄ',
'ऌ':'ॢ',
'ॡ':'ॣ',
'ए':'े',
'ऐ':'ै',
'ओ':'ो',
'औ':'ौ'
  };
  const VOWELS = new Set([
'अ','आ','इ','ई','उ','ऊ',
'ऋ','ॠ','ऌ','ॡ',
'ए','ऐ','ओ','औ'
]);
  const MATRAS = new Set([
'ा','ि','ी','ु','ू',
'ृ','ॄ','ॢ','ॣ',
'े','ै','ो','ौ'
]);

  // Phonetic → Devanagari
  function phoneticToDevanagari(text) {
    if (!text) return '';
    
    let result = '';
    let i = 0;
    const input = text;
    
    while (i < input.length) {
      let matched = false;
      
      for (const [pattern, replacement] of SORTED_RULES) {
        if (i + pattern.length <= input.length && 
            input.substring(i, i + pattern.length).toLowerCase() === pattern.toLowerCase()) {
          
          const isVowel = VOWELS.has(replacement);
          const lastChar = result[result.length - 1] || '';
          const isConsonant = /[क-ह]/.test(lastChar) && !MATRAS.has(lastChar);
          
          if (isVowel && isConsonant) {
            const matra = MATRA_MAP[replacement];
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
      
      if (!matched) {
        result += input[i];
        i++;
      }
    }
    
    return result;
  }

  // Devanagari → Tirhuta
  function devanagariToTirhuta(text) {
    if (!text) return '';
    let result = '';
    for (const char of text) {
      result += D2T[char] || char;
    }
    return result;
  }

  // Tirhuta → Devanagari
  function tirhutaToDevanagari(text) {
    if (!text) return '';
    let result = '';
    for (const char of text) {
      result += T2D[char] || char;
    }
    return result;
  }

  // ============================================================
  // 4. MAIN CONVERT FUNCTION
  // ============================================================

  function convert(text, direction) {
    if (!text || text.trim() === '') return '';
    
    if (direction === 'dev-to-tir') {
      let devText;

if (/[a-z]/i.test(text)) {
    devText = phoneticToDevanagari(text);
} else {
    devText = text;
}
      return devanagariToTirhuta(devText);
    } else {
      return tirhutaToDevanagari(text);
    }
  }

  // ============================================================
  // 5. WIDGET STYLES
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
        width: 420px;
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
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
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

      /* Phonetic Rules inside widget */
      .mw-rules {
        background: #FFF8E7;
        border: 1px solid #C8A96E;
        border-radius: 8px;
        padding: 10px 12px;
        margin-top: 10px;
        font-size: 0.7rem;
        line-height: 1.6;
        max-height: 100px;
        overflow-y: auto;
      }
      .mw-rules h4 {
        color: #8B1A1A;
        font-size: 0.7rem;
        margin-bottom: 4px;
      }
      .mw-rules .rule-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
        gap: 2px 8px;
      }
      .mw-rules code {
        background: #2C1810;
        color: #D4A017;
        padding: 0 4px;
        border-radius: 2px;
        font-size: 0.65rem;
        font-family: 'Courier New', monospace;
      }
      .mw-rules .rule-item {
        display: flex;
        align-items: center;
        gap: 2px;
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
        .mw-rules .rule-grid {
          grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
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
            <span class="mw-lbl">🔤 फ़ॉन्ट</span>
            <select class="mw-sel" id="mw-font" onchange="mwApplyFont()">
              <option value="mithilauni">Mithilauni</option>
              <option value="noto">Noto Sans Tirhuta</option>
            </select>
          </div>
        </div>
        <div class="mw-row">
          <div>
            <span class="mw-lbl">⚡ स्वचालित</span>
            <select class="mw-sel" id="mw-auto">
              <option value="yes">हाँ</option>
              <option value="no">नहीं</option>
            </select>
          </div>
          <div>
            <span class="mw-lbl">📋</span>
            <button class="mw-btn mw-bs" onclick="mwCopy()" style="width:100%;padding:8px;">📋 कॉपी</button>
          </div>
        </div>
        
        <span class="mw-lbl">📝 इनपुट</span>
        <textarea class="mw-ta" id="mw-in" placeholder="English phonetic type करें... (maithilii)" oninput="mwHandleInput()"></textarea>
        
        <span class="mw-lbl">📄 आउटपुट</span>
        <textarea class="mw-ta" id="mw-out" placeholder="परिवर्तित पाठ..." readonly></textarea>
        
        <div class="mw-btns">
          <button class="mw-btn mw-bp" onclick="mwConvert()">🔄 परिवर्तित</button>
          <button class="mw-btn mw-bo" onclick="mwClear()">🗑️ साफ़</button>
        </div>

        <!-- Phonetic Rules - NICHE -->
        <div class="mw-rules">
          <h4>⌨️ Phonetic Rules (English → देवनागरी → तिरहुता)</h4>
          <div class="rule-grid">
            <div class="rule-item"><code>a</code> अ</div>
            <div class="rule-item"><code>aa/A</code> आ</div>
            <div class="rule-item"><code>i</code> इ</div>
            <div class="rule-item"><code>ii/I</code> ई</div>
            <div class="rule-item"><code>u</code> उ</div>
            <div class="rule-item"><code>uu/U</code> ऊ</div>
            <div class="rule-item"><code>e</code> ए</div>
            <div class="rule-item"><code>ai</code> ऐ</div>
            <div class="rule-item"><code>o</code> ओ</div>
            <div class="rule-item"><code>au</code> औ</div>
            <div class="rule-item"><code>k</code> क</div>
            <div class="rule-item"><code>kh</code> ख</div>
            <div class="rule-item"><code>g</code> ग</div>
            <div class="rule-item"><code>gh</code> घ</div>
            <div class="rule-item"><code>ch</code> च</div>
            <div class="rule-item"><code>chh</code> छ</div>
            <div class="rule-item"><code>j</code> ज</div>
            <div class="rule-item"><code>jh</code> झ</div>
            <div class="rule-item"><code>T</code> ट</div>
            <div class="rule-item"><code>Th</code> ठ</div>
            <div class="rule-item"><code>D</code> ड</div>
            <div class="rule-item"><code>Dh</code> ढ</div>
            <div class="rule-item"><code>N</code> ण</div>
            <div class="rule-item"><code>t</code> त</div>
            <div class="rule-item"><code>th</code> थ</div>
            <div class="rule-item"><code>d</code> द</div>
            <div class="rule-item"><code>dh</code> ध</div>
            <div class="rule-item"><code>n</code> न</div>
            <div class="rule-item"><code>p</code> प</div>
            <div class="rule-item"><code>ph</code> फ</div>
            <div class="rule-item"><code>b</code> ब</div>
            <div class="rule-item"><code>bh</code> भ</div>
            <div class="rule-item"><code>m</code> म</div>
            <div class="rule-item"><code>y</code> य</div>
            <div class="rule-item"><code>r</code> र</div>
            <div class="rule-item"><code>l</code> ल</div>
            <div class="rule-item"><code>v/w</code> व</div>
            <div class="rule-item"><code>sh/S</code> श</div>
            <div class="rule-item"><code>s</code> स</div>
            <div class="rule-item"><code>h</code> ह</div>
            <div class="rule-item"><code>M</code> ं</div>
            <div class="rule-item"><code>H</code> ः</div>
            <div class="rule-item"><code>.</code> ्</div>
          </div>
          <div style="margin-top:4px;font-size:0.65rem;color:#8B7355;">
            💡 <code>maithilii</code> → 𑒧𑒸𑒟𑒱𑒪𑒲
          </div>
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
  // 7. WIDGET FUNCTIONS
  // ============================================================

  let pageConverted = false;
  let originals = [];

  window.mwConvert = function () {
    const inp = document.getElementById('mw-in').value;
    const dir = document.getElementById('mw-dir').value;
    const result = convert(inp, dir);
    document.getElementById('mw-out').value = result;
    mwApplyFont();
  };

  window.mwHandleInput = function () {
    if (document.getElementById('mw-auto').value === 'yes') {
      mwConvert();
    }
  };

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

  window.mwCopy = function () {
    const text = document.getElementById('mw-out').value;
    if (!text) { mwToast('⚠️ पहले परिवर्तित करें!', 'error'); return; }
    navigator.clipboard.writeText(text).then(() => {
      mwToast('✅ कॉपी हो गया!', 'success');
    }).catch(() => {
      const ta = document.getElementById('mw-out');
      ta.select();
      document.execCommand('copy');
      mwToast('✅ कॉपी हो गया!', 'success');
    });
  };

  window.mwClear = function () {
    document.getElementById('mw-in').value = '';
    document.getElementById('mw-out').value = '';
    document.getElementById('mw-in').focus();
  };

  window.mwConvertPage = function () {
    const btn = document.getElementById('mw-pgbtn');
    const font = document.getElementById('mw-pgfont').value;
    const ff = font === 'mithilauni' ? "'Mithilauni','Noto Sans Tirhuta',serif" : "'Noto Sans Tirhuta',serif";

    if (!pageConverted) {
      originals = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.parentElement && 
                (node.parentElement.closest('#mw-panel') || 
                 node.parentElement.closest('#mw-fab') || 
                 node.parentElement.closest('#mw-toast') ||
                 node.parentElement.closest('script') ||
                 node.parentElement.closest('style'))) {
              return NodeFilter.FILTER_REJECT;
            }
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
        const devText = node.textContent;
        let tirText = '';
        for (const char of devText) {
          tirText += D2T[char] || char;
        }
        node.textContent = tirText;
        if (node.parentElement) {
          node.parentElement.style.fontFamily = ff;
        }
      }

      btn.textContent = '↩️ मूल पाठ वापस लाएं';
      btn.classList.add('active');
      pageConverted = true;
      mwToast('✅ पेज तिरहुता में बदल गया!', 'success');
      
    } else {
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
  // 8. INIT
  // ============================================================

  function init() {
    injectFonts();
    injectCSS();
    buildWidget();
    
    setTimeout(() => {
      mwConvert();
      mwApplyFont();
    }, 100);
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const panel = document.getElementById('mw-panel');
        if (panel.classList.contains('open')) {
          panel.classList.remove('open');
        }
      }
    });
    
    console.log('𑒧 Mithila Script Converter Widget loaded!');
    console.log('📚 Type "maithilii" → 𑒧𑒸𑒟𑒱𑒪𑒲');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
