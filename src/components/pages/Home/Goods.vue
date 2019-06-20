<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li 
          v-for = "(item,i) in goods" 
          :key = "i"
          class="menu-item"
          :class = "{'current':currentIndex === i }
          "
           @click = "selectMenu(i,$event)"
          >
            <span class="text">
              <span 
              v-show = "item.type > 0"
              :class = "classMap[item.type]"
                 class="icon"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右边商品区 -->
      <div class="food-wrapper" ref="foodWrapper">
        <ul>
          <li v-for = "(item,i) in goods" 
          :key = "i"
          class="food-list food-list-hook"
          >
            <h1 class="title">{{ item.name }}</h1>
            <!-- 标题内部商品 -->
            <ul>
              <li v-for = "(food,index) in item.foods" :key = "index"
              class="food-item"
              >
               <div class="icon">
                 <img width="100%"
                 :src = "food.icon">
               </div>
               <!-- 商品右侧自适应 -->
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show = "food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <!-- 加减按钮 -->
                  <div class="cartcontrol-wrapper">
                    <cart-control :food = "food"/>
                  </div>
                </div>               
              </li>
            </ul>
          </li>
        </ul>
      </div>
    <cart 
    :select-foods = "selectFoods"
    :delivery-price = "seller.deliveryPrice" :min-price="seller.minPrice"></cart>
  </div>
</template>
<script>
import CartControl from '../../commons/CartControl/CartControl'
import Cart from '../Cart/Cart.vue'
import Vue from 'vue'
import BScroll from 'better-scroll';

export default {
  name:'Goods',
  data() {
    return{
      seller:[],
      goods:[],
      listHeight:[],  //高度
      scrollY:0
    }
  },
   components:{
    Cart,CartControl
  },
  computed:{
    currentIndex(){ //数据改变会实时变化
    
      for(let i = 0;i < this.listHeight.length;i++){
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];
        //判断  最后一个!height2
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          return i;
        }      
      }
       return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food);
          }
        })
      })
      return foods;
    }
  },

  methods:{
    //与原生交互的操作，保证dom已经渲染
    selectMenu(index,event){ //判断选择第几个menu
      if(!event._constructed){
        // better-scroll 为true,原生为false
        return;
      }
      // console.log(index)
       let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');

       let el = foodList[index];//取到index对应的节点
       this.foodsScroll.scrollToElement(el,300); //动画时间
    },
    _initScroll(){
      // console.log(this.$refs.menuWrapper)
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        //初始化的时候点击事件，better-scroll,浏览器事件一共会触发两次，传入$event事件，做判断
        click:true
      });

      this.foodsScroll = new BScroll(this.$refs.foodWrapper,{
        click:true,
        //检测实时监听位置
        probeType:3
      })
      //滚动的时候
      this.foodsScroll.on('scroll',(pos)=>{
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight(){
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      //将高度push到数组中
      this.listHeight.push(height);
      for(let i = 0;i < foodList.length;i++){
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    getGoods(){
      this.$http.get('/static/json/data.json').then(res=>{
        this.goods = res.data.goods
        this.seller = res.data.seller
        Vue.nextTick(()=>{
          this._initScroll();
          this._calculateHeight();//计算高度的方法
        })
      })
    }  
  },
  created(){
    this.classMap=['decrease','discount','special','invoice','guarantee'];
    this.getGoods();   
  }
}
</script>
<style lang="scss" scoped>
@import '../../../stylesheets/particles/_mixin.scss';
.goods{
  display: flex;
  overflow: hidden;
  position: absolute;
  width:100%;
  top:1.88rem;
  bottom:0.46rem;
  .menu-wrapper{
    //参数 等分，缩放，站位
    flex:0 0 0.8rem;
    width:0.8rem; //兼容
    background:#f3f5f7;
    //标签效率比类底
    .menu-item{
      display: table; //垂直居中
      height:0.54rem;
      line-height:14px;
      padding:0 12px;
      //滚动的高亮
      &.current{
        position:relative;
        z-index:10;
        margin-top:-1px;
        background:#fff;
        font-weight: 700;
        .text{
          @include border-none()
        }
      }
      .icon{
          display: inline-block;
          vertical-align: top;
          font-size:0;
          width:12px;
          height:12px;
          margin-right:2px;
          background-size:12px 12px;
          background-repeat: no-repeat;
          &.decrease{
              @include bg-image('./images/decrease_3')
          }
          &.discount{
            @include bg-image('./images/discount_3')
          }
          &.guarantee{
              @include bg-image('./images/guarantee_3') 
          }
          &.invoice{
              @include bg-image('./images/invoice_3') 
          }
          &.special{
              @include bg-image('./images/special_3') 
          }
      }
      .text{
        display:table-cell;
        width:0.56rem;
        vertical-align: middle;

        @include border-1px(rgba(7,17,27,.1));
        font-size: 12px;
      }
    }
  }
  .food-wrapper{
    flex:1;
    .title{
      padding-left:14px;
      height:0.26rem;
      line-height:0.26rem;
      border-left:2px solid #d9dde1;
      font-size:14px;
      color:rgb(147,153,159);
      background:#f3f5f7;
    }
    .food-item{
      display: flex;
      margin:18px 18px 0 18px;
      padding-bottom:18px;
      @include border-1px(rgba(7,17,27,.1));
      &:last-child{
        @include border-none();
        margin-bottom:0;
      }
      .icon{
        flex:0 0 0.57rem;
        margin-right:10px;

      }
      .content{
        flex:1;
        .name{         
          margin:2px 0 8px 0;
          line-height:14px;
          font-size: 14px;
          color:rgb(7,17,27);
        }
        .desc,.extra{         
          font-size:10px;
          color:rgb(147,153,159);         
        }
        .desc{
            margin-bottom:8px;  
            line-height:12px;        
        }       
        .extra{
          line-height:10px;
          .count{
            margin-right:12px;
          }
        }
        .price{
          font-weight: 700;
          line-height: 0.24rem;
          .now{
            margin-right:8px;
            font-size: 14px;
            color:rgb(240,20,20);
          }
          .old{
            text-decoration: line-through;
            font-size: 10px;
            color:rgb(147,153,159);
          }
        }
        .cartcontrol-wrapper{
          position: absolute;
          right:0;
          bottom:12px;

        }
      }
    }
  }
}
</style>

