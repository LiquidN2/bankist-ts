import { AccType, TransactionType } from './Account';

import { Sort, SortOptions, selectTransactions } from './utils';

import accounts from './db/db';

// ------------------------------------
// APPLICATION STATE
type StateType = {
  account: AccType | null;
  newTransaction: TransactionType | null;
  filters: object | null;
  sortBy: SortOptions | null;
};

const DEFAULT_STATE = {
  account: null,
  newTransaction: null,
  filters: null,
  sortBy: null,
};

let state: StateType = DEFAULT_STATE;

export const resetState = () => (state = DEFAULT_STATE);

// ------------------------------------
// AUTHENTICATION
const findAccByCredentials = (username: string, pin: number) => {
  return new Promise<AccType>((resolve, reject) => {
    const account = accounts.find(acc => acc.hasUsername(username));
    if (!account || (account && !account.isValidPin(pin))) {
      reject('Invalid username and/or password');
    } else {
      resolve(account);
    }
  });
};

export const login = async (username: string, pin: number) => {
  try {
    state.account = await findAccByCredentials(username, pin);
  } catch (err) {
    throw err;
  }
};

// ------------------------------------
// TRANSACTION OPERATIONS
const validateTransaction = (transaction: TransactionType | null) => {
  if (!transaction) throw Error('Unable to process this transaction request');
};

export const requestLoan = (amount: number) => {
  try {
    if (!state.account) return;
    const loan = state.account.requestLoan(amount);
    validateTransaction(loan);
    state.newTransaction = loan;
  } catch (err) {
    throw err;
  }
};

export const transfer = (amount: number, to: string) => {
  try {
    if (!state.account || state.account.hasUsername(to)) return;
    const receiver = accounts.find(acc => acc.hasUsername(to));
    if (!receiver || receiver.balance < amount) return;
    const transfer = state.account.withdraw(amount);
    validateTransaction(transfer);
    receiver.deposit(amount);
    state.newTransaction = transfer;
  } catch (err) {
    throw err;
  }
};

export const sortTransactions = (sortOption: SortOptions = Sort.DATE_DESC) => {
  if (!state.account) return;
  state.sortBy = sortOption;
  selectTransactions(state.account.transactions, sortOption);
};

export { state };
