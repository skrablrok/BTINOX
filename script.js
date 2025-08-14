const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
function toggleMenu() {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('menu-open');
  menuIcon.classList.toggle('bx-menu');
  menuIcon.classList.toggle('bx-x');
}
menuIcon.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
function redirectLanguage(select) {
  const lang = select.value;
  if (lang === 'en') {
    window.location.href = 'en/index.html';
  } else if (lang === 'it') {
    window.location.href = 'it/index.html';
  } else {
    window.location.href = 'index.html';
  }
}






















const heroBtns = document.querySelectorAll('.hero-btn');
const heroSlides = document.querySelectorAll('.hero-slide');

let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 5000); // vsakih 5 sekund

function showSlide(index) {
  // odstrani trenutno aktivne
  document.querySelector('.hero-slide.active')?.classList.remove('active');
  document.querySelector('.hero-btn.active')?.classList.remove('active');

  // aktiviraj nove
  heroSlides[index].classList.add('active');
  heroBtns[index].classList.add('active');
  currentIndex = index;
}

function nextSlide() {
  let nextIndex = (currentIndex + 1) % heroSlides.length;
  showSlide(nextIndex);
}

// ročna menjava - resetira interval
heroBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    showSlide(index);
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}




































const accordionItems = document.querySelectorAll('.accordion-item');
const image = document.getElementById('accordion-image');
accordionItems.forEach(item => {
  const toggleBtn = item.querySelector('.toggle-btn');
  const content = item.querySelector('.accordion-content');
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prepreči podvajanje klikov
    const isActive = item.classList.contains('active');
    // Zapri vse
    accordionItems.forEach(i => {
      i.classList.remove('active');
      i.querySelector('.accordion-content').style.maxHeight = null;
      i.querySelector('.accordion-content').style.opacity = 0;
      i.querySelector('.toggle-btn').style.transform = 'rotate(0deg)';
    });
    if (!isActive) {
      item.classList.add('active');
      // Slika fade-out in zamenjava
      image.classList.add('fade-out');
      setTimeout(() => {
        const newImage = item.getAttribute('data-image');
        if (newImage) image.src = newImage;
        image.classList.remove('fade-out');
      }, 300);
      // Besedilo animacija
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = 1;
      // Rotiraj plus v križec
      toggleBtn.style.transform = 'rotate(45deg)';
    }
  });
});

































window.addEventListener("scroll", function () {
    const glava = document.querySelector(".glava");
    if (window.scrollY > 50) {
      glava.classList.add("scroll");
    } else {
      glava.classList.remove("scroll");
    }
  });


































document.querySelectorAll('.storitev-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('open');
    });
  });




























window.addEventListener("scroll", () => {
    const heroHeight = document.querySelector(".hero").offsetHeight;
    const scrollY = window.scrollY;

    document.querySelectorAll(".hero-slide").forEach(slide => {
        const content = slide.querySelector(".hero-content");

        // Izračun fade
        let opacity = 1 - scrollY / (heroHeight / 1.5);
        opacity = Math.max(0, Math.min(1, opacity));
        content.style.opacity = opacity;

        // Počasno premikanje gor
        let translateY = scrollY * 0.4;
        content.style.transform = `translateY(${translateY}px)`;
    });
});


















if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const lenis = new Lenis({
        duration: 0.5,
        easing: t => Math.min(1, 1 - Math.pow(1 - t, 3)),
        smoothWheel: true,
        smoothTouch: false,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      document.addEventListener('click', e => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { duration: 1.2 });
        }
      });
    }