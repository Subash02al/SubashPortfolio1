const data = {
  skills: [
    { title: "Unity 3D", desc: "100+ VR modules", img: "images/unity.png" },
    { title: "Oculus Quest 3", desc: "Standalone VR hardware", img: "images/oculus.png" },
    { title: "C#", desc: "Programming language", img: "images/csharp.png" },
    { title: "Python", desc: "Computer Vision & ML", img: "images/python.png" }
  ],
  experience: [
    { title: "Harita Techserv", desc: "XR Developer • Jul 2023 – Present", img: "images/harita.png" },
    { title: "TVS Motor Internship", desc: "YOLOv3 & VR Dev", img: "images/tvs.png" }
  ],
  education: [
    { title: "B.E. in CSE", desc: "Adhiyamaan College • CGPA:8.06", img: "images/college.png" }
  ]
};

let indices = {
  skills: 0,
  experience: 0,
  education: 0
};

function animateCard(type, newContent) {
  const card = document.getElementById(`card-${type}`);
  card.classList.add('fade-out');
  setTimeout(() => {
    card.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${newContent.img}')`;
    card.innerHTML = `<h3>${newContent.title}</h3><p>${newContent.desc}</p>`;
    card.classList.remove('fade-out');
    card.classList.add('fade-in');
    setTimeout(() => card.classList.remove('fade-in'), 400);
  }, 300);
}

function showCard(type) {
  const idx = indices[type];
  animateCard(type, data[type][idx]);
}

// Initialize all cards on load
window.addEventListener('load', () => {
  for (const type of Object.keys(data)) {
    showCard(type);
  }
});

// Button click handlers
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-target');
    if (btn.classList.contains('next')) {
      indices[type] = (indices[type] + 1) % data[type].length;
    } else {
      indices[type] = (indices[type] - 1 + data[type].length) % data[type].length;
    }
    showCard(type);
  });
});

// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // Change toggle icon
  if (document.body.classList.contains('dark')) {
    darkToggle.textContent = '☀️';
  } else {
    darkToggle.textContent = '🌙';
  }
});
