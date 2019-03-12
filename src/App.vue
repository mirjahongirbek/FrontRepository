<template>
  <div id="app">

      <router-view></router-view>
<!--    <server-table url="/home"
                  namespace="true"
                  @edit="EditData"
                  @delete="DeleteData"
                  serviceName="data"></server-table>
    <add-modal url="/home" :is-show="showAdd" namespace="true"  service-name="data"></add-modal>
    --> </div>
</template>

<script>
/*
import ServerTable from "./components/table/serverTable.vue"
import AddModal from "./components/modals/addmodel.vue"
*/
export default {
  name: 'app',
  components: {
/*    HelloWorld,
    ServerTable,
    AddModal*/
  },
  data(){
    return{
      showAdd:false
    }
  },
  methods:{
      EditData(id, serviceName){
          console.log(id);
          console.log(serviceName);
      },
      DeleteData(id, serviceName){
          console.log(id);
          console.log(serviceName);
      }

  },
  mounted() {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
