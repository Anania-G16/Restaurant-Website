  const hamburger = document.querySelector(".hamburger-icon");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
          navLinks.classList.remove("active");
      }
  });

  const navbar = document.querySelector(".navbar-container");

  window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
      } else {
          navbar.classList.remove("scrolled");
      }
  });