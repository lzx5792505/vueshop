<template>
  <div class="flex justify-content w100 recommend">

      <div class="flex justify-content w25" v-for="item in recGoods.slice(0,4)" :key="item.id">
          <a href="" @click.prevent="goGoods(item.id)" class="flex flex-column justify-content align-items">
              <img class="w80" v-lazy="item.cover_url" alt="" srcset="">
              <div>{{ item.title }}</div>
          </a>
      </div>

  </div>
</template>

<script>
import { useRouter } from 'vue-router'; 
export default {
  name: 'Recommend',

  props:{
      recGoods:{
          type:Array,
          default(){
              return [];
          }
      }
  },

  setup() {
      let router = useRouter();
      let goGoods = (ids) =>{
          router.push({path:'/detail',query:{ids}});
      }
    //返回数据
    return {
        goGoods
    }
  },
}
</script>

<style scoped lang="scss">
    .w25{
        width: 25%;
    }

    .w80{
        width: 80%;
        object-fit: cover;
    }

    .recommend{
        border-bottom: 8px solid #eee;
        padding: 10px 10px;
        font-size: var(--font-size);
    }

    .recommend img{
        margin-bottom: 10px;
    }
</style>
