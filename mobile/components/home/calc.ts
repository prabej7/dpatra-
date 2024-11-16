import { Transaction } from '@/constants/types';

export const calculateExpenseAndIncome = (
  transactions: [string, Transaction][],
  userName: string,
) => {
  let income = {
    amount: 0,
    transactions: 0,
  };
  let expenses = {
    amount: 0,
    transactions: 0,
  };
  transactions.map(([_,transaction]) => {
    if (transaction.to.fullName == userName) {
      income.amount += Number(transaction.amount);
      income.transactions += 1;
    } else {
      expenses.amount += Number(transaction.amount);
      expenses.transactions += 1;
    }
  });

  return { income, expenses };
};
