<template>
  <div class="goods-item">
        <img v-lazy="product.cover_url" alt="" srcset="">
        <div class="goods-info">
            <p class="flex justify-content">
               <span class="w50">{{ product.title }}</span> 
            </p>
            <p class="flex goods-span">
                <span class="price w50">$<small></small>{{ product.price }}</span>
                <span class="collect w50">{{ product.collects_count }}</span>
            </p>
        </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props:{
      product:Object,
      default(){
          return {}
      }
  },
  setup() {
     
    //返回数据
    return {
        
    }
  },
}
</script>

<style scoped lang="scss">
    .goods-item{
        width: 46%;
        img{
            width: 100%;
            border-radius: 5px;
        }
        .goods-info{
            font-size: var(--font-size);
            padding: 5px;
            overflow: hidden;
            p {
                span{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .w50{
                width: 50%;
            }
            .goods-span{
                margin-top: 10px;
                margin-bottom: 5px;
                .price{
                    color: red;
                }
            }
        }
    }  
</style>
