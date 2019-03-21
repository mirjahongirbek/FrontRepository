<template>
    <div>
        <login-user :url="url" ></login-user>
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