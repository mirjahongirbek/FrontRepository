<template>
  <div>
      <register-modal
      :url="url"
      ></register-modal>
    my name is joha
      </div>  
</template>

<script>
import registerModal from "../components/auth/register.vue"
export default {
data(){
    return{
url:"/auth"
    }
},
components:{
registerModal
}
}
</script>

<style>

</style>
