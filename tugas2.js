const lagu = [
  [
    "100 years",
    "John Michael Howell",
    2000,
    7900,
    "100years.jpeg",
    "100years.mp3"
  ],
  [
    "Kita usahakan lagi",
    "Batas Senja",
    7078,
    14080,
    "Kita_Usahakan_Lagi.jpg",
    "Kita_Usahakan_Lagi.mp3"
  ],
  [
    "Way Down Hadestown",
    "Anaïs Mitchell",
    10000,
    12800,
    "Hadestown.jpg",
    "Hadestown.mp3"
  ],
  [
    "Semua Tentang Kita",
    "Peterpan",
    1000,
    9000,
    "Semua_Tentang_Kita.jpg",
    "Semua_Tentang_Kita.mp3"
  ],
  [
    "Tresno Tekan Mati",
    "NDX AKA",
    1000,
    16000,
    "Tresno_Tekan_Mati.jpg",
    "Tresno_Tekan_Mati.mp3"
  ]
];

const konten = document.getElementById("container");

for (let i = 0; i < lagu.length; i++) {
  const card = `
    <div class="card" style="background-image: url(${lagu[i][4]})">
      <h2>${lagu[i][0]}</h2>
      <p>${lagu[i][1]}</p>
      <button class="play-button" data-index="${i}">▶ Play</button>
      <audio id="audio-${i}" src="${lagu[i][5]}"></audio>
      <div class="foot">
        <div class="kiri" data-index="${i}">
          <i class="ph ph-thumbs-up"></i>
          <span class="like-count">${lagu[i][2]}</span>
        </div>
        <div class="kanan">
          <i class="ph ph-eye"></i>${lagu[i][3]}
        </div>
      </div>
    </div>
  `;
  konten.innerHTML += card;
}

// Like system
document.querySelectorAll(".kiri").forEach((likeDiv) => {
  const index = likeDiv.getAttribute("data-index");
  const countSpan = likeDiv.querySelector(".like-count");

  const storedLikes = localStorage.getItem(`like-${index}`);
  if (storedLikes) {
    countSpan.textContent = storedLikes;
  }

  likeDiv.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const liked = localStorage.getItem(`liked-${index}`);
    if (liked === "true") return;

    let count = parseInt(countSpan.textContent);
    count += 1;
    countSpan.textContent = count;

    localStorage.setItem(`like-${index}`, count);
    localStorage.setItem(`liked-${index}`, "true");

    likeDiv.classList.add("liked");
  });
});

// Play button functionality
document.querySelectorAll(".play-button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const index = btn.getAttribute("data-index");
    const audio = document.getElementById(`audio-${index}`);

    // Pause all other audios
    document.querySelectorAll("audio").forEach((a) => {
      if (a !== audio) {
        a.pause();
        const otherBtn = document.querySelector(`.play-button[data-index="${a.id.split("-")[1]}"]`);
        if (otherBtn) otherBtn.textContent = "▶ Play";
      }
    });

    // Toggle Play/Pause
    if (audio.paused) {
      audio.play();
      btn.textContent = "⏸ Pause";
    } else {
      audio.pause();
      btn.textContent = "▶ Play";
    }

    // Reset button when finished
    audio.onended = () => {
      btn.textContent = "▶ Play";
    };
  });
});

