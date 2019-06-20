<template>
  <div class="shopcart">
      <!-- 下方左右两侧 -->
    <div class="content">
        <!-- 左侧自适应 -->
        <div class="content-left">
            <div class="logo-wrapper">
                <!-- 购物车图 -->
                <div class="logo"
                    :class="{'highlight':totalInfo.count>0}"
                >
                    <i class="fa fa-shopping-cart"></i>
                </div>
               <!-- 购物车数量 -->
               <div class="num" v-show = "totalInfo.count>0">{{totalInfo.count}}</div>
            </div>
            <div class="price"
                :class = "{'highlight':totalInfo.price>0}"
            >￥{{totalInfo.price}}</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">

            <div class="pay"
                :class = "payClass"
            >
                {{payDesc}}
            </div> 
                
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'ShopCart',
  props:{
      selectFoods:{
          type:Array,
          default() {
              return [
                  {
                      price:10,
                      count:6
                  }
              ];
          }
      },

      deliveryPrice:{
          type:Number,
          default:0
      },
       minPrice:{
          type:Number,
          default:0
      }
  },
  //使用大量计算属性
  computed:{
      //计算总价钱,总数量
      totalInfo() {
          let total = {price:0,count:0};
          this.selectFoods.forEach( food =>{
              total.price += food.price * food.count;
              total.count += food.count;
          })
          return total;
      },
      payDesc() {
          if(this.totalInfo.price === 0){
              return `￥${this.minPrice}元起送`;
          }else if(this.totalInfo.price < this.minPrice){
              let diff = this.minPrice - this.totalInfo.price
              return `还差￥${diff}元起送`;
          }else{
              return '去结算';
          }
      },
      payClass() {
          if(this.totalInfo.price < this.minPrice){
              return 'not-enough';
          }else{
              return 'enough'
          }
      }
  }
}
</script>
<style lang="scss" scoped>

.shopcart{
    position: fixed;
    left:0;
    bottom:0;
    width:100%;
    z-index:50;  
    height:0.48rem;
    .content{
        display: flex;
        background:#141d27;
        font-size:0;
        .content-left{
            flex:1;
            color:rgba(255,255,255,.4);
            .logo-wrapper{
                display: inline-block;
                position: relative;
                top:-10px;
                margin:0 12px;
                padding:6px;
                width:0.56rem;
                height:0.56rem;
                background:#141d27;
                border-radius: 50%;
                .logo{
                    width:100%;
                    height:100%;
                    border-radius:50%;
                    background:#2b343c;
                    text-align:center;
                    i{
                        line-height:0.44rem;
                        color:#80858a;
                        font-size:24px;
                    }
                    &.highlight{
                        background: rgb(0,160,220);
                        i{
                             color:#fff;
                        }
                    }
                } 
                //购物车中的数字
               .num{
                   position:absolute;
                   top:0;
                   right:0;
                   width:0.24rem;
                   height:0.16rem;
                   line-height:0.16rem;
                   text-align: center;
                   border-radius: 0.16rem;
                   font-size:9px;
                   font-weight: 700;
                   color:#fff;
                   background:rgb(240, 20, 20);
                   box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
                }               
            } 
            .price{
                &.highlight{
                    color:#fff;
                }
                display: inline-block;
                vertical-align: top;
                margin-top:0.12rem;
                line-height:0.24rem;
                padding-right:20px;
                border-right:1px solid rgba(255,255,255,.1);
                font-size: 16px;
                font-weight: 700;
                }
            .desc{
                display: inline-block;
                vertical-align: top;
                margin:0.12rem 0 0 0.12rem;
                line-height:0.24rem;
                font-size:10px;
            }
            
        }
        .content-right{
            flex:0 0 1.05rem;
            width:1.05rem;
            .pay{
                height:0.48rem;
                line-height:0.48rem;
                text-align: center;
                font-size:12px;
                font-weight: 700;
                &.not-enough{
                    background:#2b333b;
                }
                &.enough{
                    background:#00b43c;
                    color:#fff;
                }
            }
            
        }
    }
}
</style>

