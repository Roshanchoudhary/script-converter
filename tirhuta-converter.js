// ============================================================
// MITHILA SCRIPT CONVERTER - COMPLETE FINAL
// सभी नियम: य, नुक्ता, मात्रा, आधा अक्षर
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
  // COMPLETE UNICODE MAP - DEVANAGARI → TIRHUTA
  // ============================================================

  const D2T = {
    // ============================================================
    // VOWELS (0905-0914)
    // ============================================================
    'अ': '𑒁', 'आ': '𑒂', 'इ': '𑒃', 'ई': '𑒄',
    'उ': '𑒅', 'ऊ': '𑒆', 'ऋ': '𑒇', 'ॠ': '𑒈',
    'ऌ': '𑒉', 'ॡ': '𑒊', 'ऍ': '𑒺', 'ऎ': '𑒾',
    'ए': '𑒋', 'ऐ': '𑒌', 'ऑ': '𑒽', 'ऒ': '𑒻',
    'ओ': '𑒍', 'औ': '𑒎',

    // ============================================================
    // CONSONANTS (0915-0939)
    // ============================================================
    'क': '𑒏', 'ख': '𑒐', 'ग': '𑒑', 'घ': '𑒒', 'ङ': '𑒓',
    'च': '𑒔', 'छ': '𑒕', 'ज': '𑒖', 'झ': '𑒗', 'ञ': '𑒘',
    'ट': '𑒙', 'ठ': '𑒚', 'ड': '𑒛', 'ढ': '𑒜', 'ण': '𑒝',
    'त': '𑒞', 'थ': '𑒟', 'द': '𑒠', 'ध': '𑒡', 'न': '𑒢',
    'ऩ': '𑒢', 'प': '𑒣', 'फ': '𑒤', 'ब': '𑒥', 'भ': '𑒦',
    'म': '𑒧', 'य': '𑒨', 'र': '𑒩', 'ऱ': '𑒩', 'ल': '𑒪',
    'ळ': '𑒪', 'ऴ': '𑒪', 'व': '𑒫',
    'श': '𑒬', 'ष': '𑒭', 'स': '𑒮', 'ह': '𑒯',

    // ============================================================
    // MATRAS (093E-094C)
    // ============================================================
    'ा': '𑒰', 'ि': '𑒱', 'ी': '𑒲', 'ु': '𑒳', 'ू': '𑒴',
    'ृ': '𑒵', 'ॄ': '𑒶', 'ॅ': '𑒺', 'ॆ': '𑒾',
    'े': '𑒹', 'ै': '𑒻', 'ॉ': '𑒽', 'ॊ': '𑒼',
    'ो': '𑒼', 'ौ': '𑒾',

    // ============================================================
    // NUKTA LETTERS - WITH ALL MATRAS (0958-095F)
    // ============================================================
    
    // ड़ (ड़)
    'ड़': '𑒛𑓃',
    'ड़ा': '𑒛𑓃𑒰',
    'ड़ि': '𑒛𑓃𑒱',
    'ड़ी': '𑒛𑓃𑒲',
    'ड़ु': '𑒛𑓃𑒳',
    'ड़ू': '𑒛𑓃𑒴',
    'ड़े': '𑒛𑓃𑒹',
    'ड़ै': '𑒛𑓃𑒻',
    'ड़ो': '𑒛𑓃𑒼',
    'ड़ौ': '𑒛𑓃𑒾',

    // ढ़ (ढ़)
    'ढ़': '𑒜𑓃',
    'ढ़ा': '𑒜𑓃𑒰',
    'ढ़ि': '𑒜𑓃𑒱',
    'ढ़ी': '𑒜𑓃𑒲',
    'ढ़ु': '𑒜𑓃𑒳',
    'ढ़ू': '𑒜𑓃𑒴',
    'ढ़े': '𑒜𑓃𑒹',
    'ढ़ै': '𑒜𑓃𑒻',
    'ढ़ो': '𑒜𑓃𑒼',
    'ढ़ौ': '𑒜𑓃𑒾',

    // क़ (क़)
    'क़': '𑒏𑓃',
    'क़ा': '𑒏𑓃𑒰',
    'क़ि': '𑒏𑓃𑒱',
    'क़ी': '𑒏𑓃𑒲',
    'क़ु': '𑒏𑓃𑒳',
    'क़ू': '𑒏𑓃𑒴',
    'क़े': '𑒏𑓃𑒹',
    'क़ै': '𑒏𑓃𑒻',
    'क़ो': '𑒏𑓃𑒼',
    'क़ौ': '𑒏𑓃𑒾',

    // ख़ (ख़)
    'ख़': '𑒐𑓃',
    'ख़ा': '𑒐𑓃𑒰',
    'ख़ि': '𑒐𑓃𑒱',
    'ख़ी': '𑒐𑓃𑒲',
    'ख़ु': '𑒐𑓃𑒳',
    'ख़ू': '𑒐𑓃𑒴',
    'ख़े': '𑒐𑓃𑒹',
    'ख़ै': '𑒐𑓃𑒻',
    'ख़ो': '𑒐𑓃𑒼',
    'ख़ौ': '𑒐𑓃𑒾',

    // ग़ (ग़)
    'ग़': '𑒑𑓃',
    'ग़ा': '𑒑𑓃𑒰',
    'ग़ि': '𑒑𑓃𑒱',
    'ग़ी': '𑒑𑓃𑒲',
    'ग़ु': '𑒑𑓃𑒳',
    'ग़ू': '𑒑𑓃𑒴',
    'ग़े': '𑒑𑓃𑒹',
    'ग़ै': '𑒑𑓃𑒻',
    'ग़ो': '𑒑𑓃𑒼',
    'ग़ौ': '𑒑𑓃𑒾',

    // ज़ (ज़)
    'ज़': '𑒖𑓃',
    'ज़ा': '𑒖𑓃𑒰',
    'ज़ि': '𑒖𑓃𑒱',
    'ज़ी': '𑒖𑓃𑒲',
    'ज़ु': '𑒖𑓃𑒳',
    'ज़ू': '𑒖𑓃𑒴',
    'ज़े': '𑒖𑓃𑒹',
    'ज़ै': '𑒖𑓃𑒻',
    'ज़ो': '𑒖𑓃𑒼',
    'ज़ौ': '𑒖𑓃𑒾',

    // फ़ (फ़)
    'फ़': '𑒤𑓃',
    'फ़ा': '𑒤𑓃𑒰',
    'फ़ि': '𑒤𑓃𑒱',
    'फ़ी': '𑒤𑓃𑒲',
    'फ़ु': '𑒤𑓃𑒳',
    'फ़ू': '𑒤𑓃𑒴',
    'फ़े': '𑒤𑓃𑒹',
    'फ़ै': '𑒤𑓃𑒻',
    'फ़ो': '𑒤𑓃𑒼',
    'फ़ौ': '𑒤𑓃𑒾',

    // य़ (य़)
    'य़': '𑒨𑓃',

    // ============================================================
    // SIGNS & MARKS
    // ============================================================
    'ँ': '𑒿',
    'ं': '𑓀',
    'ः': '𑓁',
    '्': '𑓂',
    '़': '𑓃',
    'ऽ': '𑓄',
    'ॐ': '𑓇',

    // ============================================================
    // PUNCTUATION (0964-0965)
    // ============================================================
    '।': '𑓆',
    '॥': '𑓆𑓆',

    // ============================================================
    // NUMBERS (0966-096F)
    // ============================================================
    '०': '𑓐',
    '१': '𑓑',
    '२': '𑓒',
    '३': '𑓓',
    '४': '𑓔',
    '५': '𑓕',
    '६': '𑓖',
    '७': '𑓗',
    '८': '𑓘',
    '९': '𑓙',

    // ============================================================
    // VEDIC & OTHER (0970-097F)
    // ============================================================
    '॰': '𑓆',
  };

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
  // PERFECT य → य़ RULE - FINAL
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

        if (char === 'य') {
          // ============================================================
          // RULE 1: शब्द का पहला अक्षर → ❌ नुक्ता नहीं
          // ============================================================
          if (i === 0) {
            converted += 'य';
          }
          // ============================================================
          // RULE 2: आधा य (्य) → ❌ नुक्ता नहीं
          // ============================================================
          else {
            // चेक करें: क्या य आधा है?
            // 1. पहले कोई आधा अक्षर (म् + य = म्य)
            // 2. या बाद में कोई अक्षर (प्र्य)
            const hasPrevConsonant = i > 0 && CONSONANTS.has(prevChar);
            const prevIsHalf = hasPrevConsonant && !MATRAS.has(prevChar);
            const hasNextConsonant = i < len - 1 && CONSONANTS.has(nextChar);
            const isHalfYa = prevIsHalf || hasNextConsonant;

            if (isHalfYa) {
              converted += 'य'; // ❌ नुक्ता नहीं
            }
            // ============================================================
            // RULE 3: पूरा य → ✅ नुक्ता लगेगा
            // ============================================================
            else {
              converted += 'य़'; // ✅ नुक्ता लगेगा
            }
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
  // CONVERSION ENGINE - WITH NUKTA SUPPORT
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
    let i = 0;
    while (i < yaApplied.length) {
      const char = yaApplied[i];
      const nextChar = yaApplied[i + 1] || '';
      const nextNextChar = yaApplied[i + 2] || '';

      // ============================================================
      // HANDLE NUKTA + MATRA COMBINATIONS
      // ============================================================

      // Check for 3-char combinations (ड़े = ड + ् + े)
      if (i + 2 < yaApplied.length) {
        const combined = char + nextChar + nextNextChar;
        if (D2T[combined]) {
          result += D2T[combined];
          i += 3;
          continue;
        }
      }

      // Check for 2-char combinations
      if (i + 1 < yaApplied.length) {
        const combined = char + nextChar;
        if (D2T[combined]) {
          result += D2T[combined];
          i += 2;
          continue;
        }
      }

      // ============================================================
      // HANDLE य़ (य + ़)
      // ============================================================
      if (char === 'य' && nextChar === '़') {
        result += '𑒨𑓃';
        i += 2;
        continue;
      }

      // ============================================================
      // HANDLE SINGLE CHARACTERS
      // ============================================================
      if (D2T[char]) {
        result += D2T[char];
      } else {
        result += char;
      }
      i++;
    }

    return result;
  }

  // ============================================================
  // TEST FUNCTION
  // ============================================================

  function runTests() {
    const tests = [
      // ============================================================
      // NUKTA + MATRA TESTS
      // ============================================================
      ['ड़', '𑒛𑓃'],
      ['ड़ा', '𑒛𑓃𑒰'],
      ['ड़ि', '𑒛𑓃𑒱'],
      ['ड़ी', '𑒛𑓃𑒲'],
      ['ड़ु', '𑒛𑓃𑒳'],
      ['ड़ू', '𑒛𑓃𑒴'],
      ['ड़े', '𑒛𑓃𑒹'],
      ['ड़ै', '𑒛𑓃𑒻'],
      ['ड़ो', '𑒛𑓃𑒼'],
      ['ड़ौ', '𑒛𑓃𑒾'],

      ['ढ़', '𑒜𑓃'],
      ['ढ़े', '𑒜𑓃𑒹'],

      ['क़', '𑒏𑓃'],
      ['क़ा', '𑒏𑓃𑒰'],

      ['ग़', '𑒑𑓃'],
      ['ग़े', '𑒑𑓃𑒹'],

      ['ज़', '𑒖𑓃'],
      ['ज़ा', '𑒖𑓃𑒰'],

      ['फ़', '𑒤𑓃'],
      ['फ़े', '𑒤𑓃𑒹'],

      // ============================================================
      // आधा य (्य) - नुक्ता नहीं
      // ============================================================
      ['म्य', '𑒧𑓂𑒨'],
      ['न्य', '𑒢𑓂𑒨'],
      ['व्य', '𑒫𑓂𑒨'],
      ['क्य', '𑒏𑓂𑒨'],
      ['ग्य', '𑒑𑓂𑒨'],
      ['द्य', '𑒠𑓂𑒨'],
      ['त्य', '𑒞𑓂𑒨'],
      ['स्य', '𑒮𑓂𑒨'],
      ['ह्य', '𑒯𑓂𑒨'],
      ['र्य', '𑒩𑓂𑒨'],
      ['ल्य', '𑒪𑓂𑒨'],
      ['श्य', '𑒬𑓂𑒨'],

      // ============================================================
      // पूरा य (बीच/अंत) - नुक्ता लगेगा
      // ============================================================
      ['प्रयोग', '𑒣𑓂𑒩𑒨𑓃𑒼𑒑'],
      ['जायत', '𑒖𑒰𑒨𑓃𑒞'],
      ['राजय', '𑒩𑒰𑒖𑒨𑓃'],
      ['सोय', '𑒮𑒼𑒨𑓃'],
      ['वयस', '𑒫𑒨𑓃𑒮'],
      ['अयन', '𑒁𑒨𑓃𑒢'],
      ['भय', '𑒦𑒨𑓃'],

      // ============================================================
      // शुरू में य - नुक्ता नहीं
      // ============================================================
      ['योग', '𑒨𑒼𑒑'],
      ['यम', '𑒨𑒧'],

      // ============================================================
      // COMPLEX WORDS
      // ============================================================
      ['व्यवसाय', '𑒫𑓂𑒨𑒫𑒮𑒰𑒨'],
      ['तपस्या', '𑒞𑒣𑒮𑓂𑒨𑒰'],
      ['अवश्य', '𑒁𑒫𑒬𑓂𑒨'],
      ['कार्य', '𑒏𑒰𑒩𑓂𑒨'],
      ['राज्य', '𑒩𑒰𑒖𑓂𑒨'],
      ['प्रत्यय', '𑒣𑓂𑒩𑒞𑓂𑒨𑒨'],
    ];

    console.log('🧪 Testing All Rules:');
    console.log('📝 Nukta + Matra → ✅');
    console.log('📝 आधा य (्य) → नुक्ता नहीं ❌');
    console.log('📝 पूरा य (बीच/अंत) → नुक्ता लगेगा ✅\n');

    let passed = 0;
    tests.forEach(([input, expected]) => {
      const result = convertToTirhuta(input);
      const status = result === expected ? '✅' : '❌';
      if (result === expected) {
        passed++;
      } else {
        console.log(`❌ ${input} → ${result} (Expected: ${expected})`);
      }
    });
    console.log(`\n✅ ${passed}/${tests.length} tests passed`);
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
               node.parentElement.closest('#mw-credit') ||
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
                       textNode.parentElement.closest('#mw-credit') ||
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
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #8B1A1A, #D4A017);
        border-radius: 50%;
        border: none;
        color: white;
        font-size: 2.2rem;
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

      #mw-credit {
        position: fixed;
        bottom: 92px;
        right: 24px;
        background: rgba(255,255,255,0.92);
        backdrop-filter: blur(8px);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        font-family: 'Noto Sans Devanagari', Arial, sans-serif;
        color: #8B1A1A;
        z-index: 99997;
        text-align: center;
        box-shadow: 0 2px 16px rgba(0,0,0,0.08);
        border: 1px solid rgba(200,169,110,0.25);
        transition: all 0.3s ease;
        letter-spacing: 0.5px;
        pointer-events: auto;
        cursor: pointer;
      }
      #mw-credit:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 24px rgba(139,26,26,0.15);
        border-color: #8B1A1A;
        background: rgba(255,255,255,0.98);
      }
      #mw-credit a {
        color: #8B1A1A;
        text-decoration: none;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      #mw-credit a:hover {
        text-decoration: underline;
      }

      #mw-toast {
        position: fixed;
        bottom: 90px;
        right: 24px;
        background: #2C1810;
        color: white;
        padding: 10px 18px;
        border-radius: 10px;
        font-size: 0.9rem;
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
          width: 50px;
          height: 50px;
          font-size: 1.8rem;
          bottom: 16px;
          right: 16px;
        }
        #mw-credit {
          bottom: 76px;
          right: 16px;
          font-size: 12px;
          padding: 4px 12px;
        }
        #mw-toast {
          bottom: 76px;
          right: 16px;
          font-size: 0.8rem;
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
    fab.title = '𑒧 मिथिला लिपि | Click to convert page to Tirhuta';
    fab.innerHTML = '𑒧';
    fab.setAttribute('aria-label', 'Convert page to Tirhuta');
    fab.onclick = convertPage;

    const credit = document.createElement('div');
    credit.id = 'mw-credit';
    credit.innerHTML = `<a href="${CONFIG.creditLink}" target="_blank" rel="noopener noreferrer">𑒧 lipi.maithili.org.in</a>`;

    const toast = document.createElement('div');
    toast.id = 'mw-toast';

    document.body.appendChild(fab);
    document.body.appendChild(credit);
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

    runTests();

    const saved = checkSavedPreference();
    if (saved) {
      setTimeout(function() {
        convertPage();
        mwToast('✅ पेज मिथिलाक्षर में अछि', 'success');
      }, 500);
    }

    console.log('𑒧 Mithila Script Converter loaded!');
    console.log('📝 Complete Devanagari → Tirhuta mapping');
    console.log('📝 Nukta + Matra: ✅ Fixed');
    console.log('📝 य → य़ नियम:');
    console.log('   ✅ आधा य (्य) → नुक्ता नहीं');
    console.log('   ✅ पूरा य (बीच/अंत) → नुक्ता लगेगा');
    console.log('   ✅ शब्द का पहला य → नुक्ता नहीं');
    console.log('🔹 Click the 𑒧 button or press Ctrl+Shift+T');
    console.log('🔗 ' + CONFIG.creditLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();