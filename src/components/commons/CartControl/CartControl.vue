<template>
    <div class="cart-control">
        <transition 
            name = "move"
        >
            <div class="cart-decrease" v-show = "food.count>0">   
                <span class="inner">
                    <i class="fa fa-minus-circle" @click="decreaseCart" ></i>
                </span>
            </div>
        </transition>
        <div class="cart-count" v-show = "food.count>0">
            {{food.count}}
        </div>
        <div class="cart-add ">
            <i class="fa fa-plus-circle" @click="addCart"></i>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name:"CartControl",
    props:{
        food:{ //关联food
            type:Object
        },
        
    },
    // props:['selectFoods'],
    methods:{
        addCart(event){
            if(!event._constructed){//better pc点击
                return;
            }
            if(!this.food.count){
                Vue.set(this.food,'count',1)
            }else{
                // Vue.set(this.food,'count',count+1)
                this.food.count ++;
            }
        },
        decreaseCart() {
             if(!event._constructed){//better pc点击
                return;
            }
            if(this.food.count){
                this.food.count --;
            }
        }
    }    
}
</script>
<style lang="scss" scoped>
.cart-control{
    font-size:0;
    .cart-decrease,.cart-add{
        display: inline-block;       
        i{
        display: inline-block;
        padding:6px;
        line-height:0.24rem;
        font-size:0.24rem;
        color:rgb(0, 160, 220);
        }
    }
    .cart-count{
        display: inline-block;
        vertical-align: top;
        width:12px;
        padding-top:6px;
        line-height: 0.24rem;
        text-align: center;
        font-size:10px;
        color:rgb(147,153,159);
    }
    .cart-add{
        
    }

    .cart-decrease{
        .inner{
            transition:all 0.4s linear;
            transform:rotate(0);
        }
        transition:all 0.4s linear;
        &.move-enter,&.move-leave{
            opacity:0;
            transform:translate3D(24px,0,0);         
            }
        }
        &.move-leave-to{
            opacity:0;
            transform:translate3D(0,0,0)
        }
        &.move-enter-active{
            transition:all 1s;
        }
         /* 进入的时候 */
        &.move-enter{
            .inner{
            transition:all 0.4s linear;
            transform:rotate(180deg);
        }
        /* 进入的动作结束的时候 */
        &.move-enter-to{
            opacity:1;
        }
        // /* 整个进入的过程 */
        // &.move-enter-active{
        //     transition:all 1s;
        // }
        // &.move-leave{
        //     opacity:1;
        // }
        // &.move-leave-to{
        //     opacity:0;
        // }
        &.move-leave-active{
            transition:all 1s;
        }
    }
}

</style>


