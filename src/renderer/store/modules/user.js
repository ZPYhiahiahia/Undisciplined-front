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
  }
}

const actions = {
  editUser ({ commit }, {key, value}) {
    if (key !== 'point' && key !== 'name' && key !== 'version' && key !== 'token') {
      console.log('[vuex user editUser] 不支持的操作类型')
    } else {
      commit('EDIT_USER', {key: 'user.' + key, value})
    }
  },
  editPoint ({ commit }, newpoint) {
    commit('EDIT_POINT', newpoint)
  },
  getUser ({commit}) {
    commit('GET_USER')
  },
  editToken ({commit}, token) {
    commit('EDIT_TOKEN', token)
  },
  editName ({commit}, name) {
    commit('EDIT_NAME', name)
  }
}

export default {
  state,
  mutations,
  actions
}
