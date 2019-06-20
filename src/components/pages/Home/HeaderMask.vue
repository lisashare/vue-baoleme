<template>
<div class="header-mask">
    <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
    <div v-show = "detailShow" class="detail ">
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
        <!-- 关闭按钮 -->
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
  name:'HeaderMask',
  props:['detailShow','hideDetail','seller','classMap'],
  components:{Star}
}
</script>
<style lang="scss" scoped>
 @import '../../../stylesheets/particles/_mixin.scss';

// 调节动画时间
.animated{
    animation-duration: 0.7s;
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
</style>

