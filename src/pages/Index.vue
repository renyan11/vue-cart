<template>
    <div class="index-wrap">
        <!-- 左侧 -->
        <div class="index-left">
            <div class="index-left-block lastest-product">
                <h2>全部产品</h2>
                <!-- <input type="text" v-model="textMy">
                显示 {{textMy | myFilter}} -->
                <template v-for="product in productList">
                    <h3>{{ product.title}}</h3>
                    <ul>
                        <li v-for="item in product.list">
                            <router-link :to="{ path : item.url}">{{ item.name }}</router-link>
                            <span v-if="item.hot" :style="style"> HOT </span>
                        </li>
                    </ul>
                    <hr v-if="!product.last" class="hr"></hr>
                    <span v-if="username != ''">{{username}}</span>
                </template>
            </div>
            <div class="index-left-block lastest-news">
                <h2>最新消息</h2>
                <ul>
                    <li v-for="item in newsList">
                        <a :href="item.url">{{ item.name }}</a>
                        <span v-if="item.hot" :style="style">最新消息</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="index-right">
            <slide-show :slides="slideShow" :interval="intervalSpeed" @onchange="doElseThings"></slide-show>
            <div class="index-board-list">
                <div class="index-board-item"
                v-for="(item,index) in boardList" 
                :class="[{'line-last': (index % 2 !== 0 )},
                        'index-board-'+item.id]">
                    <div class="index-board-item-inner">
                        <h2>{{ item.title }}</h2>
                        <p v-html="item.description"></p>
                        <div class="index-board-button">
                            <a href="" class="button">立即查看</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import slideShow from '../components/SlideShow'
export default {
    created () {
        this.$http.post('getNewsList')
        .then(data => {
            let Mocknews = JSON.parse(data.bodyText).news
            //可行方式1
            Mocknews.forEach((element,index) => {
               Vue.set(this.newsList,index,Mocknews[index])
            });
            //可行方式2 this.newsList = this.newsList.concat(Mocknews)
            //可行方式3 this.newsList = Mocknews
            //可行方式4
            /*Mocknews.forEach((element,index) => {
               this.newsList.push(element)
            });*/
            //不可行 this.newsList.push(Mocknews)
            
        },err => {
            console.info(err)
        });

        this.$http.post('getSlideshowsList')
        .then(data => {
            let slideshows = data.body.slideshows
            slideshows.forEach((element,index) => {
                this.slideShow.push(element)
            })
        },err => {
            console.info("slideshow请求失败");
        })
    },
    filters: {
        myFilter : (value) => {
            return value.split("").reverse().join('');
        }
    },
    data () {
        return {
            textMy : "123",
            style : [
                {
                    "background" : "red",
                    "color" : "white",
                    "padding" : "0 3px"
                }
            ],
            newsList : [],
            username : this.$route.params.username,
            productList : {
                pc : {
                    title : 'ElementUI',
                    list : [
                        {
                            name: 'Steps 步骤条',
                            url: '/detail/totals'
                        },
                        {
                            name: 'NavMenu 导航菜单',
                            url: '/detail/forecast'
                        },
                        {
                            name: 'Form 表单',
                            url: '/detail/analysis',
                            hot: true
                        },
                        {
                            name: 'Table 表格',
                            url: '/detail/boardcase'
                        }
                    ]
                },
                app: {
                    title : 'APP产品',
                    last : true,
                    list: [
                        {
                            name: '91助手',
                            url: ''
                        },
                        {
                            name: '产品助手',
                            url: '',
                            hot: true
                        },
                        {
                            name: '智能地图',
                            url: '',
                            hot: true
                        },
                        {
                            name: '团队语音',
                            url: ''
                        }
                    ]
                }
            },
            slideShow: [],
            intervalSpeed : 2000,
            boardList: [
                {
                    title: '开放产品',
                    description: '开放产品是一款开放产品',
                    id: 'jaychou1',
                    toKey: 'analysis',
                    saleout: false
                },
                {
                    title: '品牌营销',
                    description: '品牌营销帮助你的产品更好地找到定位',
                    id: 'jaychou2',
                    toKey: 'count',
                    saleout: false
                },
                {
                    title: '使命必达',
                    description: '使命必达快速迭代永远保持最前端的速度',
                    id: 'jaychou3',
                    toKey: 'forecast',
                    saleout: true
                },
                {
                    title: '勇攀高峰',
                    description: '帮你勇闯高峰，到达事业的顶峰',
                    id: 'jaychou4',
                    toKey: 'publish',
                    saleout: false
                }
            ],
        }
    },
    components : {
        slideShow
    },
    methods : {
        //子组件传值到父组件
        doElseThings (e) {

        }
    }
}
</script>

<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.lastest-product{
    min-height: 400px
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.lastest-news {
  min-height: 260px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 15px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 250px;
}
.index-board-item-inner p{
    line-height : 25px;
}
.index-board-jaychou1 .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-jaychou2 .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-jaychou3 .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-jaychou4 .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
  background : #4fc08d;
  width: 100px;
  height :30px;
  line-height: 30px;
  color:white;
  text-align:center;
  border-radius: 3px;
}
</style>


