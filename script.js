 gsap.registerPlugin(ScrollTrigger);

 // Select the HTML elements needed for the animation
 const scrollSection = document.querySelectorAll(".scroll-section");
 
 scrollSection.forEach((section) => {
   const wrapper = section.querySelector(".wrapper");
   const items = wrapper.querySelectorAll(".item");
 
   // Initialize
   let direction = null;
 
   if (section.classList.contains("vertical-section")) {
     direction = "vertical";
   } else if (section.classList.contains("horizontal-section")) {
     direction = "horizontal";
   }
 
   initScroll(section, items, direction);
 });
 
 function initScroll(section, items, direction) {
   // Initial states
   items.forEach((item, index) => {
     if (index !== 0) {
       direction == "horizontal"
         ? gsap.set(item, { xPercent: 100 })
         : gsap.set(item, { yPercent: 100 });
     }
   });
 
   const timeline = gsap.timeline({
     scrollTrigger: {
       trigger: section,
       pin: true,
       start: "top top",
       end: () => `+=${items.length * 100}%`,
       scrub: 1,
       invalidateOnRefresh: true
       // markers: true,
     },
     defaults: { ease: "none" }
   });
   items.forEach((item, index) => {
     timeline.to(item, {
       scale: 0.9,
       borderRadius: "10px"
     });
 
     direction == "horizontal"
       ? timeline.to(
           items[index + 1],
           {
             xPercent: 0
           },
           "<"
         )
       : timeline.to(
           items[index + 1],
           {
             yPercent: 0
           },
           "<"
         );
   });
 }

// Animation au scroll
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }
  
  function checkVisibility() {
    timelineItems.forEach(item => {
      if (isElementInViewport(item)) {
        item.classList.add('visible');
      }
    });
  }
  
  // Vérifier la visibilité au chargement initial
  checkVisibility();
  
  // Vérifier la visibilité lors du scroll
  window.addEventListener('scroll', checkVisibility);
});

// Scroll-triggered fade-in using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.market-number-block');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  blocks.forEach(b => observer.observe(b));
});





document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.step-carousel');
    const slides = Array.from(carousel.children);
    const prevBtn = document.querySelector('.step-btn-prev');
    const nextBtn = document.querySelector('.step-btn-next');
    let currentIndex = 0;

    function updateCarousel() {
      const gap = parseInt(getComputedStyle(carousel).columnGap);
      const slideW = slides[0].offsetWidth + gap;
      carousel.style.transform = `translate3d(${-slideW * currentIndex}px, 0, 0)`;

      slides.forEach((slide, idx) => {
        const img = slide.querySelector('.step-image');
        const card = slide.querySelector('.step-card-wrapper');
        if (idx === currentIndex) {
          img.style.opacity = '1';
          card.classList.add('active');
        } else {
          img.style.opacity = '0.5';
          card.classList.remove('active');
        }
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  });