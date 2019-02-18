<template>
  <div class="layout-wrap">
    <div class="app-head">
        <div class="app-head-inner">
            <router-link :to="{path : '/'}">
                <img src="../assets/logo.png"/>
            </router-link>
            <div class="head-nav">
                <ul class="nav-list">
                    <li>{{ username }}</li>
                    <li v-if="username===''" @click="loginClick">登录</li>
                    <li v-if="username===''" class="nav-pile"> | </li>
                    <li v-if="username===''" @click="regClick">注册</li>
                    <li class="nav-pile"> | </li>
                    <li @click="aboutClick">关于</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="app-container">
        <keep-alive>
            <router-view :to="{name:'IndexPage',params:{'username': '11'}}"></router-view>
        </keep-alive>
    </div>
    <div class="app-foot">
        <p>&copy; 2018 Ryan vue-cart MIT</p>
    </div>
    <Mydialog :isShow="isShowAbout" @onClose="onCloseMyDialog('isShowAbout')">
        <div>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。</div>
    </Mydialog>

    <Mydialog :isShow="isShowLogin" @onClose="onCloseMyDialog('isShowLogin')">
        <LoginForm @onSuccess="onSuccessLogin"></LoginForm>
    </Mydialog>

    <Mydialog :isShow="isShowReg" @onClose="onCloseMyDialog('isShowReg')">
        暂未提供注册功能,敬请期待.<br/>
    </Mydialog>
  </div>
</template>

<script>
import Mydialog from './Dialog'
import LoginForm from './LoginForm'
export default {
  name: 'Layout',
  components : {
      Mydialog,
      LoginForm
  },
  data () {
      return {
          isShowAbout : false,
          isShowLogin : false,
          isShowReg : false,
          username : ''
      }
  },
  methods : {
      aboutClick () {
          this.isShowAbout = true
      },
      loginClick () {
          this.isShowLogin = true
      },
      regClick () {
          this.isShowReg = true
      },
      onCloseMyDialog (showName) {
          this[showName] = false
      },
      onSuccessLogin (data) {
          this.username = data
          this.onCloseMyDialog('isShowLogin')
      }
  }
}
</script>

<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.app-head-inner img {
  width: 50px;
  margin-top: 20px;
  float: left;
}
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
.g-form-errorFinal{
  color: red;
  padding-left: 13%;
}
</style>
