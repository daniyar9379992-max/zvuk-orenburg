const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".product-card");
const message = document.querySelector("#max-message");
const copyButton = document.querySelector("[data-copy-message]");
const maxButtons = document.querySelectorAll("[data-max]");
const contactSection = document.querySelector("#contacts");
const sourceNames = {
  avito: "Avito",
  yandex: "Яндекс",
  yandexmaps: "Яндекс Карты",
  google: "Google",
  gis: "2ГИС",
  "2gis": "2ГИС",
  qr: "QR-код",
};

const params = new URLSearchParams(window.location.search);
const source = sourceNames[params.get("src")] || params.get("src");

const buildMessage = (text) => {
  const suffix = source ? ` Источник: ${source}.` : "";
  return `${text}${suffix}`;
};

if (message && source) {
  message.value = buildMessage(message.value);
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));

    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const visible = value === "all" || categories.includes(value);
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    message.value = buildMessage(`Здравствуйте, Альберт. Хочу уточнить наличие и цену: ${product}.`);
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      message.focus({ preventScroll: true });
      message.select();
    }, 380);
  });
});

copyButton.addEventListener("click", async () => {
  const defaultText = "Скопировать сообщение";

  try {
    await navigator.clipboard.writeText(message.value);
    copyButton.textContent = "Скопировано";
  } catch {
    message.focus();
    message.select();
    copyButton.textContent = "Текст выделен";
  }

  window.setTimeout(() => {
    copyButton.textContent = defaultText;
  }, 1800);
});

maxButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.setTimeout(() => message.select(), 320);
  });
});
