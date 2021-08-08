// import the requests from api file
import api from '@/api/index';

export default {
  state: {
    pokemons: [],
    pokemon: {
      data: {},
      encounters: [],
    },
  },

  getters: {
    pokemonGetCards: state => state.pokemons,
    pokemonGetSingle: state => state.pokemon.data,
    pokemonGetEncounters: state => state.pokemon.encounters,
  },

  actions: {
    fetchPokeCards({ commit }, params) {
      return api.fetchPokemons(params)
        .then((response) => {
          // Call the mutation to fill the state
          commit('POKEMONS_SET_DATA', response.data.results);
          // Accept the promise and send to View
          return Promise.resolve();
        })
        .catch((error) => {
          commit('POKEMON_RESET_DATA');
          // rejects the promise and sends the error to View
          return Promise.reject(error);
        });
    },

    showPokemon({ commit }, code) {
      return api.getPokemon(code)
        .then((response) => {
          commit('POKEMON_SET_DATA', response.data);
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('POKEMON_RESET_DATA');
          return Promise.reject(error);
        });
    },

    fetchEncounters({ commit }, code) {
      return api.getEncounters(code)
        .then((response) => {
          commit('POKEMON_SET_ENCOUNTERS', response.data);
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('POKEMON_RESET_DATA');
          return Promise.reject(error);
        });
    },

    findPokemon({ commit }, code) {
      return api.searchPokemon(code)
        .then((response) => {
          commit('POKEMONS_SET_DATA', { 1: response.data });
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit('POKEMONS_RESET_DATA');
          return Promise.reject(error);
        });
    },
  },

  mutations: {
    // fill the state
    POKEMONS_SET_DATA(state, data) {
      state.pokemons = data;
    },

    POKEMON_SET_DATA(state, data) {
      state.pokemon.data = data;
    },

    POKEMON_SET_ENCOUNTERS(state, data) {
      state.pokemon.encounters = data;
    },

    // reset vuex pokemons if the request is not made
    POKEMON_RESET_DATA(state) {
      state.pokemon = [];
    },

    POKEMONS_RESET_DATA(state) {
      state.pokemons = [];
    },
  },
};
