'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);
  router.post('/user', controller.user.create);
  router.get('/user', controller.user.list);
  router.get('/user/:id', controller.user.detail);
  router.delete('/user/:id', controller.user.delete);
};
