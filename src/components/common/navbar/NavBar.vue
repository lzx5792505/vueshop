<template>
  <div class="nav-bar flex align-items">
      <div class="flex justify-content align-content left" @click="goBack">
          <slot name="left">
              <img class="icon-left" src="~assets/images/icon/j_left.png" alt="" srcset="">
          </slot>
      </div>
      <div class="flex justify-content center">
          <slot>ewshop</slot>
      </div>
      <div class="flex justify-content right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router'

export default {
  name: 'NavBar',

  setup() {
    let router = useRouter();
    let goBack = () =>{
        router.go(-1);
    }
    //返回数据
    return {
        goBack
    }
  },
}
</script>

<style scoped lang="scss">
    .nav-bar{
        justify-content: space-between;
        height: 45px;
        background-color: var(--color-tint);
        color:var(--color-background);
        box-shadow: 0 2px 0px rgba(100,100,100,.1);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 5;
    }

    .left,.right{
        width: 60px;
    }

    .icon-left{
        width: 32px;
        height: 32px;
    }

    .center{
        flex: 1;
    }
</style>
