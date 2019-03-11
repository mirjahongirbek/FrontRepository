<template>
    <div>
        <b-form-input v-model="values" v-if="isShow('input')"/>
        <b-form-checkbox v-model="values" v-else-if="isShow('checkBox')"/>
        <b-form-radio v-model="values" v-else-if="isShow('radio')"></b-form-radio>
        <b-button-group v-else-if="isShow('EditDelete')">
            <b-button @click="transdEvent('edit',options)">Edit</b-button>
            <b-button @click="transdEvent('delete',options)">Delete</b-button>
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
            isShow(type) {
                let _this = this;
                if (this.options) {
                    if (this.options.type == type) {
                        return true;
                    }
                    return false;
                }
                for (const i in this.$store.state.joha.types[type]) {
                    if (i == _this.type) {
                        return true;
                    }
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