<template>
  <div class="wrapper">
    <h1>Управление КИМом</h1>
    <h3>
      Здесь позже будет статистика по текущему КИМу и сформированным из него
      заданиям
    </h3>
    <el-button type="primary" @click="handleCreateVariants()"
      >Сгенерировать варианты</el-button
    >
    <el-button type="primary" @click="handleGiveOutVariants()"
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
  mounted() {
    this.id = this.$route.params.cmmID;
    console.log(this.$route.params.cmmID);
    console.log(this.id);
  },
  methods: {
    handleCreateVariants() {
      this.$router.push({ name: "Create Variants", params: { cmmID: this.id } });
    },
    handleGiveOutVariants() {
      this.$router.push({ name: "Give Out Variants" });
    },
  },
};
</script>