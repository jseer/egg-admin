'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/create', controller.user.create);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/page', controller.user.page);
  router.post('/api/user/update', controller.user.update);
  router.post('/api/user/removeByIds', controller.user.removeByIds);
  router.post('/api/user/logout', controller.user.logout);
  router.get('/api/user/getCurrent', controller.user.getCurrent);

  router.post('/api/role/create', controller.role.create);
  router.get('/api/role/page', controller.role.page);
  router.post('/api/role/update', controller.role.update);
  router.post('/api/role/removeByIds', controller.role.removeByIds);
  router.get('/api/role/list', controller.role.list);

  router.post('/api/menu/create', controller.menu.create);
  router.get('/api/menu/list', controller.menu.list);
  router.post('/api/menu/update', controller.menu.update);
  router.post('/api/menu/removeByIds', controller.menu.removeByIds);

  router.post('/api/dictionaries/create', controller.dictionaries.create);
  router.get('/api/dictionaries/page', controller.dictionaries.page);
  router.post('/api/dictionaries/update', controller.dictionaries.update);
  router.post('/api/dictionaries/removeByIds', controller.dictionaries.removeByIds);
  router.post('/api/dictionaries/updateDictionariesItems', controller.dictionaries.updateDictionariesItems);
  router.get('/api/dictionaries/getDictionariesItemsById', controller.dictionaries.getDictionariesItemsById);
  router.get('/api/dictionaries/getAllDictionaries', controller.dictionaries.getAllDictionaries);
};
