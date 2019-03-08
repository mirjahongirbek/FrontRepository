import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex);
var aurl=axios.create({
    baseURL:"http://localhost:1234"

});
const store= new Vuex.Store({
    state:{
    http:aurl,
    },
    getters:{
errorParse:(state)=>(err, _this)=>{
      console.log(err)
}
    },

});
export  default  store;
