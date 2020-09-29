<template>
  <div class="wrapper">
    <h1 class="title">База заданий</h1>
    <h3>Таблица курсов</h3>
    <el-table
      :data="
        courses.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      :default-sort="{ prop: 'creation_time', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column label="Название курса" prop="name"> </el-table-column>
      <el-table-column label="Число студентов" prop="students_count">
      </el-table-column>
      <el-table-column label="Число преподавателей" prop="teachers_count">
      </el-table-column>
      <el-table-column
        label="Дата создания курса"
        prop="creation_time"
        sortable
      >
      </el-table-column>
      <el-table-column label="Действия">
        <template slot-scope="scope">
          <el-button size="mini" @click="openCourse(scope.$index, scope.row)"
            >Перейти к курсу</el-button
          >
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Введите название курса для поиска"
          />
        </template>
      </el-table-column>
    </el-table>

    <h3>Таблица КИМов</h3>
    <el-table
      :data="
        cmms.filter(
          (data) =>
            !searchCMM ||
            data.name.toLowerCase().includes(searchCMM.toLowerCase())
        )
      "
      :default-sort="{ prop: 'created_at', order: 'descending' }"
      style="width: 100%"
      max-height="300"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="openCMM(scope.row.folder_link)"
            size="small"
          >
            Открыть КИМ
          </el-button>
          <el-button
            @click.native.prevent="manageCMM(scope.row.id)"
            size="small"
          >
            Управление КИМом
          </el-button>
          <el-button
            @click.native.prevent="deleteCMM(scope.row.id, cmms)"
            type="danger"
            size="small"
          >
            Удалить КИМ
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Название КИМа"> </el-table-column>
      <el-table-column prop="description" label="Описание КИМа">
      </el-table-column>
      <el-table-column prop="created_at" label="Дата создания КИМа" sortable>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="searchCMM"
            size="mini"
            placeholder="Введите название КИМа для поиска"
          />
        </template>
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
      cmms: [],
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
      search: "",
      searchCMM: "",
    };
  },
  created() {
    this.getCourses();
    this.getCMMs();
  },
  methods: {
    getCMMs() {
      const path = "http://172.18.150.140:8083/cmms";
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
      const path = "http://172.18.150.140:8083/courses";
      axios.get(path).then(
        (res) => {
          this.courses = res.data.courses;
          console.log(res.data.courses);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    openCMM(link) {
      window.open(link, "_blank");
    },
    manageCMM(id) {
      this.$router.push({ name: "Manage CMM", params: { cmmID: id} });
    },
    openCourse(index) {
      window.open(this.courses[index].alternate_link, "_blank");
    },
    deleteCMM(id, cmms) {
      let i = cmms.map((item) => item.id).indexOf(id);
      this.$delete(this.cmms, i);
      const path = `http://172.18.150.140:8083/cmms/${id}/sections`;
      axios
        .delete(path)
        .then(() => {
          this.getCMMs();
          console.log("Removed cmm successfully!!");
          this.$message({
            showClose: true,
            message: "КИМ успешно удалён!",
            type: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          this.getCMMs();
          this.$message({
            showClose: true,
            message: "При удалении КИМа возникла ошибка!",
            type: "error",
          });
        });
    }
  },
};
</script>