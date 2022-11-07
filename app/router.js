'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/create', controller.user.create);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/page', controller.user.page);
  router.get('/api/user/list', controller.user.list);
  router.post('/api/user/update', controller.user.update);
  router.post('/api/user/removeByIds', controller.user.removeByIds);
  router.post('/api/user/logout', controller.user.logout);
  router.get('/api/user/getCurrent', controller.user.getCurrent);
  router.get('/api/user/getListByRoleId', controller.user.getListByRoleId);
  router.get('/api/user/getLoginHistory', controller.user.getLoginHistory);
  router.get('/api/user/validateByNameOrEmail', controller.user.validateByNameOrEmail);
  router.post('/api/user/touristLogin', controller.user.touristLogin);

  router.post('/api/role/create', controller.role.create);
  router.get('/api/role/page', controller.role.page);
  router.post('/api/role/update', controller.role.update);
  router.post('/api/role/removeByIds', controller.role.removeByIds);
  router.get('/api/role/list', controller.role.list);
  router.post('/api/role/distributionUser', controller.role.distributionUser);
  router.post('/api/role/distributionResource', controller.role.distributionResource);

  router.post('/api/menu/create', controller.menu.create);
  router.get('/api/menu/list', controller.menu.list);
  router.post('/api/menu/update', controller.menu.update);
  router.post('/api/menu/removeByIds', controller.menu.removeByIds);
  router.get('/api/menu/listByRoleId', controller.menu.listByRoleId);
  router.get('/api/menu/authList', controller.menu.authList);
  router.post('/api/menu/updateStatus', controller.menu.updateStatus);

  router.post('/api/apiItem/create', controller.apiItem.create);
  router.get('/api/apiItem/list', controller.apiItem.list);
  router.post('/api/apiItem/update', controller.apiItem.update);
  router.post('/api/apiItem/removeByIds', controller.apiItem.removeByIds);
  router.get('/api/apiItem/listByRoleId', controller.apiItem.listByRoleId);
  router.get('/api/apiItem/getDistributableList', controller.apiItem.getDistributableList);
  router.post('/api/apiItem/updateStatus', controller.apiItem.updateStatus);
  router.post('/api/apiItem/updateCheckStatus', controller.apiItem.updateCheckStatus);

  router.post('/api/dictionaries/create', controller.dictionaries.create);
  router.get('/api/dictionaries/page', controller.dictionaries.page);
  router.post('/api/dictionaries/update', controller.dictionaries.update);
  router.post('/api/dictionaries/removeByIds', controller.dictionaries.removeByIds);
  router.post('/api/dictionaries/updateDictionariesItems', controller.dictionaries.updateDictionariesItem);
  router.get('/api/dictionaries/getDictionariesItemsById', controller.dictionaries.getDictionariesItemById);
  router.get('/api/dictionaries/getAllDictionaries', controller.dictionaries.getAllDictionaries);

  router.get('/api/system/getLoginRecords', controller.system.getLoginRecords);
  router.get('/api/system/continuousLoginDays', controller.system.continuousLoginDays);
  router.get('/api/system/getCountMap', controller.system.getCountMap);
  router.post('/api/system/initData', controller.system.initData);

  router.get('/api/common/rsa/public', controller.common.getRsaPublicKey);
};
