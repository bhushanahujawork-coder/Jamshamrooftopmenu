(function () {
  var sid = sessionStorage.getItem('jsr_sid');
  if (!sid) {
    sid = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : 's-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    try { sessionStorage.setItem('jsr_sid', sid); } catch (e) {}
  }
  var queue = [];
  var page = location.pathname;

  function flush() {
    if (!queue.length) return;
    var batch = queue.splice(0, queue.length);
    try {
      var blob = new Blob([JSON.stringify({ sid: sid, events: batch })], { type: 'application/json' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', blob);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/analytics', true);
        xhr.send(blob);
      }
    } catch (e) {
      queue = [];
    }
  }

  window.JSR_Analytics = {
    sid: sid,
    track: function (name, data) {
      queue.push({ n: name, d: data || {}, t: Date.now(), u: page });
      if (queue.length >= 10) flush();
    }
  };

  window.addEventListener('pagehide', flush);
  setInterval(flush, 8000);
})();
