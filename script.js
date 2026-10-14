(function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Header shadow once the page scrolls
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Fade sections in as they come into view
  var targets = document.querySelectorAll('.card, .steps li, .values li, .section-head, .statement blockquote');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  // Keep the footer year and the years-of-experience figures current
  var thisYear = new Date().getFullYear();
  document.getElementById('year').textContent = thisYear;
  document.querySelectorAll('[data-years-since]').forEach(function (el) {
    el.textContent = thisYear - Number(el.getAttribute('data-years-since'));
  });

  // Contact form: sent through FormSubmit (formsubmit.co), which forwards each enquiry to Winet's inbox
  var form = document.getElementById('contact-form');
  var status = form.querySelector('.form-status');
  var submit = form.querySelector('button[type="submit"]');
  var email = document.querySelector('[data-contact-email]').textContent.trim();

  var setStatus = function (text, isError) {
    status.textContent = text;
    status.classList.toggle('is-error', !!isError);
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      var ok = field.value.trim() !== '' && (field.type !== 'email' || /^\S+@\S+\.\S+$/.test(field.value));
      field.classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      setStatus('Please fill in your name, a valid email and a short message.', true);
      return;
    }

    var data = new FormData(form);
    var payload = {
      name: data.get('name'),
      email: data.get('email'),
      company: data.get('company') || '-',
      message: data.get('message'),
      _subject: 'Website enquiry from ' + data.get('name') + (data.get('company') ? ' (' + data.get('company') + ')' : ''),
      _replyto: data.get('email'),
      _honey: data.get('_honey') || '',
      _template: 'table'
    };

    submit.disabled = true;
    submit.textContent = 'Sending…';
    setStatus('');

    // FormSubmit alias for service@win-net.co.uk, so the address isn't exposed in the form endpoint
    fetch('https://formsubmit.co/ajax/527b494e88e90ac37d178a58eb384f8e', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (String(json.success) !== 'true') throw new Error(json.message || 'Not sent');
        form.reset();
        setStatus('Thanks, your message has been sent. We’ll be in touch soon.');
      })
      .catch(function () {
        setStatus('Sorry, your message didn’t send. Please email ' + email + ' or call 07838 048852.', true);
      })
      .then(function () {
        submit.disabled = false;
        submit.textContent = 'Send message';
      });
  });

  // Orange glow: trails the mouse on computers, follows a finger on touch screens
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    var x = window.innerWidth / 2, y = window.innerHeight / 3;
    var tx = x, ty = y, running = false, hideTimer;

    var frame = function () {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      glow.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) requestAnimationFrame(frame);
      else running = false;
    };
    var moveTo = function (px, py) {
      tx = px; ty = py;
      glow.classList.add('on');
      if (!running) { running = true; requestAnimationFrame(frame); }
    };

    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'mouse') moveTo(e.clientX, e.clientY);
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { glow.classList.remove('on'); });

    var onTouch = function (e) {
      var t = e.touches[0];
      if (!t) return;
      clearTimeout(hideTimer);
      moveTo(t.clientX, t.clientY);
    };
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', function () {
      hideTimer = setTimeout(function () { glow.classList.remove('on'); }, 900);
    }, { passive: true });
  }
})();
