<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group row">
          <label class="col-md-4 col-form-label text-right">Маска номер карты</label>
          <div class="col-md-8">
            <input type="text" v-model="temp.userName" class="form-control">
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group row">
          <label class="col-md-4 col-form-label text-right">Маска номер карты</label>
          <div class="col-md-8">
            <input type="text" v-model="temp.email" class="form-control">
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group row">
          <label class="col-md-4 col-form-label text-right">Маска номер карты</label>
          <div class="col-md-8">
            <input type="text" v-model="temp.password" class="form-control">
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="register()">Register</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    getProps: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      temp: {
        userName: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      this.$store.state.http.post(this.url + "/register", this.temp).then(
        response => {},
        err => {
          this.$store.getter.errorParse(err, this);
        }
      );
    }
  },
  mounted() {}
};
</script>
<style>
</style>


