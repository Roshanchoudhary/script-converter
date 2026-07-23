// ============================================================
// 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒣𑒹𑒖 𑒏𑓂𑒞𑒩𑓂𑒞𑒰
// Tirhuta Page Converter - मैथिली में (𑒨𑓃 𑒢 𑒠𑒱𑒔𑓂𑒯𑒰𑒃𑒢𑒱)
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // 𑒨𑒰𑒢𑒱 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓀𑒞𑒩𑒰
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
  // 𑒨𑒰𑒢𑒱 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒣𑒩𑒱𑒫𑒩𑓂𑒞𑒢 (𑒨𑓃 𑒢 𑒠𑒱𑒔𑓂𑒯𑒰𑒃𑒢𑒱)
  // ============================================================

  function convertToTirhuta(text) {
    if (!text) return '';
    
    // Step 1: Apply hidden य़ rule (internal)
    let processed = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1] || '';
      const prevChar = text[i - 1] || '';
      
      if (char === 'य') {
        // शब्द के अंत में य → य़ (लेकिन दिखेगा नहीं)
        if (i === text.length - 1) {
          // य़ as internal (no visible change)
          processed += 'य';
        }
        // शब्द के बीच में य → य़ (लेकिन दिखेगा नहीं)
        else if (i > 0 && i < text.length - 1) {
          // Check if part of special conjunct (व्य, क्य, ग्य, etc.)
          const prevTwo = (text[i-2] || '') + (text[i-1] || '');
          const specialConjuncts = ['व्य', 'क्य', 'ग्य', 'प्र्य', 'ब्र्य', 'द्य', 'त्य', 'न्य', 'म्य', 'स्य', 'ह्य', 'र्य', 'ल्य'];
          const isSpecial = specialConjuncts.some(conj => text.includes(conj));
          
          if (isSpecial) {
            processed += 'य'; // Keep as य
          } else {
            // य़ as internal (no visible change)
            processed += 'य';
          }
        } else {
          processed += 'य';
        }
      } else {
        processed += char;
      }
    }
    
    // Step 2: Convert to Tirhuta
    let result = '';
    for (let i = 0; i < processed.length; i++) {
      const char = processed[i];
      result += D2T[char] || char;
    }
    return result;
  }

  // ============================================================
  // 𑒮𑓂𑒞𑒻𑒞
  // ============================================================

  let isConverted = false;
  let savedNodes = [];
  let selectedFont = 'mithilauni';

  // ============================================================
  // 𑒤𑒼𑒢𑓂𑒙 𑒪𑒼𑒠𑒩
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
  // 𑒤𑒼𑒢𑓂𑒙 𑒢𑒰𑒧
  // ============================================================

  function getFontFamily() {
    return selectedFont === 'mithilauni' 
      ? "'Mithilauni','Noto Sans Tirhuta',serif" 
      : "'Noto Sans Tirhuta',serif";
  }

  // ============================================================
  // 𑒣𑒹𑒖 𑒏𑒼𑒢𑓂𑒫𑒩𑓂𑒞 𑒏𑒩𑒳
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
    showToast('✅ 𑒣𑒹𑒖 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒥𑒠𑒪𑒏𑓂𑒞𑓂𑒯𑒰!');
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
    showToast('↩️ 𑒧𑒴𑒪 𑒣𑒰𑒛 𑒫𑒰𑒣𑒮 𑒁𑒑𑒪!');
  }

  function toggleConvert() {
    if (isConverted) {
      revertPage();
    } else {
      convertPage();
    }
  }

  // ============================================================
  // 𑒮𑒳𑒕𑒰𑒢
  // ============================================================

  function showToast(msg) {
    let toast = document.getElementById('uc-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'uc-toast';
      toast.style.cssText = `
        position: fixed; bottom: 90px; right: 24px;
        background: #2C1810; color: white;
        padding: 10px 18px; border-radius: 10px;
        font-size: 13px;
        z-index: 1000000;
        opacity: 0; transform: translateY(20px);
        transition: all 0.4s ease;
        pointer-events: none;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        max-width: 90%;
        font-family: 'Noto Sans Devanagari', Arial, sans-serif;
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
    }, 2500);
  }

  // ============================================================
  // 𑒨𑒰𑒢𑒱 UI 𑒁𑒣𑒜𑒻𑒞 𑒏𑒩𑒳
  // ============================================================

  function updateUI() {
    const btn = document.getElementById('uc-btn');
    const status = document.getElementById('uc-status');
    if (!btn) return;
    if (isConverted) {
      btn.innerHTML = '↩️ 𑒧𑒴𑒪 𑒫𑒰𑒣𑒮 ✅';
      btn.style.background = 'linear-gradient(135deg, #2D6A4F, #1B4D3E)';
      if (status) status.textContent = '✅ 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒁𑒔𑓂𑒕𑒰';
    } else {
      btn.innerHTML = '𑒧 𑒞𑒱𑒩𑒯𑒳𑒞𑒰';
      btn.style.background = 'linear-gradient(135deg, #8B1A1A, #D4A017)';
      if (status) status.textContent = '🔄 𑒏𑓂𑒪𑒱𑒏𑓂 𑒏𑒩𑒳 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒥𑒠𑒪𑒏𑒾';
    }
  }

  // ============================================================
  // 𑒫𑒱𑒠𑓂𑒨𑒰𑒢𑒱 𑒥𑒢𑒰𑒅
  // ============================================================

  function createWidget() {
    if (document.getElementById('uc-converter')) return;

    const container = document.createElement('div');
    container.id = 'uc-converter';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      font-family: 'Segoe UI', Arial, sans-serif;
      max-width: 240px;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
      background: rgba(255,255,255,0.96);
      backdrop-filter: blur(8px);
      border-radius: 12px;
      padding: 12px 14px;
      box-shadow: 0 6px 30px rgba(0,0,0,0.12);
      border: 1px solid rgba(200,169,110,0.25);
      width: 100%;
      transition: all 0.3s ease;
    `;

    // Title
    const title = document.createElement('div');
    title.style.cssText = `
      font-size: 12px;
      font-weight: 700;
      color: #8B1A1A;
      margin-bottom: 8px;
      text-align: center;
      letter-spacing: 0.3px;
      font-family: 'Mithilauni','Noto Sans Tirhuta',serif;
    `;
    title.textContent = '𑒧 𑒧𑒱𑒟𑒱𑒪𑒰 𑒪𑒱𑒣𑒱 𑒣𑒩𑒱𑒫𑒩𑓂𑒞𑒏';

    // Info - नियम रहतय बस देखबय के नञि
    const info = document.createElement('div');
    info.style.cssText = `
      font-size: 9px;
      color: #8B7355;
      text-align: center;
      margin-bottom: 6px;
      padding: 2px 6px;
      background: #FFF8E7;
      border-radius: 4px;
      border: 1px solid #C8A96E;
      font-family: 'Noto Sans Devanagari', Arial, sans-serif;
    `;
    info.textContent = '📝 𑒨𑓃 𑒢 𑒠𑒱𑒔𑓂𑒯𑒰𑒃𑒢𑒱 (𑒢𑒱𑒨𑒧 𑒩𑒯𑒞𑒨)';

    // Font Selector
    const fontRow = document.createElement('div');
    fontRow.style.cssText = `
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    `;
    const fontLabel = document.createElement('span');
    fontLabel.style.cssText = 'font-size:10px;color:#8B7355;font-weight:600;';
    fontLabel.textContent = '🔤 𑒤𑒼𑒢𑓂𑒙:';
    const fontSelect = document.createElement('select');
    fontSelect.style.cssText = `
      flex: 1;
      padding: 3px 6px;
      border: 1px solid #C8A96E;
      border-radius: 5px;
      font-size: 11px;
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
    };
    fontRow.appendChild(fontLabel);
    fontRow.appendChild(fontSelect);

    // Button
    const button = document.createElement('button');
    button.id = 'uc-btn';
    button.innerHTML = '𑒧 𑒞𑒱𑒩𑒯𑒳𑒞𑒰';
    button.style.cssText = `
      width: 100%;
      padding: 8px 12px;
      background: linear-gradient(135deg, #8B1A1A, #D4A017);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Noto Sans Devanagari', Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      min-height: 36px;
    `;
    button.onmouseenter = () => {
      button.style.transform = 'scale(1.02)';
      button.style.boxShadow = '0 4px 16px rgba(139,26,26,0.25)';
    };
    button.onmouseleave = () => {
      button.style.transform = 'scale(1)';
      button.style.boxShadow = 'none';
    };
    button.onclick = toggleConvert;

    // Status
    const status = document.createElement('div');
    status.id = 'uc-status';
    status.style.cssText = `
      font-size: 10px;
      color: #8B7355;
      text-align: center;
      margin-top: 6px;
      padding: 2px;
      min-height: 16px;
      font-family: 'Noto Sans Devanagari', Arial, sans-serif;
    `;
    status.textContent = '🔄 𑒏𑓂𑒪𑒱𑒏𑓂 𑒏𑒩𑒳 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒥𑒠𑒪𑒏𑒾';

    // Shortcut
    const shortcut = document.createElement('div');
    shortcut.style.cssText = `
      font-size: 9px;
      color: #B0A090;
      text-align: center;
      margin-top: 3px;
      font-family: 'Noto Sans Devanagari', Arial, sans-serif;
    `;
    shortcut.textContent = '⌨️ Ctrl+Shift+T';

    // ============================================================
    // CREDIT LINK ✅
    // ============================================================
    const credit = document.createElement('div');
    credit.style.cssText = `
      font-size: 9px;
      color: #B0A090;
      text-align: center;
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid #f0f0f0;
      font-family: 'Noto Sans Devanagari', Arial, sans-serif;
    `;
    credit.innerHTML = `<a href="https://lipi.maithili.org.in/" target="_blank" style="color:#8B1A1A;text-decoration:none;font-weight:600;">𑒧 𑒧𑒱𑒟𑒱𑒪𑒰 𑒪𑒱𑒣𑒱</a>`;

    // Assemble
    panel.appendChild(title);
    panel.appendChild(info);
    panel.appendChild(fontRow);
    panel.appendChild(button);
    panel.appendChild(status);
    panel.appendChild(shortcut);
    panel.appendChild(credit);
    container.appendChild(panel);
    document.body.appendChild(container);

    // Keyboard shortcut
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        toggleConvert();
      }
    });
  }

  // ============================================================
  // 𑒮𑒳𑒩𑒴 𑒏𑒩𑒳
  // ============================================================

  function init() {
    loadFonts();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWidget);
    } else {
      createWidget();
    }
    console.log('𑒧 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒣𑒹𑒖 𑒏𑒼𑒢𑓂𑒫𑒩𑓂𑒞𑒩 𑒪𑒼𑒠 𑒯𑒾𑒪!');
    console.log('📝 𑒨𑓃 𑒢 𑒠𑒱𑒔𑓂𑒯𑒰𑒃𑒢𑒱 (𑒢𑒱𑒨𑒧 𑒩𑒯𑒞𑒨)');
    console.log('🔹 𑒏𑓂𑒪𑒱𑒏𑓂 𑒏𑒩𑒳 "𑒧 𑒞𑒱𑒩𑒯𑒳𑒞𑒰" 𑒥𑒞𑒢 𑒣𑒩');
    console.log('🔗 https://lipi.maithili.org.in/');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();