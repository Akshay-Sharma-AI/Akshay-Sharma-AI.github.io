const typingEl = document.getElementById("typing-animation");
const texts = [
  "Senior AI Product Manager ",
  "Agentic AI Mentor ",
  "Product Leader ",
];

function playTyping(text) {
  if (!typingEl) return;
  for (let i = 0; i < text.length; i += 1) {
    window.setTimeout(() => {
      typingEl.textContent += text[i];
    }, i * 90);
  }
  window.setTimeout(() => {
    typingEl.textContent = "";
    playTyping(texts[(texts.indexOf(text) + 1) % texts.length]);
  }, text.length * 90 + 900);
}

playTyping(texts[0]);

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

const bars = document.querySelectorAll(".bar i");
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

function revealSkills() {
  bars.forEach((bar) => bar.classList.add("ready"));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.id === "about") revealSkills();
      if ((entry.target.id === "about" || entry.target.id === "stats") && !counted) {
        counted = true;
        animateCounters();
      }
    });
  },
  { threshold: 0.25 }
);

const about = document.getElementById("about");
const stats = document.getElementById("stats");
if (about) observer.observe(about);
if (stats) observer.observe(stats);

document.getElementById("year").textContent = new Date().getFullYear();
