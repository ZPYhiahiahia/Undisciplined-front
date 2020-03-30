import db from './index'

export default {
  read () {
    return db.read()
  },
  get (key = '') {
    // 工具类写错的错误不可以再犯
    return this.read().get(key).value()
  },
  set (key, value) {
    return this.read().set(key, value).write()
  },
  has (key) {
    return this.read().has(key).value()
  },
  insert (key, value) {
    return this.read().get(key).insert(value).write()
  },
  unset (key, value) {
    return this.read().get(key).unset(value).value()
  },
  getById (key, id) {
    return this.read().get(key).getById(id).value()
  },
  removeById (key, id) {
    return this.read().get(key).removeById(id).write()
  },
  updateById (key, id, upkey, upvalue) {
    return this.read().get(key).find({'id': id}).assign({[upkey]: upvalue}).write()
  },
  updateById1 (key, id, assigndata) {
    return this.read().get(key).find({'id': id}).assign(assigndata).write()
  }
}
