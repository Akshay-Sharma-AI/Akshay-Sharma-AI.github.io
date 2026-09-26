const typingEl = document.getElementById("typing-animation");
const texts = [
  "IIT Kharagpur · IIM Kozhikode ",
  "Microsoft · EY · L&T · ADP · Brane AI ",
  "Enterprise AI from idea to production ",
];

function playTyping(text) {
  if (!typingEl) return;
  for (let i = 0; i < text.length; i += 1) {
    window.setTimeout(() => {
      typingEl.textContent += text[i];
    }, i * 55);
  }
  window.setTimeout(() => {
    typingEl.textContent = "";
    playTyping(texts[(texts.indexOf(text) + 1) % texts.length]);
  }, text.length * 55 + 1100);
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

document.getElementById("year").textContent = new Date().getFullYear();
