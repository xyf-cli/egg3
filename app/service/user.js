'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcryptjs');

class UserService extends Service {

  // 验证密码
  async loginAction(params) {
    const { mobile, password } = params;
    const user = await this.app.mysql.get('user', { mobile });
    if (!user) {
      throw { status: 401, message: '账号不存在' };
    }
    const correct = bcrypt.compareSync(password, user.password);
    if (!correct) {
      throw { status: 401, message: '账号或密码不正确' };
    }
    return user;
  }

  // 创建账号
  async createAction(params) {
    const { nickname, mobile, password } = params;
    const user = await this.app.mysql.get('user', { mobile });
    if (user) {
      throw { status: 401, message: '账号已存在' };
    }
    // 加密
    const salt = bcrypt.genSaltSync(10);
    // 生成加密密码
    const psw = bcrypt.hashSync(password, salt);
    await this.app.mysql.insert('user', { nickname, mobile, password: psw });
    return {
      mobile,
      nickname,
    };
  }

  async detailAction(params) {
    const { id } = params;
    const user = await this.app.mysql.get('user', { id });
    if (!user) {
      throw { status: 500, message: '没有此用户' };
    }
    delete user.password;
    return user;
  }

  // 删除用户
  async deleteAction(params) {
    const { id } = params;
    const user = await this.app.mysql.get('user', { id });
    if (!user) {
      throw { status: 500, message: '未找到要删除的用户' };
    }
    await this.app.mysql.delete('user', { id });
  }

}
module.exports = UserService;
