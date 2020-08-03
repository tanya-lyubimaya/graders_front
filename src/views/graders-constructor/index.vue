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
      <h3 class="title">Заполните данные для создания грейдера</h3>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <p>
            Выберите курс в Classroom
            <span style="color: #f00">*</span>
          </p>
          <el-select style="width: 50%" v-model="form.course" placeholder="Название курса">
            <el-option label="Компьютерная графика 2020" value="1" />
            <el-option label="Компьютерная графика 2021" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <p>
            Укажите название задания
            <span style="color: #f00">*</span>
          </p>
          <el-input style="width: 50%" v-model="form.taskname" placeholder="Например: Контрольная работа 1"></el-input>
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
            <p>Дата и время выдачи заданий</p>
            <el-date-picker
              v-model="form.time_post_tasks"
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
              v-model="form.time_deadline"
              type="datetime"
              style="width: 90%"
              placeholder="Выберите дату и время"
            />
          </el-col>
          <!--
          <el-col :span="7">
            <p>ID грейдера</p>
            <el-date-picker
              v-model="form.grader_id"
              type="datetime"
              style="width: 100%"
              placeholder="Например: 1234"
            />
          </el-col>
          -->
        </el-form-item>
        <el-form-item>
          <el-col :span="7">
            <p>
              Технология
              <span style="color: #f00">*</span>
            </p>
            <el-select v-model="form.technology" style="width: 90%" placeholder="Технология">
              <el-option label="FFmpeg" value="ffmpeg" />
              <el-option label="ImageMagick" value="imagemagick" />
            </el-select>
          </el-col>
          <el-col :span="7">
            <p>Режим</p>
            <el-select v-model="form.mode" style="width: 90%" placeholder="Режим">
              <el-option label="Режим 1" value="1" />
              <el-option label="Режим 2" value="2" />
            </el-select>
          </el-col>
          <el-col :span="7">
            <p>Попыток сдать</p>
            <el-input-number
              v-model="form.NumOfAttempts"
              @change="handleChange"
              :min="1"
              :max="100"
              size="medium"
              style="width: 80%"
            ></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item>
          <p>
            Файл для обработки
            <span style="color: #f00">*</span>
          </p>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button class="buttonCancel" size="small">Загрузить</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <p>
            Файл результата
            <span style="color: #f00">*</span>
          </p>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
          >
            <div>
              <el-button class="buttonCancel" size="small">Загрузить</el-button>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button class="buttonCreate" type="primary" @click="onSubmit">Создать</el-button>
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
        NumOfAttempts: 1,
      },
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`Лимит количества загруженных файлов достигнут`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Удалить файл ${file.name} ?`);
    },
    onSubmit() {
      this.$message("Грейдер создан!");
    },
  },
};
</script>