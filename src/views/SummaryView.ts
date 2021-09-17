import * as utils from '../utils';

class SummaryView {
  // #container = document.querySelector<HTMLDivElement>('.summary')!;
  #totalDeposit = document.querySelector<HTMLParagraphElement>(
    '.summary__value--in'
  )!;
  #totalWithdrawal = document.querySelector<HTMLParagraphElement>(
    '.summary__value--out'
  )!;
  #totalInterest = document.querySelector<HTMLParagraphElement>(
    '.summary__value--interest'
  )!;

  constructor() {}

  clear() {
    this.#totalDeposit.textContent =
      this.#totalWithdrawal.textContent =
      this.#totalInterest.textContent =
        '';
  }

  render(
    {
      totalDeposit,
      totalWithdrawal,
      totalInterest,
    }: { totalDeposit: number; totalWithdrawal: number; totalInterest: number },
    locale: string,
    currency: string
  ) {
    this.#totalDeposit.textContent = utils.formatCurrency(
      totalDeposit,
      locale,
      currency
    );
    this.#totalWithdrawal.textContent = utils.formatCurrency(
      Math.abs(totalWithdrawal),
      locale,
      currency
    );
    this.#totalInterest.textContent = utils.formatCurrency(
      totalInterest,
      locale,
      currency
    );
  }
}

export default new SummaryView();
