<template>
  <div class="wrapper">
    <div class="navigation">
      <section class="container">
        <a class="navigation-title" href="/enter" title="Конструктор грейдеров">
          <h1 class="title">Создание грейдеров</h1>
        </a>
      </section>
    </div>

    <div class="container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <h3 class="title">Заполните данные для создания грейдера</h3>
        </el-form-item>
        <el-form-item>
          <p>
            Название задания
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
            Описание задания
            <span style="color: #f00">*</span>
          </p>
          <el-input
            style="width:83%"
            v-model="form.desc"
            type="textarea"
            placeholder="Пожалуйста, введите описание задания"
          />
        </el-form-item>
        <el-form-item>
          <el-col :span="7">
            <p>
              Технология
              <span style="color: #f00">*</span>
            </p>
            <el-select
              v-model="form.technology"
              style="width: 90%"
              placeholder="Технология"
              @change="handleTechnologyChange"
            >
              <el-option label="FFmpeg" value="ffmpeg" />
              <el-option label="ImageMagick" value="imagemagick" />
              <el-option label="ONVIF" value="onvif" />
              <el-option label="GStreamer" value="gstreamer" />
              <el-option label="Python" value="python" />
            </el-select>
          </el-col>
          <el-col :span="7">
            <p>Режим</p>
            <el-select v-model="form.mode" style="width: 90%" placeholder="Режим">
              <el-option label="Тренажёр" value="trainer" />
              <el-option label="Обычный" value="regular" />
              <el-option label="Экзамен" value="exam" />
            </el-select>
          </el-col>
          <el-col :span="7">
            <p>Название файла решения</p>
            <el-input
              v-model="form.solutionFilename"
              type="textarea"
              style="width: 100%"
              placeholder="Название файла решения"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <p>
            Входные данные
            <span style="color: #f00">*</span>
          </p>
          <input
            id="fileProcessing"
            ref="fileProcessing"
            type="file"
            @change="handleProcessingFileUpload()"
          />
        </el-form-item>
        <el-form-item>
          <p>
            Файл результата
            <span style="color: #f00">*</span>
          </p>
          <input id="fileResult" ref="fileResult" type="file" @change="handleResultFileUpload()" />
        </el-form-item>
        <el-form-item>
          <el-button class="buttonCreate" type="primary" @click="onSubmit()">Создать</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { withConverter } from "js-cookie";

export default {
  data() {
    return {
      form: {
        //numOfAttempts: 1,
        //course: "",
        taskname: "",
        desc: "",
        //timePostTasks: "",
        //timeDeadline: "",
        solutionFilename: "",
        technology: "",
        mode: "trainer",
        teacherEmail: "teachername@hse.ru", // GET FROM API
        classID: "62566470367", // GET FROM API
      },
      fileProcessing: "",
      fileResult: "",
      graderID: "",
    };
  },
  methods: {
    handleTechnologyChange() {
      if (
        this.form.technology === "ffmpeg" ||
        this.form.technology === "imagemagick" ||
        this.form.technology === "gstreamer"
      ) {
        this.form.solutionFilename = "solution.sh";
      } else if (
        this.form.technology === "onvif" ||
        this.form.technology === "python"
      ) {
        this.form.solutionFilename = "solution.py";
      }
    },
    handleProcessingFileUpload() {
      this.fileProcessing = this.$refs.fileProcessing.files[0];
    },
    handleResultFileUpload() {
      this.fileResult = this.$refs.fileResult.files[0];
    },
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      var datePost = new Date(this.form.timePostTasks);
      var dateDeadline = new Date(this.form.timeDeadline);
      var currentDate = new Date();
      if (
        this.form.taskname === ""
      ) {
        this.$message({
          showClose: true,
          message: "Укажите название задания!",
          type: "warning",
        });
      } else if (this.form.desc === "") {
        this.$message({
          showClose: true,
          message: "Не задано описание задания!",
          type: "warning",
        });
      } else if (
        this.form.technology === ""
      ) {
        this.$message({
          showClose: true,
          message: "Выберите технологию!",
          type: "warning",
        });
      } else if (this.fileProcessing === "") {
        this.$message({
          showClose: true,
          message: "Выберите файл для обработки!",
          type: "warning",
        });
      } else if (this.fileResult === "") {
        this.$message({
          showClose: true,
          message: "Выберите файл результата!",
          type: "warning",
        });
      } else {
        if (
          this.form.solutionFilename != "solution.py" &&
          this.form.solutionFilename != "solution.sh"
        ) {
          this.form.solutionFilename = this.$refs.fileResult.files[0].name;
        }
        axios
          .post(
            "http://mc.auditory.ru/graders",
            {
              //class_id: this.form.classID,
              //class_name: this.form.course,
              task_name: this.form.taskname,
              solution_filename: this.form.solutionFilename,
              description: this.form.desc,
              technology: this.form.technology,
              teacher_email: this.form.teacherEmail,
              //deadline: this.form.timeDeadline,
              //start_time: this.form.timePostTasks,
              mode: this.form.mode,
              //attempts: this.form.numOfAttempts,
            },
            {
              headers: {
                "X-API-KEY": "7729975492c74225878bd0f54be97b6b",
                withCredentials: true,
              },
            }
          )
          .then(
            (res) => {
              if (res.data.message === "Grader created") {
                this.graderID = res.data.grader_id;
                this.$message({
                  showClose: true,
                  message: "Грейдер создан!",
                  type: "success",
                });
                const formData = new FormData();
                formData.append("files", this.fileProcessing);
                formData.append("files", this.fileResult);
                axios
                  .put(
                    `http://mc.auditory.ru/graders/${this.graderID}/files`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        "X-API-KEY": "7729975492c74225878bd0f54be97b6b",
                      },
                      withCredentials: true,
                    }
                  )
                  .then(function () {
                    console.log("SUCCESS!!");
                  })
                  .catch(function () {
                    console.log("FAILURE!!");
                  });
              } else {
                this.$message({
                  showClose: true,
                  message: "Ошибка при создании грейдера",
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
