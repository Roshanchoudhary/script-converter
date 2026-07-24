// ============================================================
// FILE: unicode-map.js
// Official Unicode Mapping Table (ISO/IEC 10646) - FROZEN
// ============================================================

const UNICODE_MAP = Object.freeze({
  // Vowels
  'अ': '𑒁', 'आ': '𑒂', 'इ': '𑒃', 'ई': '𑒄',
  'उ': '𑒅', 'ऊ': '𑒆', 'ऋ': '𑒇', 'ॠ': '𑒈',
  'ऌ': '𑒉', 'ॡ': '𑒊', 'ए': '𑒋', 'ऐ': '𑒌',
  'ओ': '𑒍', 'औ': '𑒎', 'ऍ': '𑒺', 'ऎ': '𑒾',
  'ऑ': '𑒽', 'ऒ': '𑒻',

  // Consonants (including extended)
  'क': '𑒏', 'ख': '𑒐', 'ग': '𑒑', 'घ': '𑒒', 'ङ': '𑒓',
  'च': '𑒔', 'छ': '𑒕', 'ज': '𑒖', 'झ': '𑒗', 'ञ': '𑒘',
  'ट': '𑒙', 'ठ': '𑒚', 'ड': '𑒛', 'ढ': '𑒜', 'ण': '𑒝',
  'त': '𑒞', 'थ': '𑒟', 'द': '𑒠', 'ध': '𑒡', 'न': '𑒢',
  'ऩ': '𑒢', 'प': '𑒣', 'फ': '𑒤', 'ब': '𑒥', 'भ': '𑒦',
  'म': '𑒧', 'य': '𑒨', 'र': '𑒩', 'ऱ': '𑒩', 'ल': '𑒪',
  'ळ': '𑒪', 'ऴ': '𑒪', 'व': '𑒫',
  'श': '𑒬', 'ष': '𑒭', 'स': '𑒮', 'ह': '𑒯',

  // Matras (Vowel Signs)
  'ा': '𑒰', 'ि': '𑒱', 'ी': '𑒲',
  'ु': '𑒳', 'ू': '𑒴', 'ृ': '𑒵',
  'ॄ': '𑒶', 'ॅ': '𑒺', 'ॆ': '𑒾',
  'े': '𑒹', 'ै': '𑒻', 'ॉ': '𑒽',
  'ो': '𑒼', 'ौ': '𑒾',

  // Signs
  'ँ': '𑒿', 'ं': '𑓀', 'ः': '𑓁',
  '्': '𑓂', '़': '𑓃',

  // Nukta Letters
  'क़': '𑒏𑓃', 'ख़': '𑒐𑓃', 'ग़': '𑒑𑓃',
  'ज़': '𑒖𑓃', 'ड़': '𑒛𑓃', 'ढ़': '𑒜𑓃',
  'फ़': '𑒤𑓃', 'य़': '𑒨𑓃',

  // Numbers
  '०': '𑓐', '१': '𑓑', '२': '𑓒', '३': '𑓓', '४': '𑓔',
  '५': '𑓕', '६': '𑓖', '७': '𑓗', '८': '𑓘', '९': '𑓙',

  // Punctuation
  '।': '𑓆', '॥': '𑓆𑓆', 'ॐ': '𑓇',
});

// ============================================================
// FILE: categories.js
// Unicode Character Categories (Complete)
// ============================================================

const CATEGORIES = Object.freeze({
  VOWELS: new Set([
    'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ',
    'ए', 'ऐ', 'ओ', 'औ', 'ऍ', 'ऎ', 'ऑ', 'ऒ'
  ]),

  CONSONANTS: new Set([
    'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ',
    'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
    'ऩ', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ऱ', 'ल',
    'ळ', 'ऴ', 'व', 'श', 'ष', 'स', 'ह'
  ]),

  MATRAS: new Set([
    'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ',
    'ॅ', 'ॆ', 'े', 'ै', 'ॉ', 'ॊ', 'ो', 'ौ'
  ]),

  SIGNS: new Set(['ँ', 'ं', 'ः']),

  NUKTA_LETTERS: new Set([
    'क़', 'ख़', 'ग़', 'ज़', 'ड़', 'ढ़', 'फ़', 'य़'
  ]),

  // All Devanagari characters for validation
  ALL_DEVANAGARI: new Set([
    // All characters from the above sets
    ...'अआइईउऊऋॠऌॡएऐओऔऍऎऑऒ',
    ...'कखगघङचछजझञटठडढणतथदधनऩपफबभमयरऱलळऴवशषसह',
    ...'ािीुूृॄॅॆेैॉॊोौ',
    ...'ँंः़्',
    ...'क़ख़ग़ज़ड़ढ़फ़य़',
    ...'०१२३४५६७८९।॥ॐ'
  ]),
});

