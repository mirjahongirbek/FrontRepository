<template>
    <div>
    <!--<server-table url="/home"
                  namespace="true"
                  @edit="EditData"
                  @delete="DeleteData"
                  serviceName="data"></server-table>-->
    <div></div>
    <add-modal url="/home"
               :is-show="showAdd"
               service-name="Product">

    </add-modal>
    </div>
</template>

<script>
     import AddModal from "../components/modals/addmodel.vue"
    export default {
        name: "addserver",
        components:{
            AddModal
        }
    }
</script>

<style scoped>

</style>
