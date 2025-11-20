// Mobile-only loader control
document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  const mobileLoader = document.querySelector(".loader-container-mv");
  const mobileLoaderVideo = document.querySelector(".video-loader-mv video");
  const desktopLoader = document.querySelector(".loader-container");
  const mainContent = document.getElementById("main");

  function showMainAndRemove(container) {
    // Reveal main content
    if (mainContent) {
      mainContent.style.display = "block";
      mainContent.classList.add("show");
    }

    // Start mobile animations after content is visible
    if (isMobile && typeof startMobileAnimations === "function") {
      startMobileAnimations();
    }

    // Hide loader with a quick fade
    if (container) {
      container.style.transition = "opacity 0.3s ease-out";
      container.style.opacity = "0";
      setTimeout(() => {
        container.style.display = "none";
        if (
          window.ScrollTrigger &&
          typeof ScrollTrigger.refresh === "function"
        ) {
          ScrollTrigger.refresh();
        }
      }, 300);
    }
  }

  // On non-mobile, do nothing here so desktop loader runs via script.js
  if (!isMobile) {
    return;
  }

  // On mobile, ensure desktop loader is hidden
  if (desktopLoader) desktopLoader.style.display = "none";

  // Keep overlay sized to viewport on mobile
  function resizeMobileLoader() {
    if (!mobileLoader) return;
    mobileLoader.style.height = `${Math.max(
      window.innerHeight,
      document.documentElement.clientHeight
    )}px`;
  }
  resizeMobileLoader();
  window.addEventListener("resize", resizeMobileLoader);
  window.addEventListener("orientationchange", () =>
    setTimeout(resizeMobileLoader, 100)
  );

  // End logic: hide loader after video completes or after fallback
  if (mobileLoaderVideo) {
    mobileLoaderVideo.addEventListener("ended", () =>
      showMainAndRemove(mobileLoader)
    );
    setTimeout(() => showMainAndRemove(mobileLoader), 3000);
  } else {
    setTimeout(() => showMainAndRemove(mobileLoader), 1000);
  }
});

// Mobile-specific animations function
function startMobileAnimations() {
  // Nutritional section mobile animations are already handled in script.js
  // This function can be extended for other mobile-specific animations
  console.log("Mobile animations started");
}
