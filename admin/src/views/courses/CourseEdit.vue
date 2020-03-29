<template>
  <div>
    <h3>{{isCreate ? '创建' : '编辑'}}课程</h3>
    <!-- 版本用法改变：old-version(:form-data) new-version(v-model) -->
    <ele-form v-model="data" :form-desc="columns" :request-fn="submit"></ele-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class CourseEdit extends Vue {
  @Prop(String) id!: string;
  data = {};

  //用于判断创建和编辑
  get isCreate() {
    return !this.id;
  }

  columns = {
    _id: { label: "ID" },
    courseTitle: { label: "课程名称", type: "input" },
    coverPhoto: { label: "课程封面", type: "input" }
  };

  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`);
    this.data = res.data;
  }

  async submit(data: string) {
    const url = !this.isCreate ? `courses/${this.id}` : `courses`;
    const method = this.isCreate ? "post" : "put";
    await this.$http[method](url, data);
    this.$message.success("保存成功");
    this.isCreate && (this.data = {});
    // 返回上个页面
    // this.$router.go(-1);
  }

  created() {
    !this.isCreate && this.fetch();
  }
}
</script>

<style>
</style>