<template>
    <div>
        <Header :loginAfterHead="true"></Header>
        <mu-carousel interval="10000" hide-controls>
            <mu-carousel-item v-for="(page, index) in showSort" :key="index">
                <div v-for="(sort, num) in page" :key="num" class="sort-item">
                    <img :src="sortPicUrl+sort.image_url" class="sort-pic">
                    <span class="sort-name">{{sort.title}}</span>
                </div>
            </mu-carousel-item>
        </mu-carousel>
        <div class="shop-list" v-if="shopList.length">
            <p class="title-box">
                <i class="fa fa-shopping-bag title-icon"></i>
                <span>附件商家</span>
            </p>
            <div class="select-box">
                <mu-menu placement="bottom-end" :open.sync="open" :class="defaultNum===6? '':defaultNum===5? '':'selected'">
                    <button class="select-btn">
                        <span style="margin-right: .4rem">{{defaultName}}</span><i class="fa fa-angle-down btn-icon"></i>
                    </button>
                    <mu-list slot="content">
                        <mu-list-item button v-for="(rank, number) in ranking" :key="number" @click="selectRank(rank,number)">
                            <mu-list-item-title>{{number}}</mu-list-item-title>
                        </mu-list-item>
                    </mu-list>
                </mu-menu>
                <span class="select-other-btn" :class="defaultNum===6? 'selected':''" @click="selectRank(6,'综合排序')">销量</span>
                <span class="select-other-btn" :class="defaultNum===5? 'selected':''" @click="selectRank(5,'综合排序')">距离</span>
            </div>
            <div v-for="(s,index) in shopList" :key="index" class="shop-item" @click.prevent="enterShop(s.id)">
                <img :src="shopPicUrl+s.image_path" class="shop-pic">
                <div class="shop-inform">
                    <header class="inform-content">
                        <i class="head-icon">品牌</i>
                        <span class="head-title">{{s.name}}</span>
                        <span v-for="(provide,n) in s.supports" :key="n" class="head-welfare">{{provide.icon_name}}</span>
                    </header>
                    <h5 class="inform-content">
                        <i class="fa fa-star medium-icon"></i>
                        <span class="medium-rating">{{s.rating}}</span>
                        <span class="medium-content">月售{{s.recent_order_num}}单</span>
                        <span class="medium-delivery" v-if="s.delivery_mode !== undefined">{{s.delivery_mode.text}}</span>
                    </h5>
                    <footer class="inform-foot">
                        <span class="foot-content">￥{{s.float_minimum_order_amount}}起送/配送费约{{s.float_delivery_fee}}￥</span>
                        <span class="foot-right">
                            <span class="foot-distance">{{s.distance}} /</span>
                            <span class="foot-time">{{s.order_lead_time}}</span>
                        </span>
                    </footer>
                </div>
            </div>
        </div>
        <Bar></Bar>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import Bar from '../components/Bar.vue'

    const sortUrl = 'https://elm.cangdu.org/v2/index_entry'
    const shopUrl = 'https://elm.cangdu.org/shopping/restaurants?'

    export default {
        name: "Msite",
        components: {
            Header,
            Bar,
        },
        data() {
            return {
                sortName: [],
                sortPicUrl: 'https://fuss10.elemecdn.com/',
                shopList:[],
                shopPicUrl: 'https://elm.cangdu.org/img/',
                open: false,
                defaultName: '综合排序',
                defaultNum: 4,
                ranking: {
                    '综合排序': 4,
                    '速度最快': 2,
                    '评分最高': 3,
                    '起送价最低': 1,
                },
            };
        },
        computed: {
            showSort() {
                let page = 0;
                let arr = [];
                let obj = {};
                if (this.sortName.length) {
                    for (let i = 0; i < this.sortName.length; i++) {
                        arr.push(this.sortName[i]);
                        if ((i + 1) % 8 === 0) {
                            obj[page] = arr;
                            arr = [];
                            page++;
                        }
                    }
                }
                return obj;
            },
        },
        methods:{
            selectRank(n,name){
                this.defaultName = name;
                this.open = false;
                this.defaultNum = n;
                this.$router.replace({path:`/msite/${this.defaultNum}`,query:{geohash:this.$store.state.geohash}});
            },
            enterShop(id){
                console.log(id);
                this.$router.push({path:'/shop',query:{geohash:this.$store.state.geohash,id}});
            },
        },
        beforeRouteEnter(to, from, next){
            // eslint-disable-next-line
            console.log('进入');
            next(vm =>{
                vm.axios.get(sortUrl).then(response => {
                    vm.sortName = response.data;
                }, err => { alert(err); });
                let arr = vm.$route.query.geohash.split(',');
                vm.axios.get(shopUrl + 'latitude=' + arr[0] + '&longitude=' + arr[1] + '&order_by=4').then(shop => {
                    vm.shopList = shop.data;
                }, err => { alert(err); });
            },err => { alert(err);});
        },
        beforeRouteUpdate(to, from, next){
            // eslint-disable-next-line
            console.log('更新');
            let newArr = this.$route.query.geohash.split(',');
            this.axios.get(shopUrl + 'latitude=' + newArr[0] + '&longitude=' + newArr[1] + '&order_by=' + this.defaultNum)
                .then(shop => {
                this.shopList = shop.data;
            }, err => { alert(err); });
            next();
        },
        beforeRouteLeave(to, from, next){
            // eslint-disable-next-line
            console.log('离开');
            next();
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .mu-carousel {
        width: 100%;
        height: 13rem;
        margin-bottom: .6rem;
        background-color: #eee;
        border-bottom: .025rem solid #e4e4e4;
        box-sizing: border-box;

        .sort-item {
            display: inline-block;
            width: 25%;
            height: 5.8rem;

            .sort-pic {
                width: 60%;
                height: 60%;
            }

            .sort-name {
                display: block;
                font-size: 14px;
                color: #333;
            }
        }
    }

    .shop-list{
        margin-bottom: 3.6rem;
        color: #333;
        background-color: #eee;
        border-top: .025rem solid #e4e4e4;
        box-sizing: border-box;
        text-align: left;

        .title-box{
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            margin-bottom: .3rem;
            padding-left: .3rem;
            font-size: 14px;

            .title-icon{
                margin: 0 .5rem;
            }
        }

        .select-box{
            display: flex;
            width: 100%;
            padding: .2rem .6rem;
            font-size: 14px;

            .mu-menu{
                flex: 1;
            }

            .select-btn{
                background-color: #eee;
                border: 0;
                outline: none;
            }

            .select-other-btn{
                flex: 0 0 20%;
                width: 20%;
                text-align: center;
            }

            .selected{
                font-weight: bold;
            }
        }

        .shop-item{
            display: flex;
            height: 6rem;
            margin: 0 .2rem;
            padding: 1rem .4rem;
            border-bottom: .025rem solid #999;
            box-sizing: border-box;

            .shop-pic{
                flex: 0 0 20%;
                width: 20%;
                height: 100%;
            }

            .shop-inform{
                flex: 1;
                display: inline-block;
                height: 100%;
                margin-left: .4rem;
            }

            .inform-content{
                display: flex;
                width: 100%;
                margin-bottom: .7rem;
            }

            .head-icon{
                display: inline-block;
                height: 80%;
                margin: auto 0;
                padding: .1rem .2rem;
                font-size: 13px;
                font-weight: bold;
                background-color: #ffd930;
                border-radius: 3px;
                vertical-align: center;
            }

            .head-title{
                flex: 1;
                display: inline-block;
                margin: auto .4rem;
                font-size: 14px;
                font-weight: bold;
            }

            .head-welfare{
                flex: 0 0 5%;
                display: inline-block;
                width: 5%;
                margin: auto .1rem;
                font-size: 12px;
                color: #999;
            }

            .medium-icon{
                margin: auto 0;
                font-size: 12px;
                color: #ff9a0d;
            }

            .medium-rating{
                margin: auto .2rem;
                font-size: 12px;
                color: #ff6000;
            }

            .medium-content{
                flex: 1;
                margin: auto 0;
                padding-left: .2rem;
                font-size: 12px;
            }

            .medium-delivery{
                flex: 0 0 20%;
                width: 20%;
                margin: auto 0;
                text-align: center;
                font-size: 12px;
                color: #fff;
                background-color: #3190e8;
                border: .025rem solid #3190e8;
                border-radius: .1rem;
                box-sizing: border-box;
            }

            .inform-foot{
                display: flex;
                width: 100%;
            }

            .foot-content{
                flex: 0 0 50%;
                width: 50%;
                font-size: 12px;
                color: #666;
            }

            .foot-right{
                flex: 1;
                text-align: right;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .foot-time{
                margin-left: .2rem;
                color: #3190e8;
            }
        }
    }
</style>