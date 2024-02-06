/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['SUPER_ADMIN','CEO'],
  super_admin: ['SUPER_ADMIN'],
  company_admin: ['CEO'],
  employee: ['EMPLOYEE'],
  user:['USER'],
  staff: ['admin', 'staff'],
  onlyGuest: [],
};

export default authRoles;
