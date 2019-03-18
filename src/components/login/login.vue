<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group row">
                    <label class="col-md-4 col-form-label text-right">Маска номер карты</label>
                    <div class="col-md-8">
                        <input type="text" v-model="temp.userName" class="form-control"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-4 col-form-label text-right">Наименование</label>
                    <div class="col-md-8">
                        <input type="password" v-model="temp.password" class="form-control"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn base_btn" data-toggle="modal" data-target="#addModal">Добавить</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login.vue",
        props: {
            data: {
                type: Object,

            },
            isAdd: {
                type: Boolean,
                default:true

            },
            url: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                temp: {}

            }
        },
        methods: {
            login() {
                this.$store.state.http.post(this.url + "/login").then(response => {
                    this.$store.state.http.defaults.headers.common = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + response.data.result.accessToken,
                    };

                    this.$emit("ok", response.data.result);
                }, err => {
                this.$store.getters.errorParse(err, this);
                })

            },
            generateTemp() {
                this.temp = {
                    userName: "",
                    password: "",
                }
            }
        },
        beforeMount() {
            if (this.data)
                this.temp = JSON.parse(JSON.stringify(this.data));
            else {
                this.generateTemp();
            }
        }

    }
</script>

<style scoped>

</style>