/* 
   =============================================
   2026 Indie App Developer Portfolio Logic
   =============================================
*/

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Kinetic Cursor Logic
const cursor = document.getElementById('custom-cursor');
const follower = document.getElementById('custom-cursor-follower');
const links = document.querySelectorAll('.hover-link, button, a');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animation loop for smooth cursor lag
function renderCursor() {
  // Fast main cursor
  cursorX += (mouseX - cursorX) * 0.5;
  cursorY += (mouseY - cursorY) * 0.5;

  // Slow follower
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;

  if (cursor && follower) {
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  }

  requestAnimationFrame(renderCursor);
}
renderCursor();

// Add hover states to interactive elements
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.classList.add('hover-state');
    follower.classList.add('hover-state');
  });
  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover-state');
    follower.classList.remove('hover-state');
  });
});

// 2. Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const iconMoon = document.getElementById('theme-icon-moon');
const iconSun = document.getElementById('theme-icon-sun');

// Default to dark mode based on CSS variable design
let isDarkTheme = true;

themeToggle.addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  if (isDarkTheme) {
    root.setAttribute('data-theme', 'dark');
    iconMoon.style.display = 'none';
    iconSun.style.display = 'block';
  } else {
    root.setAttribute('data-theme', 'light');
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  }
});

// 3. GSAP Scroll Reveals
// Reveal elements as they enter the viewport
const revealElements = document.querySelectorAll('.gs-reveal');

revealElements.forEach((el) => {
  gsap.fromTo(el,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Animation starts when top of element hits 85% of viewport height
        toggleActions: "play none none reverse" // Play on enter, reverse on leave back up
      }
    }
  );
});

// Parallax effect on Hero Ambient Orb
gsap.to('.ambient-orb', {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});


// 4. Vanilla Tilt Initialization
// Note: Handled automatically via 'data-tilt' attributes for elements, 
// but we explicitly init it here to be safe if dynamic loading is used later.
if (typeof VanillaTilt !== "undefined") {
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    reverse: true,  // Reverse the tilt direction
    max: 5,         // Max tilt rotation (degrees)
    speed: 400,     // Speed of the enter/exit transition
    glare: true,    // Enables the glare effect
    "max-glare": 0.2 // Max glare opacity (0 - 1)
  });
}

// 5. Sudoku Easter Egg Interactivity
// Clicking the Sudoku grid fills the empty cells temporarily
const sudokuEgg = document.getElementById('sudoku-easter-egg');
if (sudokuEgg) {
  sudokuEgg.addEventListener('click', () => {
    const emptyCells = sudokuEgg.querySelectorAll('.s-cell.empty');
    const numbers = ['1', '2', '7', '4'];

    // Fill cells
    emptyCells.forEach((cell, index) => {
      cell.style.color = "var(--text-primary)"; // Show text
      cell.textContent = numbers[index % numbers.length];
      cell.style.background = "var(--accent-sudoku-1)"; // Glow effect
      cell.style.color = "var(--bg-primary)";
    });

    // Reset after 2 seconds
    setTimeout(() => {
      emptyCells.forEach(cell => {
        cell.style.color = "transparent";
        cell.style.background = "rgba(255,255,255,0.05)";
        cell.textContent = ""; // Clear
      });
    }, 2000);
  });
}
