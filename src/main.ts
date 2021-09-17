'use strict';

// Load styles
import './style.css';

// Load moment
import moment from 'moment';
import 'moment/min/locales';

// Load model
import * as model from './model';

// Load utils
import { Sort } from './utils';

// Load Views
import appView from './views/AppView';
import loginLogoutView from './views/LoginView';
import welcomeView from './views/WelcomeView';
import transactionsView from './views/TransactionsView';
import balanceView from './views/BalanceView';
import summaryView from './views/SummaryView';
import loanView from './views/LoanView';
import transferView from './views/TransferView';
import sortView from './views/SortView';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
const controlLogin = async (username: string, pin: number) => {
  try {
    // Login
    await model.login(username, pin);
    const { account } = model.state;

    if (!account) return;

    // Set Locale
    moment.locale(account.locale);

    // Render welcome message
    welcomeView.render(`Welcome back, ${account.firstName}`);

    // Sort transactions
    model.sortTransactions(Sort.DATE_DESC);

    // Render transactions
    transactionsView.clear();
    transactionsView.render(
      account.transactions,
      account.locale,
      account.currency
    );

    // Render balance
    balanceView.render(
      {
        date: moment().format('L'),
        balance: account.balance,
      },
      account.locale,
      account.currency
    );

    // Render Summary
    summaryView.render(
      {
        totalDeposit: account.totalDeposit,
        totalWithdrawal: account.totalWithdrawal,
        totalInterest: account.totalInterest,
      },
      account.locale,
      account.currency
    );

    appView.reveal();
  } catch (err) {
    console.error(err);
  }
};

const controlSort = () => {
  const { account, sortBy } = model.state;
  if (!account || !sortBy) return;

  // set state and sort transactions
  switch (sortBy) {
    default:
    case Sort.DATE_DESC:
      model.sortTransactions(Sort.DATE_ASC);
      break;

    case Sort.DATE_ASC:
      model.sortTransactions(Sort.DATE_DESC);
      break;
  }

  // Toggle sort arrow
  sortView.toggleArrowIcon(sortBy.split('_')[1]);

  // Render transactions
  transactionsView.clear();
  transactionsView.render(
    account.transactions,
    account.locale,
    account.currency
  );
};

const controlLoan = (amount: number) => {
  try {
    model.requestLoan(amount);

    const { account, newTransaction: loan } = model.state;
    if (!loan || !account) return;

    transactionsView.prepend(loan, account.locale, account.currency);

    // Render balance
    balanceView.render(
      {
        date: moment().format('L'),
        balance: account.balance,
      },
      account.locale,
      account.currency
    );

    // Render Summary
    summaryView.render(
      {
        totalDeposit: account.totalDeposit,
        totalWithdrawal: account.totalWithdrawal,
        totalInterest: account.totalInterest,
      },
      account.locale,
      account.currency
    );
  } catch (err) {
    console.error(err);
  }
};

const controlTransfer = (amount: number, to: string) => {
  model.transfer(amount, to);
  const { account, newTransaction: transfer } = model.state;
  if (!transfer || !account) return;

  transactionsView.prepend(transfer, account.locale, account.currency);

  // Render balance
  balanceView.render(
    {
      date: moment().format('L'),
      balance: account.balance,
    },
    account.locale,
    account.currency
  );

  // Render Summary
  summaryView.render(
    {
      totalDeposit: account.totalDeposit,
      totalWithdrawal: account.totalWithdrawal,
      totalInterest: account.totalInterest,
    },
    account.locale,
    account.currency
  );
};

const controlLogout = () => {
  // clear state
  model.resetState();
  console.log(model.state);

  // clear UI
  [transactionsView, summaryView, balanceView].forEach(view => view.clear());

  // hide dashboard
  appView.hide();
};

const init = () => {
  loginLogoutView.addSubmitEventHandler(controlLogin);
  loginLogoutView.addLogoutHandler(controlLogout);
  loanView.addSubmitHandler(controlLoan);
  transferView.addSubmitHandler(controlTransfer);
  sortView.addClickHandler(controlSort);
};

init();
