import dbh from '../../datastore/dbHelper'
const state = {
}

const mutations = {
  SYNC_DATA (state) {
    console.log(state.user)
  }
}

const actions = {
  syncData ({commit}) {
    commit('SYNC_DATA')
  }
}

export default {
  state,
  mutations,
  actions
}
