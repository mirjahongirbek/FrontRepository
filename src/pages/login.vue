<template>
    <div>
        <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-lg-6">
                <login-user :url="url" ></login-user></div>
            <div class="col-lg-2"></div>

        </div>

    </div>
</template>

<script>
    import loginUser from "../components/auth/login.vue"

    export default {
        data() {
            return {
                url: "/auth"
            }
        },
        methods: {},
        mounted() {

        },
        components: {
            loginUser
        }
    }
</script>

<style scoped>

</style>