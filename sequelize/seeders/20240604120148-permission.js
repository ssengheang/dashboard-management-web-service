// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const api_version = 'v0';
    const admin_only = 'admin_only'; // allowed [su, admin]
    const operator_only = "operator_only"; // allowed [su, admin, operator]
    const user_only = 'user_only'; // allowed [su, admin, operator, user]
    const public = 'public';
    const own_account = 'own_account';

    await queryInterface.bulkInsert('Permissions', [
      // UserController
      { method: 'GET', baseUrl: '/v0', path: '/users', version: api_version, rule: operator_only, createdAt: new Date() }, // index
      { method: 'GET', baseUrl: '/v0', path: '/users/:id', version: api_version, rule: operator_only, createdAt: new Date() }, // show
      { method: 'POST', baseUrl: '/v0', path: '/users', version: api_version, rule: admin_only, createdAt: new Date() }, // create
      { method: 'POST', baseUrl: '/v0', path: '/users/register', version: api_version, rule: public, createdAt: new Date() }, // register
      { method: 'PUT', baseUrl: '/v0', path: '/users/:id', version: api_version, rule: admin_only, createdAt: new Date() }, // update
      { method: 'PUT', baseUrl: '/v0', path: '/users/:id/deactivate', version: api_version, rule: admin_only, createdAt: new Date() }, // deactivate
      { method: 'PUT', baseUrl: '/v0', path: '/users/:id/activate', version: api_version, rule: admin_only, createdAt: new Date() }, // activate
      { method: 'DELETE', baseUrl: '/v0', path: '/users/:id', version: api_version, rule: admin_only, createdAt: new Date() }, // activate
      { method: 'GET', baseUrl: '/v0', path: '/users/me', version: api_version, rule: own_account, createdAt: new Date() }, // me

      // RoleController
      { method: 'GET', baseUrl: '/v0', path: '/roles', version: api_version, rule: admin_only, createdAt: new Date() }, // index
      { method: 'GET', baseUrl: '/v0', path: '/roles/:id', version: api_version, rule: admin_only, createdAt: new Date() }, // show

      // PermissionController
      { method: 'GET', baseUrl: '/v0', path: '/permissions', version: api_version, rule: admin_only, createdAt: new Date() }, // index
      { method: 'GET', baseUrl: '/v0', path: '/permissions/:id', version: api_version, rule: admin_only, createdAt: new Date() }, // show

      // AuthenticationController
      { method: 'POST', baseUrl: '/v0', path: '/login', version: api_version, rule: public, createdAt: new Date() }, // login
      { method: 'POST', baseUrl: '/v0', path: '/login-dashboard', version: api_version, rule: public, createdAt: new Date() }, // loginDashboard
       
      // ClientLogsController
      { method: 'GET', baseUrl: '/v0', path: '/client-logs', version: api_version, rule: operator_only, createdAt: new Date() }, // index
      { method: 'GET', baseUrl: '/v0', path: '/client-logs/:id', version: api_version, rule: operator_only, createdAt: new Date() }, // show
      { method: 'POST', baseUrl: '/v0', path: '/client-logs', version: api_version, rule: own_account, createdAt: new Date() }, // create
    
      // AppFunctionsController
      { method: 'GET', baseUrl: '/v0', path: '/app-functions', version: api_version, rule: operator_only, createdAt: new Date() }, // index
      { method: 'GET', baseUrl: '/v0', path: '/app-functions/:id', version: api_version, rule: operator_only, createdAt: new Date() }, // show
      { method: 'POST', baseUrl: '/v0', path: '/app-functions', version: api_version, rule: admin_only, createdAt: new Date() }, // create
      { method: 'PUT', baseUrl: '/v0', path: '/app-functions/:id', version: api_version, rule: admin_only, createdAt: new Date() }, // update
      { method: 'PUT', baseUrl: '/v0', path: '/app-functions/:id/status-update', version: api_version, rule: operator_only, createdAt: new Date() }, // updateStatus
      { method: 'DELETE', baseUrl: '/v0', path: '/app-functions/:id', version: api_version, rule: admin_only, createdAt: new Date() }, // delete
     
      // AppFunctionStatusController
      { method: 'GET', baseUrl: '/v0', path: '/app-function-statuses', version: api_version, rule: operator_only, createdAt: new Date() }, // index
      { method: 'GET', baseUrl: '/v0', path: '/app-function-statuses/:id', version: api_version, rule: operator_only, createdAt: new Date() }, // show
      { method: 'POST', baseUrl: '/v0', path: '/app-function-statuses', version: api_version, rule: admin_only, createdAt: new Date() }, // create
      { method: 'PUT', baseUrl: '/v0', path: '/app-function-statuses/:id', version: api_version, rule: admin_only, createdAt: new Date() }, // update
      { method: 'DELETE', baseUrl: '/v0', path: '/app-function-statuses/:id', version: api_version, rule: admin_only, createdAt: new Date() }, // delete
     
    ], {ignoreDuplicates: true});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Permissions', null, {});
  }
};
