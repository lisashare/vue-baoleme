<template>
  <div class="app-footer">
      <ul>
          <li>
              <i></i>
              <span></span>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  name:AppFooter,
  data(){
      return {
          navs:[
              {id:1,title:'首页',name:'home',icon:'home'},
              {id:1,title:'发现',name:'find',icon:'home'},
              {id:1,title:'订单',name:'home',icon:'home'},
              {id:1,title:'我的',name:'mine',icon:'user'}
          ]
      }
  }
}
</script>
<style lang="scss" scoped>
.app-footer{
    width:45px;
    position:fixed;
    width:100%;
    bottom:0;
}
</style>

