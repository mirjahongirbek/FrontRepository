<template>
    <div class="card">
        <div class="card-header">
            Add Modal
        </div>
        <div class="card-body">
            <div v-for="(key, value) in dataList" :key="value">
              {{key.options.data.label}}
                <j-input :options="key.options"
                         :key-name="key.name"
                         :url="url"
                         @changeValue="changeModal"></j-input>
            </div>
            <div class="card-footer">
                <button @click="saveEntity()" type="button" class="btn btn-primary">Add</button>
                <button type="button" class="btn btn-danger" @click="cansel()">Cansel</button>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        props: {
            url: {
                type: String,
                require: true
            },
            isAdd: {
                type: Boolean,
                default: true
            },
            namespace: {
                type: Boolean,
                default: true
            },
            serviceName: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                modalShow: false,
                dataList: [],
                modals: {},
                item:""
            };
        },
        mounted() {
            let _this = this;
            setTimeout(() => {
                _this.getData();
            }, 1000);
        },
        methods: {
            cansel() {
                this.isShow = false;
                this.$emit("cansel");
            },
            saveEntity() {
                if (!this.isAdd) {
                    this.$emit("add");
                    return;
                }


                this.$store.state.http
                    .post(this.url + "/AddData", {
                        name: this.serviceName,
                        data: JSON.stringify(this.modals)
                    })
                    .then(
                        response => {
                            alert("Good");
                        },
                        err => {
                            this.$store.getters.errorParse(err, this);
                        }
                    );
            },
            changeModal(key, value){
                this.modals[key]= value

            },
            parseData(data) {
                let _this = this;
                for (const key in data) {
                    if (!data[key].showAdd) {
                        continue;
                    }
                    _this.modals[key]="";
                    _this.dataList.push(_this.$store.getters["joha/parseProps"](data, key, _this))
                    }
                console.log(this.dataList);
            },
            getData() {
                if (this.namespace && this.$store.state.joha.entities[this.serviceName]) {
                    this.parseData(this.$store.state.joha.entities[this.serviceName]);
                    return;
                }
                this.$store.state.http
                    .get(this.url + "/GetProps?id=" + this.serviceName)
                    .then(
                        response => {
                            this.parseData(response.data.result);
                            if (this.namespace) {
                                this.$store.state.joha.entities[this.serviceName] = response.data;

                            }
                        },
                        err => {
                            this.$store.getters.errorParse(err, this);
                        }
                    );
            }
        },
        watch: {
            isShow: function (val) {
                if (!val) {
                    console.log(val);
                    return;
                }

                this.modalShow = val;
            }
        }
    };
</script>

