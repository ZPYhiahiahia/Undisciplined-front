import dbh from '../../datastore/dbHelper'
const state = {
  habit: dbh.get('habit')
}

const mutations = {
  ADD_HABIT (state, newhabit) {
    newhabit.icon = 'add'
    newhabit.allcnt = 0
    newhabit.continuouscnt = 0
    newhabit.maxcontinuouscnt = 0
    newhabit.items = []
    newhabit.weekpoint = 0
    newhabit.point = parseInt(newhabit.point)
    dbh.insert('habit', newhabit)
    state.habit = dbh.get('habit')
  },
  GET_HABIT (state) {
    state.habit = dbh.get('habit')
  },
  REMOVE_HABIT (state, id) {
    dbh.removeById('habit', id)
    state.habit = dbh.get('habit')
  },
  EDIT_HABIT (state, {id, upkey, upvalue}) {
    // 仅用于完成习惯,如果需要编辑习惯,记得修改代码
    dbh.updateById('habit', id, upkey, upvalue)
    state.habit = dbh.get('habit')
  },
  EDIT_HABIT_PRO (state, {id, assigndata}) {
    dbh.updateById1('habit', id, assigndata)
    state.habit = dbh.get('habit')
  }
}

const actions = {
  addHabit ({ commit }, newhabit) {
    commit('ADD_HABIT', newhabit)
    commit('ADD_VERSION')
  },
  getHabit ({ commit }) {
    commit('GET_HABIT')
  },
  removeHabit ({commit}, id) {
    commit('REMOVE_HABIT', id)
    commit('ADD_VERSION')
  },
  editHabit ({commit}, {id, upkey, upvalue}) {
    commit('EDIT_HABIT', {id, upkey, upvalue})
    commit('ADD_VERSION')
  },
  editHabitPro ({commit}, {id, assigndata}) {
    commit('EDIT_HABIT_PRO', {id, assigndata})
    commit('ADD_VERSION')
  }
}

export default {
  state,
  mutations,
  actions
}
