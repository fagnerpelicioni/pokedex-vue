import Vue from 'vue';
import Vuex from 'vuex';

// Modularized Vuex
import pokemon from './modules/pokemon';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pokemon,
  },
});
