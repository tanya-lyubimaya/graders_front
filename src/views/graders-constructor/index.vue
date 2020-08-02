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
            <el-select v-model="form.technology" placeholder="Технология">
              <el-option label="FFmpeg" value="ffmpeg" />
              <el-option label="ImageMagick" value="imagemagick" />
            </el-select>
          </el-col>
          <el-col :span="7">
            <p>Режим</p>
            <el-select v-model="form.mode" placeholder="Режим">
              <el-option label="Режим 1" value="1" />
              <el-option label="Режим 2" value="2" />
            </el-select>
          </el-col>
          <el-col :span="7">
            <p>Попыток сдать</p>
            <el-input-number
              v-model="form.num_of_attempts"
              @change="handleChange"
              :min="1"
              :max="100"
            ></el-input-number>
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
        num_of_attempts: 1,
      },
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>