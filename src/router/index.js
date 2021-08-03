import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/items",
    name: "Items",
    component: () => import("../views/Items.vue")
  },
  {
    path: "/stock",
    name: "stock",
    component: () => import("../views/Stock.vue")
  },
  {
    path: "/report",
    name: "report",
    component: () => import("../views/Reports.vue")
  },
  {
    path: "/track",
    name: "track",
    component: () => import("../views/Track.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
