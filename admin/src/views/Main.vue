<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" style="height:100vh;" :default-active="$route.path" router>
        <!-- top right left buttom -->
        <!-- 一级菜单:menu.items 每一项:item  项号:index item标识:key -->
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{item.title}}</template>
          <!-- 二级菜单：item.items -->
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :key="`menu-item-${index}-${subIndex}`"
            :index="subItem.path"
          >{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h2 style="margin-top:30px; font-size:25px;">后台管理页面</h2>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "影视管理", path: "/videos/list" },
          { title: "内容管理", path: "/episodes/list" }
        ]
      },
      {
        title: "运营管理",
        items: [{ title: "用户管理", path: "/users/list" }]
      }
    ]
  };
}
</script>

<style>
</style>