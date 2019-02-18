import Mock from 'mockjs'
import news from './data/newslist'
import slideshows from './data/slideshows'

const userInfo = [{
    username : 'Ryan',
    userpwd : '123456'
}]
export default {
    init () {
        //拦截getNewsList请求,返回news数据
        Mock.mock("getNewsList",{
            news
        });

        Mock.mock("getSlideshowsList",{
            slideshows
        });

        Mock.mock("login",{
            userInfo
        });
    }
}