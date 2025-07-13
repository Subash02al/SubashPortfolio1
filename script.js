const data = {
  skills: [
    { title: "Unity 3D", desc: "100+ VR modules", img: "images/unity.png" },
    { title: "Oculus Quest 3", desc: "Standalone VR hardware", img: "images/oculus.png" }
  ],
  experience: [
    { title: "Harita Techserv", desc: "XR Developer • Jul 2023 – Present", img: "images/tvs1.png" },
    { title: "TVS Motor Internship", desc: "YOLOv3 & VR Dev", img: "images/tvs2.png" }
  ],
  education: [
    { title: "B.E. in CSE", desc: "Adhiyamaan College • CGPA:8.06", img: "images/college.png" }
  ]
};

const state = { skills: 0, experience: 0, education: 0 };

function animateCard(type, newContent) {
  const card = document.getElementById(`card-${type}`);
  card.classList.add('fade-out');
  setTimeout(() => {
    card.style.backgroundImage = `url('${newContent.img}')`;
    card.innerHTML = `<h3>${newContent.title}</h3><p>${newContent.desc}</p>`;
    card.classList.remove('fade-out');
    card.classList.add('fade-in');
    setTimeout(() => card.classList.remove('fade-in'), 400);
  }, 300);
}

function renderPanel(type) {
  const idx = state[type];
  const item = data[type][idx];
  animateCard(type, item);
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.target;
    const max = data[type].length;
    state[type] = btn.classList.contains('next')
      ? (state[type] + 1) % max
      : (state[type] - 1 + max) % max;
    renderPanel(type);
  });
});

// Dark mode
const toggle = document.getElementById('darkToggle');
toggle.onclick = () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};

// Initial render
Object.keys(data).forEach(renderPanel);
// Touch Swipe Support
function addSwipeListener(containerId, type) {
  const container = document.getElementById(containerId);
  let startX = 0;
  let endX = 0;
  const threshold = 50; // minimum swipe distance

  container.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe right = previous
        state[type] = (state[type] - 1 + data[type].length) % data[type].length;
      } else {
        // Swipe left = next
        state[type] = (state[type] + 1) % data[type].length;
      }
      renderPanel(type);
    }
  });
}

// Add swipe listeners for all cards
addSwipeListener('card-skills', 'skills');
addSwipeListener('card-experience', 'experience');
addSwipeListener('card-education', 'education');
