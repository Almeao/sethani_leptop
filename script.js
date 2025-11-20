// Recipe Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".recipe-carousel");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cards = document.querySelectorAll(".recipe-card");

  // Check if we're on mobile
  const isMobile = window.innerWidth <= 768;

  if (!carousel || !cards.length) return;

  let currentIndex = 0;
  const totalCards = cards.length;
  let isAnimating = false;

  // Disable animations on mobile
  if (isMobile) {
    document.body.classList.add("mobile-view");
  }

  // Initialize carousel
  function initCarousel() {
    // Hide all cards initially
    cards.forEach((card) => {
      card.classList.remove("active", "prev", "next");
      card.style.display = "none";
    });

    updateCarousel();
  }

  // Update carousel display
  function updateCarousel() {
    // Reset all cards
    cards.forEach((card) => {
      card.classList.remove("active", "prev", "next");
      card.style.display = "none";
    });

    // Calculate previous and next indices with wrapping
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    const nextIndex = (currentIndex + 1) % totalCards;

    // Set classes for the three visible cards
    cards[prevIndex].classList.add("prev");
    cards[currentIndex].classList.add("active");
    cards[nextIndex].classList.add("next");

    // Make them visible
    cards[prevIndex].style.display = "flex";
    cards[currentIndex].style.display = "flex";
    cards[nextIndex].style.display = "flex";
  }

  // Move to previous card with animation
  function moveToPrev() {
    if (isAnimating) return;
    isAnimating = true;

    // Add animation class
    carousel.classList.add("sliding-prev");

    setTimeout(() => {
      // Update index
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;

      // Update carousel display
      updateCarousel();

      // Remove animation class
      carousel.classList.remove("sliding-prev");
      isAnimating = false;
    }, 300);
  }

  // Move to next card with animation
  function moveToNext() {
    if (isAnimating) return;
    isAnimating = true;

    // Add animation class
    carousel.classList.add("sliding-next");

    setTimeout(() => {
      // Update index
      currentIndex = (currentIndex + 1) % totalCards;

      // Update carousel display
      updateCarousel();

      // Remove animation class
      carousel.classList.remove("sliding-next");
      isAnimating = false;
    }, 300);
  }

  // Event listeners for buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", moveToPrev);
    prevBtn.style.cursor = "pointer";
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", moveToNext);
    nextBtn.style.cursor = "pointer";
  }

  // Add touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      moveToNext(); // Swipe left
    } else if (touchEndX > touchStartX + 50) {
      moveToPrev(); // Swipe right
    }
  }

  // Initialize on load
  initCarousel();

  // Handle responsive behavior
  window.addEventListener("resize", initCarousel);

  // Ensure carousel is visible and active
  carousel.style.display = "flex";
});
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initial loader animation
document.addEventListener("DOMContentLoaded", function () {
  const loaderContainer = document.querySelector(".loader-container");
  const mainContent = document.getElementById("main");
  const loaderVideo = document.querySelector(".video-loader video");

  // Ensure loader scales correctly on orientation change and resize
  function resizeLoader() {
    if (!loaderContainer) return;
    // Use dynamic viewport units on supported browsers
    loaderContainer.style.height = `${Math.max(
      window.innerHeight,
      document.documentElement.clientHeight
    )}px`;
  }
  resizeLoader();
  window.addEventListener("resize", resizeLoader);
  window.addEventListener("orientationchange", resizeLoader);

  // Set up main content for animation
  if (mainContent) {
    mainContent.style.display = "block";
  }

  // Function to handle video end
  function handleVideoEnd() {
    if (!loaderContainer || !mainContent) return;

    // Fade out loader immediately
    loaderContainer.style.opacity = "0";
    loaderContainer.style.transition = "opacity 0s ease-out";

    // Show main content with animation immediately
    mainContent.classList.add("show");

    // Start animations immediately
    if (typeof startAnimations === "function") {
      startAnimations();
    }

    // Remove loader from DOM after transition
    setTimeout(() => {
      loaderContainer.style.display = "none";
      // Ensure ScrollTrigger recalculates after layout changes
      if (window.ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
        ScrollTrigger.refresh();
      }
    }, 700);
  }

  // If video exists, add event listener for when it ends
  if (loaderVideo) {
    loaderVideo.addEventListener("ended", handleVideoEnd);

    // Fallback in case video doesn't trigger ended event
    setTimeout(handleVideoEnd, 3000);
  } else {
    // If no video, use timeout
    setTimeout(handleVideoEnd, 1000);
  }
});

