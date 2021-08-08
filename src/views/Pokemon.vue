<template>
  <div class="pokemon">
    <div v-if="helper.loading" class="loading">
      <Loading />
    </div>
    <msg v-if="helper.feedback.show" :type="helper.feedback.type">
      {{ helper.feedback.message }}
    </msg>
    <section v-if="!helper.loading && !this.helper.feedback.show"
      class="pokemon__content">

      <div class="pokemon-image">
        <img class="pokemon-image__image"
          :src="pokemon.sprites.front_default" :alt="pokemon.name">
        <img class="pokemon-image__image"
          :src="pokemon.sprites.back_default" :alt="pokemon.name">
        <img class="pokemon-image__image"
          :src="pokemon.sprites.front_shiny" :alt="pokemon.name">
        <img class="pokemon-image__image"
          :src="pokemon.sprites.back_shiny" :alt="pokemon.name">
      </div>

      <div class="pokemon-info">
        <p class="pokemon-info__name text--color-primary text--weight-bold">
          {{ pokemon.name }}
        </p>
        <p class="pokemon-info__id">
          {{ 'ID: ' }}
          <span>{{ pokemon.id }}</span>
        </p>
        <p v-if="pokemon.types" class="pokemon-info__type">
          {{ $t('pokemon.type') }}
          <span v-for="(type, index) in pokemon.types"
          :key="index">
            {{ type.type.name + ';' }}
          </span>
        </p>
        <p v-if="pokemon.game_indices.length" class="pokemon-info__games">
          {{ $t('pokemon.games') }}
          <span  v-for="(game, index) in pokemon.game_indices"
            :key="index">
            {{ game.version.name + ';' }}
          </span>
        </p>
        <template v-if="encounters.length">
          <div class="pokemon-info__encounters">
            <p class="encounters__text">
              {{ $t('pokemon.place') }}
            </p>
            <div class="tags">
              <span class="tags__place" v-for="(place, index) in encounters" :key="index">
                {{ formatName(place.location_area.name) }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </section>
    <div class="pokemon__back">
      <router-link class="btn btn__primary" to="/">
        {{ $t('pokemon.back') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const Loading = () => import('@/components/common/Loading.vue');
const msg = () => import('@/components/common/Message.vue');

export default {
  name: 'Pokemon',

  props: {
    pokeId: {
      type: String,
      required: true,
    },
  },

  components: {
    Loading,
    msg,
  },

  data() {
    return {
      helper: {
        loading: true,
        feedback: {
          show: false,
          type: 'error',
          message: null,
        },
      },
    };
  },

  computed: {
    ...mapGetters({
      pokemon: 'pokemonGetSingle',
      encounters: 'pokemonGetEncounters',
    }),
  },

  created() {
    this.getPokemon();
  },

  methods: {
    ...mapActions([
      'showPokemon',
      'fetchEncounters',
    ]),

    formatName(param) {
      return param.replace(/[-]+/g, ' ');
    },
    async getPokemon() {
      try {
        await this.showPokemon(this.pokeId);
        await this.fetchEncounters(this.pokemon.id);
        this.helper.loading = false;
      } catch (e) {
        this.helper.loading = false;
        if (e && !e.request) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.request'),
          });
        } else if (e && e.response) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: e.response.data.error,
          });
        } else {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.generic'),
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon {
  padding: 2rem 0;

  &__content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: $green-200;
    border-radius: $radius-sm;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px 0 rgba($black, 0.16);

    @include screen(phone-up) {
      width: 50%;
      margin: auto auto 2rem;
    }

    .pokemon-image {
      width: 100%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem;

      img {
        transform: scale(1.5);
      }
    }

    .pokemon-info {
      flex: 1;
      padding: 2rem;
      margin: auto;

      @include screen(phone-up) {
        padding: 2rem;
      }

      &__name {
        font-size: $text-3xl;
        text-transform: capitalize;
        text-align: center;
      }

      &__id {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          font-weight: $font-normal;
        }
      }

      &__type {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          text-transform: capitalize;
          font-weight: $font-normal;
        }
      }

      &__games {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          text-transform: capitalize;
          font-weight: $font-normal;
        }
      }

      &__encounters {
        font-size: $text-2xl;
        font-weight: $font-bold;

        .tags {
          display: flex;
          flex-wrap: wrap;

          &__place {
            font-size: $text-sm;
            margin: 0 0.5rem 0.5rem 0;
            padding: 0 1rem;
            background-color: $black;
            color: $white;
            border-radius: $radius-full;
            text-transform: capitalize;
          }
        }
      }

      &__details {
        margin: 0rem 1rem 1rem 0;
        font-size: $text-xl;
        color: $primary;

        &:hover {
          text-decoration: underline;
          transition: $transition-1;
        }
      }
    }
  }
}
</style>
