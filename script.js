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


























window.addEventListener('scroll', function() {
  const header = document.querySelector('.glava');
  const logo = this.document.getElementById("menjava_logotip");
  if (window.scrollY > 50) { // ko scrollaš več kot 50px
    logo.src = "logo/logo.png";
    header.classList.add('scroll');
    
  } else {
    logo.src = "logo/logo_white.png";
    header.classList.remove('scroll');
  }
});







// Pridobi element glave
const glava = document.querySelector('.glava');

window.addEventListener('scroll', () => {
  if(window.scrollY > 0){
    glava.classList.add('scroll');
  } else {
    glava.classList.remove('scroll');
  }
});


































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
const imageContainer = document.getElementById('accordion-image').parentElement; 

function loadAccordionImages(item) {
  imageContainer.innerHTML = ""; // počisti stare slike
  const imageData = item.getAttribute('data-image');
  if (imageData) {
    const images = imageData.split(',').map(src => src.trim());
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      if (images.length === 1) {
        img.style.maxWidth = "100%";
        img.style.display = "block";
        img.style.margin = "0 auto";
      } else {
        img.style.maxWidth = "30%";
        img.style.margin = "5px";
      }
      imageContainer.appendChild(img);
    });
  }
}

accordionItems.forEach(item => {
  const toggleBtn = item.querySelector('.toggle-btn');
  const content = item.querySelector('.accordion-content');

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
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
      loadAccordionImages(item);

      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = 1;
      toggleBtn.style.transform = 'rotate(45deg)';
    }
  });
});

// ✅ Prikaži slike prvega (active) zavihka ob nalaganju strani
const activeItem = document.querySelector('.accordion-item.active');
if (activeItem) {
  loadAccordionImages(activeItem);
}




































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









































































