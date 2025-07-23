// Show navbar donate button only when scrolled away from hero section
document.addEventListener("DOMContentLoaded", function () {
  var donateBtn = document.getElementById("navbar-donate-btn");
  var heroSection = document.querySelector(".hero-section");
  if (donateBtn && heroSection) {
    function checkHeroInView() {
      var rect = heroSection.getBoundingClientRect();
      var inView = rect.bottom > 0 && rect.top < window.innerHeight;
      donateBtn.style.display = inView ? "none" : "";
    }
    window.addEventListener("scroll", checkHeroInView);
    window.addEventListener("resize", checkHeroInView);
    checkHeroInView();
  }
});
(function ($) {
  "use strict";
  // Hero Fallback Image and Video Transition
  document.addEventListener("DOMContentLoaded", function () {
    var fallback = document.getElementById("hero-fallback-img");
    var iframe = document.getElementById("hero-video");
    var minFallbackTime = 5000; // 5 seconds
    var transitionDone = false;

    // Remove the src from the iframe initially to prevent loading
    if (iframe) {
      iframe.dataset.src = iframe.src;
      iframe.src = "";
    }

    function fadeOutFallbackAndLoadVideo() {
      if (transitionDone) return;
      transitionDone = true;
      // Set the iframe src to start loading the video
      if (iframe && iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
      // Fade out the fallback image
      if (fallback) {
        fallback.classList.add("fade-out");
        setTimeout(function () {
          fallback.style.display = "none";
        }, 1000); // matches CSS transition
      }
    }

    // Always show fallback for minFallbackTime, then transition and load video
    setTimeout(fadeOutFallbackAndLoadVideo, minFallbackTime);
  });

  // Ensure the iframe always covers the hero section with no black bars
function resizeHeroVideo() {
    var wrapper = document.getElementById('hero-video-wrapper');
    var iframe = document.getElementById('hero-video');
    if (!wrapper || !iframe) return;
    var ww = window.innerWidth, wh = window.innerHeight;
    var aspect = 16/9;
    if (ww/wh > aspect) {
    // Wider than 16:9, set height to 100vh, width to cover
    iframe.style.width = (wh * aspect) + 'px';
    iframe.style.height = wh + 'px';
    } else {
    // Taller than 16:9, set width to 100vw, height to cover
    iframe.style.width = ww + 'px';
    iframe.style.height = (ww / aspect) + 'px';
    }
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%,-50%)';
}
window.addEventListener('resize', resizeHeroVideo);
window.addEventListener('orientationchange', resizeHeroVideo);
document.addEventListener('DOMContentLoaded', resizeHeroVideo);

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-dark shadow");
      } else {
        $(".fixed-top").removeClass("bg-dark shadow");
      }
    } else {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-dark shadow").css("top", -45);
      } else {
        $(".fixed-top").removeClass("bg-dark shadow").css("top", 0);
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Causes progress
  $(".causes-progress").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1000,
    center: true,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });
})(jQuery);
