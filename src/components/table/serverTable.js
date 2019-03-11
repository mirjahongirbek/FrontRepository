export default {
    props: {
        url: {
            type: String,
            required: true
        },
        start: {
            type: Boolean,
            default: true,
        },
        serviceName: {
            type: String,
            required: true

        },
        namespace: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            columns: [],
            changeSlots: [],
            options: {
                headings: {},
                requestAdapter(data) {
                    return {
                        offset: (data.page - 1) * data.limit,
                        limit: data.limit
                    }
                },
                requestFunction: function (data) {
                    if (!this.$attrs.urls) {
                        alert("Error");
                        return;
                    }
                    let url = this.$attrs.urls + "/DataWithCount";
                    return this.$store.state.http.post(url,
                        {
                            limit: data.limit,
                            offset: data.offset,
                            name: this.$attrs.serviceName,
                            withOffset: false
                        }
                    ).catch(function (e) {
                        this.$store.getters.errorParse(e, this);
                    }.bind(this));
                },
                responseAdapter({data}) {
                    return {
                        data: data.result.items,
                        count: data.result.count
                    }
                },
            }
        }
    },
    methods: {
        otherTable(key, data) {
            console.log(key);
            console.log(data);
        },
        parseSlot(income) {
            console.log(income);
        },
        getEvent(option) {
            console.log(option);
            option.run(this);
        },
        getColumns(_this) {
            return new Promise((resolve, reject) => {
                if (_this.namespace) {
                    console.log(_this.namespace)
                }
                _this.$store.state.http.get(_this.url + "/GetProps?id=" + _this.serviceName).then(response => {
                    if (response.data && response.data.result) {
                        if (_this.namespace) {
                            _this.$store.state.joha.entities[_this.serviceName] = response.data.result;
                            this.parseData(response.data.result);
                            resolve();
                            return;
                        }
                    }
                    reject();
                }, err => {
                    _this.$store.getters.errorParse(err, _this);
                    reject();
                })
            });
        },
        parseData(data) {
            let _this = this;
            for (const key in data) {
                _this.columns.push(key);
                //editDelete ...
                let value = _this.$store.state.joha.slots.firstOrDefault(m => m.key == data[key].type);
                if (value) {
                    _this.changeSlots.push({name: key, options: _this.$store.getters[value.path](data[key], _this.serviceName)});
                }
                ///
                if (data[key].label) {
                    _this.options.headings.key = data[key].label;
                    if (data[key].otherTable) {
                        _this.$store.getters["joha/getParseData"](_this.url, data[key].otherTable, key, _this)
                            .then((key, data) => {
                                _this.otherTable(key, data);
                            }, err => {
                                _this.$store.getters.errorParse(err, _this);
                            })
                    } else {
                        let income = _this.$store.getters["joha/getData"](data);
                        if (income) {
                            _this.parseSlot(income);
                        }
                    }
                } else {
                    _this.options.headings.key = key;
                }

            }
        },

        getData() {
            let _this = this;
            this.$refs.serverTable.serviceName = this.serviceName;
            if (!_this.url) return;
            this.getColumns(_this).then(result => {
                console.log(result);
                // _this.$store.state.http.get(_this.url+).then(response => {
                // }, err => {
                //     _this.$store.getters.errorParse(err, _this);
                // })
            }, err => {
                _this.$store.getters.errorParse(err, _this);
            });


        }
    },

    mounted() {
        this.getData(true);
    },
    watch: {
        "start": function (val) {

        }
    },

}