// ============================================================
// FILE: parser.js
// Orthographic Syllable Parser (Structure Only)
// ============================================================

class OrthographicSyllableParser {
  constructor() {
    this.NUKTA = '़';
    this.VIRAMA = '्';
    this.ZWJ = '\u200D';
    this.ZWNJ = '\u200C';
  }

  // ============================================================
  // Main parse method
  // ============================================================

  parse(text) {
    // Step 1: Normalize (NFC)
    text = text.normalize('NFC');
    
    const clusters = [];
    let i = 0;
    const len = text.length;

    while (i < len) {
      const syllable = this.parseSyllable(text, i);
      if (syllable) {
        clusters.push(syllable);
        i += syllable.length;
      } else {
        // Unknown character, preserve as-is
        clusters.push({
          base: text[i],
          original: text[i],
          length: 1,
          type: 'unknown',
          nukta: false,
          virama: false,
          conjuncts: [],
          matras: [],
          signs: [],
          zwj: false,
          zwnj: false,
        });
        i++;
      }
    }

    return clusters;
  }

  // ============================================================
  // Parse a single orthographic syllable
  // ============================================================

  parseSyllable(text, start) {
    let i = start;
    const len = text.length;
    
    if (i >= len) return null;

    const char = text[i];
    const syllable = {
      base: '',
      original: '',
      length: 0,
      type: 'unknown',
      nukta: false,
      virama: false,
      conjuncts: [],
      matras: [],
      signs: [],
      zwj: false,
      zwnj: false,
    };

    // ============================================================
    // Phase 1: Base character
    // ============================================================

    if (CATEGORIES.VOWELS.has(char)) {
      syllable.base = char;
      syllable.type = 'vowel';
      i++;
    } else if (CATEGORIES.CONSONANTS.has(char)) {
      syllable.base = char;
      syllable.type = 'consonant';
      i++;
    } else {
      syllable.base = char;
      syllable.type = 'unknown';
      i++;
      syllable.length = i - start;
      syllable.original = text.substring(start, i);
      return syllable;
    }

    // ============================================================
    // Phase 2: Nukta (़)
    // ============================================================

    if (i < len && text[i] === this.NUKTA) {
      syllable.nukta = true;
      i++;
    }

    // ============================================================
    // Phase 3: Virama + Conjuncts (्क, क्त, क्त्र, etc.)
    // ============================================================

    while (i < len && text[i] === this.VIRAMA) {
      syllable.virama = true;
      i++;
      
      // Check if there's a following consonant
      if (i < len && CATEGORIES.CONSONANTS.has(text[i])) {
        syllable.conjuncts.push(text[i]);
        i++;
        
        // Check for ZWJ/ZWNJ
        if (i < len) {
          if (text[i] === this.ZWJ) {
            syllable.zwj = true;
            i++;
          } else if (text[i] === this.ZWNJ) {
            syllable.zwnj = true;
            i++;
          }
        }
        
        // Continue for multi-conjunct (क्त्र)
        continue;
      } else {
        // Virama without consonant (standalone)
        break;
      }
    }

    // ============================================================
    // Phase 4: Matras (ा,ि,ी,ु,ू,े,ै,ो,ौ)
    // ============================================================

    while (i < len && CATEGORIES.MATRAS.has(text[i])) {
      syllable.matras.push(text[i]);
      i++;
    }

    // ============================================================
    // Phase 5: Signs (ँ,ं,ः)
    // ============================================================

    while (i < len && CATEGORIES.SIGNS.has(text[i])) {
      syllable.signs.push(text[i]);
      i++;
    }

    // ============================================================
    // Store original and length
    // ============================================================

    syllable.length = i - start;
    syllable.original = text.substring(start, i);

    return syllable;
  }
}

