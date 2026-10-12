// Soglasje za piškotke – Google Maps se naloži šele po privolitvi obiskovalca.
(function () {
  const KEY = 'btinox-cookie-consent';
  const VERSION = 1;
  const MAPS_SRC = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDMFnWKq5MbJCHuPKQ_yXoKiEZ2fBNZ2gA&callback=initMap';

  const path = location.pathname;
  const lang = /-de\.html$/.test(path) || document.documentElement.lang === 'de' ? 'de'
             : /-eng\.html$/.test(path) || document.documentElement.lang === 'en' ? 'en'
             : 'sl';
  const suffix = { sl: '', en: '-eng', de: '-de' }[lang];

  const T = {
    sl: {
      title: 'Piškotki na tej strani',
      text: 'Uporabljamo samo nujno potrebne tehnične rešitve. Zemljevid Google Maps naloži piškotke in podatke tretje osebe (Google), zato ga prikažemo šele, ko se s tem strinjate.',
      more: 'Več o piškotkih',
      accept: 'Sprejmi vse',
      reject: 'Samo nujni',
      mapText: 'Zemljevid je skrit, ker niste dovolili piškotkov tretjih oseb (Google Maps).',
      mapBtn: 'Prikaži zemljevid'
    },
    en: {
      title: 'Cookies on this site',
      text: 'We only use strictly necessary technologies. The Google Maps map loads cookies and data from a third party (Google), so we only show it once you agree.',
      more: 'More about cookies',
      accept: 'Accept all',
      reject: 'Necessary only',
      mapText: 'The map is hidden because you have not allowed third-party cookies (Google Maps).',
      mapBtn: 'Show map'
    },
    de: {
      title: 'Cookies auf dieser Website',
      text: 'Wir verwenden nur technisch notwendige Lösungen. Die Google-Maps-Karte lädt Cookies und Daten eines Drittanbieters (Google), daher zeigen wir sie erst nach Ihrer Zustimmung an.',
      more: 'Mehr über Cookies',
      accept: 'Alle akzeptieren',
      reject: 'Nur notwendige',
      mapText: 'Die Karte ist ausgeblendet, da Sie Drittanbieter-Cookies (Google Maps) nicht erlaubt haben.',
      mapBtn: 'Karte anzeigen'
    }
  }[lang];

  function read() {
    try {
      const c = JSON.parse(localStorage.getItem(KEY));
      return c && c.v === VERSION ? c : null;
    } catch (e) {
      return null;
    }
  }

  function save(maps) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, maps: maps, date: new Date().toISOString() }));
    } catch (e) { /* zasebno brskanje – izbira velja samo za to stran */ }
  }

  let mapsLoaded = false;
  function loadMaps() {
    const map = document.getElementById('map');
    if (mapsLoaded || !map || typeof window.initMap !== 'function') return;
    mapsLoaded = true;
    map.innerHTML = '';
    const s = document.createElement('script');
    s.src = MAPS_SRC;
    s.async = true;
    document.body.appendChild(s);
  }

  function showMapPlaceholder() {
    const map = document.getElementById('map');
    if (!map || mapsLoaded) return;
    map.innerHTML =
      '<div class="cc-map-placeholder"><p>' + T.mapText + '</p>' +
      '<button type="button" class="cc-btn cc-btn-primary">' + T.mapBtn + '</button></div>';
    map.querySelector('button').addEventListener('click', () => {
      save(true);
      hideBanner();
      loadMaps();
    });
  }

  let banner;
  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function showBanner(focus) {
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'cc-banner';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-labelledby', 'cc-title');
      banner.innerHTML =
        '<div class="cc-inner">' +
          '<div class="cc-copy">' +
            '<p class="cc-title" id="cc-title">' + T.title + '</p>' +
            '<p class="cc-text">' + T.text + ' <a href="piskotki' + suffix + '.html">' + T.more + '</a></p>' +
          '</div>' +
          '<div class="cc-actions">' +
            '<button type="button" class="cc-btn" data-cc="reject">' + T.reject + '</button>' +
            '<button type="button" class="cc-btn cc-btn-primary" data-cc="accept">' + T.accept + '</button>' +
          '</div>' +
        '</div>';
      banner.addEventListener('click', e => {
        const choice = e.target.getAttribute('data-cc');
        if (!choice) return;
        const maps = choice === 'accept';
        save(maps);
        hideBanner();
        if (maps) loadMaps();
        else if (mapsLoaded) location.reload(); // umik privolitve – odstrani že naloženi zemljevid
        else showMapPlaceholder();
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
    if (focus) banner.querySelector('[data-cc="accept"]').focus({ preventScroll: true });
  }

  // Povezava »Nastavitve piškotkov« v nogi
  window.openCookieSettings = function (e) {
    if (e) e.preventDefault();
    showBanner(true);
  };

  function init() {
    const consent = read();
    if (consent && consent.maps) {
      loadMaps();
    } else {
      showMapPlaceholder();
      if (!consent) showBanner();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
