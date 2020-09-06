(function() {
  const id = `s${Date.now()}`;
  const el = document.body.appendChild(document.createElement("div"));
  el.id = id;
  el.style.position = "absolute";

  el.className = "Screensaver";
  el.innerHTML = `<div>${(document.currentScript &&
    document.currentScript.getAttribute("message")) ||
    location.hostname}</div>`;

  const width = el.offsetWidth;
  const height = el.offsetHeight;

  const style = document.body.appendChild(document.createElement("style"));

  style.textContent = `
#${id}:before {
  content: '';
  display: block;
  box-shadow: 0 0 0 100000px #000;
}
#${id} {
  left: 0; top: 0; right: 0; bottom: 0;
  z-index: 100000;
  background-color: #000;
  color: #eee;
}
#${id},
#${id} div {
  width: ${width}px;
  height: ${height}px;
  line-height: 1;
}
#${id} {
  animation: x${id} 13s linear infinite alternate;
}
#${id} div {
  animation: y${id} 7s linear infinite alternate;
}
@keyframes x${id} {
  100% {
    transform: translateX(calc(100vw - ${width}px));
  }
}

@keyframes y${id} {
  100% {
    transform: translateY(calc(100vh - ${height}px));
  }
}
`;
  let timeoutId = null;
  let timeout =
    (document.currentScript &&
      Number(document.currentScript.getAttribute("timeout"))) ||
    180000;

  function disable() {
    el.style.display = "none";
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      el.style.display = "block";
    }, timeout);
  }
  disable();
  document.addEventListener("mousemove", disable);
})();
