<template>
    <server-table url="/home"
                  namespace="true"
                  @edit="EditData"
                  @delete="DeleteData"
                  serviceName="data"></server-table>
    <div></div>
    <add-modal url="/home" :is-show="showAdd" namespace="true"  service-name="data"></add-modal>

</template>

<script>
    import ServerTable from "../components/table/serverTable.vue"
    import AddModal from "../components/modals/addmodel.vue"
    export default {
        name: "addserver",
        components:{
            ServerTable,
            AddModal
        }
    }
</script>

<style scoped>

</style>