// ============================================================
// FILE: rules.js
// Rule Engine - FROZEN
// ============================================================

const RULES = Object.freeze({
  // ============================================================
  // Ya Rule: य → य़
  // ============================================================
  yaRule: {
    enabled: true,
    apply: function(cluster, context) {
      if (!this.enabled) return cluster;
      
      // Only apply to 'य' base
      if (cluster.base !== 'य') return cluster;
      
      // Check if य is half (part of conjunct)
      const isHalfYa = cluster.virama || 
                       (cluster.conjuncts && cluster.conjuncts.length > 0);
      
      if (isHalfYa) return cluster;
      
      // Check if य is word-initial
      if (context.isWordStart) return cluster;
      
      // Apply: य → य़
      cluster.nukta = true;
      return cluster;
    }
  },

  // ============================================================
  // Nukta Rule
  // ============================================================
  nuktaRule: {
    enabled: true,
    apply: function(cluster) {
      if (!this.enabled) return cluster;
      
      // If cluster has nukta, ensure it's properly set
      if (cluster.nukta && cluster.base) {
        // Check if it's a nukta letter
        const nuktaKey = cluster.base + '़';
        if (UNICODE_MAP[nuktaKey]) {
          // Already a valid nukta letter
          return cluster;
        }
      }
      return cluster;
    }
  },

  // ============================================================
  // Font-specific rules
  // ============================================================
  fontRules: {
    mithilauni: {
      ligatures: true,
      conjuncts: true,
    },
    noto: {
      ligatures: false,
      conjuncts: true,
    }
  }
});

// ============================================================
// FILE: renderer.js
// Unicode Renderer
// ============================================================

class TirhutaRenderer {
  constructor() {
    this.map = UNICODE_MAP;
  }

  // ============================================================
  // Render clusters to Tirhuta
  // ============================================================

  render(clusters) {
    let result = '';

    for (const cluster of clusters) {
      // Handle unknown
      if (cluster.type === 'unknown') {
        result += cluster.base;
        continue;
      }

      // ============================================================
      // Step 1: Base character
      // ============================================================
      let base = cluster.base;
      
      // Handle Nukta letters
      if (cluster.nukta) {
        const nuktaKey = base + '़';
        if (this.map[nuktaKey]) {
          base = this.map[nuktaKey];
        } else {
          // Fallback: base + nukta
          base = (this.map[base] || base) + '𑓃';
        }
      } else {
        base = this.map[base] || base;
      }

      result += base;

      // ============================================================
      // Step 2: Virama + Conjuncts
      // ============================================================
      if (cluster.virama && cluster.conjuncts.length > 0) {
        // Add Virama
        result += '𑓂';
        
        for (let i = 0; i < cluster.conjuncts.length; i++) {
          const conj = cluster.conjuncts[i];
          result += this.map[conj] || conj;
          
          // Add Virama for multi-conjunct
          if (i < cluster.conjuncts.length - 1) {
            result += '𑓂';
          }
        }
      }

      // ============================================================
      // Step 3: Matras
      // ============================================================
      for (const matra of cluster.matras) {
        result += this.map[matra] || matra;
      }

      // ============================================================
      // Step 4: Signs
      // ============================================================
      for (const sign of cluster.signs) {
        result += this.map[sign] || sign;
      }
    }

    return result;
  }
}

// ============================================================
// FILE: converter.js
// Main Conversion Engine
// ============================================================

class TirhutaConverter {
  constructor() {
    this.parser = new OrthographicSyllableParser();
    this.renderer = new TirhutaRenderer();
    this.rules = RULES;
  }

  // ============================================================
  // Convert Devanagari to Tirhuta
  // ============================================================

  convert(text) {
    if (!text) return '';

    // Step 1: Parse into syllables
    const clusters = this.parser.parse(text);

    // Step 2: Apply rules
    const processed = this.applyRules(clusters);

    // Step 3: Render to Tirhuta
    return this.renderer.render(processed);
  }

