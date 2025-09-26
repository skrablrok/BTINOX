function redirectLanguage(select) {
    const lang = select.value;

    // povezave do posameznih strani
    const pages = {
      sl: "index.html",
      en: "index-eng.html",
      de: "index-de.html"
    };

    // preusmeritev na pravo stran
    if (pages[lang]) {
      window.location.href = pages[lang];
    }
  }