<template>
    <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" 
          v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" 
          v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ pwdErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p class="g-form-errorFinal" v-if="errorTextFinalState">{{ errorTextFinal }}</p>
    </div>
  </div>
</template>


<script>
export default {
    data () {
        return {
            usernameModel: '',
            passwordModel: '',
            errorTextFinal: '',
            errorTextFinalState : false,
            userFlag : false,
            pwdFlag : false
        }
    },
    computed :{
        userErrors () {
            this.errorTextFinalState = false
            let errorText,status
            if(this.userFlag == false && this.usernameModel == ''){
                errorText = ''
                this.userFlag = true
            }else if (this.usernameModel == '' && this.userFlag == true) {
                status = false
                errorText = "用户名不能为空"
            }else if(/@/g.test(this.usernameModel) && this.userFlag == true){
                status = false
                errorText = "用户名不得包含@字符"
            }else{
                status = true
                errorText = ""
            }
            return {
                status,
                errorText
            }
        },
        pwdErrors () {
            this.errorTextFinalState = false
            let errorText,status
            if(this.pwdFlag == false && this.passwordModel == ''){
                errorText = ''
                this.pwdFlag = true
            }else if (this.passwordModel == '' && this.pwdFlag == true) {
                status = false
                errorText = "密码不能为空"
            }else if(/^\w{1,5}$/g.test(this.passwordModel) && this.pwdFlag == true){
                status = false
                errorText = "密码长度至少是6位"
            }else{
                status = true
                errorText = ""
            }
            return {
                status,
                errorText
            }
        }
    },
    methods : {
        onLogin () {
            this.errorTextFinalState = false
            if(!this.userErrors.status || !this.pwdErrors.status){
                this.errorTextFinalState = true
                this.errorTextFinal = '请先通过简单校验.'
                return false
            }else{
                this.$http.post("login")
                .then((res) => {
                    let username = res.body.userInfo[0].username
                    let userpwd = res.body.userInfo[0].userpwd
                    if(username !== this.usernameModel &&  userpwd !== this.passwordModel){
                        this.errorTextFinalState = true
                        this.errorTextFinal = '用户名或密码错误.'
                        return false
                    }else{
                        this.errorText = ''
                        this.errorTextFinal = ''
                        this.$emit('onSuccess',username)
                    }
                },(error) => {
                    console.info(error)
                })
            }
        }
    }
}
</script>

<style scoped>
.button {
  display: inline-block;
  cursor: pointer;
  margin-top: 20px;
  background : #4fc08d;
  width: 100px;
  height :30px;
  line-height: 30px;
  color:white;
  text-align:center;
  border-radius: 3px;
}
.button:hover {
  background: #4fc08d;
}
</style>

