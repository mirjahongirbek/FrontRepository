import Vue from "vue";
import VueRouter from "vue-router";
import edit from "./pages/edit.vue";
import clients from "./pages/clientTable.vue";
import home from "./components/HelloWorld.vue";
import login from "./pages/login.vue";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    { path: "/", component: home },
    { path: "/edit/:id", component: edit },
    { path: "/client", component: clients },
    { path: "/login", component: login }
  ]
});
export default router;
