import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import joha from "./joha"

Vue.use(Vuex);
var aurl=axios.create({
    baseURL:"http://localhost:1596"

});
const store= new Vuex.Store({
    modules:{
      joha
    },
    state:{
        isAuth:false,
    http:aurl,
    },
    getters:{
errorParse:(state)=>(err, _this)=>{
      console.log(err)
}
    },

});
export  default  store;
