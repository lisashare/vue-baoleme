<template>
  <div class="star" :class = "starType">
      <span 
      v-for = "(itemClass,i) in itemClasses"
      :key="i"
      :class="itemClass"
      class="star-item"
      ></span>
  </div>
</template>
<script>
//定义常量
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  name:'Star',
  props:{
      size:{
          tyle:Number
      },
      score:{
          type:Number
      }
  },
  computed:{
      starType() {
          return 'star-'+this.size
      },
      itemClasses() {
          let result = [];
          //获取分数：向下取0.5倍数的值
          let score = Math.floor(this.score*2)/2;
          //是否有小数,半星
          let hasDecimal = score%1 !== 0;
          //全星    
          let integer = Math.floor(score);
          //遍历加入全星
          for(let i = 0;i < integer;i++){
              result.push(CLS_ON);
          }
          //半星只出现一个
        if(hasDecimal){
            result.push(CLS_HALF)
        }
        //长度达到5
        while(result.length<LENGTH){
            result.push(CLS_OFF)
        }
        return result;
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../stylesheets/particles/_mixin.scss';
.star{
    font-size: 0;
    .star-item{
        display: inline-block;
        background-repeat:norepeat 
    }
    &.star-48{
        .star-item{
            width:20px;
            height:20px;
            margin-right:22px;
            background-size:20px 20px;
            &:last-child{
                margin-right:0;
            }
            &.on{
                @include bg-image('./images/star48_on')
            }
            &.half{
                @include bg-image('./images/star48_half')
            }
            &.off{
                 @include bg-image('./images/star48_off')
            }
        }
    }
    &.star-36{
        .star-item{
            width:15px;
            height:15px;
            margin-right:16px;
            background-size:15px 15px;
            &:last-child{
                margin-right:0;
            }
            &.on{
                @include bg-image('./images/star36_on')
            }
            &.half{
                @include bg-image('./images/star36_half')
            }
            &.off{
                 @include bg-image('./images/star36_off')
            }
        }
    }

    &.star-24{
        .star-item{
            width:10px;
            height:10px;
            margin-right:3px;
            background-size:10px 10px;
            &:last-child{
                margin-right:0;
            }
            &.on{
                @include bg-image('./images/star24_on')
            }
            &.half{
                @include bg-image('./images/star24_half')
            }
            &.off{
                 @include bg-image('./images/star24_off')
            }
        }
    }
    
}
</style>


