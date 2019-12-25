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
        <VueEditor :config="config" v-if="articleData.type === 1" ref="articleContent"></VueEditor>
        <!-- 文件上传按钮 -->
        <el-upload
          v-if="articleData.type === 2"
          action="http://127.0.0.1:3000/upload"
          :headers='getToken()'
          :file-list="fileList"
          :on-success ='uploadSuccess'
          :before-upload ='beforeUpload'
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
          action="http://127.0.0.1:3000/upload"
          list-type="picture-card"
          :headers="getToken()"
          :on-success='addCoverSuccess'
          :before-upload ='beforeAdd'
          :limit=3
          :on-exceed="overLimit"
          :on-remove="removeCover"
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
        type: 1,
        content: '',
        cover: []
      },
      limitNum: 3,
      fileList: [],
      isIndeterminate: '',
      checkAll: '',
      checkedCities: '',
      cities: ['小海绵', '小糊涂', '大海绵', '大糊涂'],
      config: {
        // 上传图片的配置
        uploadImage: {
          // 上传文件的接口地址
          url: 'http://localhost:3000/upload',
          // 后台接口需要的参数名称
          name: 'file',
          // 为了减轻发表文章时候服务器的负担,在上传文件的时候就发请求将文件存入到服务器中,而服务器将路径返回,存入到数据库的也是文件路径
          // 由于该组件封装内部使用了自己的axios,所以并不会经过我们设置的拦截器,所以需要设置头
          headers: this.getToken(),
          // 文件上传成功 res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            // 将图片预览到编辑器上
            insert('http://localhost:3000' + res.data.data.url)
          },
          // 若文件上传失败则给出提示
          uploadError (err) {
            this.$message.error(err)
          }
        },
        // 上传视频的配置(与上传图片同理)
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          },
          uploadError (err) {
            this.$error(err)
          }
        }
      }
    }
  },
  //   事件处理函数方法
  methods: {
    // 发表文章
    post () {
      // editor富文本编辑器的文本内容储存在this.$refs.articleContent.editor.root.innerHTML中
      // 当发表文章的时候将内容存储到articleData.content中,而发表视频时并不需要
      if (this.articleData.type === 1) {
        // type值为1时说明发表的是文章
        this.articleData.content = this.$refs.articleContent.editor.root.innerHTML || ''
        console.log(this.articleData)
      }
    },
    // 封装获取token令牌的操作
    getToken () {
      let token = localStorage.getItem('back_token')
      return { Authorization: token }
    },
    // 在视频上传成功前,若返回false则终止上传
    beforeUpload (file) {
      // 在上传视频前要先判断上传的是否是视频和限制文件大小,可以根据mime值来判断文件类型
      if (file.type.indexOf('video') === -1) {
        // 若不是视频文件则给出提示并终止上传
        this.$message.warning('请上传视频文件,你个憨憨')
        return false
      } else if (file.size >= 102400000) {
        // 如果上传的文件过大则给出提示并终止上传
        this.$message.warning('哇,太大了吧!铁憨憨')
        return false
      }
    },
    // 上传视频成功后
    uploadSuccess (res) {
      // 将内容存入到fromData的content属性中
      this.articleData.content = res.data.url
    },
    // 添加封面成功前,判断上传的是否图片,且最多上传三张
    beforeAdd (file) {
      console.log(file)
      if (file.type.indexOf('image') === -1) {
        // 若添加的不是图片则给出提示,并终止添加
        this.$message.warning('哇哦,你传的不是图片诶!')
        return false
      }
    },
    // 添加封面后
    addCoverSuccess (res) {
      // 将id信息后添加到articleData中的cover数组内
      this.articleData.cover.push({ id: res.data.id })
    },
    overLimit (files, flieList) {
      this.$message.warning('请停下来,你已经传了很多了!')
    },
    removeCover (file) {
      console.log(file)
      // 点击删除后将articleData中的cover进行更新
      let id = file.response.data.id
      // 遍历cover数组,找到需要删除的数据将其删除然后终止循环
      for (let i = 0; i < this.articleData.cover.length; i++) {
        if (this.articleData.cover[i].id === id) {
          this.articleData.cover.splice(i, 1)
          break
        }
      }
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
 /deep/.ql-editor{
        height: 200px
}
</style>
