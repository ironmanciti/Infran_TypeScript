const form = document.querySelector<HTMLFormElement>("form");
const inputs = [...document.querySelectorAll<HTMLInputElement>("input")];
const message = document.querySelector<HTMLParagraphElement>("#message");
const maxText = document.querySelector<HTMLParagraphElement>("#max");
const minText = document.querySelector<HTMLParagraphElement>("#min");

console.log(maxText?.classList);

if (form && message && maxText && minText) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const numbers = inputs.map((input) => input.valueAsNumber);

    if (!numbers.every((n) => !Number.isNaN(n))) {
      console.error("모든 칸에 숫자를 입력하세요");
      return;
    }

    const max = Math.max(...numbers);
    const min = Math.min(...numbers);

    message.textContent = `${numbers}`;
    maxText.textContent = `Max: ${max}`;
    minText.textContent = `Min: ${min}`;

    maxText.classList.remove("text-neutral-200");
    maxText.classList.add("text-yellow-500");
    minText.classList.remove("text-neutral-200");
    minText.classList.add("text-blue-500");
  });
}
