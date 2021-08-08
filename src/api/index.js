import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});

export default {
  fetchPokemons(params) {
    return api({
      url: '/pokemon/',
      method: 'get',
      params: {
        offset: params.offset,
        limit: params.limit,
      },
    });
  },

  searchPokemon(code) {
    return api({
      url: `/pokemon/${code}`,
      method: 'get',
    });
  },

  getPokemon(code) {
    return api({
      url: `/pokemon/${code}`,
      method: 'get',
    });
  },

  getEncounters(code) {
    return api({
      url: `/pokemon/${code}/encounters`,
      method: 'get',
    });
  },
};
