<template>
  <div class="wrapper">
    <h1>Сгенерировать варианты из КИМа</h1>
    <el-select v-model="section" clearable placeholder="Select">
      <el-option
        v-for="section in sections"
        :key="section.id"
        :label="section.title"
        :value="section.title"
      >
      </el-option>
    </el-select>
    <el-slider v-model="sections" :step="1" show-stops> </el-slider>
    <el-button type="success" plain>Добавить тему</el-button>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
    <el-button type="primary" @click="createVariants()"
      >Сгенерировать варианты</el-button
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
      sections: [],
      section: "",
      value: "",
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
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.createVariants();
    console.log(this.sections);
  },
  methods: {
    onSubmit() {
      // this.$message('submit!')
      // const spreadsheetInfo = JSON.parse(this.dataset.spreadsheetInfo);
      // const spreadsheetId = this.dataset.spreadsheetId;
      // createVariants(spreadsheetInfo,spreadsheetId);
    },
    createVariants() {
      const path = `http://172.18.150.140:8083/cmms/${this.id}/sections`;
      axios.get(path).then(
        (res) => {
          this.sections = res.data.sections;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>