// Logo animation function
function startAnimations() {
  // Create a master timeline for section-1 animations
  const masterTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.5,
    },
  });

  // Header logo animation
  masterTimeline.from("#header img", {
    y: -100,
    opacity: 0,
    duration: 0.5,
  });

  // Hero section text animation - all elements animate simultaneously from top to bottom
  masterTimeline.from(
    "#hero-section h1",
    {
      y: 200,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1, // Small stagger for smooth sequential appearance
      ease: "power3.out",
    },
    "heroAnim" // All animations start at the same time
  );

  // Left and right images animation
  masterTimeline.from(
    "#left",
    {
      x: 100,
      opacity: 0,
      duration: 0.5,
      // rotate: "45deg",
    },
    "heroAnim"
  );

  masterTimeline.from(
    "#right",
    {
      x: -100,
      opacity: 0,
      duration: 0.5,
      // rotate: "-45deg",
    },
    "heroAnim"
  );

  // Image section animation
  masterTimeline.from(
    "#image-sec",
    {
      y: 500,
      opacity: 0,
      duration: 0.5,
      rotate: "0deg",
    },
    "heroAnim"
  );

  // Section part2 animations
  masterTimeline.from(
    "#section-part2 #left-section",
    {
      x: -50,
      opacity: 0,
      duration: 1.1,
    },
    "+=0.1"
  );

  masterTimeline.from(
    "#section-part2 #right-section h1",
    {
      y: 50,
      opacity: 0,
      duration: 1.1,
    },
    "+=0.1"
  );

  masterTimeline.from(
    "#section-part2 #right-section h2",
    {
      y: 50,
      opacity: 0,
      duration: 1.1,
    },
    "+=0.1"
  );

  masterTimeline.from(
    "#section-part2 #right-section h3",
    {
      y: 50,
      opacity: 0,
      duration: 1.1,
    },
    "+=0.1"
  );
}

// Mobile animation function
function startMobileAnimations() {
  const isMobile = window.matchMedia("(max-width: 480px)").matches;
  if (!isMobile) return;

  const masterTimelineMv = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.5 },
  });

  // Header logo animation (mobile)
  masterTimelineMv.from("#header-mv img", {
    y: -80,
    opacity: 0,
    duration: 0.5,
  });

  // Hero section text animation (mobile)
  masterTimelineMv.from(
    "#hero-section-mv h1",
    {
      y: 100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
    },
    "heroAnimMv"
  );

  // Left and right images (mobile)
  masterTimelineMv.from(
    "#left-mv",
    {
      x: 80,
      opacity: 0,
      duration: 0.5,
    },
    "heroAnimMv"
  );

  masterTimelineMv.from(
    "#right-mv",
    {
      x: -80,
      opacity: 0,
      duration: 0.5,
    },
    "heroAnimMv"
  );

  // Jar image section (mobile)
  masterTimelineMv.from(
    "#image-sec-mv",
    {
      y: 400,
      opacity: 0,
      duration: 0.5,
      rotate: "-30deg",
    },
    "heroAnimMv"
  );

  // Section part2 (mobile) headings
  masterTimelineMv.from("#section-part2-mv #right-section-mv h1", {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
  });
  masterTimelineMv.from("#section-part2-mv #right-section-mv h2", {
    y: 30,
    opacity: 0,
    duration: 0.6,
  });
  masterTimelineMv.from("#section-part2-mv #right-section-mv h3", {
    y: 20,
    opacity: 0,
    duration: 0.6,
  });

  // Match desktop: set initial states for mobile section-2 images

  // Match desktop: left/center images entrance timeline (mobile)
  const leftSectionTimelineMv = gsap.timeline({
    scrollTrigger: {
      trigger: "#section-part2-mv",
      start: "top 70%",
      end: "top 25%",
      scrub: 2,
      // markers: true, // Uncomment to see trigger points
    },
  });

  leftSectionTimelineMv.to(
    "#center-section-mv img",
    {
      x: 50,
      y: -100,
      opacity: 1,
      scale: 1,
      rotate: "-15deg",
      duration: 1,
      delay: 1,
      ease: "power.in",
    },
    0
  );

  leftSectionTimelineMv.to(
    "#left-section-mv img:nth-child(1)",
    {
      x: 0,
      y: -200,
      opacity: 1,
      scale: 1,
      rotate: "0deg",
      duration: 1,
      delay: 1,
      ease: "power.in",
    },
    0
  );

  // Match desktop: light scroll animation for mobile jar (same values)
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#section-part2-mv",
        start: "0% 80%",
        end: "10% 30%",
        scrub: true,
        // markers: true,
      },
    })
    .to("#image-sec-mv", {
      top: "35%",
      left: "-12%",
      rotate: "18deg",
      scale: 1,
    });
}

