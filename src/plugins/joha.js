export default {

    install(Vue, options) {
        let url;
        if (!options) return;

        if(typeof options=="string")
            url=options;
        if(typeof  options== "object"){
            url= options.url;
        }

        Vue.watch = {
            "$store.state.isAuth": function (val) {
                if (val) {
                    Vue.$store.state.http.get(url+"/getMe").then(response=>{
                        console.log(response);

                    }, err=>{
                        vue.$store.getters.errorParse(err, Vue);

                    })
                }
            }
        }

    }
}