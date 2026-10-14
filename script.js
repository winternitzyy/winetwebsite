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

  // Contact form: no backend yet, so hand the message to the visitor's email client
  var form = document.getElementById('contact-form');
  var status = form.querySelector('.form-status');
  var email = document.querySelector('[data-contact-email]').textContent.trim();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      var ok = field.value.trim() !== '' && (field.type !== 'email' || /^\S+@\S+\.\S+$/.test(field.value));
      field.classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      status.textContent = 'Please fill in your name, a valid email and a short message.';
      return;
    }
    var data = new FormData(form);
    var subject = 'Website enquiry from ' + data.get('name') + (data.get('company') ? ' (' + data.get('company') + ')' : '');
    var body = data.get('message') + '\n\n' + data.get('name') + '\n' + data.get('email');
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    status.textContent = 'Thanks! Your email app should open with your message ready to send.';
  });
})();
