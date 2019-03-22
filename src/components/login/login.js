import Fingerprint from "fingerprintjs"

export default {
    name: "login.vue",
    props: {
        data: {
            type: Object,

        },
        isAdd: {
            type: Boolean,
            default: true

        },
        url: {
            type: String,
            required: true
        },
        getMe: {
            type: Boolean,
            default: true,
        },
        namespace: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            temp: {
                userName: "",
                password: "",
                deviceId:"",
            }

        }
    },
    methods: {
        //TODO change
        getMeFunc() {
            this.$store.state.http.get(this.url + "/getMe").then(response => {
                console.log(response);
                if (!this.namespace) return;
                this.$store.state.joha.entities= response.data.result;

            }, err => {
                this.$store.getters.errorParse(err, this);
            })
        },
        login() {
            this.temp.deviceId = "123456";
            this.temp.deviceName = "joha";

            if (!this.isAdd) {
                this.$emit("login", this.temp);
                return;
            }
            this.$store.state.http.post(this.url + "/login", this.temp).then(response => {
                this.$store.state.http.defaults.headers.common = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + response.data.result.accessToken,

                };
                window.localStorage.setItem("accessToken", response.data.result.accessToken);
                window.localStorage.setItem("refreshToken", response.data.result.refreshToken);
                this.$store.state.isAuth = true;
                if (this.getMe) {
                    this.getMeFunc();
                }
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
        var fingerprint = new Fingerprint().get();
        this.temp.deviceId = fingerprint;

    }

}