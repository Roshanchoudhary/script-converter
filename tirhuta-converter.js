// ============================================================
// 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒮𑒻𑒞 𑒏𑒼𑒢𑓂𑒫𑒩𑓂𑒞𑒩
// Tirhuta Site Converter - पूरी Website के लिए
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // CONFIG
  // ============================================================

  const CONFIG = {
    storageKey: 'tirhuta-mode',
    defaultMode: 'devanagari', // 'devanagari' या 'tirhuta'
    creditLink: 'https://lipi.maithili.org.in/',
    fontFamily: "'Mithilauni','Noto Sans Tirhuta',serif"
  };

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
  // ROMAN → DEVANAGARI NUMBERS
  // ============================================================

  const ROMAN_TO_DEV = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
  };

  // ============================================================
  // CONVERSION ENGINE
  // ============================================================

  function convertRomanToDevanagari(text) {
    if (!text) return '';
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char >= '0' && char <= '9') {
        result += ROMAN_TO_DEV[char] || char;
      } else {
        result += char;
      }
    }
    return result;
  }

  function convertToTirhuta(text) {
    if (!text) return '';
    
    // Step 1: Roman numbers → Devanagari
    let processed = convertRomanToDevanagari(text);
    
    // Step 2: Apply hidden य़ rule
    let yaProcessed = '';
    for (let i = 0; i < processed.length; i++) {
      const char = processed[i];
      if (char === 'य') {
        yaProcessed += 'य';
      } else {
        yaProcessed += char;
      }
    }
    
    // Step 3: Devanagari → Tirhuta
    let result = '';
    for (let i = 0; i < yaProcessed.length; i++) {
      const char = yaProcessed[i];
      result += D2T[char] || char;
    }
    return result;
  }

  // ============================================================
  // SITE CONVERTER - पूरी Website के लिए
  // ============================================================

  let isTirhutaMode = false;
  let savedNodes = [];
  let observer = null;

  function convertSiteToTirhuta() {
    // Save current mode
    isTirhutaMode = true;
    localStorage.setItem(CONFIG.storageKey, 'tirhuta');
    
    // Convert all text on page
    convertAllText();
    
    // Start observing for new content
    startObserver();
    
    updateUI();
    showToast('✅ 𑒣𑒴𑒩𑒲 𑒮𑒻𑒞 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒥𑒠𑒪𑒏𑓂𑒞𑓂𑒯𑒰!');
  }

  function revertSiteToDevanagari() {
    isTirhutaMode = false;
    localStorage.setItem(CONFIG.storageKey, 'devanagari');
    
    // Stop observer
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    
    // Revert all text
    revertAllText();
    
    updateUI();
    showToast('↩️ 𑒧𑒴𑒪 𑒣𑒰𑒛 𑒫𑒰𑒣𑒮 𑒁𑒑𑒪!');
  }

  function toggleSite() {
    if (isTirhutaMode) {
      revertSiteToDevanagari();
    } else {
      convertSiteToTirhuta();
    }
  }

  // ============================================================
  // TEXT CONVERSION
  // ============================================================

  function convertAllText() {
    savedNodes = [];
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
          node.parentElement.style.fontFamily = CONFIG.fontFamily;
        }
      }
    }
  }

  function revertAllText() {
    savedNodes.forEach(({ node, original }) => {
      node.textContent = original;
      if (node.parentElement) {
        node.parentElement.style.fontFamily = '';
      }
    });
    savedNodes = [];
  }

  // ============================================================
  // OBSERVER - नए content के लिए
  // ============================================================

  function startObserver() {
    if (observer) {
      observer.disconnect();
    }
    
    observer = new MutationObserver(function(mutations) {
      let hasNewText = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              hasNewText = true;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if element has text
              const walker = document.createTreeWalker(
                node,
                NodeFilter.SHOW_TEXT,
                {
                  acceptNode: function(textNode) {
                    if (textNode.parentElement &&
                      (textNode.parentElement.closest('#uc-converter') ||
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
                hasNewText = true;
                const original = textNode.textContent;
                const converted = convertToTirhuta(original);
                if (original !== converted) {
                  savedNodes.push({ node: textNode, original });
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
  // TOAST
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
  // UPDATE UI
  // ============================================================

  function updateUI() {
    const btn = document.getElementById('uc-btn');
    const status = document.getElementById('uc-status');
    if (!btn) return;
    
    if (isTirhutaMode) {
      btn.innerHTML = '↩️ 𑒠𑒹𑒫𑒢𑒰𑒑𑒩𑒲 ✅';
      btn.style.background = 'linear-gradient(135deg, #2D6A4F, #1B4D3E)';
      if (status) status.textContent = '✅ 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒁𑒔𑓂𑒕𑒰';
    } else {
      btn.innerHTML = '𑒧 𑒞𑒱𑒩𑒯𑒳𑒞𑒰';
      btn.style.background = 'linear-gradient(135deg, #8B1A1A, #D4A017)';
      if (status) status.textContent = '🔄 𑒏𑓂𑒪𑒱𑒏𑓂 𑒏𑒩𑒳 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒥𑒠𑒪𑒏𑒾';
    }
  }

  // ============================================================
  // CHECK SAVED PREFERENCE
  // ============================================================

  function checkSavedPreference() {
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (saved === 'tirhuta') {
      return true;
    }
    return false;
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
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      font-family: 'Segoe UI', Arial, sans-serif;
      max-width: 280px;
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

    // Info - Site converter
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
    info.textContent = '🌐 𑒣𑒴𑒩𑒲 𑒮𑒻𑒞 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇';

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
    fontSelect.value = 'mithilauni';
    fontSelect.onchange = function() {
      const font = this.value;
      const family = font === 'mithilauni' 
        ? "'Mithilauni','Noto Sans Tirhuta',serif" 
        : "'Noto Sans Tirhuta',serif";
      
      if (isTirhutaMode) {
        savedNodes.forEach(({ node }) => {
          if (node.parentElement) {
            node.parentElement.style.fontFamily = family;
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
    button.onclick = toggleSite;

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

    // Credit Link
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
    credit.innerHTML = `<a href="${CONFIG.creditLink}" target="_blank" style="color:#8B1A1A;text-decoration:none;font-weight:600;">𑒧 𑒧𑒱𑒟𑒱𑒪𑒰 𑒪𑒱𑒣𑒱</a>`;

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
        toggleSite();
      }
    });
  }

  // ============================================================
  // INIT
  // ============================================================

  function init() {
    loadFonts();
    
    // Check saved preference
    const savedMode = localStorage.getItem(CONFIG.storageKey);
    
    // Create widget first
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        createWidget();
        // Apply saved preference after widget creation
        if (savedMode === 'tirhuta') {
          setTimeout(function() {
            isTirhutaMode = true;
            convertAllText();
            startObserver();
            updateUI();
            showToast('✅ 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒁𑒔𑓂𑒕𑒰 (𑒮𑓂𑒫𑒞𑓂𑒠𑓂𑒩𑒱𑒞𑓂𑒠𑒾𑒢𑒞𑒰)');
          }, 500);
        }
      });
    } else {
      createWidget();
      if (savedMode === 'tirhuta') {
        setTimeout(function() {
          isTirhutaMode = true;
          convertAllText();
          startObserver();
          updateUI();
          showToast('✅ 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒁𑒔𑓂𑒕𑒰 (𑒮𑓂𑒫𑒞𑓂𑒠𑓂𑒩𑒱𑒞𑓂𑒠𑒾𑒢𑒞𑒰)');
        }, 500);
      }
    }
    
    console.log('𑒧 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒮𑒻𑒞 𑒏𑒼𑒢𑓂𑒫𑒩𑓂𑒞𑒩 𑒪𑒼𑒠 𑒯𑒾𑒪!');
    console.log('🌐 𑒣𑒴𑒩𑒲 𑒮𑒻𑒞 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑓇 𑒥𑒠𑒪𑒏𑒾');
    console.log('💾 𑒞𑒱𑒩𑒯𑒳𑒞𑒰 𑒧𑒴𑒠𑓂 ' + (savedMode === 'tirhuta' ? '𑒋𑒢𑓂' : '𑒦𑒵𑒞𑓂'));
    console.log('🔗 ' + CONFIG.creditLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();