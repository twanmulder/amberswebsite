function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  // DOM is loaded and ready for manipulation here
  addEventListenerToEmailText();
  animateHero();
  setupIntersectionOberserver();
});

// Custom copy email to clipboard + animation
function addEventListenerToEmailText() {
  document.querySelector(".js.e-mail").addEventListener("click", function () {
    copyEmailToClipboard();
  });
}

function copyEmailToClipboard() {
  const str = "amberchenprive@gmail.com";

  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }

  showEmailCopiedMessage();
}

function showEmailCopiedMessage() {
  const notication = document.querySelector(".js.notification");
  if (notication.className.indexOf("-is-hidden") > -1) {
    notication.classList.remove("-is-hidden");

    setTimeout(function () {
      hideEmailCopiedMessage();
    }, 5000);
  }
}

function hideEmailCopiedMessage() {
  const notication = document.querySelector(".js.notification");
  if (notication.className.indexOf("-is-hidden") === -1) {
    notication.classList.add("-is-hidden");
  }
}

// Hero animation
function animateHero() {
  // Reveal text items
  const textItemsToReveal = document.querySelectorAll(".js.reveal");
  textItemsToReveal.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 300 + 300);
  });

  // Reveal title text
  const titleItemsToReveal = document.querySelectorAll(".js.reveal-up");
  titleItemsToReveal.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 150 + 400);
  });
}

// Intersection observer
function setupIntersectionOberserver() {
  // Callback function for observer
  let callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        return hideMainNavElement();
      }
      showMainNavElement();
    });
  };
  // Create observer
  let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 1.0,
  };

  let observer = new IntersectionObserver(callback, options);

  // Observe hero title text
  let target = document.querySelector(".js.hero-title");
  observer.observe(target);
}

function hideMainNavElement() {
  const mainNavElement = document.querySelector("nav > a");
  if (mainNavElement.className.indexOf("hide") === -1) {
    mainNavElement.classList.add("hide");
  }
}

function showMainNavElement() {
  const mainNavElement = document.querySelector("nav > a");
  if (mainNavElement.className.indexOf("hide") > -1) {
    mainNavElement.classList.remove("hide");
  }
}
