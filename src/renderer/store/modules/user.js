import db from '../../datastore'
import dbh from '../../datastore/dbHelper'
const state = {
  user: db.read().get('user').value(),
  point: db.read().get('user').value().point
}

const mutations = {
  EDIT_USER (state, newUser) {
    console.log('vuex EDITPOINT succ')
    db.read().set('user', newUser).write()
    state.user = db.read().get('user').value()
  },
  EDIT_POINT (state, newpoint) {
    db.read().set('user.point', newpoint).write()
    state.user.point = db.read().get('user').value().point
    state.point = dbh.get('user').point
  }
}

const actions = {
  editUser ({ commit }, newUser) {
    commit('EDIT_USER', newUser)
  },
  editPoint ({ commit }, newpoint) {
    commit('EDIT_POINT', newpoint)
  }
}

export default {
  state,
  mutations,
  actions
}
