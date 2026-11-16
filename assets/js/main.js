(function () {
  var root = document.documentElement;
  // Opening sequence: loader, curtain, then the hero comes in piece by piece.
  if (root.classList.contains('intro-on')) {
    var word = document.getElementById('intro-word'), fill = document.getElementById('intro-fill'),
        count = document.getElementById('intro-count'), intro = document.querySelector('.intro');
    var words = [['Namaste', 'en'], ['नमस्ते', 'hi'], ['Hello', 'en'], ['Namaste', 'en']], wi = 0;
    var cycle = setInterval(function () {
      wi = Math.min(wi + 1, words.length - 1);
      word.classList.remove('swap'); void word.offsetWidth; word.classList.add('swap');
      word.textContent = words[wi][0]; word.lang = words[wi][1];
    }, 380);
    var t0 = performance.now(), MIN = 1500;
    var heroImg = document.querySelector('.portrait img');
    var assets = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      heroImg && !heroImg.complete ? new Promise(function (r) { heroImg.onload = heroImg.onerror = r; }) : Promise.resolve()
    ]);
    var cap = new Promise(function (r) { setTimeout(r, 3200); });
    var loaded = false; Promise.race([assets, cap]).then(function () { loaded = true; });
    (function tick(now) {
      var p = Math.min((now - t0) / MIN, 1);
      if (!loaded) p = Math.min(p, 0.9);
      var e = 1 - Math.pow(1 - p, 3);
      fill.style.transform = 'scaleX(' + e + ')';
      count.textContent = String(Math.round(e * 100)).padStart(3, '0');
      if (p < 1) return requestAnimationFrame(tick);
      clearInterval(cycle);
      try { sessionStorage.setItem('intro-seen', '1'); } catch (er) {}
      setTimeout(function () {
        root.classList.add('intro-out', 'ready');
        setTimeout(function () {
          root.classList.remove('intro-on', 'intro-out');
          if (intro) intro.remove();
        }, 1300);
      }, 220);
    })(t0);
  } else if (root.classList.contains('anim')) {
    requestAnimationFrame(function () { root.classList.add('ready'); });
  }
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // Mobile menu: collapse a long nav behind a button
  var navBar = document.querySelector('.nav'), navEl = navBar && navBar.querySelector('nav');
  if (navEl && navEl.querySelectorAll('a').length > 3) {
    navBar.classList.add('has-menu');
    navEl.id = navEl.id || 'site-menu';
    var mb = document.createElement('button');
    mb.className = 'menu-btn'; mb.type = 'button';
    mb.setAttribute('aria-controls', navEl.id); mb.setAttribute('aria-expanded', 'false');
    mb.setAttribute('aria-label', 'Open menu');
    mb.innerHTML = '<span></span>';
    var tools = document.createElement('div'); tools.className = 'nav-tools';
    var swb = navBar.querySelector('.switch');
    if (swb) tools.appendChild(swb);
    tools.appendChild(mb);
    navBar.querySelector('.wrap').appendChild(tools);
    var setMenu = function (open) {
      navBar.classList.toggle('open', open);
      root.classList.toggle('menu-open', open);
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
      mb.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    mb.addEventListener('click', function () { setMenu(!navBar.classList.contains('open')); });
    navEl.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navBar.classList.contains('open')) { setMenu(false); mb.focus(); }
    });
    document.addEventListener('click', function (e) { if (!navBar.contains(e.target)) setMenu(false); });
    window.matchMedia('(min-width: 761px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  // Motion switch
  var sw = document.querySelector('.switch');
  function setMotion(on) {
    root.classList.toggle('nomotion', !on);
    if (sw) { sw.setAttribute('aria-pressed', on ? 'false' : 'true'); sw.textContent = on ? 'Motion on' : 'Motion off'; }
    store.set('motion', on ? 'on' : 'off');
  }
  if (sw) {
    sw.addEventListener('click', function () { setMotion(root.classList.contains('nomotion')); });
    if (store.get('motion') === 'off') setMotion(false);
  }

  // Lamp-lit lattice follows the pointer (drifts on touch / when idle)
  var jaali = document.querySelector('.jaali');
  if (jaali) {
    var hero = jaali.parentElement, drift = true, t = 0;
    hero.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      drift = false;
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
      hero.style.setProperty('--my', ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
      jaali.style.setProperty('--x', (e.clientX - r.left) + 'px');
      jaali.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });
    hero.addEventListener('pointerleave', function () { drift = true; });
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    (function loop() {
      if (drift && !still && !root.classList.contains('nomotion')) {
        t += 0.006;
        hero.style.setProperty('--mx', (Math.sin(t) * 0.5).toFixed(3));
        hero.style.setProperty('--my', (Math.cos(t * 0.8) * 0.4).toFixed(3));
        jaali.style.setProperty('--x', (62 + Math.sin(t) * 18) + '%');
        jaali.style.setProperty('--y', (38 + Math.cos(t * 0.8) * 22) + '%');
      }
      requestAnimationFrame(loop);
    })();
  }

  // Greeting toggle
  var greet = document.getElementById('greet'), lang = document.querySelector('.lang');
  if (greet && lang) {
    var hi = false;
    lang.addEventListener('click', function () {
      hi = !hi;
      greet.textContent = hi ? 'नमस्ते, मैं आरनव हूँ।' : 'Namaste, I’m Aarnav.';
      greet.setAttribute('lang', hi ? 'hi' : 'en');
      lang.textContent = hi ? 'English' : 'हिन्दी';
      lang.setAttribute('aria-label', hi ? 'Switch greeting to English' : 'Switch greeting to Hindi');
    });
  }

  // Quiet reveal for a few key blocks
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rv.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (n) { io.observe(n); });
  } else { rv.forEach(function (n) { n.classList.add('in'); }); }

  // Copy email
  var copy = document.getElementById('copy-mail'), st = document.getElementById('copy-status');
  if (copy) {
    copy.addEventListener('click', function () {
      var addr = document.getElementById('mail').textContent.trim();
      function ok() { st.textContent = 'Copied. I read every email.'; }
      function fail() {
        var rg = document.createRange(); rg.selectNodeContents(document.getElementById('mail'));
        var s = getSelection(); s.removeAllRanges(); s.addRange(rg);
        st.textContent = 'Address selected, press copy on your keyboard.';
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(addr).then(ok, fail); else fail();
    });
  }

  // Cricket ball: a six
  var ball = document.getElementById('ball');
  if (ball) {
    ball.addEventListener('click', function () {
      var s = document.querySelector('.six'), r = ball.getBoundingClientRect();
      var out = document.getElementById('six-msg');
      if (out) out.textContent = 'SIX! Over the keeper’s head.';
      if (root.classList.contains('nomotion') || !s.animate) return;
      var x0 = r.left + r.width / 2, y0 = r.top + r.height / 2;
      s.style.opacity = 1;
      s.animate([
        { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(1)', opacity: 1 },
        { transform: 'translate(' + (x0 + innerWidth * 0.25) + 'px,' + (y0 - innerHeight * 0.5) + 'px) scale(.6)', opacity: 1, offset: 0.55 },
        { transform: 'translate(' + (x0 + innerWidth * 0.5) + 'px,' + (y0 - innerHeight * 0.2) + 'px) scale(.2)', opacity: 0 }
      ], { duration: 1100, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = function () { s.style.opacity = 0; };
    });
  }

  // Attendance sheet demo (sample data)
  var tb = document.getElementById('att-body');
  if (tb) {
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var people = [
      ['Asha (sample)', ['P', 'P', 'P', 'P', 'P', 'H']],
      ['Rohan (sample)', ['P', 'A', 'P', 'L', 'P', 'H']],
      ['Meera (sample)', ['P', 'P', 'A', 'P', 'P', 'H']]
    ];
    var order = ['P', 'A', 'L', 'H'];
    var names = { P: 'Present', A: 'Absent', L: 'On leave', H: 'Holiday' };
    var live = document.getElementById('att-sum');
    function recount() {
      var c = { P: 0, A: 0, L: 0, H: 0 };
      tb.querySelectorAll('.cell').forEach(function (b) { c[b.dataset.s]++; });
      var working = c.P + c.A + c.L;
      live.textContent = 'Present ' + c.P + ' · Absent ' + c.A + ' · Leave ' + c.L + ' · Holiday ' + c.H +
        (working ? ' — attendance ' + Math.round(c.P / working * 100) + '%' : '');
    }
    people.forEach(function (p) {
      var tr = document.createElement('tr'), th = document.createElement('td');
      th.textContent = p[0]; tr.appendChild(th);
      p[1].forEach(function (s, i) {
        var td = document.createElement('td'), b = document.createElement('button');
        b.className = 'cell'; b.type = 'button'; b.dataset.s = s; b.textContent = s;
        b.setAttribute('aria-label', p[0] + ', ' + days[i] + ': ' + names[s] + '. Press to change.');
        b.addEventListener('click', function () {
          var n = order[(order.indexOf(b.dataset.s) + 1) % order.length];
          b.dataset.s = n; b.textContent = n;
          b.setAttribute('aria-label', p[0] + ', ' + days[i] + ': ' + names[n] + '. Press to change.');
          recount();
        });
        td.appendChild(b); tr.appendChild(td);
      });
      tb.appendChild(tr);
    });
    document.getElementById('att-reset').addEventListener('click', function () {
      tb.innerHTML = ''; // rebuild by re-running the loop
      people.forEach(function () {});
      location.reload();
    });
    recount();
  }
})();
