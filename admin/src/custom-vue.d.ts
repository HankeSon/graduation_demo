import Vue from 'vue';
import { AxiosInstance } from 'axios';

// 与shims-vue.d.ts文件产生冲突，所以新建d.ts文件
declare module 'vue/types/vue' {
    interface Vue {
        $http: AxiosInstance
    }
} 