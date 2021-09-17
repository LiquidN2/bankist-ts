import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export type TransactionType = {
  amount: number;
  date: string;
};

type TransactionFuncType = (
  amount: number,
  date?: string
) => TransactionType | null;

export interface AccType {
  id: string;
  owner: string;
  interestRate: number;
  currency: string;
  locale: string;
  transactions: TransactionType[];
  balance: number;
  totalDeposit: number;
  totalWithdrawal: number;
  totalInterest: number;
  firstName: string;
  hasUsername: (username: string) => boolean;
  isValidPin: (pin: number) => boolean;
  deposit: TransactionFuncType;
  withdraw: TransactionFuncType;
  requestLoan: TransactionFuncType;
}

export default class Account implements AccType {
  readonly id: string = uuidv4();
  readonly owner: string;
  readonly interestRate: number;
  readonly currency: string;
  readonly locale: string;
  readonly transactions: TransactionType[] = [];
  readonly #pin: number;
  #username: string = '';

  constructor(
    owner: string = 'Name of owner',
    interestRate: number = 0,
    currency: string = 'AUD',
    locale: string = 'en-au',
    pin: number = 9999
  ) {
    this.owner = owner;
    this.interestRate = interestRate;
    this.currency = currency;
    this.locale = locale;
    this.#pin = pin;
    this.#createUsername();
  }

  #createUsername() {
    if (this.#username) return;
    this.#username = this.owner
      .trim()
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  }

  hasUsername(username: string) {
    return this.#username === username;
  }

  isValidPin(pin: number) {
    return this.#pin === pin;
  }

  deposit(amount: number, date: string = moment().format()) {
    if (amount < 0) return null;
    this.transactions.push({ amount, date });
    return { amount, date };
  }

  withdraw(amount: number, date: string = moment().format()) {
    this.transactions.push({ amount: -amount, date });
    return { amount: -amount, date };
  }

  requestLoan(amount: number, date: string = moment().format()) {
    // this.transactions.push({ amount, date });
    // return { amount, date };
    return this.deposit(amount, date);
  }

  get balance() {
    return this.transactions.reduce(
      (accumulator, currentItem) => accumulator + currentItem.amount,
      0
    );
  }

  get totalDeposit() {
    return this.transactions.reduce((accumulator, currentItem) => {
      return currentItem.amount > 0
        ? accumulator + currentItem.amount
        : accumulator;
    }, 0);
  }

  get totalWithdrawal() {
    return this.transactions.reduce((accumulator, currentItem) => {
      return currentItem.amount < 0
        ? accumulator + currentItem.amount
        : accumulator;
    }, 0);
  }

  get totalInterest() {
    return this.transactions.reduce((accumulator, currentItem) => {
      return currentItem.amount > 0
        ? accumulator + (currentItem.amount * this.interestRate) / 100
        : accumulator;
    }, 0);
  }

  get firstName() {
    return this.owner.split(' ')[0];
  }
}
