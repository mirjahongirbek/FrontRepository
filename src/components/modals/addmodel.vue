<template>
  <div>
    <b-card title="Card title" sub-title="Card subtitle">
      <b-card-text>Add Aytim</b-card-text>
      <div v-for="(key, value) in dataList" :key="value">
        {{key}}
        <j-input :options="key.options"></j-input>
      </div>
      <b-card-text></b-card-text>
    </b-card>
  </div>
</template>
<script >
export default {
  props: {
    url: {
      type: String,
      require: true
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    namespace: {
      type: Boolean,
      default: true
    },
    serviceName: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      modalShow: false,
      dataList: [],
      modals: {}
    };
  },
  mounted() {
    let _this = this;
    setTimeout(() => {
      _this.getData();
    }, 1000);
  },
  methods: {
    cansel() {
      this.isShow = false;
      this.$emit("cansel");
    },
    saveEntity() {
      let result = this.$store.getters["joha/joinModal"](
        this.modals,
        this.dataList
      );
      if (!result) return;
      this.$store.state.http
        .post(this.url + "/AddData", {
          name: this.serviceName,
          data: JSON.stringify(this.modals)
        })
        .then(
          response => {
            console.log(response);
            alert("Good");
          },
          err => {
            this.$store.getters.errorParse(err, this);
          }
        );
    },
    addEntity() {
      if (!this.isAdd) {
        this.$emit("add");
        return;
      }
      this.$store.state.http
        .post(this.url + "/AddData", {
          name: this.serviceName,
          data: JSON.stringify(this.modal)
        })
        .then(
          response => {
            this.$emit("add", response.data);
          },
          err => {
            this.$store.getters.errorParse(err, this);
          }
        );
    },
    parseData(data) {
      let _this = this;
      for (const key in data) {
        if (!data[key].showAdd) {
          continue;
        }
        _this.dataList.push(_this.$store.getters["joha/parseProps"](data, key,_this))
        // _this.modals[key] = "";
        // let type = data[key].type;
        // _this.dataList.push({
        //   name: key,
        //   label: data[key].label,
        //   type: type,
        //   value: ""
        // });
      }
    },
    getData() {
      if (this.namespace && this.$store.state.joha.entities[this.serviceName]) {
        this.parseData(this.$store.state.joha.entities[this.serviceName]);
        return;
      }
      this.$store.state.http
        .get(this.url + "/GetProps?id=" + this.serviceName)
        .then(
          response => {
            this.parseData(response.data.result);
            if (this.namespace) {
              this.$store.state.joha.entities[this.serviceName] = response.data;
            }
          },
          err => {
            this.$store.getters.errorParse(err, this);
          }
        );
    }
  },
  watch: {
    isShow: function(val) {
      if (!val) {
        console.log(val);
        return;
      }

      this.modalShow = val;
    }
  }
};
</script>

