<template>
  <div class="pub">
    <!-- 添加面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加卡片视图 -->
    <el-card class="box-card">
      <!-- form表单 -->
      <!-- :model存入的是表单域的内容,是一个对象 -->
      <el-form ref="form" :model="articleData" label-width="80px">
        <!-- 标题文本框 -->
        <!-- 所有表单域的内容都是通过v-model动态绑定的 -->
        <el-form-item label="标题:">
          <el-input v-model="articleData.title"></el-input>
        </el-form-item>
        <!-- 单选按钮组 -->
        <el-form-item label="类型:">
            <!-- 只有当单选框组添加了v-model动态绑定后才能进行单击选择, -->
            <!-- label的值就是当前选中的radio的value值 -->
          <el-radio-group v-model="articleData.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 当选择文章的时候,页面中显示富文本框,当选择视频的时候,页面中显示上传按钮 -->
        <!-- 富文本框 -->
        <VueEditor :config="config" v-if="articleData.type === 1"></VueEditor>
        <!-- 文件上传按钮 -->
        <el-upload
          v-if="articleData.type === 2"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
        </el-upload>
        <!-- 添加复选框组 -->
        <el-form-item label="栏目:">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 添加封面 -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 添加提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="post">发表文章</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本编辑器
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
export default {
  // 数据对象函数
  data () {
    return {
      articleData: {
        title: '',
        type: 1
      },
      fileList: [],
      isIndeterminate: '',
      checkAll: '',
      checkedCities: '',
      cities: ['小海绵', '小糊涂', '大海绵', '大糊涂'],
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        }
      }
    }
  },
  //   事件处理函数方法
  methods: {
    post () {
      console.log(this.articleData)
    },
    handleCheckAllChange () {
      console.log('未知')
    },
    handleCheckedCitiesChange () {
      console.log('哈哈')
    },
    handlePictureCardPreview () {
      console.log('haha')
    },
    handleRemove () {
      console.log('jasja')
    }
  },
  // 注册组件对象
  components: { VueEditor }
}
</script>

<style lang='less' scoped>
.box-card {
  margin-top: 20px;
}
</style>
