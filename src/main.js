import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import { 
    Swipe, SwipeItem, Lazyload, Badge, Sidebar, SidebarItem, 
    Collapse, CollapseItem, Tab, Tabs, Card, Image as VanImage, 
    Tag, Button, Form, Field, Checkbox, CheckboxGroup,Stepper,
    SwipeCell,SubmitBar, Icon, AddressList, AddressEdit, Popup 
    ,Grid, GridItem, List, PullRefresh  
} from 'vant'

createApp(App)
    .use(Swipe)
    .use(SwipeItem)
    .use(Badge)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Collapse)
    .use(CollapseItem)
    .use(Tab)
    .use(Tabs)
    .use(Card)
    .use(VanImage)
    .use(Tag)
    .use(Button)
    .use(Form)
    .use(Field)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Stepper)
    .use(SwipeCell)
    .use(SubmitBar)
    .use(Icon)
    .use(AddressList)
    .use(AddressEdit)
    .use(Popup)
    .use(Grid)
    .use(GridItem)
    .use(List)
    .use(PullRefresh)
    .use(Lazyload,{
        // loading:require('assets/images/demo.jpg')
    })
    .use(store).use(router).mount('#app')
