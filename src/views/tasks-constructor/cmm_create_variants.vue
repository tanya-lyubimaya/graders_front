<template>
  <div class="wrapper">
    <h1>Сгенерировать варианты из КИМа</h1>
    <ul>
      <li v-for="section in sections" :key="section.id">
        {{ section.title }}
        <el-input-number
          size="mini"
          v-model="section.model"
          @change="handleChange"
          :min="0"
          :max="section.questions"
        ></el-input-number>
      </li>
    </ul>
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
      currentCmm: "",
      chosen: false,
      amountOfVariants: -1,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.getSections();
    this.sections.forEach(function (element) {
      element.model = 0;
    });
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      // this.$message('submit!')
      // const spreadsheetInfo = JSON.parse(this.dataset.spreadsheetInfo);
      // const spreadsheetId = this.dataset.spreadsheetId;
      // createVariants(spreadsheetInfo,spreadsheetId);
    },
    getSections() {
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
    createVariants() {
      console.log(this.sections);
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
