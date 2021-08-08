import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    // a basic model is used, to repeat in all views
    path: '/',
    component: () => import(/* webpackChunkName: "root" */ '../views/Base.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          title: 'Inicio',
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
      {
        path: '/:pokeId',
        name: 'Pokemon',
        props: route => ({
          pokeId: route.params.pokeId,
        }),
        meta: {
          title: 'Pokemon',
        },
        // Used pokemon id as url
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "pokemon" */ '../views/Pokemon.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

export default router;
