'use strict';

module.exports = {
  success(msg = '成功', data = null) {
    this.body = {
      code: 200,
      msg,
      data,
    };
  },
  fail(msg = '失败', code = 500) {
    this.status = code;
    this.body = {
      code,
      msg,
    };
  },
  getUserId() {
    const token = this.request.header.authorization.replace('Bearer ', '');
    const decode = this.app.jwt.verify(token, this.app.config.jwt.secret);
    return decode.userId;
  },
  getUserRole() {
    const token = this.request.header.authorization.replace('Bearer ', '');
    const decode = this.app.jwt.verify(token, this.app.config.jwt.secret);
    return decode.role;
  },
  validate(rules, data) {
    data = data || this.request.body;
    const errors = this.app.validator.validate(rules, data);
    if (errors) {
      this.throw(422, this.__(errors[0].message), {
        code: 'invalid_param',
        errors,
      });
    }
  },
}
;
