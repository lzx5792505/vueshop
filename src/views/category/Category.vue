<template>
  <div>
      <nav-bar>
        <template v-slot:default>商品分类</template>
      </nav-bar>
      <div id="mainbox" class="flex flex-column">
        <div class="ordertab flex w100 flex-end">
          <div class="tab-item">
            <van-tabs v-model="active" @click="tabClick">
              <van-tab title="销量排序"></van-tab>
              <van-tab title="价格排序"></van-tab>
              <van-tab title="评论排序"></van-tab>
            </van-tabs>
          </div>
        </div>
        <div class="flex">
          <van-sidebar class="leftmenu flex flex-column" v-model="activeKey">
            <van-collapse v-model="activeName" accordion>
              <van-collapse-item v-for="item in categories" 
                :key="item.id" 
                :title="item.name" 
                :name="item.name">
                <van-sidebar-item v-for="it in item.children" 
                  :key="it.id"  
                  :title="it.name" 
                  @click="getGoods(it.id)"
                />
              </van-collapse-item>
            </van-collapse>
          </van-sidebar>
          <div class="goodslist tab-item flex flex-wrap">
            <div class="content w100">
              <van-card
                v-for="item in showGoods" :key="item.id"
                :num="item.comments_count"
                :tag="item.comments_count >= 0 ? 'Hot' : 'ok'"
                :price="item.pric"
                :desc="item.updated_at"
                :title="item.title"
                :thumb="item.cover_url"
                :lazy-load="true"
                @click="goToDetail(item.id)"
              />
            </div>
          </div>
        </div>
      </div>
      <back-top @topBok="topBok" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import NavBar from 'components/common/navbar/NavBar';
import BackTop from 'components/common/backtop/BackTop';
import {getCategory, getCategoryGoods} from 'services/category';
import {computed, nextTick, onMounted, reactive, ref, watchEffect} from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'Category',
  
  components:{
    NavBar,
    BackTop
  },

  setup() {
    let router = useRouter();
    let activeKey = ref(0);
    let activeName = ref(1);
    let active = ref(1);
    let categories = ref([]);
    let isShowBackTop = ref(false);
    //滚动插件
    let bscroll = reactive({});
    //当前排序条件
    let currentOrder = ref('sales');
    //当前分类id
    let currentID = ref(0);
    //数据模型
    let goods = reactive({
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
      comments_count:{page:1,list:[]},
    });
    let showGoods = computed(()=>{
      return goods[currentOrder.value].list
    });

    let goodsData = ((type,cid)=>{
      getCategoryGoods(type,cid).then(res => {
        goods[currentOrder.value].list = res.goods.data;
        bscroll && bscroll.refresh();
      }).catch(err => {
        console.log(err);
      });
    });

    //初始化数据方法
    onMounted(()=>{

      getCategory().then(res => {
        categories.value = res.categories
      }).catch(err => {
        console.log(err);
      });

      goodsData('sales',currentID.value);

      //创建better-scroll对象
      bscroll = new BScroll(document.querySelector('.goodslist'),{
          probeType:3,
          click:true,  //滚动点击事件，默认false
          pullUpLoad:true, //上拉加载更多，默认false
      });
      //上拉加载更多
      bscroll.on('pullingUp',()=>{
        let pages = goods[currentOrder.value].page + 1;
        getCategoryGoods(currentOrder.value,currentID.value).then(res => {
          goods[currentOrder.value].list.push(...res.goods.data);
          goods[currentOrder.value].page += pages;
        }).catch(err => {
          console.log(err);
        });
        //完成上拉，等数据请求完成
        bscroll.finishPullUp();
        //重新计算高度
        nextTick(()=>{
          bscroll && bscroll.refresh();
        })
      });

      //触发滚动
      bscroll.on('scroll',(p)=>{
        isShowBackTop.value = (-p.y) > 300
      });
    });

    //监听重新计算高度
    watchEffect(() =>{
      nextTick(()=>{
        bscroll && bscroll.refresh();
      })
    });

    //排序选项卡
    let tabClick = (index)=>{
      let orders = ['sales','price','comments_count'];
      currentOrder.value = orders[index];
      goodsData(currentOrder.value,currentID.value);
      // console.log(currentID.value);
      // console.log("排序:" + orders[index]);
    }
    //点击分类得到iID
    let  getGoods = (gid) =>{
      currentID.value = gid;
      goodsData(currentOrder.value,currentID.value);
      // console.log(gid);
      // console.log("排序:" + currentOrder.value);
    }

    //点击回到顶部
    let topBok = () =>{
      bscroll.scrollTo(0,0,500);
    }

    //返回数据
    return {
      activeKey,
      categories,
      activeName,
      active,
      tabClick,
      currentOrder,
      getGoods,
      currentID,
      showGoods,
      bscroll,
      isShowBackTop,
      topBok,
      goToDetail:(id) => {
        router.push({path:'/detail',query:{id}})
      }
    }
  },
}
</script>

<style scoped lang="scss">
  #mainbox {
    margin-top: 45px;
    .ordertab{
      height: 44px;
      position: relative;
      z-index:8;
    }

    .leftmenu{
      width: 30%;
      position: absolute;
      top:89px
    }

    .goodslist{
      padding: 10px;
      text-align: left  !important;
      position: absolute;
      left: 30%;
      overflow: hidden;
      height: calc(100vh - 89px);
      top:89px
    }

    .tab-item{
      width: 70%;
    }

    .flex-end{
      justify-content: flex-end;
    }
  }
</style>
