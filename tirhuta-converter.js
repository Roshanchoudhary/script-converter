// ============================================================
// UNIVERSAL PAGE CONVERTER - WITH य → य़ RULE (FIXED)
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // COMPLETE UNICODE MAP
  // ============================================================

  const D2T = {
    'अ':'𑒁','आ':'𑒂','इ':'𑒃','ई':'𑒄',
    'उ':'𑒅','ऊ':'𑒆','ऋ':'𑒇','ॠ':'𑒈',
    'ऌ':'𑒉','ॡ':'𑒊','ए':'𑒋','ऐ':'𑒌',
    'ओ':'𑒍','औ':'𑒎',
    'क':'𑒏','ख':'𑒐','ग':'𑒑','घ':'𑒒','ङ':'𑒓',
    'च':'𑒔','छ':'𑒕','ज':'𑒖','झ':'𑒗','ञ':'𑒘',
    'ट':'𑒙','ठ':'𑒚','ड':'𑒛','ढ':'𑒜','ण':'𑒝',
    'त':'𑒞','थ':'𑒟','द':'𑒠','ध':'𑒡','न':'𑒢',
    'प':'𑒣','फ':'𑒤','ब':'𑒥','भ':'𑒦','म':'𑒧',
    'य':'𑒨','र':'𑒩','ल':'𑒪','व':'𑒫',
    'श':'𑒬','ष':'𑒭','स':'𑒮','ह':'𑒯',
    'ा':'𑒰','ि':'𑒱','ी':'𑒲','ु':'𑒳','ू':'𑒴',
    'ृ':'𑒵','ॄ':'𑒶','ॢ':'𑒷','ॣ':'𑒸',
    'े':'𑒹','ॅ':'𑒺','ै':'𑒻',
    'ो':'𑒼','ॉ':'𑒽','ौ':'𑒾',
    'ँ':'𑒿','ं':'𑓀','ः':'𑓁','्':'𑓂',
    '़':'𑓃','ऽ':'𑓄','॰':'𑓆','ॐ':'𑓇',
    '०':'𑓐','१':'𑓑','२':'𑓒','३':'𑓓','४':'𑓔',
    '५':'𑓕','६':'𑓖','७':'𑓗','८':'𑓘','९':'𑓙'
  };

  // ============================================================
  // य → य़ RULE (CORRECTED)
  // ============================================================

  function applyYaRule(text) {
    if (!text) return '';
    
    const words = text.split(/(\s+)/);
    const result = [];
    
    for (const word of words) {
      if (!word.trim() || /^[\s\d]+$/.test(word)) {
        result.push(word);
        continue;
      }
      
      if (!word.includes('य')) {
        result.push(word);
        continue;
      }
      
      let converted = '';
      const chars = word.split('');
      
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const nextChar = chars[i + 1] || '';
        
        if (char === 'य') {
          // RULE: य at the END of word → य़ ✅
          if (i === chars.length - 1) {
            converted += 'य़';
          }
          // RULE: य at the BEGINNING of word → य (keep as is)
          else if (i === 0) {
            // Check if followed by vowel matra
            if (['ा','ि','ी','ु','ू','े','ै','ो','ौ','ं','ः','ँ'].includes(nextChar)) {
              converted += char;
            } else {
              converted += 'य़';
            }
          }
          // RULE: य in MIDDLE → check for special conjuncts
          else {
            // Special conjuncts where य stays य
            // व्य (vy), क्य (ky), ग्य (gy), प्र्य (pry), etc.
            const prev = chars[i - 1] || '';
            const next = chars[i + 1] || '';
            
            // Check if part of special conjunct (व्य, क्य, ग्य, प्र्य, ब्र्य, द्य, त्य, न्य, म्य, स्य, ह्य, र्य, ल्य)
            const specialConjuncts = ['व्य', 'क्य', 'ग्य', 'प्र्य', 'ब्र्य', 'द्य', 'त्य', 'न्य', 'म्य', 'स्य', 'ह्य', 'र्य', 'ल्य'];
            const isSpecial = specialConjuncts.some(conj => word.includes(conj));
            
            if (isSpecial) {
              // Keep as य (व्यवसाय का व्य, क्या का क्य, ज्ञान का ग्य)
              converted += char;
            } else {
              // य in middle → य़
              converted += 'य़';
            }
          }
        } else {
          converted += char;
        }
      }
      
      result.push(converted);
    }
    
    return result.join('');
  }

  // ============================================================
  // CONVERT TO TIRHUTA
  // ============================================================

  function convertToTirhuta(text) {
    if (!text) return '';
    
    // Step 1: Apply य → य़ rule
    const yaApplied = applyYaRule(text);
    
    // Step 2: Convert Devanagari → Tirhuta
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
  // TEST - व्यवसाय → व्यवसाय़ → 𑒫𑓂𑒨𑒫𑒮𑒰𑒨𑓃
  // ============================================================

  console.log('🧪 Testing य → य़ Rule:');
  const testWords = ['व्यवसाय', 'राजय', 'सोय', 'प्रयोग', 'वयस', 'क्या', 'ज्ञान', 'योग'];
  testWords.forEach(word => {
    const after = applyYaRule(word);
    const tir = convertToTirhuta(word);
    console.log(`${word} → ${after} → ${tir}`);
  });

  // ============================================================
  // STATE
  // ============================================================

  let isConverted = false;
  let savedNodes = [];
  let selectedFont = 'mithilauni';

  // ============================================================
  // FONT LOADER
  // ============================================================

  function loadFonts() {
    if (document.getElementById('uc-font-style')) return;
    const style = document.createElement('style');
    style.id = 'uc-font-style';
    style.textContent = `
      @font-face {
        font-family: 'Mithilauni';
        src: url('https://script-converter.pages.dev/fonts/Mithilauni.ttf') format('truetype');
        font-display: swap;
      }
      @font-face {
        font-family: 'Mithilauni';
        src: url('https://raw.githubusercontent.com/Roshanchoudhary/script-converter/main/fonts/Mithilauni.ttf') format('truetype');
        font-display: swap;
      }
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tirhuta:wght@400;700&display=swap');
    `;
    document.head.appendChild(style);
  }

  // ============================================================
  // GET FONT FAMILY
  // ============================================================

  function getFontFamily() {
    return selectedFont === 'mithilauni' 
      ? "'Mithilauni','Noto Sans Tirhuta',serif" 
      : "'Noto Sans Tirhuta',serif";
  }

  // ============================================================
  // CONVERT / REVERT PAGE
  // ============================================================

  function convertPage() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (node.parentElement &&
            (node.parentElement.closest('#uc-converter') ||
             node.parentElement.closest('script') ||
             node.parentElement.closest('style') ||
             node.parentElement.closest('head') ||
             node.parentElement.closest('noscript'))) {
            return NodeFilter.FILTER_REJECT;
          }
          if (!node.textContent.trim()) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      const original = node.textContent;
      const converted = convertToTirhuta(original);
      if (original !== converted) {
        savedNodes.push({ node, original });
        node.textContent = converted;
        if (node.parentElement) {
          node.parentElement.style.fontFamily = getFontFamily();
        }
      }
    }
    isConverted = true;
    updateUI();
    showToast('✅ पेज तिरहुता में बदल गया! (य → य़ नियम लागू)');
  }

  function revertPage() {
    savedNodes.forEach(({ node, original }) => {
      node.textContent = original;
      if (node.parentElement) {
        node.parentElement.style.fontFamily = '';
      }
    });
    savedNodes = [];
    isConverted = false;
    updateUI();
    showToast('↩️ मूल पाठ वापस आ गया!');
  }

  function toggleConvert() {
    if (isConverted) {
      revertPage();
    } else {
      convertPage();
    }
  }

  // ============================================================
  // TOAST
  // ============================================================

  function showToast(msg) {
    let toast = document.getElementById('uc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'uc-toast';
      toast.style.cssText = `
        position: fixed; bottom: 100px; right: 24px;
        background: #2C1810; color: white;
        padding: 12px 20px; border-radius: 12px;
        font-size: 14px; font-family: 'Segoe UI', Arial, sans-serif;
        z-index: 1000000;
        opacity: 0; transform: translateY(20px);
        transition: all 0.4s ease;
        pointer-events: none;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        max-width: 90%;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 3000);
  }

  // ============================================================
  // UPDATE UI
  // ============================================================

  function updateUI() {
    const btn = document.getElementById('uc-btn');
    const status = document.getElementById('uc-status');
    if (!btn) return;
    if (isConverted) {
      btn.innerHTML = '↩️ Original ✅';
      btn.style.background = 'linear-gradient(135deg, #2D6A4F, #1B4D3E)';
      if (status) status.textContent = '✅ तिरहुता में है (य → य़)';
    } else {
      btn.innerHTML = '𑒧 Tirhuta';
      btn.style.background = 'linear-gradient(135deg, #8B1A1A, #D4A017)';
      if (status) status.textContent = '🔄 क्लिक करें तिरहुता में बदलने के लिए';
    }
  }

  // ============================================================
  // CREATE WIDGET
  // ============================================================

  function createWidget() {
    if (document.getElementById('uc-converter')) return;

    const container = document.createElement('div');
    container.id = 'uc-converter';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      font-family: 'Segoe UI', Arial, sans-serif;
      max-width: 300px;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
      background: rgba(255,255,255,0.98);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.15);
      border: 1px solid rgba(200,169,110,0.3);
      width: 100%;
      transition: all 0.3s ease;
    `;

    const title = document.createElement('div');
    title.style.cssText = `
      font-size: 13px;
      font-weight: 700;
      color: #8B1A1A;
      margin-bottom: 10px;
      text-align: center;
      letter-spacing: 0.5px;
    `;
    title.innerHTML = '𑒧 मिथिला लिपि परिवर्तक';

    const info = document.createElement('div');
    info.style.cssText = `
      font-size: 10px;
      color: #8B7355;
      text-align: center;
      margin-bottom: 10px;
      padding: 4px 8px;
      background: #FFF8E7;
      border-radius: 6px;
      border: 1px solid #C8A96E;
    `;
    info.innerHTML = '📝 य → य़ (बीच/अंत में) | व्यवसाय → व्यवसाय़';

    const fontRow = document.createElement('div');
    fontRow.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    `;
    const fontLabel = document.createElement('span');
    fontLabel.style.cssText = 'font-size:11px;color:#8B7355;font-weight:600;';
    fontLabel.textContent = '🔤 फ़ॉन्ट:';
    const fontSelect = document.createElement('select');
    fontSelect.style.cssText = `
      flex: 1;
      padding: 4px 8px;
      border: 1px solid #C8A96E;
      border-radius: 6px;
      font-size: 12px;
      background: white;
      color: #2C1810;
      cursor: pointer;
      font-family: 'Segoe UI', Arial, sans-serif;
    `;
    fontSelect.innerHTML = `
      <option value="mithilauni">Mithilauni</option>
      <option value="noto">Noto Sans Tirhuta</option>
    `;
    fontSelect.value = selectedFont;
    fontSelect.onchange = function() {
      selectedFont = this.value;
      if (isConverted) {
        savedNodes.forEach(({ node }) => {
          if (node.parentElement) {
            node.parentElement.style.fontFamily = getFontFamily();
          }
        });
      }
      showToast('🔤 फ़ॉन्ट बदल गया: ' + (selectedFont === 'mithilauni' ? 'Mithilauni' : 'Noto Sans Tirhuta'));
    };
    fontRow.appendChild(fontLabel);
    fontRow.appendChild(fontSelect);

    const button = document.createElement('button');
    button.id = 'uc-btn';
    button.innerHTML = '𑒧 Tirhuta';
    button.style.cssText = `
      width: 100%;
      padding: 10px 16px;
      background: linear-gradient(135deg, #8B1A1A, #D4A017);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Segoe UI', Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 44px;
    `;
    button.onmouseenter = () => {
      button.style.transform = 'scale(1.02)';
      button.style.boxShadow = '0 4px 20px rgba(139,26,26,0.3)';
    };
    button.onmouseleave = () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = 'none';
    };
    button.onclick = toggleConvert;

    const status = document.createElement('div');
    status.id = 'uc-status';
    status.style.cssText = `
      font-size: 11px;
      color: #8B7355;
      text-align: center;
      margin-top: 8px;
      padding: 4px;
      min-height: 20px;
    `;
    status.textContent = '🔄 क्लिक करें तिरहुता में बदलने के लिए';

    const shortcut = document.createElement('div');
    shortcut.style.cssText = `
      font-size: 10px;
      color: #B0A090;
      text-align: center;
      margin-top: 4px;
    `;
    shortcut.textContent = '⌨️ Ctrl+Shift+T';

    const credit = document.createElement('div');
    credit.style.cssText = `
      font-size: 10px;
      color: #B0A090;
      text-align: center;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #f0f0f0;
    `;
    credit.innerHTML = `<a href="https://lipi.maithili.org.in/" target="_blank" style="color:#8B1A1A;text-decoration:none;font-weight:600;">𑒧 Powered by Mithila Lipi</a>`;

    panel.appendChild(title);
    panel.appendChild(info);
    panel.appendChild(fontRow);
    panel.appendChild(button);
    panel.appendChild(status);
    panel.appendChild(shortcut);
    panel.appendChild(credit);
    container.appendChild(panel);
    document.body.appendChild(container);

    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        toggleConvert();
      }
    });
  }

  // ============================================================
  // INIT
  // ============================================================

  function init() {
    loadFonts();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWidget);
    } else {
      createWidget();
    }
    console.log('𑒧 Universal Page Converter loaded!');
    console.log('📝 य → य़ नियम: व्यवसाय → व्यवसाय़ → 𑒫𑓂𑒨𑒫𑒮𑒰𑒨𑓃');
    console.log('🔹 Click "𑒧 Tirhuta" button or press Ctrl+Shift+T');
    console.log('🔗 https://lipi.maithili.org.in/');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();