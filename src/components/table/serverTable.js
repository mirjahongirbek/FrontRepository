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
            default: String,
            required: true

        }
    },
    data() {
        return {
            columns: [],
            options: {
                requestAdapter(data) {
                    return {
                        offset: (data.page - 1) * data.limit,
                        limit:data.limit
                    }
                },
                requestFunction: function (data) {

                    if(!this.$attrs.urls){
                        alert("Error");
                        return;
                    }
                    let url=this.$attrs.urls+"/postsdata"
                    return this.$store.state.http.post(url,
                        {
                            limit: data.limit,
                            offset: data.offset,
                            name:this.$attrs.serviceName,
                            withOffset:false
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
        getColumns(_this) {
            return new Promise((resolve, reject) => {
                _this.$store.state.http.get(_this.url + "/GetProps?id=" + _this.serviceName).then(response => {
                    if (response.data && response.data.result) {
                        _this.columns = response.data.result;
                        resolve();
                    }
                    reject();
                }, err => {
                    _this.$store.getters.errorParse(err, _this);
                    reject();
                })
            });
        },
        getData(start) {
            let _this = this;
            this.$refs.serverTable.serviceName=this.serviceName;
            if (!_this.url) return;
            this.getColumns(_this).then(result => {
                // _this.$store.state.http.get(_this.url+).then(response => {
                // }, err => {
                //     _this.$store.getters.errorParse(err, _this);
                // })
            }, err => {

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