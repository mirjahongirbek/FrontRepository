import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import {ServerTable, ClientTable} from 'vue-tables-2'

Vue.use(ServerTable);
Vue.use(ClientTable);

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  store
}).$mount('#app');
