<template>
  <div class="base">
    <Header/>
    <div class="container">
      <main class="main">
        <transition name="slide-fade" mode="out-in">
          <router-view/>
        </transition>
      </main>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Copyright.vue';

export default {
  name: 'Base',

  components: {
    Header, Footer,
  },
};
</script>
