<template>
    <div>
        <b-modal v-model="modalShow" @ok="saveEntity()">
            <b-card title="Card title" sub-title="Card subtitle">
                <b-card-text>
                    Add Aytim
                </b-card-text>
                <div v-for="(key, value) in dataList" :key="value">
                    <j-input :type="key.type"></j-input>
                </div>
                <b-card-text></b-card-text>
            </b-card>
        </b-modal>
    </div>
</template>

<script>
    export default {
        props: {
            url: {
                type: String,
                require: true,

            },
            isShow: {
                type: Boolean,
                default: false
            },
            isAdd: {
                type: Boolean,
                default: true
            },
            namespace: {
                type: String,
                default: null
            },
            serviceName: {
                type: String,
                required: true
            },

        },

        data() {
            return {
                modalShow: false,
                dataList: [],
                modals: {}
            }
        },
        methods: {
            cansel() {
                this.isShow = false;
                this.$emit("cansel");
            },
            saveEntity() {
                let result = this.$store.getters["joha/joinModal"](this.modals, this.dataList);
                if (!result) return;
                this.$store.state.http.post(this.url + "/AddData", {
                    name: this.serviceName,
                    data: JSON.stringify(this.modals)
                }).then(response => {
                    console.log(response);
                    alert("Good")
                }, err => {
                    this.$store.getters.errorParse(err, this)

                })

            },
            addEntity() {
                if (!this.isAdd) {
                    this.$emit("add");
                    return;
                }
                this.$store.state.http.post(this.url + "/AddData", {
                    name: this.serviceName,
                    data: JSON.stringify(this.modal)
                }).then(response => {

                    this.$emit("add", response.data);
                }, err => {
                    this.$store.getters.errorParse(err, this);
                })

            },
            parseData(data) {
                let _this = this;
                for (const key in data) {
                    if (!data[key].showAdd) {
                        continue;
                    }
                    _this.modals[key] = "";
                    let type = data[key].type;
                    _this.dataList.push({name: key, label: data[key].label, type: type, value: ""})
                }
            },
            getData() {
                if (this.namespace && this.$store.state.joha.entities[this.serviceName]) {
                    this.parseData(this.$store.state.joha.entities[this.serviceName]);
                    return;
                }
                this.$store.state.http.get(this.url + "/GetProps?id=" + this.serviceName).then(response => {
                    this.parseData(response.data.result);
                    if (this.namespace) {
                        this.$store.state.joha.entities[this.serviceName] = response.data;
                    }
                }, err => {
                    this.$store.getters.errorParse(err, this);
                })

            }

        },
        watch: {
            isShow: function (val) {
                if (!val) {
                    console.log(val);
                    return;
                }
                this.getData();
                this.modalShow = val
            }
        }

    }
</script>

<style scoped>

</style>