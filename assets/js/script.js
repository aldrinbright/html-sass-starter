var $ = jQuery;

document.addEventListener("DOMContentLoaded", () => {
  //////////////
  let hamburger = document.querySelector(".hamContainer");
  let navBar = document.querySelector(".navBar");
  let closeBtn = document.querySelector(".navBar .close");

  hamburger.addEventListener("click", () => {
    navBar.style.display = "flex";

    setTimeout(() => {
      navBar.style.opacity = "1";
    }, 300);
  });

  closeBtn.addEventListener("click", () => {
    navBar.style.opacity = "0";

    setTimeout(() => {
      navBar.style.display = "none";
    }, 300);
  });

  let theShowList = document.querySelectorAll(".theShow_details .list a");

  theShowList.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });

  //   //////////////////////////////////////////////////
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollTrigger.refresh();

  function initializeScrollSmoother() {
    if (window.innerWidth > 768) {
      // Example: screen width greater than 1024px (adjust as needed)
      // Create the smooth scroller
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.8,
        smoothTouch: false,
        ignoreMobileResize: true,
        effects: true,
        preventDefault: true,
      });
    }
  }

  // Initialize on page load
  initializeScrollSmoother();

  ////////////////////////////////////////////////////
  if (window.innerWidth < 769) {
    ScrollTrigger.create({
      trigger: ".footer",
      pin: true,
      start: "bottom bottom",
      end: "+=50%",
    });
  } else {
    ScrollTrigger.create({
      trigger: ".footer",
      pin: true,
      start: "bottom bottom",
      end: "+=100%",
    });
  }

  //////////////////////////////////////////////////
  // Fade-in text animation
  gsap.utils.toArray(".fade-in").forEach((item, index) => {
    gsap.set(item, { opacity: 0, y: 60 });
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // Image animations with directional clip path effect
  gsap.utils
    .toArray(".img-left, .img-right, .img-center, .img-door")
    .forEach((img, index) => {
      let clipPathValue = "polygon(0% 110%, 100% 110%, 100% 210%, 0% 210%)";

      if (img.classList.contains("img-left")) {
        clipPathValue = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
      } else if (img.classList.contains("img-right")) {
        clipPathValue = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
      } else if (img.classList.contains("img-center")) {
        clipPathValue = "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)";
      } else if (img.classList.contains("img-door")) {
        clipPathValue = "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)";
      }

      gsap.set(img, {
        opacity: 0,
        clipPath: clipPathValue,
      });

      let finalClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      if (img.classList.contains("img-left")) {
        finalClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      } else if (img.classList.contains("img-right")) {
        finalClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      } else if (img.classList.contains("img-center")) {
        finalClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      } else if (img.classList.contains("img-door")) {
        finalClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      }

      gsap.to(img, {
        opacity: 1,
        clipPath: finalClipPath,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: img,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

  /////////////////////////////////////
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("zoom-in");

          // Stop observing once zoom-in starts (no re-triggering)
          observer.unobserve(entry.target);

          // Remove "zoom-in" class after 10 seconds to smoothly zoom back out
          setTimeout(() => {
            entry.target.classList.remove("zoom-in");
          }, 10000); // 10 seconds
        }
      });
    },
    { threshold: 0.3 } // Trigger when 30% of the element is visible
  );

  // Apply observer to all images with the class
  document.querySelectorAll(".zoom-effect").forEach((image) => {
    observer.observe(image);
  });
});
