<template>
    <div class="slide-show" @mouseover="clearInterval" @mouseout="runInterval">
        <div class="silde-img">
            <a :href="slides[nowIndex].href">
                <img :src="slides[nowIndex].src">
            </a>
        </div>
        <h2>{{ slides[nowIndex].title }}</h2>
        <ul class="slide-pages">
            <li @click="goto(preIndx)">&lt;</li>
            <li v-for="(item,index) in slides" @click="goto(index)">
                <a :class="{on : index === nowIndex}">{{ index + 1}}</a>
            </li>
            <li @click="goto(nextIndx)">&gt;</li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            nowIndex : 0
        }
    },
    props: {
        slides : {
            type : Array,
            default : []
        },
        interval : {
            type : Number,
            default : 1000
        }
    },
    computed : {
        preIndx () {
            if (this.nowIndex === 0){
                return this.slides.length - 1
            }else{
                return this.nowIndex - 1
            }
        },
        nextIndx () {
            if (this.nowIndex === this.slides.length - 1){
                return 0
            }else{
                return this.nowIndex + 1
            }
        }
    },
    methods : {
        goto (index) {
            this.nowIndex = index;
            this.$emit("onchange",this.nowIndex)
        },
        runInterval () {
            this.intervalId = setInterval(() =>{
                this.goto(this.nextIndx) //下一个nextIndx
            },this.interval)
        },
        clearInterval () {
            clearInterval(this.intervalId)
        }
    },
    mounted () {
        this.runInterval()
    }
}
</script>


<style scoped>
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 300px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
  line-height: 30px;
  letter-spacing: 1px
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0px 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
  color: red;
}
</style>

