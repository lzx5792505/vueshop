<template>
  <div>
      <nav-bar>
        <template v-slot:default>商品详情</template>
      </nav-bar>

      <div class="banner-item w100 flex flex-column">
        <van-image
          width="100vw"
          lazy-load
          :src="detail.cover_url"
        />

        <van-card
          class="text-left"
          :num="detail.stock"
          :price="detail.price + '.00'"
          :desc="detail.description"
          :title="detail.title"
        >
          <template #tags>
            <van-tag plain type="danger">{{ detail.is_recommend == 1 ? '推荐': '新书' }}</van-tag>
          </template>
          <template #footer>
            <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
            <van-button type="danger" @click="goToCart">立即购买</van-button>
          </template>
        </van-card>

        <van-tabs v-model="active">
          <van-tab title="概述">
            <div class="content" v-html="detail.details"></div>
          </van-tab>
          <van-tab title="热评">
            <div v-for="item in detail.comments" :key="item.id">
              <p>{{ item.title }}</p>
            </div>
          </van-tab>
          <van-tab title="推荐">
             <goods-list :goods="like_goods"></goods-list>
          </van-tab>
        </van-tabs>

      </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import GoodsList from 'components/content/goods/GoodsList';
import { getGoodsDateil } from 'services/detail';
import { addCart } from 'services/cart';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { Toast } from 'vant';
import { useStore } from 'vuex';
export default {
  name: 'Detail',
  components:{
    NavBar,
    GoodsList
  },

  setup() {
    let route = useRoute();
    let routes = useRouter();
    let ids = ref(0);
    let active = ref(2);
    let store = useStore();

    //详情数据
    let goodsList = reactive({
      detail:{},
      like_goods:[],
    });
    //获取商品id
    ids.value = route.query.ids ? route.query.ids : route.query.id;
    //详情数据
    onMounted(()=>{
      //获取商品数据
      getGoodsDateil(ids.value).then(res => {
        goodsList.detail = res.goods;
        goodsList.like_goods = res.like_goods;
      }).catch(err => {
        console.log(err);
      });
    });

    //加入购物车
    let handleAddCart = ()=>{
      addCart({goods_id:goodsList.detail.id,num:1}).then(res=>{
        if(res.status == '204' || res.status == '201'){
          Toast.success('添加商品成功');
          //设置 
          store.dispatch('updateCart');
        }
      }).catch(err => {
        console.log(err)
      });
    };

    //直接购买
    let goToCart = () => {
      addCart({goods_id:goodsList.detail.id,num:1}).then(res=>{
        if(res.status == '204' || res.status == '201'){
          Toast.success('添加商品成功'); 
          //设置 
          store.dispatch('updateCart');
          routes.push({path:'/shopcart'});
        }
      }).catch(err => {
        console.log(err)
      });
    }

    //返回数据
    return {
      ids,
      active,
      ...toRefs(goodsList),
      handleAddCart,
      goToCart
    }
  },
}
</script>

<style scoped lang="scss">
  .banner-item{
    margin-top: 45px;
    .text-left{
      text-align: left;
    }
    .content{
      padding: 10px;
      margin-bottom: 45px;
      img{
        max-width:100vw;
        height: auto; 
      }
    }
  }
</style>
