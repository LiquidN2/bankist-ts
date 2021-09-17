class TransferView {
  #container = document.querySelector<HTMLFormElement>('.form--transfer')!;
  #toInput = document.querySelector<HTMLInputElement>('.form__input--to')!;
  #amountInput = document.querySelector<HTMLInputElement>(
    '.form__input--amount'
  )!;

  constructor() {}

  addSubmitHandler(handler: (amount: number, to: string) => void) {
    this.#container.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      handler(this.#amountInput.valueAsNumber, this.#toInput.value);
    });
  }
}

export default new TransferView();
