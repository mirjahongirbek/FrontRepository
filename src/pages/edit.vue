<template>
<div>
    <edit url="/home" :namespace="namespace" service-name="data" :id="id"></edit>
</div>
</template>
<script>
    import edit from "../components/edit/edit.vue"
    export  default {
        data(){
            return{
                namespace:true,
                id:"",
            }
        },
        methods:{

        },
        mounted(){

        },
        beforeMount(){
         this.id= this.$route.params.id;
        },
        components:{
            edit
        }
    }
</script>