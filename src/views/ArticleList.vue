<template>
  <div class="articleList">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;font-size:16px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加表格,展示文章数据 -->
    <!-- 对表格内的数据进行操作，都需要用到作用域插槽来获取到当前行的数据 -->
    <el-table :data="articleList" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="标题" width="380"></el-table-column>
      <!-- 对日期数据进行操作 -->
      <el-table-column prop="create_date" label="日期" width="100">
        <template slot-scope="date">
          {{date.row.create_date | dateFormat('-')}}
        </template>
      </el-table-column>
      <!-- 服务器返回的type的值是1/2,要想操作数据需要用到作用域插槽来处理 -->
      <el-table-column prop="type" label="类型" width="80">
        <template slot-scope="type">
          {{type.row.type === 1?'文章':'视频'}}
        </template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="150"></el-table-column>
      <!-- 作用域插槽:在封装组件中通过data属性来传入了数据,在父组件通过slot-scope属性来取出数据 -->
      <!-- 在封装组件中将行数据存在了作用域插槽的data.row中 -->
      <el-table-column label="操作">
        <template slot-scope="currentCell">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(currentCell.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="info" icon="el-icon-message" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(currentCell.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
</el-pagination>
  </div>
</template>

<script>
// 引入api方法
import { getArticleList } from '@/api/article.js'
// 引入过滤器
import { dateFormat } from '@/utils/myFilter.js'
export default {
  // 钩子函数
  async mounted () {
    // 加载页面后获取第一页的文章
    this.getPageArticle()
  },
  // 数据函数对象
  data () {
    return {
      pageSize: 2,
      pageIndex: 1,
      total: 0,
      articleList: []
    }
  },
  // 事件处理函数对象
  methods: {
    // 封装获取整页数据
    async getPageArticle () {
      // 发axios请求
      let res = await getArticleList({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      })
      if (res.status === 200) {
      // 将内容存入到articleList中
        this.articleList = res.data.data
        this.total = res.data.total
      } else {
        this.$message.error('请求失败')
      }
    },
    handleSizeChange (val) {
      // 改变每页显示条数的时候,将每页显示条数数据更新
      this.pageSize = val
      // 更新页面数据
      this.getPageArticle()
    },
    handleCurrentChange (val) {
      // 改变页码时候,将页码数据更新
      this.pageIndex = val
      // 更新页面数据
      this.getPageArticle()
    },
    // 点击编辑后触发,对该条文章进行编辑
    handleEdit (rowData) {
      console.log(rowData)
    },
    // 点击删除后触发,将该条文章删除
    handleDelete (rowData) {
      console.log(rowData)
    }
  },
  // 注册过滤器对象
  filters: {
    dateFormat
  }
}
</script>

<style>
</style>
