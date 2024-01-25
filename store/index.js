export const state = () => ({
    // your global state properties
    history: [],
    card: {}
})

export const mutations = {
    // your global mutations
    loadCard(state, data) {
        state.history = data.history
        state.card = data.card
    },
    setStatus(state, data) {
        state.card.status = data
    },
}

export const actions = {
    // your global actions
    async loadCard({ commit }) {
        const cnc = localStorage.getItem("card");
        const data = await this.$axios.$get(`/card/${cnc}`);
        commit('loadCard', data)
    },
    async setStatus({ commit }, value) {
        const cnc = localStorage.getItem('card');
        const detail = {
            cnc: cnc,
            status: value
        }
        const data = await this.$axios.$put(`/card/blokirCard`, detail)
        commit('setStatus', value)
    }
}

export const getters = {
    // your global actions
    getStatus(state) {
        return state.card.status
    }
}