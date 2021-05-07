<template>
    <div class="address-box">
        <nav-bar class="nav-bar">
            <template v-slot:default>地址管理</template>
        </nav-bar>

        <div class="address-blank" v-show="list.length == 0">还没有地址信息，去添加吧！</div>

        <div class="address-item">
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
            />
        </div>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import { getAddress } from 'services/address';
import { onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'Address',
    components:{
        NavBar,
    },

    setup(){
        let router = useRouter();
        
        let data = reactive({
            chosenAddressId: '1',
            list: []
        })

        let onAdd = () =>{
            router.push({
                path:'/addedit',
                query:{
                    type:'add'
                }
            });
        } 

        let onEdit = (item) =>{
            router.push({
                path:'/addedit',
                query:{
                    type:'edit',
                    addressId:item.id
                }
            });
        }

        onMounted(() =>{
            getAddress().then(res => {
                if(res.data.length == 0){
                    data.list = [];
                    return 
                }
                data.list = res.data.map(item => {
                    return {
                        id:item.id,
                        name:item.name,
                        tel:item.phone,
                        address:`${item.province} ${item.city} ${item.county} ${item.address}`,
                        isDefault: !!item.is_default
                    }
                });
                
              
            });
        });

        return{
            onAdd,
            onEdit,
            ...toRefs(data)
        }
    }
}
</script>

<style scoped lang="scss">
.address-box{
    position: absolute;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    .van-radio__icon{
        display: none;
    }
    .address-blank{
        margin-top: 60px;
    }
    :deep(.address-item){
        margin-top: 45px;
        .van-button {
            background: var(--color-tint);
            border-color: var(--color-tint);
        }
        .van-address-list__bottom{
            bottom: 90px;
        }
    }
}
</style>