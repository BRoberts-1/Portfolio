const darkButton = document.getElementById("dark");
const lightButton = document.getElementById("light");
const solarButton = document.getElementById("solar");
const body = document.body;

// To apply the cached them on reload of page

const theme = localStorage.getItem("theme");
const isSolar = localStorage.getItem("isSolar");

if (theme) {
  body.classList.add(theme);
  isSolar && body.classList.add("solar");
}

// Event handler for buttons

darkButton.onclick = () => {
  // body.classList.remove("light"); Two lines of code refactored below
  // body.classList.add("dark");
  body.classList.replace("light", "dark");
};

lightButton.onclick = () => {
  body.classList.replace("dark", "light");
};

solarButton.onclick = () => {
  if (body.classList.contains("solar")) {
    body.classList.remove("solar");

    solarButton.style.cssText = `--bg-solar: var(--yellow);
    `;

    solarButton.innerText = "solarize";

    localStorage.removeItem("isSolar");
  } else {
    solarButton.style.cssText = `--bg-solar: white;`;

    body.classList.add("solar");
    solarButton.innerText = "normalize";

    localStorage.setItem("isSolar", true);
  }
};

// Sticky nav bar

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // observes in the viewport //
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Smooth Scroll

const allLinks = document.querySelectorAll(".main-nav-link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    //Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
