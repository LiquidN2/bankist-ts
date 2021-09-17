import Account, { AccType, TransactionType } from '../Account';

// LOAD DUMMY DATA
import acc1Data from '../../data/account1.json';
import acc2Data from '../../data/account2.json';
import acc3Data from '../../data/account3.json';
import acc4Data from '../../data/account4.json';

const addTransactions = (account: AccType, data: TransactionType[]) =>
  data.forEach(({ amount, date }) => {
    if (amount < 0) return account.withdraw(Math.abs(amount), date);
    return account.deposit(amount, date);
  });

const account1: AccType = new Account(
  'Jonas Schmedtmann',
  1.2,
  'EUR',
  'pt-pt',
  1111
);
addTransactions(account1, acc1Data);

const account2: AccType = new Account(
  'Jessica Davis',
  1.5,
  'USD',
  'en-us',
  2222
);
addTransactions(account2, acc2Data);

const account3: AccType = new Account(
  'Steven Thomas Williams',
  0.7,
  'AUD',
  'en-AU',
  3333
);
addTransactions(account3, acc3Data);

const account4: AccType = new Account('Uchiha Itachi', 1, 'JPY', 'ja-JP', 4444);
addTransactions(account4, acc4Data);

export default [account1, account2, account3, account4];
