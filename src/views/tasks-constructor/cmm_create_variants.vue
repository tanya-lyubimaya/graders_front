<template>
  <div class="wrapper" style="max-width: 75%">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item>
        <h3>
          Пожалуйста, заполните данные для раздачи заданий из КИМа "{{
            this.name
          }}"
        </h3>
        <p>
          Выберите курс, студентам которого нужно раздать задания
          <span style="color: #f00">*</span>
        </p>
        <el-select v-model="form.course" filterable placeholder="Выберите курс">
          <el-option
            v-for="course in courses"
            :key="course.id"
            :label="course.name"
            :value="course.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <p>
          Укажите название задания
          <span style="color: #f00">*</span>
        </p>
        <el-input
          style="width: 55.7%"
          v-model="form.taskname"
          placeholder="Например: Контрольная работа 1"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <p>
          Укажите количество вопросов из каждого раздела, на которое необходимо
          будет ответить студенту в работе
          <span style="color: #f00">*</span>
        </p>
        <ul style="list-style-type: none">
          <li v-for="section in sections" :key="section.id">
            <p>
              <el-input-number
                controls-position="right"
                v-model="section.numOfQuestions"
                @change="handleChange"
                :min="0"
                :max="section.questions"
              ></el-input-number
              >⠀⠀{{ section.title }}
            </p>
          </li>
        </ul>
      </el-form-item>
      <el-form-item>
        <el-col :span="7">
          <p>Дата и время выдачи заданий</p>
          <el-date-picker
            v-model="form.timePostTasks"
            type="datetime"
            style="width: 90%"
            placeholder="Выберите дату и время"
            :clearable="false"
          />
        </el-col>
        <el-col :span="7">
          <p>
            Дата и время дедлайна
            <span style="color: #f00">*</span>
          </p>
          <el-date-picker
            v-model="form.timeDeadline"
            type="datetime"
            style="width: 90%"
            placeholder="Выберите дату и время"
            :clearable="false"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <p>
          Выберите группу, студентам которой нужно раздать задания
          <span style="color: #f00">*</span>
        </p>
        <el-select
          v-model="assignees.google_id"
          filterable
          placeholder="Выберите группу"
        >
          <el-option
            v-for="group in groups"
            :key="group.id"
            :label="group.name"
            :value="group.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createVariants()"
          >Раздать задания</el-button
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
      falseBool: false,
      name: "",
      courses: [],
      sections: [],
      questions: {},
      section: "",
      numOfVariants: -1,
      groups: [
        {
          id: "02jxsxqh3fr03bb",
          name: "Поток БИВ19x",
        },
        {
          id: "02u6wntf3s35zof",
          name: "БИВ191",
        },
        {
          id: "00sqyw643da7y61",
          name: "БИВ192",
        },
        {
          id: "00rjefff133gltr",
          name: "БИВ193",
        },
        {
          id: "03jtnz0s3beozki",
          name: "БИВ194",
        },
        {
          id: "03ep43zb18uqzzn",
          name: "БИВ195",
        },
        {
          id: "03tbugp14l67xlv",
          name: "БИВ196",
        },
      ],
      form: {
        course: "",
        taskname: "",
        timePostTasks: "",
        timeDeadline: "",
      },
      assignment_type: "INDIVIDUAL_STUDENTS",
      assignees:
        {
          name: null,
          google_id: "",
          type: "GROUP",
          action: "INCLUDE",
        },
    };
  },
  created() {
    this.getCourses();
  },
  beforeMount() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    this.getSections();
    this.setNumOfQuestions();
  },
  methods: {
    handleChange(value) {
      //console.log(value);
    },
    getCourses() {
      const path = "https://constructor.auditory.ru/courses";
      axios.get(path).then(
        (res) => {
          this.courses = res.data.courses;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getSections() {
      const path = `https://constructor.auditory.ru/cmms/${this.id}/sections`;
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
      axios.defaults.withCredentials = true;
      const path = `https://constructor.auditory.ru/cmms/${this.id}/tasks`;
      var datePost = new Date(this.form.timePostTasks);
      var dateDeadline = new Date(this.form.timeDeadline);
      var currentDate = new Date();
      var notAllSectionsDefined = false;

      this.sections.forEach(function (value, i) {
        if (value["numOfQuestions"] === undefined) {
          notAllSectionsDefined = true;
        }
      });

      if (this.form.course === "") {
        this.$message({
          showClose: true,
          message: "Не задан курс!",
          type: "warning",
        });
      } else if (this.form.taskname === "") {
        this.$message({
          showClose: true,
          message: "Не задано название задания!",
          type: "warning",
        });
      } else if (notAllSectionsDefined) {
        this.$message({
          showClose: true,
          message: "Пожалуйста, задайте нужное число вопросов из каждой темы!",
          type: "warning",
        });
      } else if (this.form.timePostTasks === "") {
        var now = new Date();
        this.form.timePostTasks = now;
      } else if (this.form.timeDeadline === "") {
        this.$message({
          showClose: true,
          message: "Не задан дедлайн!",
          type: "warning",
        });
      } else if (datePost < new Date(currentDate.getTime())) {
        this.$message({
          showClose: true,
          message: "Слишком раннее время публикации!",
          type: "warning",
        });
      } else if (this.form.timePostTasks > this.form.timeDeadline) {
        this.$message({
          showClose: true,
          message: "Время публикации назначено после дедлайна!",
          type: "warning",
        });
      } else if (this.assignees.google_id === "") {
        this.$message({
          showClose: true,
          message: "Не выбрана группа!",
          type: "warning",
        });
      } else {
        this.sections.forEach(function (value, i) {
          delete value["title"];
          delete value["questions"];
        });
        axios
          .post(
            path,
            {
              course_id: this.form.course,
              name: this.form.taskname,
              deadline: this.form.timeDeadline,
              scheduled_time: this.form.timePostTasks,
              sections: this.sections,
              assignment_type: this.assignment_type,
              assignees: this.assignees
            },
            {
              headers: {
                //"X-API-KEY": "7729975492c74225878bd0f54be97b6b",
                withCredentials: true,
              },
            }
          )
          .then(
            (res) => {
              if (res.data.status === "success") {
                this.$message({
                  showClose: true,
                  message: "Варианты заданий начали генерироваться!",
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
      }
    },
  },
};
</script>
