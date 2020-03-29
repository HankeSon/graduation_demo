<template>
  <div style="marginTop:20px">
    <el-row style="margin-bottom:30px;margin-left:20px">
      <el-radio-group v-model="sizeValue" @change="changeSize(sizeValue)">
        <el-radio label="small">默认</el-radio>
        <el-radio label="large">large</el-radio>
        <el-radio label="medium">medium</el-radio>
        <el-radio label="small">small</el-radio>
        <el-radio label="mini">mini</el-radio>
      </el-radio-group>
    </el-row>
    <!-- data:{total, data, lastPage, firstPage} -->
    <avue-crud
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      :page="page"
      @on-load="onLoad"
      @sort-change="changeSort"
      @search-change="changeSearch"
    ></avue-crud>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  sizeValue = "medium";
  data = {};
  query = {
    limit: 10
  };
  page = {
    total: 0,
    pageSizes: [2, 5, 10, 20],
    pageSize: 10
  };

  option = {
    viewBtn: true, // 查看按钮
    title: "表格的标题",
    size: this.sizeValue,
    align: "center",
    menuAlign: "center",
    searchMenuSpan: 8,
    column: [
      { prop: "courseTitle", label: "课程名称", search: true, sort: true },
      { prop: "coverPhoto", label: "课程封面", search: true }
    ]
  };

  async fetch() {
    this.page.pageSize = this.query.limit;
    const res = await this.$http.get("courses", {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }

  // 初始化获取数据
  created() {
    this.fetch();
  }

  async create(row, done) {
    await this.$http.post("courses", row);
    this.$message.success("创建成功!");
    this.fetch(this.page);
    done();
  }

  async update(row, index, done) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`courses/${row._id}`, data);
    this.$message.success("更新成功!");
    this.fetch();
    done();
  }

  async remove(row) {
    try {
      await this.$confirm("是否确认删除？");
    } catch (e) {
      return;
    }
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success("删除成功!");
    this.fetch();
  }

  onLoad({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  changeSize(size) {
    this.option.size = size;
  }

  changeSort({ order, prop }) {
    switch (order) {
      case "ascending":
        this.query.sort = {
          [prop]: 1
        };
        break;
      case "descending":
        this.query.sort = {
          [prop]: -1
        };
        break;
      default:
        this.query.sort = {
          [prop]: null
        };
        break;
    }
    this.fetch();
  }

  async changeSearch(where, done) {
    where.courseTitle = where.courseTitle
      ? { $regex: where.courseTitle }
      : undefined;
    where.coverPhoto = where.coverPhoto
      ? { $regex: where.coverPhoto }
      : undefined;
    this.query.where = where;
    this.fetch();
    done();
  }
}
</script>

<style>
</style>