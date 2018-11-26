const state = {
  pagination: 1,
  pagePath: ''
}

const getters = {
  pagination: state => state.pagination,
  pagePath: state => state.pagePath
}

const actions = {
  updatePageStatus: ({ commit, state }, obj) => {
    commit('update', obj)
  }
}

const mutations = {
  update (state, obj) {
    state.pagination = obj.pagination
    state.pagePath = obj.pagePath
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
