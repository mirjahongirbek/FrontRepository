<template>
    <div>
        <login-user :url="url" ></login-user>
    </div>
</template>

<script>
    import loginUser from "../components/login/login.vue"

    export default {
        data() {
            return {
                url: "/account/login"
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