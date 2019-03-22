<template>
    <div>
        <div class="row">
            <div class="row">
                <div class="col-lg-7 mb-4 mb-lg-0">
                    <div class="form-group row">
                        <label class="col-md-4 col-form-label text-right">Наименование товара</label>
                        <div class="col-md-8">
                            <input type="text" v-model="kjb" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "register",
        props: {
            url: {
                required: true,
                type: String
            },
            isAdd: {
                type: Boolean,
                default: true

            },

        },
        data() {
            return {
                temp:{
                    userName:"",

                }

            }
        },
        methods: {},
        mounted() {

        }
    }
</script>

<style scoped>

</style>