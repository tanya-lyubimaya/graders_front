<template>
  <div class="wrapper">
    <h1 class="title">База заданий</h1>
    <h3>Управление КИМом</h3>
    <el-button type="primary" @click="createVariants()">Сгенерировать варианты</el-button>
    <el-button type="primary" @click="giveOutVariants()">Раздать варианты</el-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: 0,
      cmms: [],
      courses: [],
      currentCmm: "",
      chosen: false,
      amountOfVariants: "",
      spreadsheetName: "test #1",
      spreadsheetId: "333",
      spreadsheetInfo: [
        { title: "Geography", amount: 5, value: "" },
        { title: "Biology", amount: 10, value: "" },
        { title: "Maths", amount: 7, value: "" },
      ],
      search: "",
      searchCMM: ""
    };
  },
  methods: {
    createVariants() {
      //this.id = this.$route.params.cmmID;
      console.log(this.$route.params.cmmID)
      //this.$router.push({ name: "Create Variants" });
    },
    giveOutVariants() {
      this.$router.push({ name: "Give Out Variants" });
    },
  },
};
</script>