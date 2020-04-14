import dbh from '../../datastore/dbHelper'
const state = {
  store: dbh.get('store')
}

const mutations = {
  EDIT_STORE (state, newgood) {
    newgood.price = parseInt(newgood.price)
    newgood.amount = parseInt(newgood.amount)
    newgood.icon = ''
    newgood.img = 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
    newgood.buyamount = 0
    console.log('[EDIT_STORE] ')
    console.log(newgood)
    dbh.insert('store', newgood)
    this.store = dbh.get('store')
  },
  GET_STORE (state) {
    state.store = dbh.get('store')
  },
  REMOVE_GOOD (state, id) {
    dbh.removeById('store', id)
    state.store = dbh.get('store')
  },
  BUY_GOOD (state, {goodid, upkey, upvalue}) {
    dbh.updateById('store', goodid, upkey, upvalue)
    state.store = dbh.get('store')
  }
}

const actions = {
  editStore ({ commit }, newhabit) {
    commit('EDIT_STORE', newhabit)
    commit('ADD_VERSION')
  },
  getStore ({ commit }) {
    commit('GET_STORE')
  },
  removeGood ({commit}, id) {
    commit('REMOVE_GOOD', id)
    commit('ADD_VERSION')
  },
  buyGood ({commit}, {goodid, upkey, upvalue}) {
    commit('BUY_GOOD', {goodid, upkey, upvalue})
    commit('ADD_VERSION')
  }
}

export default {
  state,
  mutations,
  actions
}
