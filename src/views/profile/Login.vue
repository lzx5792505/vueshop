<template>
    <div>
        <nav-bar>
            <template v-slot:default>登录</template>
        </nav-bar>
        <div class="user-top w100 flex justify-content">
            <van-image
                class="user-top"
                width="100"
                height="100"
                fit="contain"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                />
        </div>

         <van-form @submit="onSubmit" class="user-top">
            <van-field
                v-model="email"
                name="电子邮箱"
                label="电子邮箱"
                placeholder="请输入正确电子邮箱"
                :rules="[{ required: true, message: '请填写电子邮箱' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;" class="flex flex-column justify-content align-content align-items">
                <div class="like_info" @click="$router.push({path:'/register'})">
                    没有账号，立即注册
                </div>
                <van-button round block type="info" color="#42bBaa" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar';
import { login } from 'services/user';
import { reactive, toRefs } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  components:{
    NavBar
  },
  setup() {
    let router = useRouter();
    let store =  useStore();
    //用户信息
    let userInfo = reactive({
        email:'',
        password:'',
    });
    //提交
    let onSubmit = ()=>{
      login(userInfo).then(res => {
          window.localStorage.setItem('u_token',res.access_token);
          //设置状态
          store.commit('setIsLogin',true);
          
          Toast.success('登录成功');
          userInfo.email = '';
          userInfo.password = '';
          setTimeout(()=>{
            router.go(-1);
          },500);
      }); 
    }
    //返回数据
    return {
        onSubmit,
        ...toRefs(userInfo)
    }
  },
}
</script>

<style scoped lang="scss">
    .user-top{
        margin-top: 45px;
    }

    .like_info{
        padding: 10px;
        color: var(--color-high-text);
    }
</style>
