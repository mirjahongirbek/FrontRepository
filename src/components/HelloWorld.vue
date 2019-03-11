<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!--<server-table url="/home" namespace="true" serviceName="data"></server-table>-->
    <!--<add-modal url="/home" :is-show="showAdd" namespace="true"  service-name="data"></add-modal>-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
