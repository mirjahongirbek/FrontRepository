import Vue from "vue"
import VueRouter from 'vue-router'
import edit from "./pages/edit.vue"

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {path: "/edit/:id", component:edit}
    ]
});
export default router;