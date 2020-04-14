import dbh from '../../datastore/dbHelper'
const state = {
}

const mutations = {
  AUTO_UPDATE (state, data) {
    console.log(state.user)
  }
}

const actions = {
  autoUpdate ({commit}, data) {
    if (data.userinfo) {
      console.log(data.userinfo)
      commit('EDIT_USER', {key: 'user.version', value: data.userinfo[0].version})
      commit('EDIT_USER', {key: 'user.point', value: data.userinfo[0].point})
    }
    if (data.task) {
      dbh.set('task', data.task)
    }
    if (data.habit) {
      dbh.set('habit', data.habit)
    }
    if (data.store) {
      dbh.set('store', data.store)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
