import * as utils from '../utils';

class BalanceView {
  // #container = document.querySelector<HTMLDivElement>('.balance')!;
  #value = document.querySelector<HTMLParagraphElement>('.balance__value')!;
  #date = document.querySelector<HTMLSpanElement>('.balance__date')!;

  constructor() {}

  clear() {
    this.#value.textContent = this.#date.textContent = '';
  }

  render(
    { date, balance }: { date: string; balance: number },
    locale: string,
    currency: string
  ) {
    this.#date.textContent = date;
    this.#value.textContent = utils.formatCurrency(balance, locale, currency);
  }
}

export default new BalanceView();
