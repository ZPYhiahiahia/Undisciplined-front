import db from '../../datastore'
import dbh from '../../datastore/dbHelper'
const state = {
  user: db.read().get('user').value(),
  point: db.read().get('user').value().point
}

const mutations = {
  EDIT_USER (state, {key, value}) {
    dbh.set(key, value)
    state.user = dbh.get('user')
    state.point = dbh.get('user').point
  },
  EDIT_POINT (state, newpoint) {
    db.read().set('user.point', newpoint).write()
    state.user.point = db.read().get('user').value().point
    state.point = dbh.get('user').point
  },
  GET_USER (state) {
    state.user = dbh.get('user')
  },
  EDIT_TOKEN (state, token) {
    dbh.set('user.token', token)
    state.user = dbh.get('user')
  },
  EDIT_NAME (state, name) {
    dbh.set('user.name', name)
    state.user = dbh.get('user')
  },
  ADD_VERSION (state) {
    dbh.set('user.version', state.user.version + 1)
    state.user = dbh.get('user')
    state.point = dbh.get('user').point
  }
}

const actions = {
  editUser ({ commit }, {key, value}) {
    if (key !== 'point' && key !== 'name' && key !== 'version' && key !== 'token') {
      console.log('[vuex user editUser] 不支持的操作类型')
    } else {
      commit('EDIT_USER', {key: 'user.' + key, value})
    }
    commit('ADD_VERSION')
  },
  editPoint ({ commit }, newpoint) {
    commit('EDIT_POINT', newpoint)
    commit('ADD_VERSION')
  },
  getUser ({commit}) {
    /*
    * todo 切换用户之后version可能出问题，解决办法是给每一个用户名存储一个version，或登录之后先从服务器拉一下（如果服务器有的话） 待定...
    * */
    commit('GET_USER')
  },
  editToken ({commit}, token) {
    commit('EDIT_TOKEN', token)
    commit('ADD_VERSION')
  },
  editName ({commit}, name) {
    commit('EDIT_NAME', name)
  },
  addVersion ({commit}) {
    commit('ADD_VERSION')
  }
}

export default {
  state,
  mutations,
  actions
}
