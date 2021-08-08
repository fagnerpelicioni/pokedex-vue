<template>
  <router-link
    :to="{ name: 'Pokemon', params: { pokeId: pokemon.name } }">
    <article class="card">
      <h3 class="card-name text--weight-bold">
        {{ pokemon.name }}
      </h3>
    </article>
  </router-link>
</template>

<script>
export default {
  name: 'Card',

  props: {
    pokemon: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  transition: $transition-1;
  border-radius: $radius-sm;
  background: $white;
  box-shadow: 0 2px 4px 0 rgba($black, 0.16);

  &:hover {
    transition: $transition-1;
    box-shadow: 1px 4px 10px 4px rgba($black, 0.16);
    transform: scale(1.2);
  }

  @include screen(phone-up) {
    flex: 0 0 calc(50% - 2rem);

  }
  @include screen(tablet-up) {
    flex: 0 0 calc(33.33% - 2rem);

  }
  @include screen(desktop-up) {
    flex: 0 0 calc(25% - 2rem);
  }

  .card-name {
    padding: .5rem 0;
    text-transform: capitalize;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
