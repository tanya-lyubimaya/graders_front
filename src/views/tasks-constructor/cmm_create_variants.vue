<template>
  <div class="wrapper">
    <h1>Сгенерировать варианты из КИМа</h1>
    <ul>
      <li v-for="section in sections" :key="section.id">
        {{ section.title }}
        <el-input-number
          size="mini"
          v-model="section.numOfQuestions"
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
    this.getSections();
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
          this.sections.forEach(function (element) {
            element.numOfQuestions = 0;
          });
        },
        (error) => {
          console.error(error);
        }
      );
    },
    createVariants() {
      const path = `http://172.18.150.140:8083/cmms/${this.id}`;
      console.log(this.sections);
      axios
        .post(
          path,
          {
            id: this.id,
            sections: this.sections,
          }
          /*{
              headers: {
                "X-API-KEY": "7729975492c74225878bd0f54be97b6b",
                withCredentials: true,
              },
            }*/
        )
        .then(
          (res) => {
            if (res.data.status === "success") {
              this.$message({
                showClose: true,
                message: "Варианты для КИМа сгенерированы!",
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: "Ошибка при генерации вариантов",
                type: "error",
              });
            }
          },
          (error) => {
            console.error(error);
          }
        )
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
  onCancel() {
    this.$message({
      message: "cancel!",
      type: "warning",
    });
  },
};
</script>
