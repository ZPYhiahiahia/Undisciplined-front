import dbh from '../../datastore/dbHelper'
import Identicon from 'identicon.js'
import md5 from 'blueimp-md5'

const state = {
  store: dbh.get('store')
}

const mutations = {
  EDIT_STORE (state, newgood) {
    newgood.price = parseInt(newgood.price)
    newgood.amount = parseInt(newgood.amount)
    newgood.icon = ''
    // todo 现在的这种简陋随即图片，找时间给他整治整治
    const random = Math.floor((Math.random() * 10000000) + 1)
    // newgood.img = `https://source.unsplash.com/collection/${random}/1600x900`
    console.log(newgood)
    if (newgood.img === '') { newgood.img = 'data:image/png;base64,' + new Identicon(md5(random || 0), 420).toString() }
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
