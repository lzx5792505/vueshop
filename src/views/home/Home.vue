<template>
  <div id="home" class="h100">
      <nav-bar>
        <template v-slot:default>图书商城</template>
      </nav-bar>
      <tab-control v-show="isTabFixed" @tabClick="tabClick" :titles="titles"></tab-control>

      <div class="wrapper">
        <div class="content">
          <div ref="banref">
            <home-swiper :banner="banner"></home-swiper>
            <recommend :recGoods="recGoods"></recommend>
          </div>
          <tab-control @tabClick="tabClick" :titles="titles"></tab-control>
          <goods-list :goods="showGoods"></goods-list>
        </div>
      </div>
      <back-top @topBok="topBok" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Recommend from './HomeComps/Recommend';
import HomeSwiper from './HomeComps/HomeSwiper';
import BackTop from 'components/common/backtop/BackTop';
import BScroll from 'better-scroll';
import { getHomeAllData,getHomeGoodsData } from 'services/home'
import { computed, nextTick, onMounted, reactive, ref, watchEffect } from 'vue';
export default {
  name: 'Home',
  components:{
    NavBar,
    Recommend,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper
  },

  setup() {
    let isTabFixed = ref(false);
    let banref = ref(null);
    let isShowBackTop = ref(null);
    //banner图
    let banner = ref([]);
    //推荐商品
    let recGoods = ref([]);
    //选项卡
    let titles = ['畅销','新书','精选'];
    //goods列表
    let goods = reactive({
      sales:{page:1,list:[]},
      recommend:{page:1,list:[]},
      new:{page:1,list:[]}
    });
    //类型访问 计算属性
    let currentType = ref('sales');
    let showGoods = computed(() => {
      return goods[currentType.value].list;
    });
    let tabClick = (index)=>{
      let types = ['sales','new','recommend'];
      currentType.value = types[index];
      //切换重新计算高度
      nextTick(()=>{
        bscroll && bscroll.refresh();
      })
    }
    //点击回到顶部
    let topBok = () =>{
      bscroll.scrollTo(0,0,500);
    }
    //滚动插件
    let bscroll = reactive({});
    //请求数据
    onMounted(() => {

      getHomeAllData().then(res => {
        banner.value = res.slides;
        recGoods.value = res.goods.data;
      }).catch(err => {
        console.log(err);
      });

      getHomeGoodsData('sales').then(res => {
        goods.sales.list = res.goods.data;
      }).catch(err => {
        console.log(err);
      });

      getHomeGoodsData('recommend').then(res => {
        goods.recommend.list = res.goods.data;
      }).catch(err => {
        console.log(err);
      });

      getHomeGoodsData('new').then(res => {
        goods.new.list =  res.goods.data;
      }).catch(err => {
        console.log(err);
      });
      //创建better-scroll对象
      bscroll = new BScroll(document.querySelector('.wrapper'),{
          probeType:3,
          click:true,  //滚动点击事件，默认false
          pullUpLoad:true, //上拉加载更多，默认false
      });
      //触发滚动
      bscroll.on('scroll',(p)=>{
        isShowBackTop.value = isTabFixed.value = (-p.y) > banref.value.offsetHeight;
      });
      //上拉加载更多
      bscroll.on('pullingUp',()=>{
        //获取分页
        let pages = goods[currentType.value].page + 1;
        getHomeGoodsData(currentType.value, pages).then(res => {
          goods[currentType.value].list.push(...res.goods.data);
          goods[currentType.value].page += 1;
        }).catch(err => {
          console.log(err)
        });
        //完成上拉，等数据请求完成
        bscroll.finishPullUp();
        //重新计算高度
        bscroll.refresh();
      });
    });

    //监听重新计算高度
    watchEffect(() =>{
      nextTick(()=>{
        bscroll && bscroll.refresh();
      })
    });

    //返回数据
    return {
      banner,
      recGoods,
      titles,
      tabClick,
      showGoods,
      isTabFixed,
      banref,
      isShowBackTop,
      topBok
    }
  },
}
</script>

<style scoped lang="scss">
  .h150{
    height:150px
  }

  #home{
    position: relative;
  }

  .wrapper{
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
