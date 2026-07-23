// ============================================================
// MITHILA SCRIPT CONVERTER - ONLY FAB BUTTON
// सिर्फ Button दिखेगा, Box नहीं
// किसी भी website पर embed करें:
// <script src="YOUR_URL/widget.js"></script>
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // 0. FONT CONFIGURATION
  // ============================================================

  const CONFIG = {
    fontCDN: [
      'https://script-converter.pages.dev/fonts/Mithilauni.ttf',
      'https://raw.githubusercontent.com/Roshanchoudhary/script-converter/main/fonts/Mithilauni.ttf'
    ],
    googleFont: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tirhuta:wght@400;700&display=swap',
    creditLink: 'https://lipi.maithili.org.in/',
    fontFamily: "'Mithilauni','Noto Sans Tirhuta',serif"
  };

  // ============================================================
  // 1. COMPLETE UNICODE MAPS
  // ============================================================

  const T2D = {
    '𑒁': 'अ', '𑒂': 'आ', '𑒃': 'इ', '𑒄': 'ई',
    '𑒅': 'उ', '𑒆': 'ऊ', '𑒇': 'ऋ', '𑒈': 'ॠ',
    '𑒉': 'ऌ', '𑒊': 'ॡ', '𑒋': 'ए', '𑒌': 'ऐ',
    '𑒍': 'ओ', '𑒎': 'औ',
    '𑒏': 'क', '𑒐': 'ख', '𑒑': 'ग', '𑒒': 'घ', '𑒓': 'ङ',
    '𑒔': 'च', '𑒕': 'छ', '𑒖': 'ज', '𑒗': 'झ', '𑒘': 'ञ',
    '𑒙': 'ट', '𑒚': 'ठ', '𑒛': 'ड', '𑒜': 'ढ', '𑒝': 'ण',
    '𑒞': 'त', '𑒟': 'थ', '𑒠': 'द', '𑒡': 'ध', '𑒢': 'न',
    '𑒣': 'प', '𑒤': 'फ', '𑒥': 'ब', '𑒦': 'भ', '𑒧': 'म',
    '𑒨': 'य', '𑒩': 'र', '𑒪': 'ल', '𑒫': 'व',
    '𑒬': 'श', '𑒭': 'ष', '𑒮': 'स', '𑒯': 'ह',
    '𑒰': 'ा', '𑒱': 'ि', '𑒲': 'ी', '𑒳': 'ु', '𑒴': 'ू',
    '𑒵': 'ृ', '𑒶': 'ॄ', '𑒷': 'ॢ', '𑒸': 'ॣ',
    '𑒹': 'े', '𑒺': 'ॅ', '𑒻': 'ै',
    '𑒼': 'ो', '𑒽': 'ॉ', '𑒾': 'ौ',
    '𑒿': 'ँ', '𑓀': 'ं', '𑓁': 'ः', '𑓂': '्',
    '𑓃': '़', '𑓄': 'ऽ', '𑓆': '॰', '𑓇': 'ॐ',
    '𑓐': '०', '𑓑': '१', '𑓒': '२', '𑓓': '३', '𑓔': '४',
    '𑓕': '५', '𑓖': '६', '𑓗': '७', '𑓘': '८', '𑓙': '९',
  };

  const D2T = {};
  for (const [tir, dev] of Object.entries(T2D)) {
    D2T[dev] = tir;
  }

  // ============================================================
  // 2. ROMAN → DEVANAGARI NUMBERS
  // ============================================================

  const ROMAN_TO_DEV = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
  };

  // ============================================================
  // 3. CONVERSION ENGINE
  // ============================================================

  function convertToTirhuta(text) {
    if (!text) return '';
    
    // Step 1: Roman numbers → Devanagari
    let processed = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char >= '0' && char <= '9') {
        processed += ROMAN_TO_DEV[char] || char;
      } else {
        processed += char;
      }
    }
    
    // Step 2: Devanagari → Tirhuta
    let result = '';
    for (let i = 0; i < processed.length; i++) {
      const char = processed[i];
      result += D2T[char] || char;
    }
    return result;
  }

  // ============================================================
  // 4. PAGE CONVERTER
  // ============================================================

  let pageConverted = false;
  let originals = [];

  function convertPage() {
    const btn = document.getElementById('mw-fab');
    
    if (!pageConverted) {
      originals = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.parentElement &&
              (node.parentElement.closest('#mw-fab') ||
               node.parentElement.closest('#mw-toast') ||
               node.parentElement.closest('script') ||
               node.parentElement.closest('style') ||
               node.parentElement.closest('head') ||
               node.parentElement.closest('noscript'))) {
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
        const tirText = convertToTirhuta(devText);
        node.textContent = tirText;
        if (node.parentElement) {
          node.parentElement.style.fontFamily = CONFIG.fontFamily;
        }
      }

      pageConverted = true;
      btn.innerHTML = '↩️';
      btn.title = 'मूल पाठ वापस लाएं';
      btn.style.background = 'linear-gradient(135deg, #2D6A4F, #1B4D3E)';
      mwToast('✅ पेज मिथिलाक्षर में बदल गेल!', 'success');
      
    } else {
      originals.forEach(({ node, orig }) => {
        node.textContent = orig;
        if (node.parentElement) {
          node.parentElement.style.fontFamily = '';
        }
      });
      originals = [];
      pageConverted = false;
      btn.innerHTML = '𑒧';
      btn.title = 'पेज को मिथिलाक्षर में बदलें';
      btn.style.background = 'linear-gradient(135deg, #8B1A1A, #D4A017)';
      mwToast('↩️ मूल पाठ वापस आ गेल!', 'success');
    }
  }

  // ============================================================
  // 5. FONT LOADER
  // ============================================================

  function loadFonts() {
    if (!document.getElementById('mw-google-font')) {
      const link = document.createElement('link');
      link.id = 'mw-google-font';
      link.href = CONFIG.googleFont;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (!document.getElementById('mw-mithilauni-font')) {
      const style = document.createElement('style');
      style.id = 'mw-mithilauni-font';
      const srcUrls = CONFIG.fontCDN.map(url => `url('${url}') format('truetype')`).join(', ');
      style.textContent = `
        @font-face {
          font-family: 'Mithilauni';
          src: ${srcUrls};
          font-display: swap;
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Mithilauni';
          src: ${srcUrls};
          font-display: swap;
          font-weight: 700;
          font-style: normal;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================================
  // 6. WIDGET CSS - Only FAB Button
  // ============================================================

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
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #8B1A1A, #D4A017);
        border-radius: 50%;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(139,26,26,0.4);
        z-index: 99998;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Mithilauni', 'Noto Sans Tirhuta', serif;
        user-select: none;
      }
      #mw-fab:hover {
        transform: scale(1.1) rotate(-5deg);
        box-shadow: 0 8px 30px rgba(139,26,26,0.5);
      }
      #mw-fab:active {
        transform: scale(0.95);
      }

      /* Toast */
      #mw-toast {
        position: fixed;
        bottom: 90px;
        right: 24px;
        background: #2C1810;
        color: white;
        padding: 10px 18px;
        border-radius: 10px;
        font-size: 0.8rem;
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
      #mw-toast.info {
        background: #2B6CB0;
      }

      @media (max-width: 600px) {
        #mw-fab {
          width: 48px;
          height: 48px;
          font-size: 1.2rem;
          bottom: 16px;
          right: 16px;
        }
        #mw-toast {
          bottom: 76px;
          right: 16px;
          font-size: 0.75rem;
          padding: 8px 14px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================================
  // 7. BUILD WIDGET - Only FAB Button
  // ============================================================

  function buildWidget() {
    // FAB Button
    const fab = document.createElement('button');
    fab.id = 'mw-fab';
    fab.title = 'पेज को मिथिलाक्षर में बदलें';
    fab.innerHTML = '𑒧';
    fab.setAttribute('aria-label', 'Convert page to Tirhuta');
    fab.onclick = convertPage;

    // Toast
    const toast = document.createElement('div');
    toast.id = 'mw-toast';

    document.body.appendChild(fab);
    document.body.appendChild(toast);
  }

  // ============================================================
  // 8. TOAST
  // ============================================================

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
  // 9. KEYBOARD SHORTCUT
  // ============================================================

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      convertPage();
    }
  });

  // ============================================================
  // 10. INIT
  // ============================================================

  function init() {
    loadFonts();
    injectCSS();
    buildWidget();
    
    console.log('𑒧 Mithila Script Converter loaded!');
    console.log('🔹 Click the 𑒧 button to convert page to Tirhuta');
    console.log('🔹 Press Ctrl+Shift+T to toggle');
    console.log('🔗 ' + CONFIG.creditLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();