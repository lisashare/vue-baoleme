import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import lisa from './lisa'
const store = new Vuex.Store({
    modules:{
        lisa
    }
})
export default store