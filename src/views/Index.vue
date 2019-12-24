<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
          ref='itemList'
          :router='true'
          :unique-opened="true"
          :default-active="currentPage"
          background-color="#545c64"
          text-color="#ccc"
          active-text-color="#ffd04b"
        >
          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="user_list">
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="article">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="article_list">文章列表</el-menu-item>
            <el-menu-item index="article_publish">文章发布</el-menu-item>
          </el-submenu>
          <el-submenu index="category">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item index="category_list">栏目列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="icon-paragraph-justify toggle-btn"></span>
          <span class="system-title">黑马头条后台管理系统</span>
          <div class="welcome">
            <span>欢迎你：小海绵</span> &nbsp;&nbsp;&nbsp;
            <span>退出</span>
          </div>
        </el-header>
        <el-main>
          <!-- 添加路由映射区域,映射嵌套的子路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // 数据函数对象
  data () {
    return {
      currentPage: ''
    }
  },
  // 钩子函数
  mounted () {
    // 当刷新的时候,侧边栏当前的项目持续保持高亮
    // 需要对submenu和sub-item的index进行改造,让其与路由匹配
    this.currentPage = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1)
  },
  // 监听对象
  watch: {
    // 监听路由,当路由变化时,获取到跳转前后的路径,判断若跳转到welcome页面时,应该将所有项目的高亮取消并且收起导航栏
    '$route' (to, from) {
      // 确定需要跳转到的项目
      let menuItem = to.path.substring(to.path.lastIndexOf('/') + 1)
      // 确定跳转前的项目所在的导航栏,为之后的关闭导航栏做准备
      let submenu = from.path.substring(from.path.lastIndexOf('/') + 1, from.path.lastIndexOf('_'))
      if (menuItem === 'welcome') {
        // 若跳转到welcome,则默认打开设置为空,取消所有高亮,并关闭所在导航栏
        this.currentPage = ''
        this.$refs.itemList.close(submenu)
      }
    }
  }
}

</script>

<style lang='less' scoped>
.index {
  height: 100%;
  /deep/.el-submenu__title{
    width: 200px;
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    width: 199 px !important;
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
  /deep/.el-breadcrumb{
    margin-bottom: 10px;
    font-size: 16px;
  }
}
</style>
