<template>
  <div class="articleList">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;font-size:16px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加表格,展示文章数据 -->
    <el-table :data="articleList" style="width: 100%"  border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="create_date" label="日期" width="180"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="user.nickname" label="作者"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
export default {
  // 钩子函数
  async mounted () {
    // 加载页面后获取第一页的文章
    let res = await getArticleList({
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    })
    if (res.status === 200) {
      // 将内容存入到articleList中
      this.articleList = res.data.data
    } else {
      this.$message.error('请求失败')
    }
  },
  // 数据函数对象
  data () {
    return {
      pageSize: 5,
      pageIndex: 1,
      articleList: []
    }
  }
}
</script>

<style>
</style>
