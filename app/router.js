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
};
