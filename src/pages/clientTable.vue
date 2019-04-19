<template>
    <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
            <client-table url="/home" serviceName="Company" />

        </div>
        <div class="col-lg-2"></div>
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