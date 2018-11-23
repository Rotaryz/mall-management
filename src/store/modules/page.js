const state = {
  pagination: 1
}

const getters = {
  pagination: state => state.pagination
}

const actions = {
  updatePagination: ({ commit, state }, obj) => {
    commit('do', obj)
  }
}

const mutations = {
  do (state, obj) {
    state.product = obj
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
