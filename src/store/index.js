import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: '',
        geohash: '',
        searchHistory:[],
    },
    mutations: {
        //跳转页面改标题
        changeTitle(state, name){
            state.title = name;
        },
        getGeohash(state, geohash){
            state.geohash = geohash;
        },
        //添加到历史纪录
        addSearch(state, result){
            if(state.searchHistory.length === 0){
                state.searchHistory.unshift(result);
            } else {
                for(let i = 0; i < state.searchHistory.length; i++){
                    if(state.searchHistory[i].name === result.name){
                        state.searchHistory.splice(i,1);
                    }
                }
                state.searchHistory.unshift(result);
            }
        },
        //清除历史纪录
        clearAll(state){
            state.searchHistory = [];
        },
    },
    actions: {

    }
})
