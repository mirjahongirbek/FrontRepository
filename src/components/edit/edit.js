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
            type: Boolean,
            default: null
        },
        serviceName: {
            type: String,
            required: true
        },
        id: {
            type: String,
        }

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
            if (!result)
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
        getProps() {
            return new Promise((resolve, reject) => {
                if (this.namespace && this.$store.state.joha.entities[this.serviceName]) {
                    this.parseData(this.$store.state.joha.entities[this.serviceName]);
                    resolve();
                    return;
                }
                this.$store.state.http.get(this.url + "/GetProps?id=" + this.serviceName).then(response => {
                    this.parseData(response.data.result);
                    if (this.namespace) {
                        this.$store.state.joha.entities[this.serviceName] = response.data;

                    }
                    resolve();
                    return;
                }, err => {
                    this.$store.getters.errorParse(err, this);
                });

            });

        },
        getData() {
            this.$store.state.http.get(this.url + "/GetById?id=" + this.id + "&name=" + this.serviceName).then(response => {
                console.log(response.data.result);
              this.dataList=  this.$store.getters["joha/joinDataList"](response.data.result,this.dataList, this.modals);
              console.log(this.modals);
              }, err => {
                this.$store.getters.errorParse(err, this)
            })
        }

    },
    mounted() {
        this.getProps().then(r => {
            console.log(r);
            this.getData()

        }, err => {
        });
    },
    watch: {
        isShow: function (val) {
            if (!val) {
                console.log(val);
                return;
            }

            this.modalShow = val
        }
    }

}