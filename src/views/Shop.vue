<template>
    <div class="shop-content">
        <i class="fa fa-chevron-left turnback-icon" @click="turnBack"></i>
        <img :src="shopPicUrl+inform.image_path" class="bg-pic">
        <div class="introduct" @click="open = !open">
            <img :src="shopPicUrl+inform.image_path" class="shop-pic">
            <div class="shop-text">
                <h4 class="shop-name">{{inform.name}}</h4>
                <p class="delivery-inform">商家配送 {{inform.order_lead_time}} 分钟送达 / 配送费￥{{inform.float_delivery_fee}}</p>
                <p class="promotion-info">{{inform.promotion_info}}</p>
            </div>
            <i class="fa fa-angle-right introduct-icon"></i>
        </div>
        <mu-drawer :open.sync="open" :docked="docked" :right="true">
            <h1 class="mask-title">商家详情</h1>
            <i class="mask-close-icon" @click="open = false">X</i>
        </mu-drawer>
    </div>
</template>

<script>
    const shopInformUrl = 'https://elm.cangdu.org/shopping/restaurant/'

    export default {
        name: "Shop",
        data(){
            return{
                inform:[],
                shopPicUrl: 'https://elm.cangdu.org/img/',
                docked: false,
                open: false,
            };
        },
        methods:{
            turnBack(){
                this.$router.go(-1);
            },
        },
        created(){
            this.axios.get(shopInformUrl+this.$route.query.id).then(inform => {
                this.inform = inform.data;
            },err => { alert(err); });
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .shop-content{
        width: 100%;
        position: relative;
        text-align: left;
        overflow: hidden;

        .turnback-icon{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            padding: .4rem;
            font-size: 24px;
            color:  rgba(255,255,255,.9);
        }

        .bg-pic{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9;
            filter: blur(10px);
            -webkit-filter: blur(10px);
        }

        .introduct{
            display: flex;
            position: relative;
            z-index: 10;
            width: 100%;
            padding: .8rem 0 .8rem .6rem;
            background-color: rgba(119,103,137,.43);

            .shop-pic{
                flex: 0 0 4.5rem;
                width: 4.5rem;
                height: 4.5rem;
                border-radius: 1rem;
            }

            .shop-text{
                flex: 1;
                padding-left: .6rem;
                color: #fff;
            }

            .shop-name{
                margin-top: .2rem;
                margin-bottom: .7rem;
                font-size: 18px;
                font-weight: bold;
            }

            .delivery-inform{
                margin-bottom: .7rem;
                font-size: 12px;
            }

            .promotion-info{
                font-size: 12px;
            }

            .introduct-icon{
                position: absolute;
                top: 50%;
                right: .6rem;
                z-index: 10;
                transform: translateY(-50%);
                font-size: 30px;
                color: #fff;
            }
        }

        .mu-drawer{
            width: 90%;
            padding: 2rem 1rem;
            color: #666;
            border-radius: .8rem 0 0 .8rem;

            .mask-title{
                text-align: center;
                font-size: 20px;
            }

            .mask-close-icon{
                display: block;
                position: absolute;
                left: 50%;
                bottom: 2rem;
                transform: translateX(-50%);
                font-size: 20px;
            }
        }
    }
</style>