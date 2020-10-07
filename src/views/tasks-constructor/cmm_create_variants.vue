<template>
  <div class="wrapper">
    <h1>Сгенерировать варианты из КИМа "{{ this.name }}"</h1>
    <p>
      Пожалуйста, укажите количество вопросов из каждого раздела, на которое
      необходимо будет ответить студенту в работе
    </p>
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
    <h3>Количество вариантов</h3>
    <p>Пожалуйста, укажите количество вариантов, которое нужно сгенерировать</p>
    <el-input-number
          size="mini"
          v-model="numOfVariants"
          @change="handleChange"
          :min="1"
          :max="50"
        ></el-input-number>
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
      name: "",
      cmms: [],
      sections: [],
      section: "",
      numOfVariants: -1,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    this.getSections();
    this.setNumOfQuestions();
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
    setNumOfQuestions() {
      this.sections.forEach(function (element) {
        element.numOfQuestions = 0;
      });
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
            num_of_variants: this.numOfVariants,
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
