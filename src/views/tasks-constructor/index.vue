<template>
  <div class="wrapper">
          <h1 class="title">База заданий</h1>
    <el-button class="buttonCreateGrader" type="primary" @click="handleClickCreateGrader()">Создать грейдер</el-button>
    <el-button class="buttonPublishGrader" type="primary" @click="handleClickPublishGrader()">Опубликовать грейдер</el-button>
    <el-button class="buttonCreateVariants" type="primary" @click="handleClickCreateVariants()">Создать варианты для КИМа</el-button>
    <el-button class="buttonGiveOutVariants" type="primary" @click="handleClickGiveOutVariants()">Раздать варианты для КИМа</el-button>
    <h3>Таблица курсов</h3>
    <el-table v-if="this.courses.length > 0" ref="singleTable" :data="courses" style="margin: 7%" @cell-click="handle">
      <el-table-column
        prop="name"
        label="Название курса"
        width="250"
      />
      <el-table-column
        prop="alternate_link"
        label="Ссылка на курс"
        width="200"
      />
      <!--el-table-column
        prop="???"
        label="Число учащихся"
        width="100"
      /-->
    </el-table>
    <h3>Таблица КИМов</h3>
    <el-table v-if="this.courses.length > 0" ref="singleTable" :data="courses" style="margin: 7%" @cell-click="handle">
      <el-table-column
        prop="name"
        label="Название курса"
        width="250"
      />
      <el-table-column
        prop="alternate_link"
        label="Ссылка на курс"
        width="200"
      />
      <!--el-table-column
        prop="???"
        label="Число учащихся"
        width="100"
      /-->
    </el-table>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      CMMs: [],
      courses: [],
      currentCmm: '',
      chosen: false,
      amountOfVariants: '',
      spreadsheetName: 'test #1',
      spreadsheetId: '333',
      spreadsheetInfo: [
        { title: 'Geography', amount: 5, value: '' },
        { title: 'Biology', amount: 10, value: '' },
        { title: 'Maths', amount: 7, value: '' }]
    }
  },
  created() {
    this.getCourses();
    this.getCMMs();
  },
  methods: {
    handleClickCreateGrader() {
        this.$router.push({ name: 'Graders Constructor' })
    },
    handleClickPublishGrader() {
      this.$router.push({ name: "Publish Grader" })
    },
    handleClickCreateVariants() {
      this.$router.push({ name: "Create Variants" })
    },
    handleClickGiveOutVariants() {
      this.$router.push({ name: "Give Out Variants" })
    },
    onSubmit() {
      // this.$message('submit!')
      // const spreadsheetInfo = JSON.parse(this.dataset.spreadsheetInfo);
      // const spreadsheetId = this.dataset.spreadsheetId;
      // createVariants(spreadsheetInfo,spreadsheetId);
    },
    createVariants(spreadsheetInfo,spreadsheetId) {
      let amount = this.amountOfVariants;
      let questions = [];
      let inpInfo = this.$refs.selectTopics;

      for (let i = 0; i < inpInfo.length; i++) {
        questions.push(inpInfo[i].value);
      }
      const questionsAsString = questions.join(',');
      // window.location.href = `/create_variants?questions=${questionsAsString}&amount=${amount}&spreadsheet_id=${spreadsheetId}`;
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getCMMs() {
      const path = 'http://localhost:8080/cmms'
      axios.get(path).then(
        res => {
          this.cmms = res.data.cmms
        },
        error => {
          console.error(error)
        },
      )
    },
    getCourses() {
      const path = 'http://localhost:8080/courses'
      axios.get(path).then(
        res => {
          this.courses = res.data.courses
        },
        error => {
          console.error(error)
        },
      )
    },
    handle(row) {
      this.chosen = true;
      this.currentCmm = this.cmms[this.cmms.indexOf(row)].spreadsheetName
      // сделать обработку
    }
    /*function createVariants(spreadsheetInfo, spreadsheetId) {
        let amount = $('#amountOfVariants').val();
        let questions = [];
        document
            .querySelectorAll('.select-topics')
            .forEach(select => questions.push($(select).val()));
        const questionsAsString = questions.join(',');
        window.location.href = `/create_variants?questions=${questionsAsString}&amount=${amount}&spreadsheet_id=${spreadsheetId}`;
    }*/
  }
}
</script>