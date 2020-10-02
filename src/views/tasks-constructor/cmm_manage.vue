<template>
  <div class="wrapper">
    <h1 class="title">База заданий</h1>
    <h3>Управление КИМом</h3>
    <el-button type="primary" @click="createVariants()"
      >Сгенерировать варианты</el-button
    >
    <el-button type="primary" @click="giveOutVariants()"
      >Раздать варианты</el-button
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: -1,
      cmms: [],
      courses: [],
      sections: [],
      chosen: false,
      search: "",
      searchCMM: "",
    };
  },
  methods: {
    createVariants() {
      this.id = this.$route.params.cmmID;
      console.log(this.$route.params.cmmID);
      console.log(this.id);
      const path = `http://172.18.150.140:8083/cmms/${this.id}/sections`;
      axios.get(path).then(
        (res) => {
          console.log(res.data);
          this.sections = res.data.sections
        },
        (error) => {
          console.error(error);
        }
      );
    },
    giveOutVariants() {
      this.$router.push({ name: "Give Out Variants" });
    },
  },
};
</script>