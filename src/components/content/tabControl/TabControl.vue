<template>
  <div class="tab-control flex w100">
      <div class="tab-item" 
      v-for="(item,i) in titles" 
      :key="i" 
      @click="itemClick(i)" :class="{active:i == currentIndex}">
            <span>{{ item }}</span>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TabControl',

  props:{
      titles:{
          type:Array,
          default(){
              return [];
          }
      }
  },

  setup(props,context) {
      let currentIndex = ref(0);
      let itemClick = (i) =>{
          currentIndex.value = i;
          context.emit('tabClick',i);
      }

    //返回数据
    return {
        currentIndex,
        itemClick
    }
  },
}
</script>

<style scoped lang="scss">
    .tab-control{
        background-color: aliceblue;
        height: 40px;
        line-height: 40px;
        font-size: var(--font-size-14);
        color: var(--color-text);
        position: -webkit-sticky;
        position: sticky;
        top: 45px;
        z-index: 10;
        .tab-item{
            flex:1;
            span{
                padding: 5px;
            }
        }
        .active{
            color: var(--color-tint);
            span{
                border-bottom: 3px solid var(--color-tint);
            }
        }
    }
</style>
