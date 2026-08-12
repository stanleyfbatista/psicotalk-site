const eventDate = new Date("2026-08-27T19:00:00-03:00");

function updateCountdown() {
  const distance = Math.max(0, eventDate.getTime() - Date.now());
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  document.querySelector("#days").textContent = Math.floor(distance / day);
  document.querySelector("#hours").textContent = String(Math.floor((distance % day) / hour)).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(Math.floor((distance % hour) / minute)).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 60_000);

const speakerCarousel = document.querySelector("#speaker-carousel");
const carouselButtons = document.querySelectorAll("[data-carousel]");

carouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.carousel === "next" ? 1 : -1;
    const card = speakerCarousel.querySelector("article");
    const distance = card.getBoundingClientRect().width + 18;
    speakerCarousel.scrollBy({ left: distance * direction, behavior: "smooth" });
  });
});
