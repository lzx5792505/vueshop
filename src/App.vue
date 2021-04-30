<template>
  <!-- <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view> -->
  
  <router-view/>

  <div id="nav" class="flex align-content align-items">
    <router-link class="tab-item flex flex-column justify-content" to="/">
      <div><i class="iconfont icon-huabanfuben1"></i></div>
      <div class="icon">首页</div> 
    </router-link>
    <router-link class="tab-item flex flex-column justify-content" to="/category">
      <div><i class="iconfont icon-leimupinleifenleileibie"></i></div>
      <div class="icon">分类</div> 
    </router-link>
    <router-link class="tab-item flex flex-column justify-content" to="/shopcart">
      <div>
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>
      </div>
      <div class="icon">购物车</div> 
    </router-link>
    <router-link class="tab-item flex flex-column justify-content" to="/profile">
      <div><i class="iconfont icon-huabanfuben"></i></div>
      <div class="icon">我的</div> 
    </router-link>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    let store = useStore();
    onMounted(()=>{
      store.dispatch('updateCart');
    });

    //返回数据
    return {
    }
  },
}
</script>

<style lang="scss">

@import  "assets/css/global.css";
@import "assets/css/iconfont/iconfont.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-a);
}

#nav {
  background-color: #f6f6f6;
  justify-content: space-around;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0px -1px 1px rgba(29, 18, 18, 0.1);

  a {
    color:var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }

  .tab-item{
    width: 25%;
    height: 50px;
    font-size: var(--font-size);
  }

  .icon{
    margin-top: 5px;
  }
}
</style>
