<template>
  <div class="login">
    <div class="container">
      <img src="../assets/default.jpg" alt="" class="avatar">
      <el-form :model="userData" :rules="confirmUser" ref="userData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userData.username" placeholder="请输入用户名" clearable prefix-icon="icon-user-check."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userData.password" placeholder="请输入6~16位的密码" clearable prefix-icon="icon-key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/user.js'
export default {
  // 数据函数对象
  data () {
    return {
      userData: {
        username: 'admin',
        password: '1596321'
      },
      confirmUser: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入3~16位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  // 组件加载完成钩子函数
  mounted () {
  },
  // 事件处理函数对象
  methods: {
    login () {
      // el-form有validate方法,参数是一个回调函数,回调函数的参数valid也是回调函数,若验证成功则返回true,失败返回false
      this.$refs.userData.validate(async (valid) => {
        if (valid) {
          // 验证成功,发axios请求,若成功则跳转到主页并将token存入,否则给出提示
          let res = await userLogin(this.userData)
          if (res.data.message === '登录成功') {
            this.$message.success(res.data.message)
            let token = res.data.data.token
            localStorage.setItem('back_token', token)
            this.$router.push({ name: 'index' })
          } else if (res.data.message === '用户名不存在') {
            this.$message.error(res.data.message)
          } else {
            this.$message.error('请求失败')
          }
        } else {
          // 若验证失败则给出提示并返回false终止操作
          this.$message.error('你个憨憨,格式都错了!')
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
