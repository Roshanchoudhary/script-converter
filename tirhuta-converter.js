// ============================================================
// MITHILA SCRIPT CONVERTER - PERFECT य़ RULE
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // CONFIG
  // ============================================================

  const CONFIG = {
    fontCDN: [
      'https://script-converter.pages.dev/fonts/Mithilauni.ttf',
      'https://raw.githubusercontent.com/Roshanchoudhary/script-converter/main/fonts/Mithilauni.ttf'
    ],
    googleFont: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tirhuta:wght@400;700&display=swap',
    creditLink: 'https://lipi.maithili.org.in/',
    fontFamily: "'Mithilauni','Noto Sans Tirhuta',serif",
    storageKey: 'tirhuta-mode'
  };

  // ============================================================
  // UNICODE MAPS
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
  // ROMAN → DEVANAGARI NUMBERS
  // ============================================================

  const ROMAN_TO_DEV = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
  };

  // ============================================================
  // CONSONANTS & MATRAS SET
  // ============================================================

  const CONSONANTS = new Set([
    'क', 'ख', 'ग', 'घ', 'ङ',
    'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण',
    'त', 'थ', 'द', 'ध', 'न',
    'प', 'फ', 'ब', 'भ', 'म',
    'य', 'र', 'ल', 'व',
    'श', 'ष', 'स', 'ह'
  ]);

  const MATRAS = new Set([
    'ा', 'ि', 'ी', 'ु', 'ू',
    'ृ', 'ॄ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः', 'ँ'
  ]);

  // ============================================================
  // PERFECT य → य़ RULE
  // ============================================================

  function applyYaRule(text) {
    if (!text) return '';

    let result = '';
    const words = text.split(/(\s+)/);

    for (const word of words) {
      if (!word.trim() || /^[\s\d]+$/.test(word)) {
        result += word;
        continue;
      }

      let converted = '';
      const chars = word.split('');
      const len = chars.length;

      for (let i = 0; i < len; i++) {
        const char = chars[i];
        const nextChar = chars[i + 1] || '';
        const prevChar = chars[i - 1] || '';
        const nextNextChar = chars[i + 2] || '';

        if (char === 'य') {
          // ============================================================
          // STEP 1: क्या य आधा है? (्य)
          // ============================================================
          
          // CASE A: पहले consonant है और बाद में कोई vowel/matra नहीं है
          // उदाहरण: व्य, क्य, ग्य, द्य, त्य, न्य, म्य, स्य, ह्य, र्य, ल्य
          const hasPrevConsonant = i > 0 && CONSONANTS.has(prevChar);
          const hasNextMatra = MATRAS.has(nextChar);
          const hasNextConsonant = i < len - 1 && CONSONANTS.has(nextChar);
          
          // आधा य् - पहले consonant और बाद में matra नहीं
          const isHalfYaWithPrev = hasPrevConsonant && !hasNextMatra && !hasNextConsonant;
          
          // CASE B: बाद में consonant है (प्र्य, ब्र्य)
          const isHalfYaWithNext = i < len - 1 && CONSONANTS.has(nextChar);
          
          const isHalfYa = isHalfYaWithPrev || isHalfYaWithNext;

          // ============================================================
          // STEP 2: नियम लागू करें
          // ============================================================
          
          // RULE 1: शब्द के अंत में य → हमेशा य़ (चाहे कुछ भी हो)
          if (i === len - 1) {
            converted += 'य़';
          }
          // RULE 2: शब्द के बीच में पूरा य → य़
          else if (i > 0 && i < len - 1 && !isHalfYa) {
            converted += 'य़';
          }
          // RULE 3: आधा य् (्य) → य (नुक्ता नहीं)
          else if (isHalfYa) {
            converted += 'य';
          }
          // RULE 4: शब्द के शुरू में य → य
          else if (i === 0) {
            converted += 'य';
          }
          // Default
          else {
            converted += 'य';
          }
        } else {
          converted += char;
        }
      }

      result += converted;
    }

    return result;
  }

  // ============================================================
  // CONVERSION ENGINE
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
    
    // Step 2: Apply य → य़ rule
    const yaApplied = applyYaRule(processed);
    
    // Step 3: Devanagari → Tirhuta
    let result = '';
    for (let i = 0; i < yaApplied.length; i++) {
      const char = yaApplied[i];
      // Handle य़ (य + ़)
      if (char === 'य' && yaApplied[i+1] === '़') {
        result += '𑒨𑓃'; // य़ in Tirhuta
        i++; // Skip ़
      } else {
        result += D2T[char] || char;
      }
    }
    return result;
  }

  // ============================================================
  // TEST FUNCTION
  // ============================================================

  function runTests() {
    const tests = [
      // आधा य् (्य) - नुक्ता नहीं लगेगा
      ['व्यवसाय', 'व्यवसाय', '𑒫𑓂𑒨𑒫𑒮𑒰𑒨'],
      ['क्या', 'क्या', '𑒏𑓂𑒨𑒰'],
      ['ज्ञान', 'ज्ञान', '𑒖𑓂𑒨𑒰𑒢'],
      ['राज्य', 'राज्य', '𑒩𑒰𑒖𑓂𑒨'],
      ['कार्य', 'कार्य', '𑒏𑒰𑒩𑓂𑒨'],
      ['प्रत्यय', 'प्रत्यय', '𑒣𑓂𑒩𑒞𑓂𑒨𑒨'],
      ['व्यय', 'व्यय', '𑒫𑓂𑒨𑒨'],
      
      // अंत में पूरा य - नुक्ता लगेगा
      ['राजय', 'राजय़', '𑒩𑒰𑒖𑒨𑓃'],
      ['सोय', 'सोय़', '𑒮𑒼𑒨𑓃'],
      ['भय', 'भय़', '𑒦𑒨𑓃'],
      ['जय', 'जय़', '𑒖𑒨𑓃'],
      ['नय', 'नय़', '𑒢𑒨𑓃'],
      ['रय', 'रय़', '𑒩𑒨𑓃'],
      ['लय', 'लय़', '𑒪𑒨𑓃'],
      ['क्षय', 'क्षय़', '𑒏𑓂𑒭𑒨𑓃'],
      
      // बीच में पूरा य - नुक्ता लगेगा
      ['प्रयोग', 'प्रय़ोग', '𑒣𑓂𑒩𑒨𑓃𑒼𑒑'],
      ['वयस', 'वय़स', '𑒫𑒨𑓃𑒮'],
      ['अयन', 'अय़न', '𑒁𑒨𑓃𑒢'],
      ['अयोध्या', 'अय़ोध्या', '𑒁𑒨𑓃𑒼𑒡𑓂𑒨𑒰'],
      ['प्रयत्न', 'प्रय़त्न', '𑒣𑓂𑒩𑒨𑓃𑒞𑓂𑒢'],
      
      // शुरू में य - नुक्ता नहीं
      ['योग', 'योग', '𑒨𑒼𑒑'],
      ['यम', 'यम', '𑒨𑒧'],
      ['युद्ध', 'युद्ध', '𑒨𑒳𑒠𑓂𑒡'],
      ['युग', 'युग', '𑒨𑒳𑒑'],
      
      // Complex cases
      ['महाय', 'महाय़', '𑒧𑒯𑒰𑒨𑓃'],
      ['विजय', 'विजय़', '𑒫𑒱𑒖𑒨𑓃'],
      ['सदय', 'सदय़', '𑒮𑒠𑒨𑓃'],
      ['निरय', 'निरय़', '𑒢𑒱𑒩𑒨𑓃'],
    ];
    
    console.log('🧪 Testing य → य़ Rule:');
    console.log('📝 आधा य् (्य) → नुक्ता नहीं ❌');
    console.log('📝 पूरा य (बीच/अंत) → नुक्ता लगेगा ✅\n');
    
    let passed = 0;
    let failed = 0;
    
    tests.forEach(([input, expectedDev, expectedTir]) => {
      const afterDev = applyYaRule(input);
      const afterTir = convertToTirhuta(input);
      const devStatus = afterDev === expectedDev ? '✅' : '❌';
      const tirStatus = afterTir === expectedTir ? '✅' : '❌';
      
      if (devStatus === '✅' && tirStatus === '✅') {
        passed++;
      } else {
        failed++;
        console.log(`❌ ${input} → Dev: ${afterDev} ${devStatus}, Tir: ${afterTir} ${tirStatus}`);
        console.log(`   Expected Dev: ${expectedDev}, Tir: ${expectedTir}`);
      }
    });
    
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${tests.length}`);
    if (failed === 0) {
      console.log('🎉 सभी टेस्ट पास!');
    }
  }

  // ============================================================
  // PAGE CONVERTER
  // ============================================================

  let pageConverted = false;
  let originals = [];
  let observer = null;

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
      
      try {
        localStorage.setItem(CONFIG.storageKey, 'tirhuta');
      } catch(e) {}
      
      btn.innerHTML = '↩️';
      btn.title = 'मूल पाठ वापस लाएं';
      btn.style.background = 'linear-gradient(135deg, #2D6A4F, #1B4D3E)';
      mwToast('✅ पेज मिथिलाक्षर में बदल गेल!', 'success');
      
      startObserver();
      
    } else {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      
      originals.forEach(({ node, orig }) => {
        node.textContent = orig;
        if (node.parentElement) {
          node.parentElement.style.fontFamily = '';
        }
      });
      originals = [];
      pageConverted = false;
      
      try {
        localStorage.setItem(CONFIG.storageKey, 'devanagari');
      } catch(e) {}
      
      btn.innerHTML = '𑒧';
      btn.title = 'पेज को मिथिलाक्षर में बदलें';
      btn.style.background = 'linear-gradient(135deg, #8B1A1A, #D4A017)';
      mwToast('↩️ मूल पाठ वापस आ गेल!', 'success');
    }
  }

  // ============================================================
  // OBSERVER
  // ============================================================

  function startObserver() {
    if (observer) {
      observer.disconnect();
    }
    
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              const original = node.textContent;
              const converted = convertToTirhuta(original);
              if (original !== converted) {
                originals.push({ node, orig: original });
                node.textContent = converted;
                if (node.parentElement) {
                  node.parentElement.style.fontFamily = CONFIG.fontFamily;
                }
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const walker = document.createTreeWalker(
                node,
                NodeFilter.SHOW_TEXT,
                {
                  acceptNode: function(textNode) {
                    if (textNode.parentElement &&
                      (textNode.parentElement.closest('#mw-fab') ||
                       textNode.parentElement.closest('#mw-toast') ||
                       textNode.parentElement.closest('script') ||
                       textNode.parentElement.closest('style') ||
                       textNode.parentElement.closest('head') ||
                       textNode.parentElement.closest('noscript'))) {
                      return NodeFilter.FILTER_REJECT;
                    }
                    if (!textNode.textContent.trim()) return NodeFilter.FILTER_SKIP;
                    return NodeFilter.FILTER_ACCEPT;
                  }
                }
              );
              
              let textNode;
              while ((textNode = walker.nextNode())) {
                const original = textNode.textContent;
                const converted = convertToTirhuta(original);
                if (original !== converted) {
                  originals.push({ node: textNode, orig: original });
                  textNode.textContent = converted;
                  if (textNode.parentElement) {
                    textNode.parentElement.style.fontFamily = CONFIG.fontFamily;
                  }
                }
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // ============================================================
  // CHECK SAVED PREFERENCE
  // ============================================================

  function checkSavedPreference() {
    try {
      const saved = localStorage.getItem(CONFIG.storageKey);
      if (saved === 'tirhuta') {
        return true;
      }
    } catch(e) {}
    return false;
  }

  // ============================================================
  // FONT LOADER
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
  // WIDGET CSS
  // ============================================================

  function injectCSS() {
    if (document.getElementById('mw-css')) return;
    const style = document.createElement('style');
    style.id = 'mw-css';
    style.textContent = `
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
  // BUILD WIDGET
  // ============================================================

  function buildWidget() {
    const fab = document.createElement('button');
    fab.id = 'mw-fab';
    fab.title = 'पेज को मिथिलाक्षर में बदलें';
    fab.innerHTML = '𑒧';
    fab.setAttribute('aria-label', 'Convert page to Tirhuta');
    fab.onclick = convertPage;

    const toast = document.createElement('div');
    toast.id = 'mw-toast';

    document.body.appendChild(fab);
    document.body.appendChild(toast);
  }

  // ============================================================
  // TOAST
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
  // KEYBOARD SHORTCUT
  // ============================================================

  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 't' || e.key === 'T')) {
      e.preventDefault();
      convertPage();
    }
  });

  // ============================================================
  // INIT
  // ============================================================

  function init() {
    loadFonts();
    injectCSS();
    buildWidget();
    
    // Run tests
    runTests();
    
    const saved = checkSavedPreference();
    if (saved) {
      setTimeout(function() {
        convertPage();
        mwToast('✅ पेज मिथिलाक्षर में अछि', 'success');
      }, 500);
    }
    
    console.log('𑒧 Mithila Script Converter loaded!');
    console.log('📝 य → य़ नियम:');
    console.log('   ✅ आधा य् (्य) → नुक्ता नहीं');
    console.log('   ✅ पूरा य (बीच/अंत) → नुक्ता लगेगा');
    console.log('🔹 Click the 𑒧 button or press Ctrl+Shift+T');
    console.log('🔗 ' + CONFIG.creditLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
 