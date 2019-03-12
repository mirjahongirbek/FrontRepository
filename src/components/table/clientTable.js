export default {
    props: {
        url: {
            type: String,
            required: true
        },
        serviceName: {
            type: String,
            required: true,
        },
        namespace: {
            type: Boolean,
            default: true
        },
        start: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            columns: [],
            changeSlots: [],
            options: {
                headings: {},

            },
            tablesData: [],

        }
    },
    methods: {
        otherTable(key, data) {
            console.log(key);

        },
        getEvent(option) {
            console.log(option);
            option.run(this);
        },
        getColumns(_this) {
            return new Promise((resolve, reject) => {
                if (_this.namespace) {
                    let props = _this.$store.state.joha.entities[_this.serviceName];
                    console.log(this.props);
                    if (props) {
                        _this.parseProps(props);
                        resolve();
                        return;
                    }
                }
                _this.$store.state.http.get(_this.url + "/GetProps?id=" + _this.serviceName).then(response => {
                    _this.parseProps(response.data.result);
                    resolve();
                    return;
                }, err => {
                    _this.$store.getters.errorParse(err, _this);

                })

            })
        },
        parseProps(data) {
            this.$store.getters["joha/parseTableProps"](data, this);
        },
        getData() {
            this.$store.state.http.get(this.url + "/GetAll?id=" + this.serviceName).then(response => {
                this.tablesData= response.data.result;

            }, err => {
                this.$store.getters.errorParse(err, this)

            })
        },

    },
    mounted() {
        let _this = this;
        _this.getColumns(_this).then(response => {
            _this.getData();
        }, err => {
        });
    }
}