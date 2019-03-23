<template>
    <div class="home">
        <Header></Header>
        <div class="posit-box">
            <div class="posit-title">
                <span class="title-left">当前定位城市：</span>
                <span class="title-right">定位不准时，请在城市列表中选择</span>
            </div>
            <div class="local" @click="selectCity(4,localCity)">
                <span class="local-name">{{localCity}}</span>
                <i class="fa fa-angle-right local-icon"></i>
            </div>
        </div>
        <div v-if="hotCities.length" class="hot-box">
            <p class="hot-title">热门城市</p>
            <span v-for="(h,index) in hotCities" :key="index" class="hot-city" @click="selectCity(h.id,h.name)">{{h.name}}</span>
        </div>
        <div v-for="(all,index) in letterSort" :key="index" class="all-city">
            <p class="city-title">{{index}}<span v-if="index === 'A'" class="condition">（按字母排序）</span></p>
            <span v-for="(n,num) in all" :key="num" class="city-name" @click="selectCity(n.id,n.name)">{{n.name}}</span>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'

    const guess = '/api/v1/cities?type=guess'
    const hot = '/api/v1/cities?type=hot'
    const group = '/api/v1/cities?type=group'

    export default {
        name: 'home',
        components:{
            Header,
        },
        data(){
            return{
                localCity: '广州',
                hotCities: [],
                allCities: [],
            };
        },
        computed:{
            letterSort(){
                let arr = [];
                let result = {};
                if(Object.keys(this.allCities).length !== 0){
                    for (let key in this.allCities){
                        arr.push(key);
                    }
                    for (let i = 0; i < arr.length; i++) {
                        for (let j = (i+1); j < arr.length; j++) {
                            if(arr[i] > arr[j]){
                                let c = arr[j];
                                arr[j] = arr[i];
                                arr[i] = c;
                            }
                        }
                    }
                    for (let k in arr){
                        for (let key in this.allCities){
                            if(key === arr[k]){
                                result[key] = this.allCities[key];
                            }
                        }
                    }
                }
                return result;
            },
        },
        methods:{
            selectCity(id,name){
                this.$store.commit('changeTitle',name);
                this.$router.push({path:`/city/${id}`,query:{id}});
            }
        },
        created(){
            // this.axios.get(guess).then( guessCities => {
            //     console.log(guessCities.data.name);
            //     this.localCity = guessCities.data.name;
            //     console.log(this.localCity);
            // },err => { alert(err); });
            this.axios.get(hot).then( hotCities => {
                this.hotCities = hotCities.data;
            },err => { alert(err); });
            this.axios.get(group).then( groupCities => {
                this.allCities = groupCities.data;
            },err => { alert(err); });
        },
        // beforeRouteEnter(to, from, next){
        //     // eslint-disable-next-line
        //     console.log('进入');
        //     next(vm =>{
        //
        //     });
        // },
        // beforeRouteUpdate(to, from, next){
        //     // eslint-disable-next-line
        //     console.log('更新');
        //     next();
        // },
        // beforeRouteLeave(to, from, next){
        //     // eslint-disable-next-line
        //     console.log('离开');
        //     next();
        // },
    }

</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .home{
        .posit-box{
            width: 100%;
            margin-bottom: .6rem;
            background-color: #fff;
            border-top: 1px solid #e4e4e4;
            border-bottom: 2px solid #e4e4e4;

            .posit-title{
                display: flex;
                line-height: 2rem;
                padding: .65rem .45rem 0;
                border: none;
                box-sizing: border-box;
            }

            .title-left{
                flex: 1;
                text-align: left;
                font-weight: 400;
                font-size: 14px;
                color: #666;
            }

            .title-right{
                font-weight: 900;
                font-size:12px;
                color: #9f9f9f;
            }

            .local{
                display: flex;
                height: 2.5rem;
                line-height: 2.5rem;
                padding-left: .6rem;
                font-weight: 400;
                font-size: 16px;
                border-top: 1px solid #e4e4e4;
                box-sizing: border-box;
            }

            .local-name{
                flex: 1;
                text-align: left;
                color: #3190e8;
            }

            .local-icon{
                width: 36px;
                height: 100%;
                line-height: 2.5rem;
                font-size: 20px;
                color: #999;
            }
        }

        .hot-box{
            margin-bottom: .6rem;
            border-top: 2px solid #e4e4e4;
            background-color: #fff;

            .hot-title{
                padding: 0 .45rem;
                line-height: 2rem;
                text-align: left;
                font-weight: 400;
                font-size: 14px;
                color: #666;
            }

            .hot-city{
                display: inline-block;
                width: 25%;
                height: 2.5rem;
                line-height: 2.5rem;
                text-align: center;
                font-size: 14px;
                color: #3190e8;
                border: 1px solid #e4e4e4;
            }
        }

        .all-city{
            margin-bottom: .6rem;
            border-top: 2px solid #e4e4e4;
            background-color: #fff;
            color: #666;
            font-weight: 400;
            font-size: 14px;
            text-align: left;

            .city-title{
                padding: 0 .45rem;
                line-height: 2rem;
            }

            .city-name{
                display: inline-block;
                width: 25%;
                height: 2.5rem;
                line-height: 2.5rem;
                text-align: center;
                border: 1px solid #e4e4e4;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                vertical-align:top;
            }

            .condition{
                font-size: 12px;
                color: #999;
            }
        }
    }
</style>
