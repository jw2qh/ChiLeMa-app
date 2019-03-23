<template>
    <div class="bar">
        <router-link class="option" tag="span" :to="{path:'/msite/4',query:{geohash:$store.state.geohash}}" exact>
            <i class="fa fa-cutlery nar-icon"></i>
            <span class="nar-font">外卖</span>
        </router-link>
        <router-link class="option" tag="span" :to="{path:'/search',query:{geohash:$store.state.geohash}}" exact>
            <i class="fa fa-search nar-icon"></i>
            <span class="nar-font">搜索</span>
        </router-link>
        <router-link class="option" tag="span" :to="{path:'/order',query:{geohash:$store.state.geohash}}" exact>
            <i class="fa fa-list-ul nar-icon"></i>
            <span class="nar-font">订单</span>
        </router-link>
        <router-link class="option" tag="span" :to="{path:'/mine',query:{geohash:$store.state.geohash}}" exact>
            <i class="fa fa-user-o nar-icon"></i>
            <span class="nar-font">我的</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Bar",
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .bar{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 99;
        width: 100%;
        height: 3.6rem;
        line-height: 1rem;
        background-color: #fff;
        box-shadow: 0 -0.02667rem 0.05333rem rgba(0,0,0,.1);
        -webkit-box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);

        .option{
            display: inline-block;
            width: 25%;
            height: 100%;
            color: #666;

            .nar-icon{
                display: block;
                padding-top: .8rem;
                font-size: 18px;
            }

            .nar-font{
                font-size: 12px;
            }
        }

        .router-link-active{
            color: #3190e8;
        }
    }
</style>