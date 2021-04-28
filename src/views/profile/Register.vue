<template>
    <div>
        <nav-bar>
            <template v-slot:default>用户注册</template>
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
                v-model="name"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
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
            <van-field
                v-model="password_confirmation"
                type="password"
                name="确认密码"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请填写一致密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" color="#42b983" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar';
import { register } from 'services/user';
import { reactive, toRefs } from 'vue';
import { Notify, Toast } from 'vant';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  components:{
    NavBar
  },
  setup() {
      let router = useRouter();
    //用户信息
    let userInfo = reactive({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',

    });
    //提交
    let onSubmit = ()=>{
        if(userInfo.password != userInfo.password_confirmation){
            Notify({ type: 'warning', message: '两次密码不一致' });
        }else{
            register(userInfo).then(res => {
                if(res.status == 201){
                    Toast.success('注册成功');
                    router.push({path:'/login'});
                }
            }).catch(err => {
                console.log(err);
            });
        }
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
</style>
