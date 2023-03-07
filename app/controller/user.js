'use strict';

const { Controller } = require('egg');

class AdminController extends Controller {

  async login() {
    const { ctx, app, service } = this;
    const rules = {
      mobile: { type: 'string', format: /^\d+$/ },
      password: { type: 'password' },
    };
    ctx.validate(rules);
    const result = await service.user.loginAction(ctx.request.body);
    const now = new Date().getTime();
    const tokenTime = 1000 * 60 * 60 * 24 * app.config.jwt.expiredTime; // token可用时长毫秒
    const token = app.jwt.sign(
      {
        role: 'admin',
        userId: result.id,
        exp: parseInt((now + tokenTime) / 1000),
      },
      app.config.jwt.secret
    );
    delete result.password;
    ctx.body = {
      success: true,
      msg: '查询成功',
      data: { ...result, token },
    };
  }

  async create() {
    const { ctx, service } = this;
    const rules = {
      nickname: { type: 'string', min: 2, max: 20 },
      mobile: { type: 'string', format: /^\d+$/ },
      password: { type: 'password' },
    };
    ctx.validate(rules);
    const result = await service.user.createAction(ctx.request.body);
    ctx.success('创建成功', result);
  }

  async list() {
    const { ctx, app } = this;
    const results = await app.mysql.select('user');
    ctx.body = results;
  }

  async detail() {
    const { ctx, app } = this;
    const user = await app.mysql.get('user', { id: ctx.params.id });
    delete user.password;
    ctx.success('查询成功', user);
  }

  async delete() {
    const { ctx, service } = this;
    await service.user.deleteAction(ctx.params);
    ctx.success('删除成功');
  }

}

module.exports = AdminController;
