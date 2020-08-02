<template>
  <div class="wrapper">
    <div class="navigation">
      <section class="container">
        <a class="navigation-title" href="/enter" title="Конструктор грейдеров">
          <h1 class="title">Создание грейдеров</h1>
        </a>
      </section>
    </div>
    <h3 class="title">Заполните данные для создания грейдера</h3>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <p>
            Выберите курс в Classroom
            <span style="color: #f00">*</span>
          </p>
          <el-select v-model="form.course" placeholder="Название курса">
            <el-option label="Компьютерная графика 2020" value="1" />
            <el-option label="Компьютерная графика 2021" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <p>
            Укажите название задания
            <span style="color: #f00">*</span>
          </p>
          <el-input v-model="form.taskname" placeholder="Например: Контрольная работа 1"></el-input>
        </el-form-item>
        <el-form-item>
          <p>
            Описание задания
            <span style="color: #f00">*</span>
          </p>
          <el-input
            v-model="form.desc"
            type="textarea"
            placeholder="Пожалуйста, введите описание задания"
          />
        </el-form-item>
        <el-form-item>
          <el-col :span="7">
            <p>Дата и время выдачи заданий</p>
            <el-date-picker
              v-model="form.time_post_tasks"
              type="datetime"
              style="width: 100%"
              placeholder="Выберите дату и время"
            />
          </el-col>
          <el-col :span="7">
            <p>
              Дата и время дедлайна
              <span style="color: #f00">*</span>
            </p>
            <el-date-picker
              v-model="form.time_deadline"
              type="datetime"
              style="width: 100%"
              placeholder="Выберите дату и время"
            />
          </el-col>
          <el-col :span="7">
            <p>ID грейдера</p>
            <el-date-picker
              v-model="form.grader_id"
              type="datetime"
              style="width: 100%"
              placeholder="Например: 1234"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="7">
            <p>
              Технология
              <span style="color: #f00">*</span>
            </p>
            <el-select v-model="form.course" placeholder="Технология">
              <el-option label="FFmpeg" value="ffmpeg" />
              <el-option label="ImageMagick" value="imagemagick" />
            </el-select>
          </el-col>
          <el-col :span="7">
            <p>
              Дата и время дедлайна
              <span style="color: #f00">*</span>
            </p>
            <el-date-picker
              v-model="form.time_deadline"
              type="datetime"
              style="width: 100%"
              placeholder="Выберите дату и время"
            />
          </el-col>
          <el-col :span="7">
            <p>ID грейдера</p>
            <el-date-picker
              v-model="form.time_deadline"
              type="datetime"
              style="width: 100%"
              placeholder="Например: 1234"
            />
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  data() {
    return {
      form: {
        cmm_name: "",
      },
      courses: [],
      cmms: [],
      msg: "Hello",
      seen: false,
      seenCMM: [],
      downloadedCourses: false,
      gotCourses: false,
    };
  },
  /*beforeRouteEnter: function(to, from, next) {
  console.log('before enter')
  //vm => vm.getCourses()
  next(vm => vm.getCourses())
  //next()
},*/
  created() {
    if (localStorage.courses) {
      this.courses = JSON.parse(localStorage.getItem("courses"));
    } else this.getCourses();
    this.getCMMs();
  },
  methods: {
    onSubmit() {
      axios
        .post("http://localhost:5000/cmm-name", {
          cmm_name: this.form.cmm_name,
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    removeCMM(cmm_id) {
      const path = `http://localhost:5000/user-courses/${cmm_id}`;
      axios
        .delete(path)
        .then(() => {
          this.getCourses();
          console.log("Removed cmm successfully!!");
        })
        .catch((error) => {
          console.error(error);
          this.getCourses();
        });
    },
    onDeleteCMM: function (index, cmm_id) {
      this.cmms.splice(index, 1);
      console.log(index, cmm_id);
      this.removeCMM(cmm_id);
    },
    onOpenCMM: function (spreadsheet_url) {
      window.open(spreadsheet_url, "_blank");
    },
    getCourses() {
      console.log("started method getCourses()");
      const path = "http://localhost:5000/user-courses";
      axios.get(path).then(
        (res) => {
          this.courses = res.data.courses;
          localStorage.courses = JSON.stringify(res.data.courses);
          localStorage.setItem("courses", JSON.stringify(res.data.courses));
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getCMMs() {
      console.log("started method getCMMs()");
      const path = "http://localhost:5000/user-cmms";
      axios.get(path).then(
        (res) => {
          this.cmms = res.data.cmms;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    toggleActive(index) {
      if (this.seenCMM.includes(index)) {
        this.seenCMM = this.seenCMM.filter((entry) => entry !== index);

        return;
      }

      this.seenCMM.push(index);
    },
  },
};
</script>