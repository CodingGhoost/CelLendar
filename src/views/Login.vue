<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
// import { userTokenStore } from '@/stores/token';
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

// Define data model
const registerData = ref({
  username:'',
  password:'',
  rePassword:''
})

// Helper validator for repeat password
const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Required'))
  } else if (value !== registerData.value.password) {
    callback(new Error('Two passwords do not match'))
  } else {
    callback()
  }
}

// Define form data validation rules
const rules = {
  username: [
    { required: true, message: 'Required', trigger: 'blur' },
    { min: 5, max: 16, message: 'Length should be 5 to 16', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Required', trigger: 'blur' },
    { min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur' }
  ],
  rePassword: [
    {validator:checkRePassword, trigger: 'blur'}
  ]
}

// import { userRegisterService, userLoginService } from '@/api/user'
// const register = async () => {
//   let result = await userRegisterService(registerData.value);
// //   if (result.code === 0) {
// //     alert(result.msg ? result.msg: 'Register successful');
// //   } else {
// //     alert('Register failed');
// //   }
//     ElMessage.success(result.msg ? result.msg: 'Register successful');
// }

// import { useRouter } from 'vue-router'
// const router = useRouter();
// const tokenStore = userTokenStore();
// const login = async () => {
//   let result = await userLoginService(registerData.value);

// //   if (result.code === 0) {
// //     alert(result.msg? result.msg: 'Login successful');
// //   } else {
// //     alert('Login failed');
// //   }
//   ElMessage.success(result.msg ? result.msg: 'Login successful');
//   tokenStore.setToken(result.data);
//   router.push('/');
// }

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>Sign Up</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="Username" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="Password" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="Confirm Password" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item class="button-item">
                    <el-button class="button" type="primary" auto-insert-space @click = "register">
                        Sign Up
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false">
                        Login
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>Login</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="Username" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="Password" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox class="remember-me">Remember me</el-checkbox>
                        <el-link class="forget-pwd" type="primary" :underline="false">Forget password?</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item class="button-item">
                    <el-button class="button" type="primary" auto-insert-space @click="login">Login</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true">
                        Sign Up
                    </el-link>
                </el-form-item>

                <el-form-item class="separator">
                  <div class="separator-text">or sign-up with</div>
                </el-form-item>

                <!-- 社交媒体登录按钮 -->
                <el-form-item class="social-login">
                  <div class="social-div">
                    <button class="social-button google" @click="signInWithGoogle">
                      <el-icon><img src="@/assets/google-icon.png" alt="Google" /></el-icon>
                    </button>
                    <button class="social-button wechat" @click="signInWithWeChat">
                      <el-icon><img src="@/assets/wechat-icon.png" alt="WeChat" /></el-icon>
                    </button>
                  </div>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style scoped>
/* 登录页面整体布局 */
.login-page {
  height: 100vh;
  background-color: #fff;
}

/* 登录表单容器 */
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
}

/* 标题 */
.title {
  margin: 0 auto;
}

.button-item {
  margin-bottom: 5px;
}

/* 按钮样式 */
.button {
  width: 100%;
  margin-top: 10px;
  font-family: 'Inter', sans-serif;
  color: #fff;
  background-color: black;
  border: none;
  transition: background-color 0.2s ease-in-out;
}

.button:hover {
  background-color: rgb(28, 28, 28);
}

/* 记住我 & 忘记密码 */
.flex {
  font-family: 'Inter', sans-serif;
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: #666; */
}

/* 记住我 */
.remember-me {
  color: #666;
}

/* 忘记密码 */
.forget-pwd {
  color: black;
  transition: color 0.2s ease-in-out;
}

.forget-pwd:hover {
  color: #666;
}

/* 让选中复选框变黑 */
:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: black !important;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: black;
  border-color: black;
}

:deep(.el-checkbox__inner:hover) {
  border-color: black;
}

/* 输入框样式 */
:deep(.el-input__wrapper) {
  transition: box-shadow 0.2s ease-in-out;
}

/* 选中输入框时边框变黑 */
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.7);
}

:deep(.el-form-item.flex) {
  margin-bottom: 0 !important;
}


/* 分隔线 */
.separator {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;
}

.separator-text {
  flex-grow: 1;
  text-align: center;
  font-size: 14px;
  color: #888;
  position: relative;
}

.separator-text::before,
.separator-text::after {
  content: "";
  position: absolute;
  width: 30%;
  height: 1px;
  background-color: #ddd;
  top: 50%;
}

.separator-text::before {
  left: 0;
}

.separator-text::after {
  right: 0;
}

/* 社交媒体按钮 */
.social-div {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* 按钮基础样式 */
.social-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* border: 1px solid #ddd; */
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.social-button img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%
}

/* .social-button.wechat {
  height: 80%;
  width: 80%;
} */

.social-button:hover {
  transform: scale(1.1);
}


</style>
