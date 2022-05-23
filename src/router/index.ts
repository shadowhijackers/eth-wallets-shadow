import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "",
          redirect: to=>{ return { path: "/accounts/create"}}
        },
        {
          path: "/accounts/:id",
          name: "Account Details",
          component: ()=>import("../components/Wallet.vue"),
        },
        {
          path: "/accounts/create",
          name: "CreateAccount",
          component: ()=>import("../components/NewAccount.vue"),
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
