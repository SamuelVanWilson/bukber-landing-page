const cardFitur = document.querySelectorAll("section.fitur-card");
const btnNext = document.getElementById("nextSlide");
const btnPrev = document.getElementById("prevSlide");
const main = document.querySelector("main");
const ubahHijau = document.getElementById("hijau");
const ubahUngu = document.getElementById("ungu");
const ubahKuning = document.getElementById("kuning");
const BtnKirim = document.getElementById("kirim-form");
const formulir = document.getElementById("form");
const containForm = document.getElementById("form-section");
const containImgForm = document.getElementById("form-img");
const imgForm1 = document.getElementById("form-img1");
const imgForm2 = document.getElementById("form-img2");
const tandaSilang = document.querySelector("form#form > i");
const BtnForms = document.querySelectorAll(".form-display");
let slideIndex = 0;
let intervalId = null;

BtnForms.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    formulir.classList.add("display");
    containForm.classList.add("displayBlock");
    containImgForm.classList.add("display-ImgForm");
    imgForm1.classList.add("show-form");
    imgForm2.classList.add("show-form");
    e.preventDefault();
  });
});

tandaSilang.addEventListener("click", () => {
  formulir.classList.add("closeForm");
  containForm.classList.add("closeForm");
  imgForm1.classList.add("close-form");
  imgForm2.classList.add("close-form");
  setTimeout(() => {
    formulir.classList.remove("display");
    formulir.classList.remove("closeForm");
    imgForm1.classList.remove("close-form");
    imgForm2.classList.remove("close-form");
    imgForm1.classList.remove("show-form");
    imgForm2.classList.remove("show-form");
    containForm.classList.remove("displayBlock");
  }, 400);
});

function notifError(pesan, e) {
  let error = document.createElement("div");
  error.id = "error";

  error.innerText = pesan;

  let previousError = document.getElementById("error");
  if (previousError) {
    previousError.remove();
  }

  document.getElementById("notif").appendChild(error);
  setTimeout(function () {
    error.classList.add("back");
  }, 3000);

  if (e) {
    e.preventDefault();
  }
}

function addFirstCard() {
  if (cardFitur.length > 0) {
    cardFitur[slideIndex].classList.add("displaySlide");
  }
}
function showSlide(index) {
  if (index >= cardFitur.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = cardFitur.length - 1;
  }
  cardFitur.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  cardFitur[slideIndex].classList.add("displaySlide");
}
document.addEventListener("DOMContentLoaded", addFirstCard);
btnNext.addEventListener("click", () => {
  slideIndex++;
  console.log(slideIndex);
  showSlide(slideIndex);
});
btnPrev.addEventListener("click", () => {
  slideIndex--;
  showSlide(slideIndex);
});

document.querySelector("main").addEventListener("scroll", function () {
  let scroll = this.scrollTop;
  let scrollHeight = this.scrollHeight;
  let height = this.clientHeight;
  let percent = (scroll / (scrollHeight - height)) * 100;

  document.getElementById("myBar").style.width = percent + "%";
});

ubahHijau.addEventListener("click", () => {
  document.documentElement.style.setProperty("--warna-saatIni", "#74bd7bd0");
  ubahHijau.style.setProperty("border", "1px solid #1e1e1e");
  ubahKuning.style.setProperty("border", "1px dashed #1e1e1e");
  ubahUngu.style.setProperty("border", "1px dashed #1e1e1e");
});

ubahKuning.addEventListener("click", () => {
  document.documentElement.style.setProperty("--warna-saatIni", "#d3cb70d0");
  ubahKuning.style.setProperty("border", "1px solid #1e1e1e");
  ubahHijau.style.setProperty("border", "1px dashed #1e1e1e");
  ubahUngu.style.setProperty("border", "1px dashed #1e1e1e");
});

ubahUngu.addEventListener("click", () => {
  document.documentElement.style.setProperty("--warna-saatIni", "#6b8dddd0");
  ubahUngu.style.setProperty("border", "1px solid #1e1e1e");
  ubahKuning.style.setProperty("border", "1px dashed #1e1e1e");
  ubahHijau.style.setProperty("border", "1px dashed #1e1e1e");
});

BtnKirim.addEventListener("click", (event) => {
  let name = document.getElementById("nama").value.trim();
  let city = document.getElementById("kota").value.trim();
  let email = document.getElementById("email2").value.trim();
  let zipCode = document.getElementById("kode-pos").value.trim();
  let checkbox = document.getElementById("kebijakan").checked;

  if (isNaN(zipCode)) {
    notifError("Kode pos harus angka", event);
  }

  if (zipCode.length !== 5) {
    notifError("Kode pos harus terdiri 5 angka", event);
  }

  if (!checkbox) {
    notifError("Setujui Dulu Persyaratannya", event);
  }

  if (name === "" || city === "" || email === "") {
    notifError("Kamu harus lengkapin datamu", event);
  }
});

if (!localStorage.getItem('visitedBefore')) {
  localStorage.setItem('visitedBefore', true);
  localStorage.setItem('countdownStartTime', new Date().getTime());
}

let countdownEndTime = parseInt(localStorage.getItem('countdownStartTime')) + 24 * 60 * 60 * 1000;

let countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
  let currentTime = new Date().getTime();

  let timeRemaining = countdownEndTime - currentTime;

  let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  let countdownOutput = hours + "h " + minutes + "m " + seconds + "s ";

  document.getElementById("countdown").innerHTML = countdownOutput;

  if (timeRemaining < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "Countdown selesai!";
  }
}
