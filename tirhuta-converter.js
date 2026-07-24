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
  // Font