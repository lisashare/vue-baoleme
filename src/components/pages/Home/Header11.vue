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
            v-if="seller.supports"
            @click="showDetail"
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
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
        <div v-show="detailShow" class="detail">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{ seller.name }}</h1>
                    <div class="star-wrapper">
                       <star :size = "48"
                    :score = "seller.score"
                    ></star> 
                    </div>
                    <!-- -商家- span在安卓浏览器会有兼容问题-->
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li v-for="(item,i) in seller.supports" :key="i"
                        class="support-item">
                            <span class="icon" :class="classMap[item.type]"></span>
                            <span class="text">{{item.description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                         <p class="p-content">{{ seller.bulletin }}</p>
                    </div>
                   
                    
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="fa fa-close"></i>
            </div>
        </div>

        </transition>
    </div>
</template>
<script>
import Star from '../../commons/Star/Star.vue'
export default {
  name:"Header",
  //   props:['seller'],
  props:{
      seller:{
          type:Object
      }
  },
  components:{Star},
  data() {
      return {
         detailShow:false
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
// 调节动画时间
    .animated{
        animation-duration: 0.7s;
    }
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

               background-size:30px 18px;
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
    .detail{
        position:fixed;
        z-index:100;
        top:0;
        left:0;
        width:100%;
        height:100%;
        overflow: auto;
        background:rgba(7,17,27,.8);
        
        .detail-wrapper{
            min-height:90%;
            // text-align: center;
            .detail-main{
                margin-top:64px;
                padding-bottom:64px;
                .name{
                    line-height:16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
                //星星容器
                .star-wrapper{
                    margin-top:18px;
                    padding:2px 0;
                    text-align:center;
                }
                .title{                 
                    display: flex;
                    width:80%;
                    margin:28px auto 24px auto;
                    // vue-loader postcss工具自动添加兼容性代码
                    .line{
                        flex:1;
                        position: relative;
                        top:-6px;
                        border-bottom:1px solid rgba(255,255,255,.2);
                    }
                    .text{
                        padding:0 12px;
                        font-size:14px;
                        font-weight: 700;
                    }
                }
                .supports{
                    width:80%;
                    margin:0 auto;
                    .support-item{
                       padding:0 12px;
                       margin-bottom:12px;
                       font-size:0;
                       &:last-child{
                           margin-bottom:0;
                       }
                       .icon{
                           display: inline-block;
                           width:16px;
                           height:16px;
                           vertical-align: top;
                           margin-right:6px;
                           background-size:16px 16px;
                           background-repeat:no-repeat;
                           &.decrease{
                            @include bg-image('./images/decrease_2')
                            }
                            &.discount{
                                @include bg-image('./images/discount_2')
                            }
                            &.guarantee{
                                @include bg-image('./images/guarantee_2') 
                            }
                            &.invoice{
                                @include bg-image('./images/invoice_2') 
                            }
                            &.special{
                                @include bg-image('./images/special_2') 
                            }
                        }
                        .text{
                            line-height:12px;
                            font-size:12px;
                        }
                    }
                }
                .bulletin{
                    width:80%;
                    margin:0 auto;//水平居中
                    .p-content{
                        padding:0 10px;
                        line-height:24px;
                        font-size:12px;
                    }
                }
            }           
        }
        .detail-close{
            position:relative;
            width:32px;
            height:32px;
            margin:-64px auto 0 auto;
            clear:both;
            font-size:32px;
        }
    }
    
}
</style>