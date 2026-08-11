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

const checkoutDialog = document.querySelector("#checkout-dialog");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutTriggers = document.querySelectorAll("[data-checkout-trigger]");
const dialogClose = document.querySelector("[data-dialog-close]");
const formStatus = document.querySelector("#form-status");

checkoutTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    formStatus.textContent = "";
    checkoutDialog.showModal();
  });
});

dialogClose.addEventListener("click", () => checkoutDialog.close());

checkoutDialog.addEventListener("click", (event) => {
  if (event.target === checkoutDialog) checkoutDialog.close();
});

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!checkoutForm.reportValidity()) return;

  const submitButton = checkoutForm.querySelector("[type='submit']");
  const originalLabel = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = "Enviando seus dados…";
  formStatus.textContent = "";

  try {
    const formData = new FormData(checkoutForm);

    await fetch(checkoutForm.dataset.sheets, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    const response = await fetch(checkoutForm.dataset.endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Não foi possível enviar o formulário.");

    window.location.assign(checkoutForm.dataset.checkout);
  } catch (error) {
    formStatus.textContent = "Não conseguimos enviar agora. Verifique sua conexão e tente novamente.";
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});
