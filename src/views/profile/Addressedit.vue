<template>
    <div class="address-edit-box">
        <nav-bar class="nav-bar">
            <template v-slot:default>{{title}}</template>
        </nav-bar>

        <van-address-edit
            class="edit"
            :area-list="areaList"
            :address-info="addressInfo"
            :show-delete="type=='edit'"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import { useRouter, useRoute } from 'vue-router';
import { addAddress, getAddressInfo } from 'services/address';
import { onMounted, reactive, toRefs } from 'vue';
import { tdist } from 'utils/address';
import { Toast } from 'vant';

export default {
    name: 'Addressedit',

    components:{
        NavBar,
    },
    
    setup(){

        let router = useRouter();
        let route = useRoute();

        let data = reactive({
            areaList:{
                province_list:{},
                city_list:{},
                county_list:{}
            },
            searchResult:[],
            addressInfo:[],
            type:'add',
            addressId:'',
            title:''
        });

        onMounted(()=>{
            //省市区数据
            let _province_list = {};
            let _city_list = {};
            let _county_list = {};
            tdist.getLev1().forEach(p => {
                _province_list[p.id] =p.text;
                tdist.getLev2(p.id).forEach(c =>{
                    _city_list[c.id] = c.text;
                    tdist.getLev3(c.id).forEach(q => {
                        _county_list[q.id] = q.text;
                    });
                });
            });
            //所有省
            data.areaList.province_list = _province_list;
            //市
            data.areaList.city_list = _city_list;
            //区
            data.areaList.county_list = _county_list;
            //获取编辑的数据
            let { type, addressId } = route.query;
            data.type = type;
            data.addressId = addressId;

            switch(data.type) {
                case 'add':
                    data.title = '新增地址';
                    break;
                case 'edit':
                    data.title = '编辑地址';
                    //详情
                    getAddressInfo(data.addressId).then(res => {
                        let addInfo = res;
                        //区位码
                        let _areaCode = '';
                        let provinces = tdist.getLev1();

                        Object.entries(data.areaList.county_list).forEach(([id, text]) => {
                            // 先找出当前对应的区
                            if (text == addInfo.county) {
                                // 找到区对应的几个省份
                                let provinceIndex = provinces.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
                                // 找到区对应的几个市区
                                // eslint-disable-next-line no-unused-vars
                                let cityItem = Object.entries(data.areaList.city_list).filter(([cityId, city]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
                                // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
                                if (provinces[provinceIndex].text == addInfo.province && cityItem[1] == addInfo.city) {
                                    _areaCode = id;
                                }
                            }
                        })

                        data.addressInfo = {
                            name      : addInfo.name,
                            tel       : addInfo.phone,
                            province  : addInfo.province,
                            city      : addInfo.city,
                            county    : addInfo.county,
                            areaCode  : _areaCode,
                            addressDetail:addInfo.address,
                            isDefault  : !!addInfo.is_default
                        }
                    });
                    break;
            } 
        });

        //添加数据
        let onSave = (context) => {
            let params = {
                name  : context.name,
                phone : context.tel,
                province: context.province,
                city:context.city,
                county:context.county,
                address:context.addressDetail,
                is_default:context.is_default ? 1 : 0,
            }
            addAddress(params);
            Toast.success('添加成功');
            setTimeout(() =>{
                router.back();
            },500)
        }
        
        return{
            onSave,
            ...toRefs(data)
        }
    }
}
</script>

<style scoped lang="scss">
.address-edit-box{
    position: absolute;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    :deep(.edit){
        margin-top: 45px;
        .van-field__body{
            .van-field__control{
                height: 26px !important;
            }
        }
        .van-button--danger {
            background: var(--color-tint);
            border-color: var(--color-tint);
        }
    }
}
</style>