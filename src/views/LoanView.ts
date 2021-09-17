class LoanView {
  #container = document.querySelector<HTMLFormElement>('.form--loan')!;
  #input = document.querySelector<HTMLInputElement>(
    '.form__input--loan-amount'
  )!;
  constructor() {}

  addSubmitHandler(handler: (amount: number) => void) {
    this.#container.addEventListener('submit', event => {
      event.preventDefault();
      handler(this.#input.valueAsNumber);
    });
  }
}

export default new LoanView();