// LAPTOP VERSION
const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: "(min-width: 1400px) and (max-width: 1920px)",
    isLaptop: "(min-width: 768px) and (max-width: 1200px)",
  },
  (context) => {
    const { isLaptop } = context.conditions;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main",
        start: isLaptop ? "12% 75%" : "10% 80%",
        end: isLaptop ? "12% 5%" : "17% 30%",
        scrub: true,
        // markers: true,
      },
    });

    tl.to("#image-sec", {
      top: isLaptop ? "55%" : "60%",
      left: isLaptop ? "-18%" : "-2%",
      rotate: isLaptop ? "15deg" : "15deg", // 20deg
      scale: isLaptop ? "0.6" : "0.9",
      // zIndex: "95",
    });

    // Left section images animation - triggers when jar reaches left section
    gsap.registerPlugin(ScrollTrigger);

    // Create animation timeline for left section images
    var leftSectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-part2",
        start: isLaptop ? "top 65%" : "top 70%",
        end: isLaptop ? "top 85%" : "top 90%",
        scrub: isLaptop ? 1.5 : 2,
        // markers: true, // Uncomment to see trigger points
      },
    });

    // Animate both images from different starting positions
    leftSectionTimeline.to(
      "#left-section img:nth-child(1)",
      {
        x: 0,
        y: isLaptop ? -150 : -200,
        opacity: 1,
        scale: isLaptop ? 0.95 : 1,
        duration: 0.5,
        delay: 0.5,
        ease: "power.in",
      },
      0
    );

    leftSectionTimeline.to(
      "#center-section img",
      {
        x: isLaptop ? 20 : 50,
        y: 0,
        opacity: 1,
        scale: isLaptop ? 0.95 : 1,
        rotate: isLaptop ? "6deg" : "10deg",
        duration: 0.5,
        delay: 0.5,
        ease: "power.in",
      },
      0
    );
  }
);

// TABLET VERSION
gsap.registerPlugin(ScrollTrigger);

const tabletMedia = gsap.matchMedia();

tabletMedia.add(
  {
    isTablet: "(min-width: 768px) and (max-width: 991px)",
  },
  (context) => {
    if (!context.conditions.isTablet) return;

    // Main timeline for #main section on tablet screens
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main",
        start: "11% 70%", // Customize as needed for tablet feel
        end: "12% 15%",
        scrub: true,
        // markers: true, // enable to debug visually
      },
    });

    tl.to("#image-sec", {
      top: "54%",
      left: "-10%",
      rotate: "13deg",
      scale: 0.75,
      // zIndex: "95", // Uncomment if stacking context is needed
    });

    // Left section images animation for tablets
    var leftSectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-part2",
        start: "top 68%",
        end: "top 88%",
        scrub: 1.7,
        // markers: true,
      },
    });

    leftSectionTimeline.to(
      "#left-section img:nth-child(1)",
      {
        x: 0,
        y: -180,
        opacity: 1,
        scale: 0.97,
        duration: 0.5,
        delay: 0.5,
        ease: "power.in",
      },
      0
    );

    leftSectionTimeline.to(
      "#center-section img",
      {
        x: 30,
        y: 0,
        opacity: 1,
        scale: 0.97,
        rotate: "8deg",
        duration: 0.5,
        delay: 0.5,
        ease: "power.in",
      },
      0
    );
  }
);

// 482px–767px VERSION (Phablet / Large Phone)
const phabletMedia = gsap.matchMedia();

