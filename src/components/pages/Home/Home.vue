<template>
  <div id="home">
    <Header v-bind:seller="seller"></Header>
    <div class="tab">
      <div class="tab-item">

        <router-link :to = "{name:'goods'}">商品</router-link>
     
        </div>
      <div class="tab-item">
        <router-link :to = "{name:'ratings'}">评论</router-link>
        
        </div>
      <div class="tab-item"><router-link :to = "{name:'seller'}">商家</router-link></div>
    </div>
    <router-view/>
  </div>
</template>

<script>

import Header from './Header.vue'

export default {
  name: 'Home',
  data () {
    return {
      seller:{}
    }
  },
  components:{
    Header
  },
  methods:{
    getSeller(){
      this.$http.get('/static/json/data.json').then((res) => {
        // console.log(res.data.seller)
        this.seller = res.data.seller
      })
    }
  },
  created(){
    this.getSeller()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../stylesheets/particles/_mixin.scss';
//布局-宽高（会触发重绘的）-可被弃权属性
.tab{
  display: flex;
  width:100%;
  height:0.48rem;
  line-height:0.48rem;
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
   @include border-1px(rgba(7, 17, 27, 0.1));

  .tab-item{
    flex:1;
    text-align: center;
    &>a{
      display: block;
      font-size: 16px;
      color: rgb(77, 85, 93);
    }
    .router-link-exact-active{
        color: rgb(240, 20, 20);
    }
  }
}
//草料二维码
</style>


