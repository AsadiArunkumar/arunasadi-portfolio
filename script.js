/* ============================================
   PORTFOLIO JAVASCRIPT — script.js
   ============================================ */

/* ===== 1. TYPING ANIMATION ===== */
const roles = [
  "Software Developer",
  "Full Stack Engineer",
  "Problem Solver",
  "Tech Enthusiast",
  "Open Source Contributor"
];
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typedEl  = document.getElementById("typed");

function type() {
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting
    ? current.slice(0, --charIndex)
    : current.slice(0, ++charIndex);

  if (!isDeleting && charIndex === current.length) setTimeout(() => (isDeleting = true), 2000);
  if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }

  setTimeout(type, isDeleting ? 60 : 110);
}
window.addEventListener("DOMContentLoaded", () => setTimeout(type, 500));


/* ===== 2. SCROLL FADE-IN ===== */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); fadeObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".fade-in").forEach((el) => fadeObserver.observe(el));


/* ===== 3. ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { threshold: 0.4 });

sections.forEach((sec) => navObserver.observe(sec));


/* ===== 4. HAMBURGER MOBILE MENU ===== */
const hamburger = document.getElementById("hamburger");
const navMenu   = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
  });
});


/* ===== 5. NAVBAR SOLID ON SCROLL ===== */
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () => {
  navbar.style.background = window.scrollY > 50
    ? "rgba(15, 15, 26, 0.98)"
    : "rgba(15, 15, 26, 0.92)";
});


/* ===== 6. CONTACT FORM VALIDATION ===== */
const submitBtn   = document.getElementById("submitBtn");
const formSuccess = document.getElementById("formSuccess");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const firstName = document.getElementById("firstName").value.trim();
    const email     = document.getElementById("email").value.trim();
    const message   = document.getElementById("message").value.trim();

    if (!firstName || !email || !message) {
      alert("Please fill in Name, Email and Message."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address."); return;
    }

    submitBtn.disabled  = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

    setTimeout(() => {
      submitBtn.innerHTML       = `<i class="fas fa-check"></i> Sent!`;
      formSuccess.style.display = "block";

      ["firstName","lastName","email","subject","message"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });

      setTimeout(() => {
        submitBtn.disabled        = false;
        submitBtn.innerHTML       = `<i class="fas fa-paper-plane"></i> Send Message`;
        formSuccess.style.display = "none";
      }, 4000);
    }, 1500);
  });
}


/* ===== 7. SCROLL TO TOP BUTTON ===== */
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = `<i class="fas fa-chevron-up"></i>`;
scrollTopBtn.style.cssText = `
  position:fixed; bottom:2rem; right:2rem;
  width:44px; height:44px; border-radius:50%; border:none;
  background:linear-gradient(135deg,#6c63ff,#a78bfa);
  color:#fff; font-size:1rem; cursor:pointer;
  display:none; align-items:center; justify-content:center;
  box-shadow:0 4px 15px rgba(108,99,255,0.4);
  z-index:999; transition:transform 0.2s ease;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});
scrollTopBtn.addEventListener("click",      () => window.scrollTo({ top: 0, behavior: "smooth" }));
scrollTopBtn.addEventListener("mouseenter", () => (scrollTopBtn.style.transform = "scale(1.1)"));
scrollTopBtn.addEventListener("mouseleave", () => (scrollTopBtn.style.transform = "scale(1)"));
