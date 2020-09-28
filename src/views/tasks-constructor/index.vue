<template>
  <div class="wrapper">
    <h1 class="title">База заданий</h1>
    <el-button
      class="buttonCreateGrader"
      type="primary"
      @click="handleClickCreateGrader()"
      >Создать грейдер</el-button
    >
    <el-button
      class="buttonPublishGrader"
      type="primary"
      @click="handleClickPublishGrader()"
      >Опубликовать грейдер</el-button
    >
    <h3>Таблица курсов</h3>
    <el-table
      v-if="this.courses.length > 0"
      :data="courses"
      style="width: 100%"
      max-height="300"
    >
      <el-table-column fixed prop="name" label="Название курса" width="250" @cell-click="">
      </el-table-column>
      <el-table-column prop="alternate_link" label="Ссылка на курс" width="500">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="openCourse(scope.$index, courses)"
            type="text"
            size="small"
          >
          Открыть курс
          </el-button>
        </template>
      </el-table-column>
      <!--el-table-column
        prop="???"
        label="Число учащихся"
        width="100"
      /-->
    </el-table>
    <h3>Таблица КИМов</h3>
    <el-table :data="courses" style="width: 100%" max-height="300">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="openCMM(scope.$index, cmms)"
            type="text"
            size="small"
          >
            Открыть КИМ
          </el-button>
          <el-button
            @click.native.prevent="createVariants()"
            type="text"
            size="small"
          >
            Сформировать билеты
          </el-button>
          <el-button
            @click.native.prevent="openCMM(scope.$index, cmms)"
            type="text"
            size="small"
          >
            Посмотреть билеты
          </el-button>
          <el-button
            @click.native.prevent="giveOutVariants()"
            type="text"
            size="small"
          >
            Раздать билеты
          </el-button>
          <el-button
            @click.native.prevent="deleteCMM(scope.$index, cmms)"
            type="text"
            size="small"
          >
            Удалить билеты
          </el-button>
          <el-button
            @click.native.prevent="openCMM(scope.$index, cmms)"
            type="text"
            size="small"
          >
            Удалить КИМ
          </el-button>
        </template>
      </el-table-column>
            <el-table-column prop="name" label="Название КИМа" width="1000">
      </el-table-column>
    </el-table>
    <!--h3>Таблица грейдеров</h3>
    <el-table :data="courses" style="width: 100%" max-height="300">
      <el-table-column fixed prop="name" label="Название грейдера" width="250">
      </el-table-column>
      <el-table-column prop="alternate_link" label="Ссылка на грейдер" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="300">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="openCMM(scope.$index, cmms)"
            type="text"
            size="small"
          >
            Опубликовать грейдер
          </el-button>
        </template>
      </el-table-column>
    </el-table-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      CMMs: [],
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
    };
  },
  created() {
    this.getCourses();
    this.getCMMs();
  },
  methods: {
    /*handleClickCreateGrader() {
      this.$router.push({ name: "Graders Constructor" });
    },
    handleClickPublishGrader() {
      this.$router.push({ name: "Publish Grader" });
    },*/
    getCMMs() {
      const path = "http://localhost:8080/cmms";
      axios.get(path).then(
        (res) => {
          this.cmms = res.data.cmms;
          console.log(res.data.cmms);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getCourses() {
      const path = "http://localhost:8080/courses";
      axios.get(path).then(
        (res) => {
          this.courses = res.data.courses;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    openCMM(index, cmms) {
      console.log(index);
      console.log(cmms);
      //window.open(this.cmms.alternate_link, "_blank");
    },
    openCourse(index, courses) {
      console.log(courses[index]);
    },
    deleteCMM(index, rows) {
      rows.splice(index, 1);
    },
    createVariants() {
      this.$router.push({ name: "Create Variants" });
    },
    giveOutVariants() {
      this.$router.push({ name: "Give Out Variants" });
    },
  },
};
</script>