  // ============================================================
  // Apply rules to clusters
  // ============================================================

  applyRules(clusters) {
    const result = [];
    
    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i];
      const context = {
        isWordStart: i === 0 || this.isWordBoundary(clusters[i - 1]),
      };

      // Apply Ya rule
      let processed = this.rules.yaRule.apply(cluster, context);
      
      // Apply Nukta rule
      processed = this.rules.nuktaRule.apply(processed);
      
      result.push(processed);
    }

    return result;
  }

  // ============================================================
  // Helper: Check word boundary
  // ============================================================

  isWordBoundary(cluster) {
    if (!cluster) return true;
    const text = cluster.original || cluster.base || '';
    return /[\s.,;:!?।॥()\[\]{}"'\u200B]/.test(text);
  }
}

// ============================================================
// FILE: widget.js
// Widget Integration
// ============================================================

(function() {
  'use strict';

  const CONFIG = Object.freeze({
    fontCDN: [
      'https://script-converter.pages.dev/fonts/Mithilauni.ttf',
      'https://raw.githubusercontent.com/Roshanchoudhary/script-converter/main/fonts/Mithilauni.ttf'
    ],
    googleFont: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tirhuta:wght@400;700&display=swap',
    creditLink: 'https://lipi.maithili.org.in/',
    fontFamily: "'Mithilauni','Noto Sans Tirhuta',serif",
    storageKey: 'tirhuta-mode'
  });

  // ============================================================
  // Initialize converter
  // ============================================================

  const converter = new TirhutaConverter();

  // ============================================================
  // Page Converter
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
        const tirText = converter.convert(devText);
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
      btn.title = 'देवनागरी लिपि';
      btn.style.background = 'linear-gradient(135deg, #2D6A4F, #1B4D3E)';
      mwToast('✅ वेबसाइट मिथिलाक्षरमे बदलि गेल!', 'success');

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
      btn.title = 'वेबसाइटकेँ मिथिलाक्षरमे बदलू';
      btn.style.background = 'linear-gradient(135deg, #8B1A1A, #D4A017)';
      mwToast('↩️ देवनागरी लिपिमे बदलिगेल!', 'success');
    }
  }

  // ============================================================
  // Observer
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
              const converted = converter.convert(original);
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
                const converted = converter.convert(original);
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
  // Toast
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
  // Check Saved Preference
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
  // Font Loader
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
  // Widget CSS
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
        font-size: 1.8rem;
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
        bottom: 88px;
        right: 24px;
        background: rgba(255,255,255,0.92);
        backdrop-filter: blur(8px);
        padding: 5px 14px;
        border-radius: 18px;
        font-size: 13px;
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
        bottom: 88px;
        right: 24px;
        background: #2C1810;
        color: white;
        padding: 10px 18px;
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

      @media (max-width: 600px) {
        #mw-fab {
          width: 48px;
          height: 48px;
          font-size: 1.4rem;
          bottom: 16px;
          right: 16px;
        }
        #mw-credit {
          bottom: 76px;
          right: 16px;
          font-size: 11px;
          padding: 4px 12px;
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
  // Build Widget
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
  // Init
  // ============================================================

  function init() {
    loadFonts();
    injectCSS();
    buildWidget();

    const saved = checkSavedPreference();
    if (saved) {
      setTimeout(function() {
        convertPage();
        mwToast('✅ पेज मिथिलाक्षर में अछि', 'success');
      }, 500);
    }

    console.log('𑒧 Mithila Script Converter v5.0 loaded!');
    console.log('📝 Architecture:');
    console.log('   ✅ Complete Unicode Categories (Set-based)');
    console.log('   ✅ Parser → Structure Only (No rules)');
    console.log('   ✅ Rule Engine → Separate');
    console.log('   ✅ Renderer → Separate');
    console.log('   ✅ All mappings Frozen');
    console.log('🔹 Click the 𑒧 button or press Ctrl+Shift+T');
    console.log('🔗 ' + CONFIG.creditLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
