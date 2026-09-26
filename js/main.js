const typingEl = document.getElementById("typing-animation");
const texts = [
  "AI Product Manager ",
  "I ship agents, not demos. ",
  "Researcher · Mentor · Builder ",
];

function playTyping(text) {
  if (!typingEl) return;
  for (let i = 0; i < text.length; i += 1) {
    window.setTimeout(() => {
      typingEl.textContent += text[i];
    }, i * 70);
  }
  window.setTimeout(() => {
    typingEl.textContent = "";
    playTyping(texts[(texts.indexOf(text) + 1) % texts.length]);
  }, text.length * 70 + 1100);
}

playTyping(texts[0]);

const orb = document.getElementById("orb");
window.addEventListener("pointermove", (event) => {
  if (!orb) return;
  orb.style.left = `${event.clientX}px`;
  orb.style.top = `${event.clientY}px`;
});

const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("nav-toggle");
const backdrop = document.getElementById("nav-backdrop");
const links = document.querySelectorAll(".topbar nav a");

function closeNav() {
  sidebar.classList.remove("open");
  backdrop.classList.remove("show");
}

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  backdrop.classList.toggle("show");
});
backdrop.addEventListener("click", closeNav);
links.forEach((link) => link.addEventListener("click", closeNav));

const sections = document.querySelectorAll("section[id]");
function setActiveLink() {
  const y = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.topbar nav a[href="#${id}"]`);
    if (!link) return;
    if (y >= top && y < bottom) link.classList.add("active");
    else link.classList.remove("active");
  });
}
window.addEventListener("scroll", setActiveLink);

const counters = document.querySelectorAll(".count");
let counted = false;

function animateCounters() {
  counters.forEach((el) => {
    const target = Number(el.dataset.target);
    const decimals = Number(el.dataset.decimals || 0);
    const start = performance.now();
    const duration = 1200;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const value = target * p;
      el.textContent = decimals ? value.toFixed(decimals) : Math.floor(value);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const stats = document.getElementById("stats");
if (stats) {
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.3 }
  ).observe(stats);
}

document.getElementById("year").textContent = new Date().getFullYear();
