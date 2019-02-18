<template>
    <div class="detail-wrap">
        <div class="detail-left">
        <div class="product-board">
            <img :src="productIcon">
            <ul>
                <!-- <li v-for="items in productList">{{ items.name }}</li> -->
                <router-link :key="index" v-for="(items,index) in productList" :to="{ path : items.path}" tag="li"
                active-class="active">{{ items.name }}</router-link>
            </ul>
        </div>
        </div>
        <div class="detail-right">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            productList : [
                {
                    name: 'Steps 步骤条',
                    path: 'totals'
                },
                {
                    name: 'NavMenu 导航菜单',
                    path: 'forecast'
                },
                {
                    name: 'Form 表单',
                    path: 'analysis',
                },
                {
                    name: 'Table 表格',
                    path: 'boardcase'
                }
            ],
            imgMap : {
                '/detail/totals' : require("../assets/images/1.png"),
                '/detail/forecast' : require("../assets/images/2.png"),
                '/detail/analysis' : require("../assets/images/3.png"),
                '/detail/boardcase' : require("../assets/images/4.png"),
            }
        }
    },
    computed : {
        productIcon () {
            return this.imgMap[this.$route.path]
        }
    }
}
</script>

<style>
.detail-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.detail-left {
  float: left;
  width: 200px;
  text-align: center;
}
.detail-right {
  float: left;
  width: 980px;
  margin-left: 20px;
}
.product-board {
  background: #fff;
  padding: 20px 0;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}
.product-board li.active,.product-board li:hover {
  background: #4fc08d;
  color: #fff;
}
.div-detailpage{
  background: #fff;
}
.div-detailpage-padding{
  padding: 30px
}
</style>


