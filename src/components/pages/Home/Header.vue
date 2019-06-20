<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src= "seller.avatar"/>
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="description">
                    {{ seller.description }}/{{seller.deliveryTime}}分钟送达
                </div>
                <!-- 这里有个判断，获取数据的时候有延迟，使用v-if -->
                <div v-if="seller.supports" class="support">
                    <span class="icon" 
                    :class="classMap[seller.supports[0].type]"
                    ></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>

            </div>
            <!-- seller数量 -->
            <div 
            v-if = "seller.supports"
            @click = "showDetail"
              class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="fa fa-angle-right"></i>
            </div>
        </div>
        <div  @click="showDetail" class="bulletin-wrapper">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="fa fa-angle-right"></i>
        </div>
        <!-- 背景 -->
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%"/>
        </div>
        <!-- css sticky footer -->       
        <header-mask 
            :detailShow = "detailShow" 
            :hideDetail = "hideDetail"
            :seller = "seller"
            :classMap = "classMap"
            ></header-mask>    
    </div>
</template>
<script>
import Star from '../../commons/Star/Star.vue'
import HeaderMask from './HeaderMask.vue'
export default {
  name:"Header",
  props:{
      seller:{
          type:Object
      }
  },
  components:{Star,HeaderMask},
  data() {
      return {
         detailShow:false,
         classMap:[]
      }
  },
  methods:{
      showDetail(){
          this.detailShow = true;
      },
      hideDetail(){
          this.detailShow = false;
      }
  },
    created(){
        this.classMap=['decrease','discount','special','invoice','guarantee'];
    } 
}
</script>
<style lang="scss" scoped>
@import '../../../stylesheets/particles/_mixin.scss';

.header{
    position: relative;
    color:#fff;
    background:rgba(7,17,27,.5);
    overflow: hidden; //阴影模糊外露哦
    .content-wrapper{
        position: relative;
        padding:0.24rem 0.12rem 0.18rem 0.24rem;
        //avatar跟content有空白字符，
        font-size:0;
    }
    .avatar{
        display: inline-block;
        vertical-align: top;
        img{
            width:0.64rem;
            height:0.64rem;
            border-radius: 2px;
        }
        
    }
    .content{
        display: inline-block;
        margin-left:16px;
        font-size:14px;
       .title{
           margin:2px 0 8px 0;
           .brand{
               display: inline-block;
               vertical-align: top;
               width:30px;
               height:18px;

               @include bg-image ('./images/brand');

               background-size:0.3rem 0.18rem;
               background-repeat:no-repeat;
           }
           .name{
               margin-left:6px;
               font-size:16px;
               line-height:18px;
               font-weight: bold;
           }
       } 

       .description{
           margin-bottom:10px;
           line-height:12px;
           font-size:12px;
       }
       
       .support{
           .text{
               line-height:11px;
               font-size: 10px;
               display: inline-block;
               vertical-align: top;
            
           }
           .icon{
               display: inline-block;
               vertical-align: top;
               font-size:0;
               width:12px;
               height:12px;
               margin-right:4px;
               background-size:12px 12px;
               background-repeat: no-repeat;
               &.decrease{
                   @include bg-image('./images/decrease_1')
               }
               &.discount{
                  @include bg-image('./images/discount_1')
               }
               &.guarantee{
                   @include bg-image('./images/guarantee_1') 
               }
               &.invoice{
                   @include bg-image('./images/invoice_1') 
               }
               &.special{
                   @include bg-image('./images/special_1') 
               }
           }
       }
    }
    .support-count{
        position:absolute;
        right:12px;
        bottom:18px;
        padding:0 8px;
        height:24px;
        line-height:24px;
        border-radius:14px;
        background:rgba(0,0,0,.2);
        text-align: center;
        .count{
            font-size:10px;
            margin-right:2px;
        }
        i{
            font-size:10px;
        }
    }
    .bulletin-wrapper{
        position: relative;
        // font-size: 0;
        height:28px;
        line-height:28px;
        padding:0 22px 0 12px;
        background:rgba(7,17,27,.2);
        // 不折行
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .bulletin-title{
            display: inline-block;
            vertical-align: top;
            margin-top:8px;
            width:22px;
            height:12px;
             @include bg-image ('./images/bulletin');
             background-size:22px 12px;
             background-repeat:no-repeat;
        }
        .bulletin-text{
            font-size: 10px;
            margin:0 4px;
        }
        i{
            position: absolute;
            font-size:10px;
            right:12px;
            top:8px;
        }
    }
    .background{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:-1;
        filter:blur(10px)
    }  
}
</style>