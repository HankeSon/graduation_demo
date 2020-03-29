<template>
  <div>
    <h3>课程列表</h3>
    <div style="marginBottom: 20px">
      <el-button type="success" size="small" @click="$router.push(`/courses/create`)">创建课程</el-button>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        align="center"
        v-for="(column, name) in columns"
        :prop="name"
        :key="name"
        :label="column.label"
        :width="column.width"
      ></el-table-column>
      <el-table-column align="center" label="操作" :width="250">
        <template v-slot="{row}">
          <el-button
            type="success"
            size="small"
            @click="$router.push(`/courses/edit/${row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  data = {};
  columns = {
    _id: { label: "ID" },
    courseTitle: { label: "课程名称" },
    coverPhoto: { label: "课程封面" }
  };

  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }

  created() {
    this.fetch();
  }

  async remove(id: string) {
    try {
      await this.$confirm("是否确认删除？");
    } catch (e) {
      return;
    }
    await this.$http.delete(`courses/${id}`);
    this.$message.success("删除成功!");
    this.fetch();
  }
}
</script>

<style>
</style>