import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import "mini-linq-js"
import JInput from "./components/JInput.vue"
import {ServerTable, ClientTable} from 'vue-tables-2'
import 'bootstrap/dist/css/bootstrap.css'

import router from "./router"



Vue.use(ServerTable);
Vue.use(ClientTable);


Vue.component("JInput", JInput);
Vue.config.productionTip = false;
new Vue({
    router,

    data() {
        return {}
    },
    render: h => h(App),
    mounted() {

    },
    store
}).$mount('#app');
