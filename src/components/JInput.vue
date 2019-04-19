<template>
    <div>

        <input v-model="values" v-if="isShow(0,27)" :type="inputType">
        <select v-else-if="isShow(28)" v-model="values">
            <option v-for="(key, value) in list" :key="value" :value="key.id">{{key.name}}</option>
        </select>
        <div class="btn-group" role="group" v-else-if="isShow(75, 99)" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" @click="transdEvent('edit',options)" v-if="isShow([75,80])">
                Edit
            </button>
            <button type="button" class="btn btn-secondary" @click="transdEvent('delete',options)"
                    v-if="isShow([76,80])">Delete
            </button>
        </div>
        <div v-if="disabled && options.data.fontType<=75">

            {{values}}


        </div>

    </div>
</template>
<script>
    export default {
        props: {
            type: {
                default: "String",
                type: String,
            },
            url: {
                type: String,

            },
            serviceName: {
                type: String,
            },
            data: {
                default: null,
            },
            startValue: {},
            options: {
                type: Object,
                default: null
            },
            id: {},
            value: {},
            disabled: {
                type: Boolean,
                default: false
            },
            keyName: {
                type: String
            }
        },
        data() {
            return {
                values: "",
                inputType: "text",
                list: []

            }
        },
        methods: {
            transdEvent(name, options) {
                options.eventName = name;
                this.$emit('getEvent', options);
            },
            isShow(id, id2) {
                if(this.disabled && id<75)return false;
                if (id2) {
                    if (id <= this.options.data.fontType && id2 >= this.options.data.fontType)
                        return true;
                    return false;
                }
                if (Array.isArray(id)) {
                    if (id.contains(this.options.data.fontType)) return true;

                    return false;
                }
                if (Number.isInteger(id) && this.options.data.fontType == id) {
                    return true;
                }
                return false;
            },
            //TODO
            parseOptions(option) {
                if (option.data.foreignTable) {
                    option.values = [];
                    let _this= this;
                    this.$store.getters["joha/getForeignKey"](this.url, option.data.foreignTable, this)
                        .then(response => {
                            this.list = response;
                           for(let i=0;i< response.length; i++){
                               if(response[i].id== _this.values){
                                   _this.values=response[i].name;
                               }

                           }

                        }, err => {
                            reject();
                            _this.$store.getters.errorParse(err, _this);
                        });
                }
                return;


            }
        },

        mounted() {
            if (this.startValue) {
                this.values = this.startValue;
            }
            let selectType = null;
            if (this.options) {
                let typeList = this.$store.state.joha.typeList;
                for (let i = 0; i < typeList.length; i++) {
                    if (typeList[i].id == this.options.data.fontType) {
                        selectType = typeList[i];
                        break;
                    }
                }
                if (this.value) {
                    this.values = this.value;
                }
                if (selectType)
                    this.inputType = selectType.type
                this.options.value = this.id;
                this.parseOptions(this.options);
            }
        },
        watch: {
            values: function (val) {
                this.$emit("input", val);
                if (this.keyName) {
                    this.$emit("changeValue", this.keyName, val)
                }

            },
            startValue: function (val) {
                this.values = val;
            }
        }
    }
</script>
<style scoped>
    .container {

    }
</style>
