<template>
  <div class="wrapper">
    <h1>Управление КИМом</h1>
    <h3>
      Здесь позже будет представлена статистика по текущему КИМу и сформированным из него
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
      chosen: false,
      search: "",
      searchCMM: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    handleCreateVariants() {
      this.$router.push({ name: "Create Variants", params: { id: this.id } });
    },
    handleGiveOutVariants() {
      this.$router.push({ name: "Give Out Variants" });
    },
  },
};
</script>