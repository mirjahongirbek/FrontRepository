export default {
    namespaced: true,
    state: {
        list: {},
        entities: {},
        slots: [
            {
                key: [0],
                AddSlot: false
            },
            {
                key: [75, 76, 80],
                path: "joha/EditDelete",
                AddSlot: true,
            },
            {
                key: [28],
                AddSlot: true,
                run: function (data, serviceName) {
                    let result = {};
                    result.serviceName = serviceName;
                    result.data = data;
                    return result;
                }
            },
            {
                key: [26],
                AddSlot: true,
                run: function (data, serviceName) {
                    let result = {};
                    result.serviceName = serviceName;
                    result.data = data;
                    return result;
                }
            },
            {
                key: [29],
                AddSlot: true,
                run: function (data, serviceName) {
                    let result = {};
                    result.serviceName = serviceName;
                    result.data = data;
                    return result;
                }
            },
            {
                key: [50],
                AddSlot: true,
                run: function (data, serviceName) {
                    let result = {};
                    result.serviceName = serviceName;
                    result.data = data;
                    return result;
                }
            }
        ],
        typeList:[
            {id:1, type:"number"},
            {id:2, type:"text"},
            {id:3,type:"date"},
            {id:4, type:"text"},
            {id:25, type:"checkbox"},
            {id:26, type:"checkbox"},
            {id:27, type:"radio"},

        ]
    },

    getters: {
        getForeignKey: (state) => (url, key, _this) => {
            return new Promise((resolve, reject) => {
                _this.$store.state.http.get(url + "/GetForegnKey" + "?id=" + key).then(response => {
                    console.log(response);
                    resolve(response.data.result);
                }, err => {
                    _this.$store.getters.errorParse(err, _this)
                })

            });

        },

        parseProps: (state) => (data, key, _this) => {
            let value = state.slots.firstOrDefault(m =>
                m.key.contains(data[key].fontType)
            );
            if (!value) {
                value = {};
            }
            if (value.path) {
                return {
                    name: key,
                    AddSlot:value.AddSlot,

                    options: _this.$store.getters[value.path](
                        data[key],
                        _this.serviceName
                    )
                };
            } else if (value.run) {
                return {
                    name: key,
                    AddSlot:value.AddSlot,
                    options: value.run(data[key], _this.serviceName)
                };
            }
            return {
                name: key,
                options: {
                    data: data[key]

                }
            }
        },
        //TODO editDelete ... parent
        parseTableProps: (state, getters) => (data, _this) => {
            for (const key in data) {
                _this.columns.push(key);
                let temp = getters.parseProps(data, key, _this);
                console.log(temp);
                if (temp.AddSlot) {
                    _this.changeSlots.push(getters.parseProps(data, key, _this));
                }


                ///
                if (data[key].label) {
                    //TODO parent
                    _this.options.headings[key] = data[key].label;
                    if (data[key].otherTable) {
                        getters
                            .getParseData(_this.url, data[key].otherTable, key, _this)
                            .then(
                                (key, data) => {
                                    _this.otherTable(key, data);
                                },
                                err => {
                                    _this.$store.getters.errorParse(err, _this);
                                }
                            );
                    } else {
                        let income = _this.$store.getters["joha/getData"](data);
                        if (income) {
                            _this.parseSlot(income);
                        }
                    }
                } else {
                    _this.options.headings[key] = key;
                }
            }
            console.log(_this.options);
            console.log(_this.columns);
        },
        getData: state => data => {
            for (const key in state.list) {
                if (key == data.type) {
                    return state.list[key];
                }
            }
            return false;
        },
        getParseData: state => (url, serviceName, data, _this) => {
            return new Promise((resolve, reject) => {
                _this.$store.state.http.get(url + "/GetAll?id=" + serviceName).then(
                    response => {
                        resolve(data, response.data);
                    },
                    err => {
                        _this.$store.getters.errorPase(err, _this);
                    }
                );
            });
        },
        joinModal: state => (modal, data) => {
            for (const key in modal) {
                let temp = data.firstOrDefault(m => m.name == key);
                if (!temp) {
                    continue;
                }
                modal[key] = temp.value;
            }
            return true;
        },
        joinDataList: state => (resmodal, data, vuemodel) => {
            for (let i in resmodal) {
                let temp = data.firstOrDefault(m => m.name == i);
                if (!temp) {
                    vuemodel[i] = resmodal[i];
                    continue;
                }
                temp.value = resmodal[i];
                vuemodel[i] = resmodal[i];
            }
            return data;
        },
        EditDelete: state => (data, serviceName) => {
            let result = {};
            result.data = data;
            result.serviceName = serviceName;
            result.run = function (_this) {
                _this.$emit(this.eventName, this.value, this.serviceName);
            };

            return result;
        }
    }
};
