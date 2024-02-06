import ExpenseCategory from './ExpenseCategory';
import PERMISSION from '../../../fuse-configs/permission.constants';

const ExpenseConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: [PERMISSION.CAN_EXPENSE_CATEGORY_LIST],
      path: '/apps/expense-category',
      element: <ExpenseCategory />,
    },
  ],
};

export default ExpenseConfig;