phabletMedia.add(
  {
    isPhablet: "(min-width: 482px) and (max-width: 767px)",
  },
  (context) => {
    if (!context.conditions.isPhablet) return;

    // Main timeline for #main section on 482–767px screens
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main",
        start: "12% 80%", // Customize as needed for tablet feel
        end: "10% 25%",
        scrub: true,
        // markers: true, // enable to debug visually
      },
    });

    tl.to("#image-sec", {
      top: "52%",
      left: "-10%",
      rotate: "17deg",
      scale: 0.85,
    });

    // Left/center images animation for phablet screens
    var leftSectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-part2",
        start: "top 70%",
        end: "top 90%",
        scrub: 1.8,
        // markers: true,
      },
    });

    leftSectionTimeline.to(
      "#left-section img:nth-child(1)",
      {
        x: 0,
        y: -170,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.5,
        ease: "power.in",
      },
      0
    );

    leftSectionTimeline.to(
      "#center-section img",
      {
        x: 40,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: "9deg",
        duration: 0.5,
        delay: 0.5,
        ease: "power.in",
      },
      0
    );
  }
);

// Section-2: Enhanced scroll-triggered animations with bottom-to-top movement and smooth box opening
// gsap.registerPlugin(ScrollTrigger);

// Set initial states for section 2 elements
gsap.set("#section-2 h1", {
  y: 150,
  opacity: 1,
  scale: 1,
});

gsap.set("#section-2 .grid-container", {
  y: 200,
  opacity: 1,
  scale: 1,
});

gsap.set("#section-2 .grid-item", {
  y: 100,
  opacity: 1,
  scale: 1,
  transformOrigin: "center center",
});

// Main section 2 timeline - triggers when section 1 scroll is complete
const isMobileView = window.matchMedia("(max-width: 768px)").matches;

if (!isMobileView) {
  const sectionTwoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#section-2",
      start: "top 70%",
      end: "top 0%",
      scrub: 1.5,
      // markers: true, // Uncomment to see trigger points
    },
  });

  // Animate heading with smooth bottom-to-top movement and scale
  sectionTwoTimeline.to(
    "#section-2 h1",
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    },
    0
  );

  // Animate grid container with delay and smooth entrance
  sectionTwoTimeline.to(
    "#section-2 .grid-container",
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
    },
    0.3
  );

  // Animate each grid item with staggered timing and smooth box opening effect
  sectionTwoTimeline.from(
    "#section-2 .grid-item",
    {
      y: 80,
      opacity: 1,
      scale: 0.6,
      duration: 1.2,
      stagger: {
        amount: 0.8,
        from: "start",
        ease: "power2.out",
      },
      ease: "power3.out",
    },
    0.6
  );

  // Additional smooth box opening animation for individual grid items
  gsap.to("#section-2 .grid-item", {
    scale: 1,
    duration: 0.8,
    stagger: {
      amount: 0.6,
      from: "start",
    },
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#section-2",
      start: "top 60%",
      end: "top 30%",
      scrub: false,
      toggleActions: "play none none reverse",
    },
  });
} else {
  // Mobile: no heavy scroll animations — show content immediately
  gsap.set("#section-2 h1", { opacity: 1, y: 0, scale: 1 });
  gsap.set("#section-2 .grid-container", { opacity: 1, y: 0, scale: 1 });
  gsap.set("#section-2 .grid-item", { opacity: 1, y: 0, scale: 1 });
}

// SECTION 2: Oil Drop Floating Animation
// Set initial state for the oil drop image
gsap.set("#section-2 img:nth-child(1)", {
  y: 100,
  opacity: 1,
});

// Additional smooth floating animation that responds to scroll position
gsap.to("#section-2 img:nth-child(1)", {
  y: -100, // Move up more when scrolling
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#section-2",
    start: "top 55%",
    end: "bottom 30%",
    toggleActions: "play pause resume pause",
    scrub: 1, // Smooth scrubbing with scroll
    // markers: true, // Uncomment to see trigger points
  },
});

gsap.set("#section-2 img:nth-child(2)", {
  y: -150,
  opacity: 0,
});

// Additional smooth floating animation that responds to scroll position
gsap.to("#section-2 img:nth-child(2)", {
  y: 150, // Move up more when scrolling
  duration: 1.5,
  opacity: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#section-2 .grid-container",
    start: "top 10%",
    end: "bottom 30%",
    toggleActions: "play pause resume pause",
    scrub: 1, // Smooth scrubbing with scroll
    // markers: true, // Uncomment to see trigger points
  },
});

