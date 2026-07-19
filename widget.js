// Mithila Script Converter Widget
// किसी भी website पर embed करें:
// <script src="YOUR_URL/widget.js"></script>

(function () {
  'use strict';

  const CDN = 'https://YOUR-USERNAME.github.io/script-converter/fonts/';

  // Character Maps
  const T2D = {
    '\u11481':'\u0905','\u11482':'\u0906','\u11483':'\u0907','\u11484':'\u0908',
    '\u11485':'\u0909','\u11486':'\u090A','\u11487':'\u090B','\u1148B':'\u090F',
    '\u1148C':'\u0910','\u1148F':'\u0913','\u11490':'\u0914','\u11491':'\u0915',
    '\u11492':'\u0916','\u11493':'\u0917','\u11494':'\u0918','\u11495':'\u0919',
    '\u11496':'\u091A','\u11497':'\u091B','\u11498':'\u091C','\u11499':'\u091D',
    '\u1149A':'\u091E','\u1149B':'\u091F','\u1149C':'\u0920','\u1149D':'\u0921',
    '\u1149E':'\u0922','\u1149F':'\u0923','\u114A0':'\u0924','\u114A1':'\u0925',
    '\u114A2':'\u0926','\u114A3':'\u0927','\u114A4':'\u0928','\u114A5':'\u092A',
    '\u114A6':'\u092B','\u114A7':'\u092C','\u114A8':'\u092D','\u114A9':'\u092E',
    '\u114AA':'\u092F','\u114AB':'\u0930','\u114AC':'\u0932','\u114AD':'\u0935',
    '\u114AE':'\u0936','\u114AF':'\u0937','\u114B0':'\u0938','\u114B1':'\u0939',
    '\u114B2':'\u093E','\u114B3':'\u093F','\u114B4':'\u0940','\u114B5':'\u0941',
    '\u114B6':'\u0942','\u114B7':'\u0943','\u114BA':'\u0947','\u114BB':'\u0948',
    '\u114BE':'\u094B','\u114BF':'\u094C','\u114C0':'\u094D','\u114C1':'\u0902',
    '\u114C2':'\u0903','\u114D0':'\u0966','\u114D1':'\u0967','\u114D2':'\u0968',
    '\u114D3':'\u0969','\u114D4':'\u096A','\u114D5':'\u096B','\u114D6':'\u096C',
    '\u114D7':'\u096D','\u114D8':'\u096E','\u114D9':'\u096F',
  };
  const D2T = Object.fromEntries(Object.entries(T2D).map(([k,v])=>[v,k]));

  function convert(text, dir) {
    const map = dir === 'dev-to-tir' ? D2T : T2D;
    return [...text].map(c => map[c]||c).join('');
  }

  // Inject fonts
  function injectFonts() {
    if (document.getElementById('mw-fonts')) return;
    const s = document.createElement('style');
    s.id = 'mw-fonts';
    s.textContent = `
      @font-face{font-family:'Mithilauni';src:url('${CDN}mithilauni.ttf') format('truetype');font-display:swap;}
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Tirhuta&display=swap');
    `;
    document.head.appendChild(s);
  }

  // Inject CSS
  function injectCSS() {
    if (document.getElementById('mw-css')) return;
    const s = document.createElement('style');
    s.id = 'mw-css';
    s.textContent = `
      #mw-fab{position:fixed;bottom:24px;right:24px;width:56px;height:56px;
        background:linear-gradient(135deg,#8B1A1A,#D4A017);border-radius:50%;
        border:none;color:white;font-size:1.4rem;cursor:pointer;
        box-shadow:0 4px 16px rgba(139,26,26,0.4);z-index:99998;
        transition:transform 0.3s;display:flex;align-items:center;justify-content:center;
        font-family:'Mithilauni','Noto Sans Tirhuta',serif;}
      #mw-fab:hover{transform:scale(1.1);}
      #mw-panel{position:fixed;bottom:90px;right:24px;width:360px;
        max-width:calc(100vw - 32px);background:#FDF6E3;
        border:1px solid #C8A96E;border-radius:16px;
        box-shadow:0 8px 40px rgba(0,0,0,0.2);z-index:99999;
        font-family:Arial,sans-serif;overflow:hidden;display:none;}
      #mw-panel.open{display:block;animation:mw-up 0.3s ease;}
      @keyframes mw-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      .mw-head{background:linear-gradient(135deg,#8B1A1A,#5C0F0F);color:white;
        padding:12px 16px;display:flex;justify-content:space-between;align-items:center;}
      .mw-head h3{font-size:0.95rem;margin:0;}
      .mw-x{background:none;border:none;color:white;font-size:1.2rem;cursor:pointer;padding:0 4px;}
      .mw-body{padding:14px;}
      .mw-row{display:flex;gap:8px;margin-bottom:10px;align-items:center;}
      .mw-sel{flex:1;padding:7px 10px;border:1.5px solid #C8A96E;border-radius:8px;
        background:white;font-size:0.82rem;color:#2C1810;cursor:pointer;
        appearance:none;font-family:Arial,sans-serif;}
      .mw-sel:focus{outline:none;border-color:#8B1A1A;}
      .mw-lbl{font-size:0.72rem;color:#8B1A1A;font-weight:700;
        text-transform:uppercase;letter-spacing:0.4px;margin-bottom:4px;display:block;}
      .mw-ta{width:100%;height:85px;border:1.5px solid #C8A96E;border-radius:8px;
        padding:8px 10px;font-size:1rem;line-height:1.7;resize:none;
        background:white;color:#2C1810;margin-bottom:8px;font-family:Arial,sans-serif;}
      .mw-ta:focus{outline:none;border-color:#8B1A1A;}
      .mw-fm{font-family:'Mithilauni','Noto Sans Tirhuta',serif!important;}
      .mw-fn{font-family:'Noto Sans Tirhuta',serif!important;}
      .mw-btns{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;}
      .mw-btn{flex:1;padding:8px 10px;border:none;border-radius:7px;
        font-size:0.8rem;font-weight:700;cursor:pointer;transition:all 0.2s;min-width:70px;}
      .mw-bp{background:#8B1A1A;color:white;}.mw-bp:hover{background:#6B1010;}
      .mw-bs{background:#D4A017;color:#2C1810;}.mw-bs:hover{background:#B8860B;}
      .mw-bo{background:transparent;border:1.5px solid #C8A96E;color:#2C1810;}
      .mw-bo:hover{border-color:#8B1A1A;color:#8B1A1A;}
      .mw-pg{margin-top:10px;padding:10px;background:rgba(139,26,26,0.06);
        border-radius:8px;border:1px solid #C8A96E;}
      .mw-pg p{font-size:0.78rem;color:#5C3A1E;margin-bottom:8px;line-height:1.4;}
      .mw-pgbtn{width:100%;padding:8px;background:#8B1A1A;color:white;
        border:none;border-radius:7px;font-size:0.82rem;cursor:pointer;font-weight:700;}
      .mw-pgbtn:hover{background:#6B1010;}
      .mw-pgbtn.active{background:#2D6A4F;}
      #mw-toast{position:fixed;bottom:90px;right:24px;background:#2D6A4F;
        color:white;padding:10px 16px;border-radius:8px;font-size:0.85rem;
        z-index:100000;opacity:0;transform:translateY(10px);
        transition:all 0.3s;pointer-events:none;}
      #mw-toast.show{opacity:1;transform:translateY(0);}
    `;
    document.head.appendChild(s);
  }

  // Build Widget HTML
  function buildWidget() {
    const fab = document.createElement('button');
    fab.id = 'mw-fab';
    fab.title = 'तिरहुता ↔ देवनागरी परिवर्तक';
    fab.innerHTML = '𑒧';
    fab.onclick = () => document.getElementById('mw-panel').classList.toggle('open');

    const panel = document.createElement('div');
    panel.id = 'mw-panel';
    panel.innerHTML = `
      <div class="mw-head">
        <h3>𑒧 मिथिला लिपि परिवर्तक</h3>
        <button class="mw-x" onclick="document.getElementById('mw-panel').classList.remove('open')">✕</button>
      </div>
      <div class="mw-body">
        <div class="mw-row">
          <div style="flex:1">
            <span class="mw-lbl">दिशा</span>
            <select class="mw-sel" id="mw-dir">
              <option value="dev-to-tir">देवनागरी → तिरहुता</option>
              <option value="tir-to-dev">तिरहुता → देवनागरी</option>
            </select>
          </div>
          <div style="flex:1">
            <span class="mw-lbl">फ़ॉन्ट</span>
            <select class="mw-sel" id="mw-font" onchange="mwApplyFont()">
              <option value="mithilauni">Mithilauni</option>
              <option value="noto">Noto Sans Tirhuta</option>
            </select>
          </div>
        </div>
        <span class="mw-lbl">इनपुट</span>
        <textarea class="mw-ta" id="mw-in" placeholder="यहाँ लिखें..." oninput="mwConvert()"></textarea>
        <span class="mw-lbl">आउटपुट</span>
        <textarea class="mw-ta" id="mw-out" placeholder="परिवर्तित पाठ..." readonly></textarea>
        <div class="mw-btns">
          <button class="mw-btn mw-bp" onclick="mwConvert()">🔄 परिवर्तित</button>
          <button class="mw-btn mw-bs" onclick="mwCopy()">📋 कॉपी</button>
          <button class="mw-btn mw-bo" onclick="mwClear()">🗑️ साफ़</button>
        </div>
        <div class="mw-pg">
          <p>🌐 इस पूरे पेज का पाठ तिरहुता में बदलें</p>
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

    const toast = document.createElement('div');
    toast.id = 'mw-toast';

    document.body.appendChild(fab);
    document.body.appendChild(panel);
    document.body.appendChild(toast);
  }

  // Widget Functions
  let pageConverted = false, originals = [];

  window.mwConvert = function () {
    const inp = document.getElementById('mw-in').value;
    const dir = document.getElementById('mw-dir').value;
    document.getElementById('mw-out').value = convert(inp, dir);
    mwApplyFont();
  };

  window.mwApplyFont = function () {
    const font = document.getElementById('mw-font').value;
    const dir  = document.getElementById('mw-dir').value;
    const out  = document.getElementById('mw-out');
    const inp  = document.getElementById('mw-in');
    out.className = 'mw-ta'; inp.className = 'mw-ta';
    const tirEl = dir === 'dev-to-tir' ? out : inp;
    tirEl.classList.add(font === 'mithilauni' ? 'mw-fm' : 'mw-fn');
  };

  window.mwCopy = function () {
    const t = document.getElementById('mw-out').value;
    if (!t) { mwToast('⚠️ पहले परिवर्तित करें!'); return; }
    navigator.clipboard.writeText(t).then(() => mwToast('✅ कॉपी हो गया!'));
  };

  window.mwClear = function () {
    document.getElementById('mw-in').value = '';
    document.getElementById('mw-out').value = '';
  };

  window.mwConvertPage = function () {
    const btn  = document.getElementById('mw-pgbtn');
    const font = document.getElementById('mw-pgfont').value;
    const ff   = font === 'mithilauni' ? 'Mithilauni,serif' : "'Noto Sans Tirhuta',serif";

    if (!pageConverted) {
      originals = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: n => {
          if (n.parentElement.closest('#mw-panel,#mw-fab,#mw-toast,script,style')) return NodeFilter.FILTER_REJECT;
          return n.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      });
      let node;
      while ((node = walker.nextNode())) {
        originals.push({ node, orig: node.textContent });
        node.textContent = convert(node.textContent, 'dev-to-tir');
        node.parentElement.style.fontFamily = ff;
      }
      btn.textContent = '↩️ मूल पाठ वापस लाएं';
      btn.classList.add('active');
      pageConverted = true;
      mwToast('✅ पेज तिरहुता में बदल गया!');
    } else {
      originals.forEach(({ node, orig }) => {
        node.textContent = orig;
        node.parentElement.style.fontFamily = '';
      });
      originals = [];
      btn.textContent = '🔄 पेज को तिरहुता में बदलें';
      btn.classList.remove('active');
      pageConverted = false;
      mwToast('↩️ मूल पाठ वापस आ गया!');
    }
  };

  function mwToast(msg) {
    const t = document.getElementById('mw-toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function init() { injectFonts(); injectCSS(); buildWidget(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
