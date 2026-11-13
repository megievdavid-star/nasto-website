
(() => {
  "use strict";

  const STORAGE_KEY = "nasto_intro_seen";
  const INTRO_DURATION = 3000;

  function initIntro() {
    const intro = document.getElementById("nasto-intro");

    // Пока заставка не добавлена в HTML,
    // ничего на странице не меняем.
    if (!intro) return;

    let alreadySeen = false;

    try {
      alreadySeen =
        sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (error) {
      // Сайт продолжит работать без хранилища.
    }

    if (alreadySeen) {
      intro.remove();
      return;
    }

    let finished = false;

    function finishIntro() {
      if (finished) return;
      finished = true;

      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch (error) {}

      intro.classList.add("nasto-intro-exit");

      setTimeout(() => {
        intro.remove();
      }, 650);
    }

    const skipButton =
      intro.querySelector("[data-nasto-skip]");

    if (skipButton) {
      skipButton.addEventListener(
        "click",
        finishIntro
      );
    }

    if (window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches) {
      finishIntro();
      return;
    }

    intro.classList.add("nasto-intro-play");

    setTimeout(finishIntro, INTRO_DURATION);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initIntro
    );
  } else {
    initIntro();
  }
})();
