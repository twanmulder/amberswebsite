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
});

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