// =============================
// Section 4 Horizontal Scroll
// =============================
function initSection4HorizontalScroll() {
  const section = document.querySelector("#section-4");
  const track = document.querySelector("#section-4 .hscroll");
  if (!section || !track) return;

  // Total scroll distance equals track width minus viewport width
  const totalScroll = track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: () => -totalScroll,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${totalScroll}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

// Track previous mobile state for section 5
let previousSection5MobileState = null;

window.addEventListener("load", () => {
  initSection4HorizontalScroll();
  initSection5LogoAnimation();
  // Track initial mobile state
  previousSection5MobileState = window.innerWidth <= 768;

  // Recalculate on resize/rotation
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
    // Reinitialize animations if mobile state changed
    const currentMobileState = window.innerWidth <= 768;
    if (currentMobileState !== previousSection5MobileState) {
      initSection5LogoAnimation();
      previousSection5MobileState = currentMobileState;
    } else {
      ScrollTrigger.refresh();
    }
  });
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      const currentMobileState = window.innerWidth <= 768;
      if (currentMobileState !== previousSection5MobileState) {
        initSection5LogoAnimation();
        previousSection5MobileState = currentMobileState;
      } else {
        ScrollTrigger.refresh();
      }
    }, 100);
  });
});

// gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

// Section 5: Logo Scale Animation

function initPage4MaskAnimation() {
  const page4_inner = document.querySelector(".page4_inner");
  const page4 = document.querySelector(".page4");
  if (!page4_inner || !page4) return;

  // Prevent double initialization
  if (page4_inner.dataset.maskAnimInit === "1") return;
  page4_inner.dataset.maskAnimInit = "1";

  // Initial mask height (matches initial CSS)
  const initialMaskHeight = 430;
  // Final mask height (big reveal)
  const finalMaskHeight = 5000;

  // Set initial mask size using GSAP
  gsap.set(page4_inner, {
    WebkitMaskSize: `auto ${initialMaskHeight}px`,
    maskSize: `auto ${initialMaskHeight}px`,
  });

  // Calculate a slightly SHORTER scroll distance for the animation end, for an earlier reveal
  const getAnimationEnd = () => {
    const page4Height = page4.offsetHeight;
    const viewportHeight = window.innerHeight;
    // Reduce end point by 18% for a little bit shorter scroll reveal
    const scrollEnd = Math.max(0, page4Height - viewportHeight) * 0;
    return `+=${scrollEnd > 0 ? scrollEnd : page4Height * 0.4}px`;
  };

  // Animate only the mask height as you scroll through .page4, DECREASE speed by lowering scrub value
  gsap.to(page4_inner, {
    WebkitMaskSize: () => `auto ${finalMaskHeight}px`,
    maskSize: () => `auto ${finalMaskHeight}px`,
    ease: "power2.out", // Slightly faster ease
    scrollTrigger: {
      trigger: ".page4",
      start: "top top",
      end: getAnimationEnd,
      scrub: 0.6, // Decreased scrub from true to 0.6 for faster (less smooth, quicker) animation response
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
  ScrollTrigger.refresh();
}

// Call it on DOM ready/page load
window.addEventListener("load", () => {
  initPage4MaskAnimation();
});

// SECTION --- 6 Card Animation
// Nutritional Section Animation
// =============================
let nutritionalTriggers = [];
let nutritionalBreakpointIsMobile = null;

function cleanupNutritionalTriggers() {
  nutritionalTriggers.forEach((t) => {
    try {
      if (t && typeof t.kill === "function") t.kill();
    } catch (e) {}
  });
  nutritionalTriggers = [];
}

function setupNutritionalAnimation() {
  const section = document.querySelector("#nutritional");
  if (!section) return;

  // Determine current breakpoint
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  nutritionalBreakpointIsMobile = isMobile;

  // Clean previous triggers before re-init
  cleanupNutritionalTriggers();

  // Selectors for elements inside the section
  const leftImg = ".nutrition-left img";
  const heading = ".nutrition-right .nutrition-heading";
  const subText = ".nutrition-right .nutrition-sub";
  const rows = ".nutrition-card .row";
  const badge = ".nutrition-badge";

  // Initial states
  gsap.set(leftImg, {
    x: isMobile ? -40 : -100,
    y: 0,
    opacity: 0,
    scale: isMobile ? 1 : 1.05,
  });
  gsap.set(heading, { y: isMobile ? 30 : 60, opacity: 0 });
  gsap.set(subText, { y: isMobile ? 20 : 40, opacity: 0 });
  gsap.set(rows, { x: isMobile ? 20 : 40, opacity: 0 });
  gsap.set(badge, { scale: 0.85, opacity: 0 });

  if (!isMobile) {
    // Desktop timeline: slower scrub and gentle easing
    const tlDesktop = gsap.timeline({
      scrollTrigger: {
        id: "nutritional-desktop",
        trigger: section,
        start: "top 75%",
        end: "top 5%",
        scrub: 1.8,
        // markers: true,
        invalidateOnRefresh: true,
      },
    });

    tlDesktop
      .to(
        leftImg,
        { x: 0, opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
        0
      )
      .to(heading, { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }, 0.2)
      .to(
        subText,
        { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
        0.35
      )
      .to(
        rows,
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: { each: 0.15, from: "start" },
          ease: "power2.out",
        },
        0.5
      )
      .to(
        badge,
        { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.4)" },
        0.9
      );

    nutritionalTriggers.push(tlDesktop.scrollTrigger);

    // Softer parallax on the left image
    const parallax = gsap.to(leftImg, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        id: "nutritional-parallax",
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });
    nutritionalTriggers.push(parallax.scrollTrigger);
  } else {
    // Mobile timeline: slower entrance, smooth scrub and gentle easing
    const tlMobile = gsap.timeline({
      scrollTrigger: {
        id: "nutritional-mobile",
        trigger: section,
        start: "top 85%",
        end: "80% 35%",
        scrub: 1.6,
        toggleActions: "play none none reverse",
        // markers: true,
        invalidateOnRefresh: true,
      },
    });

    tlMobile
      .to(leftImg, { x: 0, opacity: 1, duration: 1.1, ease: "power2.out" }, 0)
      .to(heading, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }, 0.1)
      .to(subText, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2)
      .to(
        rows,
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12 },
        0.3
      )
      .to(
        badge,
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.3)" },
        0.7
      );

    nutritionalTriggers.push(tlMobile.scrollTrigger);
  }

  ScrollTrigger.refresh();
}

