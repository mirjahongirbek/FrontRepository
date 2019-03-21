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
            <button @click="login" class="btn base_btn" >Login</button>
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
                temp: {userName:"",
                password:"",
                deviceId:"",
                deviceName:"",
                }
            }
        },
        methods: {
            //TODO change
            login() {
                console.log(this.temp);
                this.temp.deviceId="123456"
                this.temp.deviceName="joha";
                this.$store.state.http.post(this.url + "/login", this.temp).then(response => {
                    console.log(response);
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