import moment from 'moment';
import { TransactionType } from './Account';

export enum Sort {
  DATE_ASC = 'DATE_ASC',
  DATE_DESC = 'DATE_DESC',
  AMOUNT_ASC = 'AMOUNT_ASC',
  AMOUNT_DESC = 'AMOUNT_DESC',
}

export type SortOptions =
  | Sort.DATE_ASC
  | Sort.DATE_DESC
  | Sort.AMOUNT_ASC
  | Sort.AMOUNT_DESC;

export const formatCurrency: (
  amount: number,
  locale: string,
  currency: string
) => string = (amount, locale, currency) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);

export const selectTransactions = (
  transactions: TransactionType[],
  sortBy: SortOptions = Sort.DATE_DESC
  // filter?: object | null
) => {
  transactions.sort((a, b) => {
    if (sortBy === Sort.AMOUNT_DESC) return b.amount - a.amount;
    if (sortBy === Sort.AMOUNT_ASC) return a.amount - b.amount;
    if (sortBy === Sort.DATE_ASC) {
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    }
    return moment(b.date).valueOf() - moment(a.date).valueOf();
  });
};