// Initialize and reinitialize on breakpoint changes
window.addEventListener("load", setupNutritionalAnimation);
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    setupNutritionalAnimation();
  }, 100);
});
window.addEventListener("resize", () => {
  const isMobileNow = window.matchMedia("(max-width: 768px)").matches;
  if (isMobileNow !== nutritionalBreakpointIsMobile) {
    setupNutritionalAnimation();
  } else {
    ScrollTrigger.refresh();
  }
});

// =============================
// Image Section Cursor Follow Animation
// =============================
(function initImageSecCursorFollow() {
  const imageSec = document.querySelector("#image-sec");
  if (!imageSec) return;

  // Check if device is touch-based
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return; // Skip cursor follow on touch devices

  // Variables for smooth animation
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = 0;
  let currentY = 0;
  const ease = 0.15; // Easing factor (lower = smoother but slower)
  const sensitivity = 0.02; // Movement sensitivity (adjust for more/less movement)

  // Track mouse position
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  // Smooth animation loop
  function animate() {
    // Calculate the offset from center of viewport
    const dx = mouseX - window.innerWidth / 2;
    const dy = mouseY - window.innerHeight / 2;

    // Apply easing to current position for smooth following
    currentX += (dx - currentX) * ease;
    currentY += (dy - currentY) * ease;

    // Calculate transform values (scale down the movement for subtle effect)
    const moveX = currentX * sensitivity;
    const moveY = currentY * sensitivity;

    // Use GSAP's x/y properties to work seamlessly with existing GSAP animations
    // This ensures cursor movement doesn't conflict with scroll animations
    gsap.set(imageSec, {
      x: moveX,
      y: moveY,
      transformOrigin: "center center",
    });

    // Continue animation
    requestAnimationFrame(animate);
  }

  // Initialize
  window.addEventListener("mousemove", handleMouseMove);

  // Start animation loop
  animate();

  // Reset position when mouse leaves window
  window.addEventListener("mouseleave", () => {
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
  });
})();
