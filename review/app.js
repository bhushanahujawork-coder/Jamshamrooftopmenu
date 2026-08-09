(function () {

  var BUSINESS_ID = window.JSR_BUSINESS_ID || 'jamshamCafe';
  var business = window.JSR_BUSINESSES[BUSINESS_ID] || window.JSR_BUSINESSES.jamshamCafe;
  var sessionKey = 'jsr_sess_' + business.id;

  var LANGS_ORDER = ['en', 'hg'];

  var RATING_LABELS = { 1: 'Terrible', 2: 'Poor', 3: 'Okay', 4: 'Good', 5: 'Amazing!' };

  var state = {
    rating: 0,
    lastRating: 0,
    genCount: 0,
    used: [],
    loading: false,
    generated: false
  };

  var serverOwnerReviews = [];
  var ownerReviewsLoaded = false;
  var pendingGenerate = null;

  function fetchOwnerReviews(cb) {
    fetch('/api/reviews?business=' + business.id)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.ok && Array.isArray(d.reviews)) serverOwnerReviews = d.reviews;
        ownerReviewsLoaded = true;
        if (cb) cb();
        if (pendingGenerate) { var g = pendingGenerate; pendingGenerate = null; g(); }
      })
      .catch(function () {
        ownerReviewsLoaded = true;
        if (cb) cb();
        if (pendingGenerate) { var g = pendingGenerate; pendingGenerate = null; g(); }
      });
  }

  function loadSession() {
    try {
      var raw = sessionStorage.getItem(sessionKey);
      if (raw) {
        var s = JSON.parse(raw);
        state.genCount = s.genCount || 0;
        state.used = s.used || [];
      }
    } catch (e) {}
  }

  function loadSharedUsed() {
    try {
      var raw = localStorage.getItem('jsr_shared_used');
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveSharedUsed(list) {
    try {
      localStorage.setItem('jsr_shared_used', JSON.stringify(list.slice(-150)));
    } catch (e) {}
  }

  function saveSession() {
    try {
      sessionStorage.setItem(sessionKey, JSON.stringify({ genCount: state.genCount, used: state.used }));
    } catch (e) {}
  }

  function resetUsed() {
    state.used = [];
    state.generated = false;
    var res = document.getElementById('rf-results');
    if (res) { res.innerHTML = ''; res.classList.remove('show'); }
    saveSession();
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function renderLogo() {
    var lg = business.logo || { type: 'monogram', label: 'JS', emoji: '☕' };
    if (lg.type === 'image') {
      return '<img class="rf-logo rf-logo-img" src="' + lg.src + '" alt="' + business.name + '">';
    }
    return '<div class="rf-logo">' +
      '<div class="rf-logo-monogram">' + (lg.label || business.name.slice(0, 2)) + '</div>' +
      '<div class="rf-logo-emoji">' + (lg.emoji || '☕') + '</div>' +
      '</div>';
  }

  function render() {
    var root = document.getElementById('rf-root');
    root.innerHTML =
      '<main class="rf-main">' +
        '<header class="rf-head">' +
          renderLogo() +
          '<div class="rf-brand">' +
            '<h1 class="rf-name">' + business.name + '</h1>' +
            '<p class="rf-tagline">' + business.tagline + '</p>' +
          '</div>' +
          '<p class="rf-question">How was your experience?</p>' +
        '</header>' +

        '<section class="rf-card" id="rf-step-rating">' +
          '<div class="rf-step-title">Tap your rating</div>' +
          '<div class="rf-stars" id="rfStars" role="radiogroup" aria-label="Rating"></div>' +
          '<div class="rf-rating-label" id="rfRatingLabel">Tap a star — your review appears below</div>' +
        '</section>' +

        '<div class="rf-actions">' +
          '<div class="rf-status" id="rfStatus" hidden>' +
            '<span class="rf-status-dot"></span>' +
            '<span id="rfStatusText">Crafting your reviews…</span>' +
          '</div>' +
        '</div>' +

        '<div class="rf-limit" id="rfLimit" hidden>' +
          '<div class="rf-limit-emoji">🎉</div>' +
          '<p>You have unlocked all <b>10 review suggestions</b> for this session.</p>' +
          '<p class="rf-limit-sub">Thank you for your feedback — we really appreciate it!</p>' +
        '</div>' +

        '<section class="rf-results" id="rf-results"></section>' +

        '<section class="rf-savedsec" id="rfSavedSec"></section>' +

        '<footer class="rf-foot">' +
          '<p class="rf-privacy">No personal details are collected. Reviews are posted by you, on Google.</p>' +
          '<p class="rf-credit">' + business.name + ' · ' + business.location + '</p>' +
        '</footer>' +
      '</main>' +
      '<div class="rf-toast" id="rfToast" role="status"></div>';
  }

  function buildStars() {
    var box = document.getElementById('rfStars');
    box.innerHTML = '';
    for (var i = 1; i <= 5; i++) {
      var btn = el('button', 'rf-star', '★');
      btn.setAttribute('aria-label', i + ' star' + (i > 1 ? 's' : ''));
      btn.setAttribute('role', 'radio');
      btn.setAttribute('data-v', i);
      (function (n) {
        btn.addEventListener('click', function () { selectRating(n); });
      })(i);
      box.appendChild(btn);
    }
  }

  function paintStars() {
    var btns = document.querySelectorAll('#rfStars .rf-star');
    btns.forEach(function (b, i) {
      b.classList.toggle('on', i < state.rating);
    });
    var lbl = document.getElementById('rfRatingLabel');
    if (state.rating) lbl.textContent = RATING_LABELS[state.rating];
  }

  function selectRating(n) {
    var changed = n !== state.lastRating;
    state.lastRating = n;
    state.rating = n;
    paintStars();
    if (state.generated) resetUsed();
    JSR_Analytics.track('rating_selected', { rating: n });
    if (changed) {
      generate(true);
    } else {
      toast('Already showing reviews for ' + RATING_LABELS[n] + ' — tap Shuffle for more 🙂', 2200);
    }
  }

  function toast(msg, ms) {
    var t = document.getElementById('rfToast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove('show'); }, ms || 2600);
  }

  function spinner(on, msg) {
    var st = document.getElementById('rfStatus');
    st.hidden = !on;
    if (msg) document.getElementById('rfStatusText').textContent = msg;
  }

  function generate(countBatch) {
    if (state.loading) return;
    if (!ownerReviewsLoaded) {
      pendingGenerate = function () { generate(countBatch); };
      return;
    }
    if (!state.rating) {
      toast('Please tap a star rating first ⭐');
      var step = document.getElementById('rf-step-rating');
      step.scrollIntoView({ behavior: 'smooth', block: 'center' });
      step.classList.add('shake');
      setTimeout(function () { step.classList.remove('shake'); }, 500);
      return;
    }
    if (countBatch && state.genCount >= business.maxGenerations) {
      document.getElementById('rfLimit').hidden = false;
      document.getElementById('rfLimit').scrollIntoView({ behavior: 'smooth', block: 'center' });
      JSR_Analytics.track('rate_limit_reached', { generations: state.genCount });
      toast('You have reached the suggestion limit for this session 🙂');
      return;
    }

    var isFirst = state.genCount === 0;
    var useAI = !isFirst && business.ai && business.ai.enabled && business.ai.endpoint;
    if (countBatch) {
      state.genCount++;
      saveSession();
    }

    JSR_Analytics.track('review_generation', {
      generation: state.genCount,
      count: LANGS_ORDER.length,
      source: useAI ? 'ai' : 'templates',
      rating: state.rating,
      languages: LANGS_ORDER.join(',')
    });

    var ctx = {
      rating: state.rating,
      biz: business.name,
      loc: business.location,
      used: state.used.concat(loadSharedUsed()),
      count: LANGS_ORDER.length
    };

    if (!useAI) {
      finish(templateReviews(ctx), 'templates');
      return;
    }

    state.loading = true;
    spinner(true);
    var done = false;
    var t = setTimeout(function () {
      if (done) return;
      done = true;
      state.loading = false;
      spinner(false);
      toast('Took too long — showing offline suggestions', 3200);
      finish(templateReviews(ctx), 'templates');
    }, 8000);

    fetch(business.ai.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        business: business.name,
        location: business.location,
        rating: state.rating,
        languages: LANGS_ORDER,
        previousReviews: state.used,
        count: LANGS_ORDER.length
      })
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (done) return;
      done = true;
      state.loading = false;
      spinner(false);
      if (data && data.ok && Array.isArray(data.reviews) && data.reviews.length) {
        finish(data.reviews.slice(0, LANGS_ORDER.length), 'ai');
      } else {
        toast('AI is unavailable — using offline suggestions', 3200);
        finish(templateReviews(ctx), 'templates');
      }
    }).catch(function () {
      if (done) return;
      done = true;
      state.loading = false;
      spinner(false);
      toast('Network issue — using offline suggestions', 3200);
      finish(templateReviews(ctx), 'templates');
    });
  }

  function loadOwnerReviews() {
    var list = [];
    try {
      var raw = localStorage.getItem('jsr_owner_reviews');
      if (raw) list = list.concat(JSON.parse(raw) || []);
    } catch (e) {}
    if (ownerReviewsLoaded) list = list.concat(serverOwnerReviews);
    return list;
  }

  function loadSavedReviews() {
    try {
      var raw = localStorage.getItem('jsr_saved_reviews');
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveSavedReviews(list) {
    try {
      localStorage.setItem('jsr_saved_reviews', JSON.stringify(list.slice(-40)));
    } catch (e) {}
  }

  function templateReviews(ctx) {
    var out = [];
    ctx.items = business.menuItems || [];
    var owner = loadOwnerReviews().filter(function (r) {
      return r.rating === ctx.rating &&
        (r.biz === 'both' || r.biz === business.id);
    });
    var sharedUsed = loadSharedUsed();
    for (var i = 0; i < LANGS_ORDER.length; i++) {
      var lang = LANGS_ORDER[i];
      var pool = owner.filter(function (r) {
        return r.language === lang &&
          ctx.used.indexOf(r.text) === -1 &&
          sharedUsed.indexOf(r.text) === -1;
      });
      var one = null;
      if (pool.length) {
        one = pool[Math.floor(Math.random() * pool.length)].text;
      }
      if (!one) {
        var gen = window.JSR_TEMPLATES.generate({
          rating: ctx.rating,
          used: ctx.used,
          biz: ctx.biz,
          loc: ctx.loc,
          language: lang,
          count: 1
        });
        if (gen && gen.length) one = gen[0];
      }
      if (one) out.push(one);
    }
    return out;
  }

  function finish(reviews, source) {
    state.generated = true;
    reviews.forEach(function (r) {
      if (state.used.indexOf(r) === -1) state.used.push(r);
    });
    state.used = state.used.slice(-60);
    var shared = loadSharedUsed();
    reviews.forEach(function (r) {
      if (shared.indexOf(r) === -1) shared.push(r);
    });
    saveSharedUsed(shared);
    saveSession();
    renderCards(reviews, source);
    var res = document.getElementById('rf-results');
    res.classList.add('show');
    res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (state.genCount >= business.maxGenerations) {
      document.getElementById('rfLimit').hidden = false;
    }
  }

  function renderCards(reviews, source) {
    var res = document.getElementById('rf-results');
    res.innerHTML = '';

    var head = el('div', 'rf-res-head');
    var headTitle = el('div', 'rf-res-title', 'Your review options');
    var headMeta = el('div', 'rf-res-meta',
      'Batch ' + state.genCount + ' of ' + business.maxGenerations +
      ' · ' + RATING_LABELS[state.rating] +
      (state.rating >= 4 ? ' · ' + state.rating + ' ★' : '') +
      ' · English + Hinglish');
    if (source === 'ai') headMeta.textContent += ' · ✨ AI enhanced';
    head.appendChild(headTitle);
    head.appendChild(headMeta);
    res.appendChild(head);

    reviews.forEach(function (text, idx) {
      var card = el('article', 'rf-card rf-review');
      card.setAttribute('data-i', idx);

      var langLabel = window.JSR_TEMPLATES.languageName[LANGS_ORDER[idx]] || LANGS_ORDER[idx];
      var langEmoji = { en: '🌍', hg: '💬' }[LANGS_ORDER[idx]] || '';
      var badge = el('div', 'rf-review-top',
        '<span class="rf-lang-badge"><span class="rf-badge-stars">' + state.rating + ' ★</span>' + langEmoji + ' ' + langLabel + '</span>');

      var ta = el('textarea', 'rf-editor-input', '');
      ta.value = text;
      ta.maxLength = 1200;
      ta.setAttribute('aria-label', langLabel + ' review');
      autosize(ta);
      ta.addEventListener('input', function () { autosize(ta); });

      var action = el('div', 'rf-review-action');
      var actionRow = el('div', 'rf-action-row');
      var saveBtn = el('button', 'rf-save-btn',
        '<span class="rf-save-icon">💾</span><span class="rf-save-label">Save</span>');
      saveBtn.type = 'button';

      function saveReview() {
        var val = ta.value.trim() || text;
        var saved = loadSavedReviews();
        saved.push({ text: val, rating: state.rating, language: LANGS_ORDER[idx], business: business.id, savedAt: Date.now() });
        saveSavedReviews(saved);
        saveBtn.classList.add('saved');
        saveBtn.querySelector('.rf-save-label').textContent = 'Saved ✓';
        JSR_Analytics.track('review_saved', { index: idx, language: LANGS_ORDER[idx] });
        toast('Review saved on this device 💾', 2400);
      }
      saveBtn.addEventListener('click', saveReview);
      actionRow.appendChild(saveBtn);

      var copyBtn = el('button', 'rf-copy-btn',
        '<span class="rf-copy-icon">⭐</span><span class="rf-copy-label">Post Review on Google</span>');
      copyBtn.type = 'button';

      function copyAndGo() {
        var finalText = ta.value.trim() || text;
        JSR_Analytics.track('review_option_selected', { index: idx, generation: state.genCount });
        JSR_Analytics.track('copy_clicked', { index: idx });
        var copied = false;
        var fallback = function () {
          try {
            var temp = document.createElement('textarea');
            temp.value = finalText;
            temp.style.position = 'fixed';
            temp.style.opacity = '0';
            document.body.appendChild(temp);
            temp.select();
            copied = document.execCommand('copy');
            document.body.removeChild(temp);
          } catch (e) { copied = false; }
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(finalText).then(function () {
            copied = true;
            markCopied();
          }).catch(fallback);
        } else {
          fallback();
        }
        markCopied();
        window.open(business.reviewUrl, '_blank', 'noopener');
        JSR_Analytics.track('google_redirect_clicked', { index: idx, url: business.reviewUrl });
        if (!copied) {
          setTimeout(function () {
            toast('Auto-copy blocked — long press the text to copy manually 🙂', 4200);
          }, 600);
        }
        function markCopied() {
          copyBtn.classList.add('copied');
          copyBtn.querySelector('.rf-copy-label').textContent = 'Review copied! Opening Google…';
        }
      }

      copyBtn.addEventListener('click', copyAndGo);
      actionRow.appendChild(copyBtn);
      action.appendChild(actionRow);
      card.appendChild(badge);
      card.appendChild(ta);
      card.appendChild(action);

      res.appendChild(card);
    });

    var regenWrap = el('div', 'rf-regen');
    if (state.genCount < business.maxGenerations) {
      var regen = el('button', 'rf-regen-btn', '🔄 Shuffle ' + LANGS_ORDER.length + ' more');
      regen.type = 'button';
      regen.addEventListener('click', function () { generate(false); });
      regenWrap.appendChild(regen);
    }
    res.appendChild(regenWrap);
  }

  function autosize(ta) {
    ta.style.height = 'auto';
    ta.style.height = (ta.scrollHeight + 2) + 'px';
  }

  function renderSavedSec() {
    var sec = document.getElementById('rfSavedSec');
    if (!sec) return;
    var list = loadSavedReviews().filter(function (r) { return r.business === business.id; });
    if (!list.length) {
      sec.innerHTML = '';
      sec.classList.remove('show');
      return;
    }
    var items = '';
    list.forEach(function (r, i) {
      var lbl = window.JSR_TEMPLATES.languageName[r.language] || r.language;
      var emo = { en: '🌍', hg: '💬' }[r.language] || '';
      items +=
        '<div class="rf-card rf-saved-item">' +
          '<div class="rf-review-top">' +
            '<span class="rf-lang-badge"><span class="rf-badge-stars">' + r.rating + ' ★</span>' + emo + ' ' + lbl + '</span>' +
            '<button class="rf-saved-del" data-i="' + i + '" type="button" aria-label="Delete">🗑</button>' +
          '</div>' +
          '<p class="rf-saved-text"></p>' +
          '<div class="rf-action-row">' +
            '<button class="rf-copy-btn rf-saved-copy" data-i="' + i + '" type="button"><span class="rf-copy-icon">📋</span><span class="rf-copy-label">Copy</span></button>' +
          '</div>' +
        '</div>';
    });
    sec.innerHTML =
      '<div class="rf-saved-head">💾 Saved reviews on this device</div>' + items;
    sec.classList.add('show');

    sec.querySelectorAll('.rf-saved-text').forEach(function (p, i) {
      p.textContent = list[i].text;
    });

    sec.querySelectorAll('.rf-saved-copy').forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        var txt = list[i].text;
        var fallback = function () {
          try {
            var temp = document.createElement('textarea');
            temp.value = txt;
            temp.style.position = 'fixed';
            temp.style.opacity = '0';
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
          } catch (e) {}
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).then(function () {
            btn.querySelector('.rf-copy-label').textContent = 'Copied ✓';
            setTimeout(function () { btn.querySelector('.rf-copy-label').textContent = 'Copy'; }, 1600);
          }).catch(fallback);
        } else {
          fallback();
          btn.querySelector('.rf-copy-label').textContent = 'Copied ✓';
          setTimeout(function () { btn.querySelector('.rf-copy-label').textContent = 'Copy'; }, 1600);
        }
        JSR_Analytics.track('saved_review_copied', { index: i });
      });
    });

    sec.querySelectorAll('.rf-saved-del').forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        var updated = loadSavedReviews();
        updated.splice(i, 1);
        saveSavedReviews(updated);
        renderSavedSec();
        toast('Saved review delete ho gaya 🗑', 2000);
      });
    });
  }

  function init() {
    render();
    buildStars();
    paintStars();
    loadSession();
    renderSavedSec();
    fetchOwnerReviews();
    JSR_Analytics.track('page_visit', { business: business.id, generationCount: state.genCount });
    if (state.genCount >= business.maxGenerations) {
      document.getElementById('rfLimit').hidden = false;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
