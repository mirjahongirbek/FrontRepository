<template>
    <div>
        <b-form-input v-model="values" v-if="isShow(0,24)"/>
        <b-form-checkbox v-model="values" v-else-if="isShow(26)"/>
        <b-form-radio v-model="values" v-else-if="isShow(27)"></b-form-radio>
        <select v-else-if="isShow(28)">
            <option>sdsd</option>
            <option>sdsd</option>

        </select>
        <b-button-group v-else-if="isShow(75, 99)">
            <b-button @click="transdEvent('edit',options)" v-if="isShow([75,80])">Edit</b-button>
            <b-button @click="transdEvent('delete',options)" v-if="isShow([76,80])">Delete</b-button>
        </b-button-group>
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
            id: {}
        },
        data() {
            return {
                values: "",


            }
        },
        methods: {

            transdEvent(name, options) {
                options.eventName = name;
                this.$emit('getEvent', options);
            },
            derfgd() {

            },
            isShow(id, id2) {


                if (id2) {
                    if (id<this.options.data.fontType&& id2>this.options.data.fontType)
                        return true;
                    return false;
                }
                if (Array.isArray(id)) {
                    if(id.contains(this.options.data.fontType))return true;

                    return false;
                }
                if (Number.isInteger(id) &&this.options.data.fontType== id) {
                    return true;
                }
                return false;


            },
            parseOptions(option) {

            }
        },
        mounted() {
            if (this.startValue) {
                this.values = this.startValue;
            }
            if (this.options) {
                this.options.value = this.id;
                this.parseOptions(this.options);
            }
        },
        watch: {
            values: function (val) {
                this.$emit("input", val);

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