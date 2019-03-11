export default {
    namespaced: true,
    state: {
        list: {
            "EditDelete": {},
            "Edit": {},
            "Delete": {},
            "Select": {},
            "CheckBox": {},
            "Boolean": {},
        },
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
                key: "EditDelete",
                path: "joha/EditDelete"
            }

        ],


    },
    getters: {
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
        joinDataList: (state) => (modal, data, vuemodel) => {
            for (let i in modal) {
                let temp = data.firstOrDefault(m => m.name == i);
                if (!temp) {
                    vuemodel[i] = modal[i];
                    continue;
                }
                temp.value = modal[i];
                vuemodel[i] = modal[i];
            }
            return data;
        },
        EditDelete: (state) => (data, serviceName) => {
            let result = {};
            result.serviceName= serviceName;
            result.type="EditDelete";
            result.run = function (_this) {
                _this.$emit(this.eventName, this.value, this.serviceName);
            };

            return result;
        }
    },

}