<template>
  <div class="wrapper">
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
            :value="course.name"
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
          style="width: 50%"
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
            <h4>
              <el-input-number
                controls-position="right"
                v-model="section.numOfQuestions"
                @change="handleChange"
                :min="0"
                :max="section.questions"
              ></el-input-number
              >⠀⠀{{ section.title }}
            </h4>
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
          />
        </el-col>
      </el-form-item>
      <el-form-item> </el-form-item>
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
      name: "",
      courses: [],
      sections: [],
      questions: {},
      section: "",
      numOfVariants: -1,
      form: {
        course: "",
        taskname: "",
        timePostTasks: "",
        timeDeadline: "",
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
      console.log(value);
    },
    getCourses() {
      const path = "http://172.18.150.140:8083/courses";
      axios.get(path).then(
        (res) => {
          this.courses = res.data.courses;
        },
        (error) => {
          console.error(error);
        }
      );
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
      const path = `http://172.18.150.140:8083/cmms/${this.id}/tasks`;
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
            sections: this.sections
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
