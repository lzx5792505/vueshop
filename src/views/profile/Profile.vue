<template>
  <div>
      <nav-bar>
        <template v-slot:default>个人中心</template>
      </nav-bar>
      <div style="margin-top:75px">
        <van-button @click="logOut" round block color="#9e9e9e">退出登录</van-button>
      </div>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar';
import { useRouter } from 'vue-router';
import { logout } from 'services/user';
import { Toast } from 'vant';
import { useStore } from 'vuex';

export default {
  name: 'Profile',

  components:{
    NavBar
  },

  setup() {
    let router = useRouter();
     let store =  useStore();

    let logOut = () =>{
      logout().then(res=>{
        if(res.status == '204'){
          Toast.success('退出成功');
          // 清除token
          window.localStorage.setItem('u_token','');
          //设置状态
          store.commit('setIsLogin',false);
          
          setTimeout(() => {
            router.push({path:'/home'});
          },500);
        }
      });
    }
    //返回数据
    return {
      logOut
    }
  },
}
</script>

<style scoped lang="scss">
</style>
