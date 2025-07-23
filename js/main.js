(function () {
  // Hide back to top button when hero section is in view
  document.addEventListener("DOMContentLoaded", function () {
    var backToTop = document.getElementById("backToTopBtn");
    var heroSection = document.querySelector(".hero-section");
    function checkHeroInView() {
      if (!backToTop || !heroSection) return;
      var rect = heroSection.getBoundingClientRect();
      var inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inView) {
        backToTop.style.display = "none";
      } else {
        backToTop.style.display = "";
      }
    }
    window.addEventListener("scroll", checkHeroInView);
    window.addEventListener("resize", checkHeroInView);
    checkHeroInView();
  });
})();
(function () {
  // YouTube IFrame API and mute/unmute logic
  var ytPlayer,
    ytMuted = true,
    ytReady = false;
  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("yt-bg-player", {
      videoId: "A2MUlGarXtI",
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: "A2MUlGarXtI",
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
        vq: "hd1080",
        enablejsapi: 1,
      },
      events: {
        onReady: function (e) {
          ytReady = true;
          e.target.mute();
          ytMuted = true;
          updateMuteIcon();
        },
      },
    });
  };
  // Pause video when user scrolls away from hero section or switches tab/window
  function pauseVideoIfHeroNotInView() {
    var heroSection = document.querySelector(".hero-section");
    if (ytReady && ytPlayer && heroSection) {
      var rect = heroSection.getBoundingClientRect();
      var inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (
        !inView &&
        ytPlayer.getPlayerState &&
        ytPlayer.getPlayerState() === 1
      ) {
        ytPlayer.pauseVideo();
      } else if (
        inView &&
        ytPlayer.getPlayerState &&
        ytPlayer.getPlayerState() !== 1
      ) {
        ytPlayer.playVideo();
      }
    }
  }
  document.addEventListener("scroll", pauseVideoIfHeroNotInView);
  document.addEventListener("resize", pauseVideoIfHeroNotInView);
  document.addEventListener("DOMContentLoaded", pauseVideoIfHeroNotInView);
  document.addEventListener("visibilitychange", function () {
    if (ytReady && ytPlayer) {
      if (document.visibilityState === "hidden" && ytPlayer.pauseVideo) {
        ytPlayer.pauseVideo();
      } else if (document.visibilityState === "visible") {
        pauseVideoIfHeroNotInView();
      }
    }
  });
  function updateMuteIcon() {
    var icon = document.getElementById("yt-mute-icon");
    if (!icon) return;
    icon.innerHTML = ytMuted
      ? '<i class="fas fa-volume-mute"></i>'
      : '<i class="fas fa-volume-up"></i>';
  }
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("yt-mute-btn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (ytPlayer && ytPlayer.getPlayerState) {
          if (ytMuted) {
            ytPlayer.unMute();
            ytMuted = false;
          } else {
            ytPlayer.mute();
            ytMuted = true;
          }
          updateMuteIcon();
        }
      });
    }
    // Hide mute button when fallback image is visible
    var muteBtn = document.getElementById("yt-mute-btn");
    var fallback = document.getElementById("hero-fallback-img");
    function checkMuteBtnVisibility() {
      if (!muteBtn || !fallback) return;
      var style = window.getComputedStyle(fallback);
      // If fallback is visible (opacity > 0.5 and display not none), hide mute button
      if (style.display !== "none" && parseFloat(style.opacity) > 0.5) {
        muteBtn.style.display = "none";
      } else {
        muteBtn.style.display = "";
      }
    }
    if (fallback) {
      fallback.addEventListener("transitionend", checkMuteBtnVisibility);
      setInterval(checkMuteBtnVisibility, 300);
      checkMuteBtnVisibility();
    }
    // Load YouTube IFrame API
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  });
})();
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
    var wrapper = document.getElementById("hero-video-wrapper");
    var iframe = document.getElementById("hero-video");
    if (!wrapper || !iframe) return;
    var ww = window.innerWidth,
      wh = window.innerHeight;
    var aspect = 16 / 9;
    if (ww / wh > aspect) {
      // Wider than 16:9, set height to 100vh, width to cover
      iframe.style.width = wh * aspect + "px";
      iframe.style.height = wh + "px";
    } else {
      // Taller than 16:9, set width to 100vw, height to cover
      iframe.style.width = ww + "px";
      iframe.style.height = ww / aspect + "px";
    }
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.transform = "translate(-50%,-50%)";
  }
  window.addEventListener("resize", resizeHeroVideo);
  window.addEventListener("orientationchange", resizeHeroVideo);
  document.addEventListener("DOMContentLoaded", resizeHeroVideo);

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
