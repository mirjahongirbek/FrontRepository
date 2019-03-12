<template>
    <div>
        <div>
            <client-table url="/home" serviceName="data" />
           <!-- <client-table url="/home"
                          service-name="data"></client-table>-->
        </div>
    </div>
</template>

<script>
    import ClientTable from "../components/table/clientTable.vue"

    export default {
       data() {
            return {}
        },
        methods: {},
        mounted() {

        },
        components: {
            ClientTable,
        }
    }
</script>

<style scoped>

</style>