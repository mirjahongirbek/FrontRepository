<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <server-table url="/home" serviceName="Product"></server-table>

  </div>
</template>

<script>
  import  ServerTable from "../components/table/serverTable.vue"

export default {
    components:{
      ServerTable,

    },
  name: 'HelloWorld',
  props: {
    msg: String,

  },
  data(){
    return{
      showAdd: true,
      namespace:true
    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
