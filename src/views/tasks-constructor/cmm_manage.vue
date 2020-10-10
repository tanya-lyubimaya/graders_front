<template>
  <div class="wrapper" style="max-width: 90%">
    <el-form label-width="60px">
      <el-form-item>
    <h1>Управление КИМом "{{ this.name }}"</h1>
    <h3>
      Здесь позже будет представлена статистика по текущему КИМу и
      сформированным из него заданиям
    </h3>
    <el-button type="primary" @click="handleCreateVariants()"
      >Раздать варианты</el-button
    >
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: -1,
      name: "",
      cmms: [],
      courses: [],
      chosen: false,
      search: "",
      searchCMM: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name
  },
  methods: {
    handleCreateVariants() {
      this.$router.push({ name: "Create Variants", params: { id: this.id, name: this.name } });
    },
    handleGiveOutVariants() {
      this.$router.push({ name: "Give Out Variants" });
    },
  },
};
</script>