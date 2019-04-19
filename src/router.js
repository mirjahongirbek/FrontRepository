import Vue from "vue";
import VueRouter from "vue-router";
import edit from "./pages/edit.vue";
import clients from "./pages/clientTable.vue";
import home from "./components/HelloWorld.vue";
import login from "./pages/login.vue";
import category from "./pages/category.vue"
import product from "./pages/product.vue"

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {path: "/", component: home},
        {path: "/edit/:id", component: edit},
        {path: "/client", component: clients},
        {path:"/register", component:()=>import("./pages/register.vue")},
        {path: "/login", component: login},
        {path: "/category", component: category},
        {
            path: "/product", component: product
        },
        {path:"/add", component:()=>import("./pages/addserver.vue")}
    ]
});
export default router;
