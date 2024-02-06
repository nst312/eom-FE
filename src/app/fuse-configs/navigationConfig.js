import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import PERMISSION from './permission.constants';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'mainDashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        // auth: [PERMISSION.CAN_USER_LIST],
        url: '/apps/maindashboard',
      },
      {
        id: 'eom',
        title: 'EOM',
        translate: 'EOM',
        type: 'collapse',
        icon: 'people',
        // auth: [PERMISSION.CAN_USER_LIST],
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            translate: 'DASHBOARD',
            type: 'item',
            icon: 'dashboard',
            url: 'apps/dashboard',
            exact: true,
            // auth: [PERMISSION.CAN_USER_LIST],
          },
          {
            id: 'post',
            title: 'Post',
            translate: 'POST',
            type: 'item',
            icon: 'check_box',
            url: 'apps/post',
            exact: true,
            // auth: [PERMISSION.CAN_USER_LIST],
          },
        ],
      },
      {
        id: 'companies',
        title: 'Companies',
        translate: 'Companies',
        type: 'item',
        icon: 'account_circle',
        url: 'apps/user/all',
        auth: [PERMISSION.CAN_COMPANY_LIST],
      },
      {
        id: 'announcementList',
        title: 'Announcement',
        type: 'item',
        icon: 'campaign',
        url: '/apps/announcement',
        auth: [PERMISSION.CAN_ANNOUNCEMENT_ADD],
      },
      // {
      //   id: 'employees',
      //   title: 'employees',
      //   translate: 'Employees',
      //   type: 'item',
      //   icon: 'person_add_alt_1',
      //   url: '/apps/employees/list',
      //   auth: [PERMISSION.CAN_EMPLOYEE_LIST],
      // },
      {
        id: 'employees',
        title: 'employees',
        translate: 'Employees',
        type: 'item',
        icon: 'person_add_alt_1',
        url: '/apps/employees',
        auth: [PERMISSION.CAN_EMPLOYEE_LIST],
      },
      {
        id: 'clients',
        title: 'clients',
        translate: 'Clients',
        type: 'item',
        icon: 'assignment_ind',
        url: '/apps/clients',
        auth: [PERMISSION.CAN_CLIENT_LIST],
      },
      {
        id: 'invoices',
        title: 'invoices',
        translate: 'Invoices',
        type: 'item',
        icon: 'receipt_long',
        url: '/app/invoices/list',
        auth: [PERMISSION.CAN_INVOICE_LIST],
      },
      // {
      //   id: 'invitation',
      //   title: 'invitation',
      //   translate: 'Invitation',
      //   type: 'item',
      //   icon: 'receipt',
      //   url: '/apps/invitation',
      //   auth: authRoles.company_admin,
      // },
      {
        id: 'departmentsandpositions',
        title: 'Departments and positions',
        type: 'item',
        icon: 'wysiwyg',
        url: '/apps/departments-and-positions',
        exact: true,
        auth: [PERMISSION.CAN_COMPANY_DEPARTMENT_LIST],
      },
      // {
      //   id: 'newDepartments',
      //   title: 'Departments',
      //   type: 'item',
      //   icon: 'wysiwyg',
      //   url: '/apps/departments',
      //   exact: true,
      //   auth: [PERMISSION.CAN_COMPANY_DEPARTMENT_LIST],
      // },
      // from sslary
      {
        id: 'emp-payroll',
        title: 'Payroll',
        type: 'collapse',
        icon: 'people',
        auth: [PERMISSION.CAN_SALARY_LIST],
        children: [
          {
            id: 'employee',
            title: 'Salary Structure',
            type: 'item',
            icon: 'monetization_on',
            url: '/apps/employees/salary',
            auth: [PERMISSION.CAN_SALARY_LIST],
          },
          {
            id: 'salaryHistory',
            title: 'Pay Slip',
            type: 'item',
            icon: 'history',
            url: '/apps/employees/salary-history',
            exact: true,
            auth: [PERMISSION.CAN_SALARY_HISTORY],
          },
        ],
      },

      // {
      //   id: 'jobPosition',
      //   title: 'Job Position',
      //   type: 'item',
      //   icon: 'work',
      //   url: '/apps/job-position',
      //   auth: [PERMISSION.CAN_JOB_POSITION_LIST],
      // },
      {
        id: 'expenseCategory',
        title: 'Expense Category',
        type: 'item',
        icon: 'monetization_on',
        url: '/apps/expense-category',
        auth: [PERMISSION.CAN_EXPENSE_CATEGORY_LIST],
      },

      {
        id: 'expense',
        title: 'Expense',
        type: 'item',
        icon: 'request_quote',
        url: '/apps/expense',
        // auth: [...authRoles.employee, ...authRoles.company_admin],
      },


      {
        id: 'calendar',
        title: 'Leave Logs',
        type: 'item',
        icon: 'today',
        url: '/apps/calendar',
        auth: [PERMISSION.CAN_LEAVE_REQUEST_MAIL],
      },

      {
        id: 'adminLeave',
        title: 'Leave Logs',
        type: 'item',
        icon: 'how_to_reg',
        url: '/apps/admin-leave/leaveList',
        auth: [PERMISSION.CAN_EMPLOYEE_LIST],
      },
      {
        id: 'resumes',
        title: 'Resumes',
        type: 'item',
        icon: 'assignment-ind-icon',
        url: '/apps/resumes/all',
        auth: [PERMISSION.CAN_RESUME_LIST],
      },
      {
        id: 'pricing',
        title: 'Planing',
        type: 'item',
        icon: 'monetization_on',
        url: '/apps/pricing',
        auth: [PERMISSION.CAN_EMPLOYEE_LIST],
      },
      {
        id: 'organization-chart',
        title: 'Organization Chart',
        type: 'item',
        icon: 'account_tree',
        url: '/apps/organization-charts',
        // auth: [PERMISSION.CAN_EMPLOYEE_LIST],
      },
      {
        id: 'leave',
        title: 'Leave',
        type: 'item',
        icon: 'event_busy',
        url: '/apps/leave',
        // auth: [PERMISSION.CAN_EMPLOYEE_LIST],
      },
      {
        id: 'attendance-shift',
        title: 'Work Shift',
        type: 'item',
        icon: 'schedule',
        url: '/apps/attendance-shift',
        auth: [PERMISSION.CAN_ATTENDANCE_RULES_LIST],
      }

    ],
  },
];

export default navigationConfig;
