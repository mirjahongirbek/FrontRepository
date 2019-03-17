export default {
    namespaced: true,
    state: {
        list: {},
        entities: {},
        types: {
            "input": {
                "String": "",
                "Number": "",
                "DateTime": ""
            },
            "radio": {
                "Radio": ""
            },
            "select": {},
            "checkBox": {}
        },
        slots: [
            {
                key: [75, 76, 80],
                path: "joha/EditDelete"
            },
            {
                key: [28],
                run: function (data, serviceName) {
                    let result={};
                    result.serviceName= serviceName;
                    result.data=data;
                    return result;

                },
            },
            {
                key: [26],
                run: function (data, serviceName) {

                    let result={};
                    result.serviceName= serviceName;
                    result.data=data;
                    return result;
                },
            },
            {
                key: [29],
                run: function (data, serviceName) {
                    let result={};
                    result.serviceName= serviceName;
                    result.data=data;
                    return result;
                },
            },
            {
                key:[50],
                run: function (data, serviceName) {
                    let result={};
                    result.serviceName= serviceName;
                    result.data=data;
                    return result;
                },
            }
        ],


    },
    getters: {
        parseTableProps: (state, getters) => (data, _this) => {
            console.log(_this);
            for (const key in data) {
                _this.columns.push(key);
                //TODO editDelete ... parent
                let value = state.slots.firstOrDefault(m => m.key.contains(data[key].fontType));
                if (value) {
                    // changeSlots
                    if(value.path){
                        _this.changeSlots.push({
                            name: key,
                            options: _this.$store.getters[value.path](data[key], _this.serviceName)
                        });
                    }else if(value.run){
                        _this.changeSlots.push({
                            name: key,
                            options: value.run(data[key], _this.serviceName)
                        });
                    }

                }

                ///
                if (data[key].label) {
                    //TODO parent
                    _this.options.headings[key] = data[key].label;
                    if (data[key].otherTable) {
                        getters.getParseData(_this.url, data[key].otherTable, key, _this)
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
                    _this.options.headings[key] = key;
                }

            }
            console.log(_this.options);
            console.log(_this.columns);
        },
        getData: (state) => (data) => {
            for (const key in state.list) {
                if (key == data.type) {
                    return state.list[key];
                }
            }
            return false;
        },
        getParseData: (state) => (url, serviceName, data, _this) => {
            return new Promise((resolve, reject) => {
                _this.$store.state.http.get(url + "/GetAll?id=" + serviceName).then(response => {
                    resolve(data, response.data);

                }, err => {
                    _this.$store.getters.errorPase(err, _this);

                })

            })

        },
        joinModal: (state) => (modal, data) => {
            for (const key in modal) {
                let temp = data.firstOrDefault(m => m.name == key);
                if (!temp) {
                    continue;
                }
                modal[key] = temp.value;

            }
            return true;
        },
        joinDataList: (state) => (resmodal, data, vuemodel) => {
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
        EditDelete: (state) => (data, serviceName) => {
            let result = {};
            result.data = data;
            result.serviceName= serviceName;
            result.run = function (_this) {
                _this.$emit(this.eventName, this.value, this.serviceName);
            };

            return result;
        }
    },

}