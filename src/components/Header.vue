<template>
    <mu-appbar style="width: 100%;" color="primary" v-if="loginHead">
        <mu-button flat slot="left" @click="turnBack"><i class="fa fa-angle-left icon-font"></i></mu-button>
        {{$store.state.title}}
        <mu-button flat slot="right">首页</mu-button>
    </mu-appbar>
    <mu-appbar style="width: 100%;" color="primary" v-else-if="cityHead">
        <mu-button flat slot="left" @click="turnBack"><i class="fa fa-angle-left icon-font"></i></mu-button>
        {{$store.state.title}}
        <mu-button flat slot="right" @click="turnCity">切换城市</mu-button>
    </mu-appbar>
    <mu-appbar style="width: 100%;" color="primary" v-else-if="loginAfterHead">
        <mu-button flat slot="left" @click="turnBack"><i class="fa fa-angle-left icon-font"></i></mu-button>
        <span @click="turnCity">{{$store.state.title}}</span>
        <mu-button flat slot="right" @click="goLogin('登录')">登录</mu-button>
        <mu-button flat slot="right" @click="goRegistered('注册')">注册</mu-button>
    </mu-appbar>
    <mu-appbar style="width: 100%;" color="primary" v-else>
        <mu-button flat slot="left" class="icon-font">吃了么</mu-button>
        <mu-button flat slot="right" @click="goLogin('登录')">登录</mu-button>
        <mu-button flat slot="right" @click="goRegistered('注册')">注册</mu-button>
    </mu-appbar>
</template>

<script>
    export default {
        name: "Header",
        props:['loginHead','cityHead','loginAfterHead'],
        methods:{
            goLogin(name){
                this.$store.commit('changeTitle',name);
                this.$router.push('/login');
            },
            goRegistered(name){
                this.$store.commit('changeTitle',name);
                this.$router.push('/registered');
            },
            turnBack(){
                this.$router.go(-1);
            },
            turnCity(){
                this.$router.push('/');
            },
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .icon-font{
        font-size: 24px;
        font-weight: bold;
        font-style: italic;
    }
</style>