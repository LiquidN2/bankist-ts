import moment from 'moment';
import { TransactionType } from '../Account';
import * as utils from '../utils';

class TransactionsView {
  #container = document.querySelector<HTMLDivElement>('.movements')!;

  constructor() {}

  generateItemMarkup(
    { amount, date }: TransactionType,
    locale: string,
    currency: string
  ) {
    const type = amount < 0 ? 'withdrawal' : 'deposit';
    return `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${type}</div>
        <div class="movements__date">${moment(date).format('L')}</div>
        <div class="movements__value">${utils.formatCurrency(
          Math.abs(amount),
          locale,
          currency
        )}</div>
      </div>
    `;
  }

  generateMarkup(data: TransactionType[], locale: string, currency: string) {
    return data
      .map(dataPoint => this.generateItemMarkup(dataPoint, locale, currency))
      .join('');
  }

  render(data: TransactionType[], locale: string, currency: string) {
    const markup = this.generateMarkup(data, locale, currency);
    this.#container.insertAdjacentHTML('afterbegin', markup);
  }

  prepend({ amount, date }: TransactionType, locale: string, currency: string) {
    const markup = this.generateItemMarkup({ amount, date }, locale, currency);
    this.#container.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.#container.innerHTML = '';
  }
}

export default new TransactionsView();
